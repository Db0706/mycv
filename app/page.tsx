'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchGitHubContributions, type GitHubStats } from '@/lib/github';

export default function Portfolio() {
  const [githubData, setGithubData] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch live GitHub data
    const loadGitHubData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchGitHubContributions();
        setGithubData(data);
      } catch {
        setGithubData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadGitHubData();

    // Fix iOS Safari bottom bar issue
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  useEffect(() => {
    // Generate GitHub contribution graph from live data
    const generateContributionGraph = () => {
      if (!githubData) return;

      const graph = document.getElementById('contributionGraph');
      if (!graph) return;

      // Group contributions by week
      const weekGroups: Array<typeof githubData.contributions> = [];
      let currentWeek: typeof githubData.contributions = [];

      githubData.contributions.forEach((day, index) => {
        const dayOfWeek = new Date(day.date).getDay();

        if (dayOfWeek === 0 && currentWeek.length > 0) {
          weekGroups.push([...currentWeek]);
          currentWeek = [day];
        } else {
          currentWeek.push(day);
        }
      });

      if (currentWeek.length > 0) {
        weekGroups.push(currentWeek);
      }

      // Generate HTML
      let html = '<div style="display: flex; flex-direction: column; gap: 3px; font-size: 10px; color: #666; padding-right: 8px; justify-content: space-around; height: 91px;"><span>Mon</span><span>Wed</span><span>Fri</span></div>';

      weekGroups.forEach(week => {
        html += '<div style="display: flex; flex-direction: column; gap: 3px;">';
        week.forEach(day => {
          html += `<div class="contribution-day" data-level="${day.level}" title="${day.count} contributions on ${day.date}"></div>`;
        });
        // Pad with empty days if needed
        for (let i = week.length; i < 7; i++) {
          html += '<div class="contribution-day" data-level="0" title="No data"></div>';
        }
        html += '</div>';
      });

      graph.innerHTML = html;
    };

    if (githubData) {
      generateContributionGraph();
    }
  }, [githubData]);

  return (
    <>
      <style jsx global>{`
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          box-sizing: border-box;
        }

        html {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }

        body {
          background: #0a0a0a;
          color: #e5e5e5;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          margin: 0;
          padding: 0;
        }

        main, section, div {
          max-width: 100%;
        }

        .contribution-day {
          width: 11px;
          height: 11px;
          border-radius: 2px;
        }

        .contribution-day[data-level="0"] { background: #1a1a1a; }
        .contribution-day[data-level="1"] { background: #ff6b35; opacity: 0.3; }
        .contribution-day[data-level="2"] { background: #ff6b35; opacity: 0.6; }
        .contribution-day[data-level="3"] { background: #ff6b35; opacity: 0.8; }
        .contribution-day[data-level="4"] { background: #ff6b35; }

        .project-badge-live {
          background: #ff6b35;
          color: white;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .project-badge-repo {
          background: transparent;
          border: 1px solid #333;
          color: #999;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .project-badge-repo:hover {
          border-color: #666;
          color: #e5e5e5;
        }

        .tool-tag {
          background: #1a1a1a;
          border: 1px solid #262626;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 13px;
          color: #999;
          transition: all 0.2s;
        }

        .tool-tag:hover {
          border-color: #333;
          color: #e5e5e5;
        }

        .focus-card {
          background: #0f0f0f;
          border: 1px solid #1a1a1a;
          border-radius: 8px;
          padding: 24px;
          transition: all 0.2s;
          max-width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        .focus-card:hover {
          border-color: #262626;
        }

        .status-growing { color: #ff6b35; background: rgba(255, 107, 53, 0.1); }
        .status-building { color: #ff6b35; background: rgba(255, 107, 53, 0.1); }
        .status-sharing { color: #ff6b35; background: rgba(255, 107, 53, 0.1); }

        .project-item {
          background: #0f0f0f;
          border: 1px solid #1a1a1a;
          border-radius: 8px;
          padding: 20px;
          transition: all 0.2s;
          max-width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        .project-item:hover {
          border-color: #262626;
        }

        .project-item > div {
          flex-wrap: wrap;
          gap: 12px;
        }

        .activity-item {
          background: #0f0f0f;
          border: 1px solid #1a1a1a;
          border-radius: 8px;
          padding: 16px;
          transition: all 0.2s;
        }

        .activity-item:hover {
          border-color: #262626;
        }

        .nav-link {
          color: #999;
          font-size: 13px;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #e5e5e5;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          * {
            max-width: 100vw;
          }

          main {
            padding: 40px 16px !important;
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }

          header {
            max-width: 100vw !important;
          }

          header > div {
            padding: 12px 16px !important;
            max-width: 100vw !important;
          }

          .desktop-nav {
            display: none !important;
          }

          .email-button {
            padding: 10px 16px !important;
            font-size: 14px !important;
          }

          .email-button svg {
            width: 16px !important;
            height: 16px !important;
          }

          h1 {
            font-size: 28px !important;
          }

          section {
            margin-bottom: 80px !important;
          }

          .focus-grid-mobile {
            grid-template-columns: 1fr !important;
          }

          .contribution-day {
            width: 8px !important;
            height: 8px !important;
          }

          .focus-card {
            padding: 20px !important;
          }

          .project-item {
            padding: 16px !important;
          }

          .project-item > div {
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          .project-badge-live,
          .project-badge-repo {
            margin-top: 8px !important;
          }

          p, h1, h2, h3 {
            max-width: 100% !important;
            overflow-wrap: break-word !important;
            word-wrap: break-word !important;
          }

          #contributionGraph {
            overflow-x: scroll !important;
            max-width: 100% !important;
          }

          .contribution-wrapper {
            padding: 16px !important;
          }
        }

        @media (max-width: 480px) {
          .contribution-day {
            width: 6px !important;
            height: 6px !important;
          }

          h1 {
            font-size: 24px !important;
          }
        }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: '1px solid #1a1a1a', position: 'sticky', top: 0, background: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(12px)', zIndex: 50 }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href="#" style={{ fontSize: '13px', color: '#999', letterSpacing: '0.5px' }}>// Dean Dev<sup>10</sup></a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <nav className="desktop-nav" style={{ display: 'flex', gap: '24px' }}>
                <a href="#focus" className="nav-link">FOCUS</a>
                <a href="#projects" className="nav-link">PROJECTS</a>
                <a href="#skills" className="nav-link">SKILLS</a>
                <a href="#content" className="nav-link">CONTENT</a>
                <a href="#activity" className="nav-link">ACTIVITY</a>
              </nav>

              <button style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ff6b35', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
                <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '80px 24px' }}>

        {/* Hero */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ marginBottom: '40px' }}>
            <Image src="/zebu-day1-080.JPEG" alt="Dean Ball speaking on stage" width={680} height={400} style={{ borderRadius: '16px', cursor: 'pointer', objectFit: 'cover', width: '100%', height: 'auto' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#e5e5e5', margin: 0 }}>
              Hey, I&apos;m <span style={{ color: '#ff6b35' }}>Dean</span>.
            </h1>
            <a href="mailto:contact@deandev10.info" className="email-button" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ff6b35', padding: '12px 24px', borderRadius: '8px', fontSize: '15px', color: 'white', border: 'none', textDecoration: 'none', fontWeight: 500, transition: 'transform 0.2s, box-shadow 0.2s' }}>
              <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </a>
          </div>

          <p style={{ fontSize: '15px', color: '#999', marginBottom: '20px' }}>
            No bullsh*t product engineer. AI-Native builder: web, mobile, smart contracts.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', fontSize: '13px', color: '#666' }}>
            <a href="https://twitter.com/deandev10" target="_blank" style={{ color: '#999', transition: 'color 0.2s' }}>X</a>
            <span>/</span>
            <a href="https://www.instagram.com/codewithdev10?igsh=MXJpbjZyNnJpdHdsNg%3D%3D&utm_source=qr" target="_blank" style={{ color: '#999', transition: 'color 0.2s' }}>Instagram</a>
            <span>/</span>
            <a href="https://www.tiktok.com/@deandev10?_r=1&_t=ZN-95cRMQBAdDW" target="_blank" style={{ color: '#999', transition: 'color 0.2s' }}>TikTok</a>
            <span>/</span>
            <a href="https://www.youtube.com/@deandev10" target="_blank" style={{ color: '#999', transition: 'color 0.2s' }}>YouTube</a>
            <span>/</span>
            <a href="https://github.com/DB0706" target="_blank" style={{ color: '#999', transition: 'color 0.2s' }}>GitHub</a>
          </div>

          <div style={{ display: 'flex', gap: '32px', marginBottom: '48px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '13px', color: '#666' }}>Scaled 0-40k users as a solo dev</p>
            </div>
            {(isLoading || githubData) && (
              <div>
                <p style={{ fontSize: '13px', color: '#666' }}>
                  {isLoading ? 'Loading...' : `${githubData?.totalContributions}+ commits (12mo)`}
                </p>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gap: '28px', marginTop: '-16px', marginBottom: '48px' }}>
            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#e5e5e5', marginBottom: '6px' }}>What you need to know before contracting me:</p>
              <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.7, margin: 0 }}>I sprint. Slowing me down is billable.</p>
            </div>

            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#e5e5e5', marginBottom: '6px' }}>What you need to give me:</p>
              <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.7, margin: 0 }}>
                A. A detailed list of every feature you want<br />
                B. Nothing<br />
                C. Something in between
              </p>
              <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.7, marginTop: '8px', marginBottom: 0 }}>Just give me whatever info or ideas you have. I&apos;ll run with it.</p>
              <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '16px', marginTop: '12px' }}>
                <p style={{ fontSize: '13px', color: '#999', fontStyle: 'italic', margin: 0 }}>&quot;Uber, but for dog walking.&quot;</p>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '8px', marginBottom: 0 }}>One line like this is a perfectly good starting point. A brief this size is now a full product in beta.</p>
              </div>
            </div>

            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#e5e5e5', marginBottom: '6px' }}>What I actually do:</p>
              <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.7, margin: 0 }}>I&apos;m a product engineer, not just a dev. Whatever tool gets the job done, I&apos;ll use it. I don&apos;t limit myself to one stack.</p>
            </div>

            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#e5e5e5', marginBottom: '6px' }}>For one-off builds / MVPs:</p>
              <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.7, margin: 0 }}>Tell me the end goal. I&apos;ll ship clean, working code, fast. You don&apos;t need to manage me, check in on me, or explain the &quot;why&quot; three times.</p>
            </div>

            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#e5e5e5', marginBottom: '6px' }}>For long-term / retainer contracts:</p>
              <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.7, margin: 0 }}>Tell me what your business looks like when it&apos;s successful. I&apos;ll make sure your product gets you there.</p>
            </div>

            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#e5e5e5', marginBottom: '6px' }}>I fit best with teams/founders who:</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '14px', color: '#999', lineHeight: 1.8 }}>
                <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#ff6b35' }}>•</span>Need an MVP to show proof of concept</li>
                <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#ff6b35' }}>•</span>Want expert clean up on an existing mess</li>
                <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#ff6b35' }}>•</span>Value speed and results over process and updates</li>
              </ul>
            </div>

            <div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#e5e5e5', marginBottom: '6px' }}>I&apos;m not the right fit if you:</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '14px', color: '#999', lineHeight: 1.8 }}>
                <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#ff6b35' }}>•</span>Need to micromanage sprints</li>
                <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#ff6b35' }}>•</span>Want me to sit in every meeting that doesn&apos;t concern me</li>
                <li style={{ display: 'flex', gap: '8px' }}><span style={{ color: '#ff6b35' }}>•</span>Often have to wait for opinions and approval from other people on your side</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Recent Activity */}
        {(isLoading || githubData) && (
        <section id="activity" style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#e5e5e5', marginBottom: '24px' }}>Recent activity</h2>

          {/* GitHub Contribution Graph */}
          <div className="contribution-wrapper" style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
            <div id="contributionGraph" style={{ display: 'flex', gap: '3px', overflowX: 'auto' }}>
              {/* Graph will be generated by JS */}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', gap: '6px', marginTop: '16px' }}>
              <span style={{ fontSize: '11px', color: '#666' }}>Less</span>
              <div className="contribution-day" data-level="0"></div>
              <div className="contribution-day" data-level="1"></div>
              <div className="contribution-day" data-level="2"></div>
              <div className="contribution-day" data-level="3"></div>
              <div className="contribution-day" data-level="4"></div>
              <span style={{ fontSize: '11px', color: '#666' }}>More</span>
            </div>
            <p style={{ fontSize: '13px', color: '#666', marginTop: '16px' }}>
              {isLoading ? 'Loading...' : `${githubData?.totalContributions || 0} contributions in the past year`}
            </p>
          </div>

          {/* Activity Feed */}
          <div style={{ display: 'grid', gap: '12px' }}>
            {isLoading ? (
              <div className="activity-item">
                <p style={{ fontSize: '14px', color: '#666' }}>Loading recent activity...</p>
              </div>
            ) : githubData && githubData.recentActivity.length > 0 && (
              githubData.recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#e5e5e5', fontWeight: 500 }}>{activity.repo}</span>
                    <span style={{ fontSize: '12px', color: '#666' }}>{activity.daysAgo}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#999' }}>{activity.message}</p>
                </div>
              ))
            )}
          </div>
        </section>
        )}

        {/* Skills */}
        <section id="skills" style={{ marginBottom: '120px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#e5e5e5', marginBottom: '24px' }}>Skills</h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {[
              {
                title: 'Full-Stack Product',
                proof: 'Shipped and scaled products solo from 0 to 40k+ users.',
                tags: ['TypeScript', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Prisma / Drizzle', 'Stripe', 'WebSockets', 'Tailwind CSS'],
              },
              {
                title: 'Mobile',
                proof: 'iOS apps from first commit to App Store and TestFlight beta.',
                tags: ['React Native', 'Expo', 'Swift', 'Kotlin', 'Push Notifications', 'Live Geolocation', 'App Store / Play Store'],
              },
              {
                title: 'Web3 & Smart Contracts',
                proof: 'Wallet infra, provably fair gaming, trading systems, and ZK cryptography in production.',
                tags: ['Solana', 'Anchor', 'Rust', 'EVM', 'Solidity', 'Wallet Integration', 'ZK-SNARKs', 'MEV / Trading Bots', 'Provably Fair Systems'],
              },
              {
                title: 'Systems & Infrastructure',
                proof: 'Led a team building a custom Android OS, kernel to launcher. Run all my own infra.',
                tags: ['AOSP', 'C / C++', 'Linux', 'AWS / GCP', 'Docker', 'CI/CD', 'Monitoring (Grafana / Sentry)'],
              },
              {
                title: 'Games & Engines',
                proof: 'Built a custom AI game engine powering 1.7M+ games played.',
                tags: ['Custom Engines', 'Unity', 'Godot', 'C#', 'Multiplayer Networking', 'Procedural Generation'],
              },
              {
                title: 'AI Engineering',
                proof: 'AI pipelines and agents in production products, not just autocomplete.',
                tags: ['Claude API', 'OpenAI API', 'Agent Workflows', 'MCP', 'RAG', 'Tool Use', 'Generation Pipelines'],
              },
            ].map((group) => (
              <div key={group.title} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#e5e5e5', margin: 0 }}>{group.title}</h3>
                </div>
                <p style={{ fontSize: '13px', color: '#ff6b35', marginBottom: '14px', marginTop: 0 }}>{group.proof}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {group.tags.map((skill) => (
                    <span key={skill} className="tool-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Current Focus */}
        <section id="focus" style={{ marginBottom: '120px' }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '16px' }}>CURRENT FOCUS</p>

          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#ff6b35', marginBottom: '12px' }}>MY PRODUCTS</p>
          <div style={{ display: 'grid', gap: '12px', marginBottom: '32px' }}>
            <Link href="/projects/slops" className="focus-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="status-growing" style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, letterSpacing: '0.5px' }}>BETA</span>
                <span style={{ color: '#333' }}>·</span>
                <span style={{ fontSize: '11px', color: '#666' }}>Gaming · Web3 · Provably Fair</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>SLOPS</h3>
              <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>Provably fair casino app in beta. Built solo end to end: game mechanics, fairness proofs, wallet integration, and go-to-market.</p>
            </Link>
          </div>

          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#ff6b35', marginBottom: '12px' }}>CLIENT WORK</p>
          <div style={{ display: 'grid', gap: '12px' }}>
            <Link href="/projects/influence-asap" className="focus-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="status-building" style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, letterSpacing: '0.5px' }}>BUILDING</span>
                <span style={{ color: '#333' }}>·</span>
                <span style={{ fontSize: '11px', color: '#666' }}>Web2 · Marketplace · Client Work</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>Influence ASAP</h3>
              <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>KOL-brand matchmaking service, built end to end as a web2 contract. Discovery, deal flow, and campaign management between brands and creators.</p>
            </Link>

            <Link href="/projects/myro-walk" className="focus-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="status-growing" style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, letterSpacing: '0.5px' }}>BETA · 85%</span>
                <span style={{ color: '#333' }}>·</span>
                <span style={{ fontSize: '11px', color: '#666' }}>Mobile · iOS · Client Work</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>MYRO Dog Walking App</h3>
              <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>Uber for dog walking, built for the MYRO meme coin community. On-demand matching, live tracking, and payments, now in beta testing.</p>
            </Link>
          </div>
        </section>

        {/* Content / Building in Public */}
        <section id="content" style={{ marginBottom: '120px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#e5e5e5', marginBottom: '12px' }}>Learn with Dev<sup style={{ fontSize: '14px' }}>10</sup></h2>
          <p style={{ fontSize: '15px', color: '#999', lineHeight: 1.7, marginBottom: '24px', maxWidth: '560px' }}>
            Educational content drawn from my own products: what I built, what worked, and what didn&apos;t. Teaching junior and new devs what correct infrastructure looks like and how to implement it. Client projects stay off camera.
          </p>

          <div className="focus-grid-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <a href="https://www.youtube.com/@deandev10" target="_blank" className="focus-card" style={{ textDecoration: 'none' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#ff6b35', marginBottom: '8px', fontWeight: 600 }}>YOUTUBE</p>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>@deandev10</h3>
              <p style={{ fontSize: '13px', color: '#999', lineHeight: 1.6 }}>The first-time founder series: long-form breakdowns of real builds, what worked, what didn&apos;t, and why.</p>
            </a>

            <a href="https://www.tiktok.com/@deandev10?_r=1&_t=ZN-95cRMQBAdDW" target="_blank" className="focus-card" style={{ textDecoration: 'none' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#ff6b35', marginBottom: '8px', fontWeight: 600 }}>TIKTOK</p>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>@deandev10</h3>
              <p style={{ fontSize: '13px', color: '#999', lineHeight: 1.6 }}>Short-form lessons from taking a product 0 to 40k users, made for junior and new devs.</p>
            </a>

            <a href="https://www.instagram.com/codewithdev10?igsh=MXJpbjZyNnJpdHdsNg%3D%3D&utm_source=qr" target="_blank" className="focus-card" style={{ textDecoration: 'none' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#ff6b35', marginBottom: '8px', fontWeight: 600 }}>INSTAGRAM</p>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>@codewithdev10</h3>
              <p style={{ fontSize: '13px', color: '#999', lineHeight: 1.6 }}>Real systems built from scratch: OS, apps, and infrastructure, showing what correct architecture looks like.</p>
            </a>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" style={{ marginBottom: '120px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#e5e5e5', marginBottom: '24px' }}>Projects</h2>

          {/* Active Projects */}
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '12px', marginTop: '32px' }}>ACTIVE</p>
          <div style={{ display: 'grid', gap: '12px', marginBottom: '32px' }}>
            <Link href="/projects/litmus" className="project-item" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>Litmus</h3>
                  <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>AI pre-audit tool covering smart contracts, databases, and payment flows. One clear verdict before you ship: Ready, Testnet only, or Not ready.</p>
                </div>
                <span className="project-badge-live" style={{ textDecoration: 'none' }}>ACTIVE</span>
              </div>
            </Link>

            <Link href="/projects/tg-line-bots" className="project-item" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>TG/Line Automation Bots</h3>
                  <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>TG/Line bots automating business operations for web2 clients. Payment processing, customer support, and custom workflows.</p>
                </div>
                <span className="project-badge-live" style={{ textDecoration: 'none' }}>ACTIVE</span>
              </div>
            </Link>
          </div>

          {/* MVP */}
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '12px' }}>MVP</p>
          <div style={{ display: 'grid', gap: '12px', marginBottom: '32px' }}>
            <Link href="/projects/nocturne" className="project-item" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>Nocturne</h3>
                  <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>iOS privacy wallet pushing boundaries with ZK-SNARKs, stealth addresses, TOR routing, and cross-chain bridges. React Native with hardware-backed security showcasing advanced cryptography.</p>
                </div>
                <span className="project-badge-repo" style={{ textDecoration: 'none' }}>MVP</span>
              </div>
            </Link>
          </div>

          {/* Past */}
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '12px' }}>PAST</p>
          <div style={{ display: 'grid', gap: '12px' }}>
            <Link href="/projects/scrolly" className="project-item" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>Scrolly</h3>
                  <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>Game publishing platform scaled from 0 to 40k+ users and 1.7M+ games played as a solo dev. Sunset in 2026.</p>
                </div>
                <span className="project-badge-repo" style={{ textDecoration: 'none' }}>SUNSET</span>
              </div>
            </Link>

            <Link href="/projects/trader-native-os" className="project-item" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>Trader-Native Mobile OS</h3>
                  <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>Led the development team building a custom Android OS for Web3 traders on native hardware (PumpOne). Engagement wrapped in 2026 to focus on shipping my own products.</p>
                </div>
                <span className="project-badge-repo" style={{ textDecoration: 'none' }}>PAST</span>
              </div>
            </Link>

            <Link href="/projects/ai-game-engine" className="project-item" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>AI Game Engine</h3>
                  <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>Custom AI game engine enabling rapid game creation, deployment, and publishing infrastructure with 3rd party client integrations. Sunset alongside Scrolly in 2026.</p>
                </div>
                <span className="project-badge-repo" style={{ textDecoration: 'none' }}>SUNSET</span>
              </div>
            </Link>

            <Link href="/projects/avax-ecosystem" className="project-item" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>Avax Ecosystem Infrastructure</h3>
                  <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>Full-stack ecosystem accelerator for Avalanche. Builder scores, funding pipelines, chain support coordination, and bilateral accountability metrics.</p>
                </div>
                <span className="project-badge-repo" style={{ textDecoration: 'none' }}>ARCHIVED</span>
              </div>
            </Link>
          </div>

          <a href="https://github.com/DB0706" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px', fontSize: '14px', color: '#999', textDecoration: 'none', transition: 'color 0.2s' }}>
            View GitHub
            <span>→</span>
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1a1a1a', padding: '32px 0' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '13px', color: '#666' }}>© 2026 Dean Ball</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontSize: '13px', color: '#999', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}>
              Back to top
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
