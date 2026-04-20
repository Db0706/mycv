export interface GitHubEvent {
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

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubStats {
  totalContributions: number;
  contributions: ContributionDay[];
  recentActivity: Array<{
    repo: string;
    message: string;
    date: string;
    daysAgo: string;
  }>;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'DB0706';

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

/**
 * Fetch GitHub contribution data using GitHub GraphQL API
 * Requires GITHUB_TOKEN environment variable
 */
export async function fetchGitHubContributions(): Promise<GitHubStats> {
  try {
    // Fetch from our API route which has access to the environment variable
    const response = await fetch('/api/github', {
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch GitHub data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    throw error;
  }
}
