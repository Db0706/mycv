export type Project = {
  slug: string;
  title: string;
  category: string;
  status: 'active' | 'in-build' | 'mvp';
  tagline: string;
  description: string;
  fullDescription: string[];
  image: string;
  images?: string[];
  tech: string[];
  features: string[];
  stats?: {
    label: string;
    value: string;
  }[];
  liveUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
};

export const projectsData: Project[] = [
  {
    slug: 'scrolly',
    title: 'Scrolly',
    category: 'AI · Agents',
    status: 'active',
    tagline: 'Platform empowering anyone to become a game publisher',
    description: 'Full-stack development from 0 to 40k+ users with custom game engine, tournament infrastructure, and B2B dashboard.',
    fullDescription: [
      'Scrolly is a hackathon-winning full-stack platform built in 8 weeks with my first deep dive into next.js and typescript. Scaled to 1.7M+ games played and 40k+ users with no retention gimmicks.',
      'Now building custom AI game engine, tournament systems, payment infrastructure, and B2B developer dashboard to handle AI generation pipelines.',
      'The platform enables anyone to become a game publisher with automated game creation, deployment, and publishing infrastructure powered by AI.',
    ],
    image: '/scrolly-preview.png',
    images: [
      '/scrolly-screenshot-1.png',
      '/scrolly-screenshot-2.png',
      '/scrolly-screenshot-3.png',
      '/scrolly-screenshot-4.png',
      '/scrolly-screenshot-5.png',
      '/scrolly-screenshot-6.png',
      '/scrolly-screenshot-7.png',
      '/scrolly-screenshot-8.png',
      '/scrolly-screenshot-9.png',
      '/scrolly-screenshot-10.png',
    ],
    tech: [
      'Apps: Next.js 16, React 18, TypeScript, Capacitor, Solana Web3.js, Viem, Firebase, Prisma, Better Auth, Socket.io, Material-UI, Tailwind CSS',
      'Backend: Bun, Hono, PostgreSQL, Drizzle ORM, Redis, BullMQ, Solana Kit, Viem, AWS S3, Sentry, Better Auth',
      'Dashboard: Next.js 15, React 19, TypeScript, OpenAI GPT-4, Solana Pay, Better SQLite3, Recharts, Tailwind CSS',
      'AI Engine: Python 3, Flask, Gunicorn, Custom NLP, SVG Generation, Custom AI Plugin',
      'Infrastructure: Firebase, AWS S3, PostgreSQL, Redis, Solana, Arbitrum, Railway, Vercel',
    ],
    features: [
      'Custom AI game engine for rapid game creation',
      'Tournament infrastructure handling concurrent players',
      'Payment processing and monetisation systems',
      'B2B developer dashboard for game publishers',
      'Real-time game feed management',
      'Scalable database architecture',
      'Automated deployment pipeline',
    ],
    stats: [
      { label: 'Games Played', value: '1.7M+' },
      { label: 'Active Users', value: '40k+' },
      { label: 'Development Time', value: '8 weeks' },
      { label: 'Marketing Budget', value: '$1000' },
    ],
    liveUrl: 'https://scrolly.games',
  },
  {
    slug: 'tg-line-bots',
    title: 'TG/Line Automation Bots',
    category: 'Automation · Web2',
    status: 'active',
    tagline: 'Business automation for web2 clients',
    description: 'TG/Line bots automating business operations for web2 clients. Payment processing, customer support, and custom workflows.',
    fullDescription: [
      'Enterprise-grade Telegram and Line messaging bots built to automate complex business operations for web2 clients.',
      'Handles payment processing, customer support automation, and custom workflow orchestration at scale.',
      'Built with reliability and security as core principles, serving multiple business clients with 24/7 uptime.',
    ],
    image: '',
    tech: ['Node.js', 'TypeScript', 'Telegram Bot API', 'Line Messaging API', 'PostgreSQL', 'Redis', 'Stripe'],
    features: [
      'Automated payment processing and invoicing',
      'AI-powered customer support responses',
      'Custom workflow automation',
      'Multi-language support',
      'Real-time notification systems',
      'Analytics and reporting dashboards',
      'Secure data handling and encryption',
      'Scalable architecture for high volume',
    ],
  },
  {
    slug: 'ai-smart-contract-auditor',
    title: 'AI Smart Contract Audit Platform',
    category: 'Web3 · AI',
    status: 'active',
    tagline: 'Automated smart contract audits powered by AI',
    description: 'Automated smart contract audits for teams pre-funding. AI-powered confidence scoring and risk assessment to safely ship to beta testing.',
    fullDescription: [
      'AI-powered SaaS platform providing automated smart contract audits for blockchain teams before they secure funding.',
      'Uses advanced AI models to analyze smart contract code, identify vulnerabilities, and provide confidence scoring for risk assessment.',
      'Enables teams to safely ship to beta testing with comprehensive security reports and actionable recommendations.',
    ],
    image: '/audit-platform-preview.png',
    images: [
      '/ai-auditor-screenshots/Image 16-04-2026 at 04.51.PNG',
      '/ai-auditor-screenshots/Image 16-04-2026 at 04.52.PNG',
      '/ai-auditor-screenshots/Image 16-04-2026 at 04.57.PNG',
    ],
    tech: ['Python', 'TypeScript', 'Next.js', 'OpenAI API', 'Solidity', 'Rust', 'PostgreSQL', 'AWS'],
    features: [
      'Automated vulnerability detection',
      'AI-powered confidence scoring',
      'Comprehensive risk assessment reports',
      'Multi-chain support (Solana, Ethereum, etc.)',
      'Real-time code analysis',
      'Security best practices recommendations',
      'Continuous monitoring and alerts',
      'Team collaboration features',
    ],
  },
  {
    slug: 'ai-game-engine',
    title: 'AI Game Engine',
    category: 'AI · Gaming',
    status: 'active',
    tagline: 'Custom AI game engine powering Scrolly',
    description: 'Standalone product enabling rapid game creation, deployment, and publishing infrastructure with 3rd party client integrations.',
    fullDescription: [
      'Custom-built AI game engine that powers Scrolly and is available as a standalone product for 3rd party clients.',
      'Enables rapid game creation through AI-driven generation, automated deployment pipelines, and complete publishing infrastructure.',
      'Designed for scalability and flexibility, supporting multiple game types and integration patterns.',
    ],
    image: '/game-engine-preview.png',
    tech: ['TypeScript', 'Node.js', 'WebGL', 'Canvas API', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    features: [
      'AI-driven game generation',
      'Real-time multiplayer support',
      'Automated deployment pipelines',
      '3rd party client SDK',
      'Custom game logic scripting',
      'Asset management system',
      'Performance optimization tools',
      'Analytics and metrics tracking',
    ],
  },
  {
    slug: 'avax-ecosystem',
    title: 'Avax Ecosystem Infrastructure',
    category: 'Web3 · Infrastructure',
    status: 'in-build',
    tagline: 'Full-stack ecosystem accelerator for Avalanche',
    description: 'Tracking builder scores, funding pipelines, chain support coordination, and bilateral accountability metrics. Ops platform connecting developers with resources.',
    fullDescription: [
      'Comprehensive ecosystem infrastructure platform built for the Avalanche blockchain community.',
      'Tracks builder scores, manages funding pipelines, coordinates chain support, and measures bilateral accountability across the ecosystem.',
      'Serves as an operations platform connecting developers with resources, grants, and support to accelerate ecosystem growth.',
    ],
    image: '/avax-ecosystem-preview.png',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'GraphQL', 'Avalanche SDK', 'AWS', 'Docker'],
    features: [
      'Builder reputation and scoring system',
      'Funding pipeline management',
      'Chain support coordination tools',
      'Accountability metrics tracking',
      'Developer resource hub',
      'Grant application system',
      'Community collaboration features',
      'Analytics and insights dashboard',
    ],
  },
  {
    slug: 'nocturne',
    title: 'Nocturne',
    category: 'Privacy · Web3',
    status: 'mvp',
    tagline: 'iOS privacy wallet pushing boundaries',
    description: 'iOS privacy wallet pushing boundaries with ZK-SNARKs, stealth addresses, TOR routing, and cross-chain bridges. React Native with hardware-backed security showcasing advanced cryptography.',
    fullDescription: [
      'Enterprise-grade iOS privacy wallet architected from scratch with cutting-edge cryptography and security features.',
      'Implemented ZK-SNARK compression for 90% cheaper transactions, stealth addresses for privacy, TOR routing for anonymity, and cross-chain bridge functionality for Solana/Midnight.',
      'Built with hardware-backed key storage, biometric authentication systems, and encrypted messaging using Signal Protocol.',
    ],
    image: '/nocturne-preview.png',
    tech: ['React Native', 'TypeScript', 'iOS', 'ZK-SNARKs', 'TOR', 'Signal Protocol', 'Cryptography', 'Hardware Security'],
    features: [
      'ZK-SNARK transaction compression (90% cheaper)',
      'Stealth addresses for privacy',
      'TOR routing for anonymity',
      'Cross-chain bridges (Solana/Midnight)',
      'Hardware-backed key storage',
      'Biometric authentication',
      'End-to-end encrypted messaging',
      'Multi-signature wallet support',
    ],
    stats: [
      { label: 'Transaction Cost Reduction', value: '90%' },
      { label: 'Security Level', value: 'Enterprise' },
      { label: 'Privacy Protocol', value: 'ZK-SNARKs' },
    ],
    twitterUrl: 'https://x.com/nocturnewallet',
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectsData.map((project) => project.slug);
}
