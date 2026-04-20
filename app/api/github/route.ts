import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'DB0706';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
  payload: {
    commits?: Array<{
      message: string;
      sha: string;
    }>;
  };
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return '1d ago';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

export async function GET() {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GitHub token not configured' },
        { status: 500 }
      );
    }

    // Calculate date range for last year
    const to = new Date();
    const from = new Date();
    from.setFullYear(from.getFullYear() - 1);

    // GraphQL query to fetch contribution data
    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      username: GITHUB_USERNAME,
      from: from.toISOString(),
      to: to.toISOString(),
    };

    // Fetch contribution data from GraphQL API
    const graphqlResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

    if (!graphqlResponse.ok) {
      return NextResponse.json(
        { error: `GraphQL request failed: ${graphqlResponse.status}` },
        { status: graphqlResponse.status }
      );
    }

    const graphqlData = await graphqlResponse.json();

    if (graphqlData.errors) {
      console.error('GraphQL errors:', graphqlData.errors);
      return NextResponse.json(
        { error: 'GraphQL query failed', details: graphqlData.errors },
        { status: 500 }
      );
    }

    // Extract contribution data
    const calendar = graphqlData.data.user.contributionsCollection.contributionCalendar;
    const totalContributions = calendar.totalContributions;

    // Flatten weeks into days
    const contributions: ContributionDay[] = [];
    calendar.weeks.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        // Map GitHub's contribution level to 0-4
        let level: 0 | 1 | 2 | 3 | 4;
        switch (day.contributionLevel) {
          case 'NONE':
            level = 0;
            break;
          case 'FIRST_QUARTILE':
            level = 1;
            break;
          case 'SECOND_QUARTILE':
            level = 2;
            break;
          case 'THIRD_QUARTILE':
            level = 3;
            break;
          case 'FOURTH_QUARTILE':
            level = 4;
            break;
          default:
            level = getContributionLevel(day.contributionCount);
        }

        contributions.push({
          date: day.date,
          count: day.contributionCount,
          level,
        });
      });
    });

    // Fetch recent events for activity feed
    const eventsResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
        cache: 'no-store',
      }
    );

    const recentActivity: Array<{
      repo: string;
      message: string;
      date: string;
      daysAgo: string;
    }> = [];

    if (eventsResponse.ok) {
      const events: GitHubEvent[] = await eventsResponse.json();

      // Extract recent activity (first 4 push events with commits)
      for (const event of events) {
        if (
          event.type === 'PushEvent' &&
          event.payload.commits &&
          event.payload.commits.length > 0 &&
          recentActivity.length < 4
        ) {
          const commit = event.payload.commits[0];
          const eventDate = new Date(event.created_at);
          recentActivity.push({
            repo: event.repo.name.split('/')[1],
            message: commit.message.split('\n')[0],
            date: event.created_at,
            daysAgo: getRelativeTime(eventDate),
          });
        }
      }
    }

    return NextResponse.json({
      totalContributions,
      contributions: contributions.sort((a, b) => a.date.localeCompare(b.date)),
      recentActivity,
    });
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
