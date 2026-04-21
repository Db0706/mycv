'use client';

import { LimelightNav } from '@/components/ui/limelight-nav';
import { Home, Folder, Code2, Activity, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchGitHubContributions, type GitHubStats } from '@/lib/github';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState(0);
  const [githubData, setGithubData] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navItems = [
    { id: 'focus', icon: <Home />, label: 'Focus', onClick: () => scrollToSection('focus') },
    { id: 'projects', icon: <Folder />, label: 'Projects', onClick: () => scrollToSection('projects') },
    { id: 'skills', icon: <Code2 />, label: 'Skills', onClick: () => scrollToSection('skills') },
    { id: 'activity', icon: <Activity />, label: 'Activity', onClick: () => scrollToSection('activity') },
    { id: 'contact', icon: <Mail />, label: 'Contact', onClick: () => window.open('https://t.me/deandev10', '_blank') },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    // Fetch live GitHub data
    const loadGitHubData = async () => {
      setIsLoading(true);
      const data = await fetchGitHubContributions();
      setGithubData(data);
      setIsLoading(false);
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

        .mobile-nav-wrapper {
          display: none;
          visibility: hidden;
          opacity: 0;
          pointer-events: none;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          * {
            max-width: 100vw;
          }

          main {
            padding: 40px 16px 100px 16px !important;
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
            display: none !important;
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

          .mobile-nav-wrapper {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            pointer-events: all !important;
            justify-content: center !important;
            align-items: center !important;
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100vw !important;
            max-width: 100vw !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            padding-bottom: env(safe-area-inset-bottom, 0) !important;
            background: #000000 !important;
            backdrop-filter: blur(12px) !important;
            -webkit-backdrop-filter: blur(12px) !important;
            border-top: 1px solid #1a1a1a !important;
            z-index: 10000 !important;
            transform: translate3d(0, 0, 0) !important;
            -webkit-transform: translate3d(0, 0, 0) !important;
            will-change: transform !important;
            backface-visibility: hidden !important;
            -webkit-backface-visibility: hidden !important;
            box-sizing: border-box !important;
          }

          .mobile-nav-wrapper nav {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 0 !important;
            border-left: none !important;
            border-right: none !important;
            border-bottom: none !important;
            margin: 0 !important;
            padding: 12px 0 !important;
          }

          footer {
            padding-bottom: 100px !important;
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

        @media (min-width: 769px) {
          .mobile-nav-wrapper {
            display: none !important;
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

      {/* Mobile Navigation with LimelightNav */}
      <div className="mobile-nav-wrapper">
        <LimelightNav
          items={navItems}
          defaultActiveIndex={0}
          onTabChange={(index) => setActiveSection(index)}
          className="bg-black border-none text-white w-full rounded-none"
          iconClassName="text-white"
        />
      </div>

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
            Senior Full-Stack Developer. Product architect. Smart-contracts & dev tooling. AI-accelerated: crafts and ships faster than most teams can scope.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', fontSize: '13px', color: '#666' }}>
            <a href="https://twitter.com/deandev10" target="_blank" style={{ color: '#999', transition: 'color 0.2s' }}>X</a>
            <span>/</span>
            <a href="https://www.instagram.com/codewithdev10?igsh=MXJpbjZyNnJpdHdsNg%3D%3D&utm_source=qr" target="_blank" style={{ color: '#999', transition: 'color 0.2s' }}>Instagram</a>
            <span>/</span>
            <a href="https://www.tiktok.com/@deandev10?_r=1&_t=ZN-95cRMQBAdDW" target="_blank" style={{ color: '#999', transition: 'color 0.2s' }}>TikTok</a>
            <span>/</span>
            <a href="https://github.com/DB0706" target="_blank" style={{ color: '#999', transition: 'color 0.2s' }}>GitHub</a>
          </div>

          <div style={{ display: 'flex', gap: '32px', marginBottom: '48px' }}>
            <div>
              <p style={{ fontSize: '13px', color: '#666' }}>Scaled apps from 0 to 40k+ users as a solo dev</p>
            </div>
            <div>
              <p style={{ fontSize: '13px', color: '#666' }}>
                {isLoading ? 'Loading...' : `${githubData?.totalContributions || 0}+ commits (12mo)`}
              </p>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section id="activity" style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#e5e5e5', marginBottom: '8px' }}>Recent activity</h2>
          <p style={{ fontSize: '15px', color: '#999', marginBottom: '24px' }}>Latest pushes across my public and private repos.</p>

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

        {/* Skills */}
        <section id="skills" style={{ marginBottom: '120px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#e5e5e5', marginBottom: '8px' }}>Skills</h2>
          <p style={{ fontSize: '15px', color: '#999', marginBottom: '24px' }}>Technologies and tools I work with.</p>

          <div style={{ display: 'grid', gap: '16px' }}>
            {/* Languages */}
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '20px' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '16px' }}>LANGUAGES</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['TypeScript', 'JavaScript', 'Rust', 'Python', 'C++', 'Solidity'].map((skill) => (
                  <span key={skill} className="tool-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* Frontend */}
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '20px' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '16px' }}>FRONTEND</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['React', 'Next.js', 'Tailwind CSS', 'CSS/SCSS', 'HTML5'].map((skill) => (
                  <span key={skill} className="tool-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* Mobile */}
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '20px' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '16px' }}>MOBILE</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['React Native', 'Expo', 'iOS Development', 'Android Development'].map((skill) => (
                  <span key={skill} className="tool-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '20px' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '16px' }}>BACKEND</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Node.js', 'Express', 'REST APIs', 'GraphQL', 'WebSockets'].map((skill) => (
                  <span key={skill} className="tool-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* Database */}
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '20px' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '16px' }}>DATABASE</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'].map((skill) => (
                  <span key={skill} className="tool-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* Web3 & Blockchain */}
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '20px' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '16px' }}>WEB3 & BLOCKCHAIN</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Anchor Framework', 'Web3.js', 'Smart Contracts', 'Wallet Integration', 'ZK-SNARKs'].map((skill) => (
                  <span key={skill} className="tool-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* DevOps & Tools */}
            <div style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '20px' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '16px' }}>DEVOPS & TOOLS</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Git & GitHub', 'Docker', 'AWS', 'Vercel'].map((skill) => (
                  <span key={skill} className="tool-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Current Focus */}
        <section id="focus" style={{ marginBottom: '120px' }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '16px' }}>CURRENT FOCUS</p>

          <div style={{ display: 'grid', gap: '12px' }}>
            <Link href="/projects/trader-native-os" className="focus-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="status-building" style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, letterSpacing: '0.5px' }}>BUILDING</span>
                <span style={{ color: '#333' }}>·</span>
                <span style={{ fontSize: '11px', color: '#666' }}>Mobile OS · Web3 · Infrastructure</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>Trader-Native Mobile OS</h3>
              <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>Leading development team building custom Android OS for Web3 traders on native hardware. Currently called PumpOne.</p>
            </Link>

            <Link href="/projects/scrolly" className="focus-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="status-growing" style={{ fontSize: '10px', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '4px', fontWeight: 600, letterSpacing: '0.5px' }}>GROWING</span>
                <span style={{ color: '#333' }}>·</span>
                <span style={{ fontSize: '11px', color: '#666' }}>AI · Publishing · Infrastructure</span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>Scrolly</h3>
              <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>Platform empowering anyone to become a game publisher. Full-stack development from 0 to 40k+ users with custom game engine, tournament infrastructure, and B2B dashboard. Next.js, TypeScript, PostgreSQL.</p>
            </Link>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" style={{ marginBottom: '120px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#e5e5e5', marginBottom: '8px' }}>Projects</h2>
          <p style={{ fontSize: '15px', color: '#999', marginBottom: '24px' }}>Portfolio of built products and platforms.</p>

          {/* Active Projects */}
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '12px', marginTop: '32px' }}>ACTIVE</p>
          <div style={{ display: 'grid', gap: '12px', marginBottom: '32px' }}>
            <Link href="/projects/ai-smart-contract-auditor" className="project-item" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>AI Smart Contract Audit Platform</h3>
                  <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>Automated smart contract audits for teams pre-funding. AI-powered confidence scoring and risk assessment to safely ship to beta testing.</p>
                </div>
                <span className="project-badge-live" style={{ textDecoration: 'none' }}>ACTIVE</span>
              </div>
            </Link>

            <Link href="/projects/ai-game-engine" className="project-item" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>AI Game Engine</h3>
                  <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>Custom AI game engine powering Scrolly with 3rd party client integrations. Standalone product enabling rapid game creation, deployment, and publishing infrastructure.</p>
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

          {/* In Build */}
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '12px' }}>IN BUILD</p>
          <div style={{ display: 'grid', gap: '12px', marginBottom: '32px' }}>
            <Link href="/projects/avax-ecosystem" className="project-item" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#e5e5e5', marginBottom: '8px' }}>Avax Ecosystem Infrastructure</h3>
                  <p style={{ fontSize: '14px', color: '#999', lineHeight: 1.6 }}>Full-stack ecosystem accelerator for Avalanche. Tracking builder scores, funding pipelines, chain support coordination, and bilateral accountability metrics. Ops platform connecting developers with resources.</p>
                </div>
                <span className="project-badge-repo" style={{ textDecoration: 'none' }}>IN BUILD</span>
              </div>
            </Link>
          </div>

          {/* MVP */}
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '12px' }}>MVP</p>
          <div style={{ display: 'grid', gap: '12px' }}>
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
