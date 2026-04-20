'use client';

import { useParams, useRouter } from 'next/navigation';
import { getProjectBySlug } from '@/lib/projects-data';
import { ArrowLeft, ExternalLink, Code, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projectImages = project?.images || (project?.image ? [project.image] : []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>404</h1>
          <p style={{ color: '#999', marginBottom: '24px' }}>Project not found</p>
          <button onClick={() => router.push('/')} style={{ padding: '12px 24px', background: '#ff6b35', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const statusColors = {
    active: '#ff6b35',
    'in-build': '#ff6b35',
    mvp: '#999',
  };

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

        @media (max-width: 768px) {
          main {
            padding: 40px 16px !important;
          }

          h1 {
            font-size: 28px !important;
          }

          .hero-image {
            height: 200px !important;
          }
        }
      `}</style>

      {/* Header */}
      <header style={{ borderBottom: '1px solid #1a1a1a', position: 'sticky', top: 0, background: 'rgba(10, 10, 10, 0.8)', backdropFilter: 'blur(12px)', zIndex: 50 }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <a href="/" style={{ fontSize: '13px', color: '#999', letterSpacing: '0.5px', textDecoration: 'none' }}>// Dean Dev<sup>10</sup></a>

            <button onClick={() => router.back()} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', color: '#e5e5e5', border: '1px solid #262626', cursor: 'pointer', transition: 'all 0.2s' }}>
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '680px', margin: '0 auto', padding: '80px 24px' }}>
        {/* Status Badge */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            padding: '6px 12px',
            borderRadius: '4px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            color: statusColors[project.status],
            background: `${statusColors[project.status]}1a`,
            border: `1px solid ${statusColors[project.status]}33`,
          }}>
            {project.status === 'in-build' ? 'IN BUILD' : project.status.toUpperCase()}
          </span>
        </div>

        {/* Title & Category */}
        <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#e5e5e5', marginBottom: '16px', lineHeight: 1.2 }}>
          {project.title}
        </h1>

        <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {project.category}
        </p>

        <p style={{ fontSize: '20px', color: '#999', lineHeight: 1.6, marginBottom: '48px' }}>
          {project.tagline}
        </p>

        {/* Links */}
        {(project.liveUrl || project.githubUrl || project.twitterUrl) && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ff6b35', color: 'white', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s' }}>
                <ExternalLink size={16} />
                Visit Live Site
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', color: '#e5e5e5', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', border: '1px solid #262626', textDecoration: 'none', transition: 'all 0.2s' }}>
                <Code size={16} />
                View Code
              </a>
            )}
            {project.twitterUrl && (
              <a href={project.twitterUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', color: '#e5e5e5', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', border: '1px solid #262626', textDecoration: 'none', transition: 'all 0.2s' }}>
                <Share2 size={16} />
                Follow Updates
              </a>
            )}
          </div>
        )}

        {/* Hero Image Carousel */}
        {projectImages.length > 0 && (
          <div className="hero-image" style={{ width: '100%', minHeight: '400px', background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '12px', marginBottom: '48px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
              <Image
                src={projectImages[currentImageIndex]}
                alt={`${project.title} preview ${currentImageIndex + 1}`}
                width={680}
                height={400}
                style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }}
                priority
              />
            </div>

            {/* Navigation Arrows */}
            {projectImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid #262626',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#e5e5e5',
                    transition: 'all 0.2s',
                    zIndex: 10,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                  }}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid #262626',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#e5e5e5',
                    transition: 'all 0.2s',
                    zIndex: 10,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                  }}
                >
                  <ChevronRight size={24} />
                </button>

                {/* Dots Indicator */}
                <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
                  {projectImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: index === currentImageIndex ? '#ff6b35' : '#666',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Stats */}
        {project.stats && project.stats.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '48px', padding: '24px', background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '12px' }}>
            {project.stats.map((stat, index) => (
              <div key={index}>
                <p style={{ fontSize: '28px', fontWeight: 700, color: '#ff6b35', marginBottom: '4px' }}>{stat.value}</p>
                <p style={{ fontSize: '13px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Full Description */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#e5e5e5', marginBottom: '24px' }}>Overview</h2>
          {project.fullDescription.map((paragraph, index) => (
            <p key={index} style={{ fontSize: '16px', color: '#999', lineHeight: 1.8, marginBottom: '16px' }}>
              {paragraph}
            </p>
          ))}
        </section>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#e5e5e5', marginBottom: '24px' }}>Key Features</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {project.features.map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'start', gap: '12px', padding: '16px', background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '8px' }}>
                  <span style={{ color: '#ff6b35', fontSize: '20px', lineHeight: 1 }}>•</span>
                  <p style={{ fontSize: '15px', color: '#e5e5e5', margin: 0 }}>{feature}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#e5e5e5', marginBottom: '24px' }}>Tech Stack</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {project.tech.map((tech, index) => (
              <span key={index} style={{ padding: '8px 16px', background: '#1a1a1a', border: '1px solid #262626', borderRadius: '6px', fontSize: '14px', color: '#e5e5e5' }}>
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Back Button */}
        <div style={{ paddingTop: '48px', borderTop: '1px solid #1a1a1a' }}>
          <button onClick={() => router.back()} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#999', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}>
            <ArrowLeft size={16} />
            Back to projects
          </button>
        </div>
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
