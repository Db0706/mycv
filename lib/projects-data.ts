export type Project = {
  slug: string;
  title: string;
  category: string;
  status: 'active' | 'in-build' | 'mvp' | 'beta' | 'sunset' | 'past' | 'archived';
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
    slug: 'slops',
    title: 'SLOPS',
    category: 'Gaming · Web3 · Provably Fair',
    status: 'beta',
    tagline: 'Provably fair casino app, built solo from the ground up',
    description: 'Provably fair casino app currently in beta. Built solo end to end: game mechanics, fairness proofs, wallet integration, and go-to-market.',
    fullDescription: [
      'SLOPS is a provably fair casino app currently in beta, built solo from a blank repo with product, engineering, and go-to-market all owned end to end.',
      'The product is designed around tight engagement loops, monetisation from day one, and a marketing-first launch strategy.',
      'Every game outcome is cryptographically verifiable, so players can independently prove each result is fair. Trust is built into the product rather than promised by it.',
    ],
    image: '',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Solana', 'Provably Fair (commit-reveal)', 'Wallet Integration'],
    features: [
      'Provably fair game outcomes players can verify themselves',
      'Real-time gameplay and live feeds',
      'Wallet integration and instant settlement',
      'Engagement and retention loops designed in from day one',
      'Monetisation built into the core product',
      'Marketing-first go-to-market',
    ],
  },
  {
    slug: 'influence-asap',
    title: 'Influence ASAP',
    category: 'Web2 · Marketplace · Client Work',
    status: 'active',
    tagline: 'KOL-brand matchmaking platform, built end to end as contract work',
    description: 'Contract build of a matchmaking service connecting KOLs and influencers with brands. Owning full-stack development end to end.',
    fullDescription: [
      'Influence ASAP is a web2 matchmaking platform connecting brands with KOLs and influencers for sponsored campaigns.',
      'I am the contract engineer on the build, owning the product end to end, from data model and matching logic through to the client-facing dashboards.',
      'The platform streamlines discovery, outreach, and deal flow between brands and creators into a single service.',
    ],
    image: '',
    tech: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Stripe', 'Tailwind CSS'],
    features: [
      'Brand and KOL matchmaking engine',
      'Creator discovery and profile system',
      'Campaign and deal-flow management',
      'Client-facing dashboards and reporting',
      'Payments and invoicing',
      'Full-stack build owned end to end',
    ],
  },
  {
    slug: 'myro-walk',
    title: 'MYRO Dog Walking App',
    category: 'Mobile · iOS · Client Work',
    status: 'beta',
    tagline: 'Uber for dog walking, built for the MYRO community',
    description: 'On-demand dog walking iOS app for the MYRO meme coin community, with Uber-style matching between owners and walkers. In beta testing, ~85% complete.',
    fullDescription: [
      'An iOS app built for the MYRO meme coin community: on-demand dog walking with Uber-style matching between dog owners and nearby walkers.',
      'Owners request a walk, walkers accept, and the app handles live tracking, scheduling, and payment, all wrapped in the MYRO brand.',
      'Currently around 85% complete and in beta testing with the community.',
    ],
    image: '',
    tech: ['React Native', 'Expo', 'TypeScript', 'iOS', 'Geolocation / Live Tracking', 'Push Notifications', 'Solana'],
    features: [
      'Uber-style matching of owners and walkers',
      'Live GPS walk tracking',
      'Scheduling and on-demand requests',
      'In-app payments',
      'Push notifications for walk updates',
      'Built for the MYRO community and brand',
    ],
    stats: [
      { label: 'Completion', value: '85%' },
      { label: 'Stage', value: 'Beta' },
    ],
  },
  {
    slug: 'scrolly',
    title: 'Scrolly',
    category: 'AI · Publishing · Infrastructure',
    status: 'sunset',
    tagline: 'Game publishing platform scaled to 40k+ users, now sunset',
    description: 'Full-stack platform scaled from 0 to 40k+ users and 1.7M+ games played as a solo dev. Sunset in 2026.',
    fullDescription: [
      'Scrolly is a hackathon-winning full-stack platform V1 built in 8 weeks with my first deep dive into next.js and typescript. Scaled to 1.7M+ games played and 40k+ users with no retention gimmicks.',
      'Along the way I built a custom AI game engine, tournament systems, payment infrastructure, and a B2B developer dashboard to handle AI generation pipelines.',
      'Scrolly was sunset in 2026.',
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
    slug: 'trader-native-os',
    title: 'Trader-Native Mobile OS',
    category: 'Mobile OS · Web3 · Infrastructure',
    status: 'past',
    tagline: 'Led the team building a trader-native Android OS (PumpOne)',
    description: 'Led the development team building a custom Android OS for Web3 traders on native hardware, under the PumpOne brand. Engagement wrapped in 2026 to focus on shipping my own products.',
    fullDescription: [
      'I led the development team building a trader-native Android operating system designed from the ground up for Web3 trading on native hardware, operating under the PumpOne brand.',
      'Custom OS architecture optimized for real-time trading, portfolio management, and blockchain interactions, from AOSP and kernel work up to a custom launcher and trading UI framework.',
      'In 2026 I wrapped up my engagement with the project to focus full-time on shipping my own products.',
    ],
    image: '/trader-os-preview.png',
    images: [
      '/trader-os-screenshots/IMG_5952.png',
      '/trader-os-screenshots/IMG_5953.png',
    ],
    tech: [
      'OS Layer: AOSP, Linux Kernel, BSP Integration, Device Drivers, HAL (Hardware Abstraction Layer)',
      'System Services: SystemServer, Binder IPC, SELinux, Init Scripts, Native Daemons',
      'Framework: Android Framework (Java/Kotlin), System UI, Window Manager, Activity Manager',
      'Native Layer: C/C++, JNI, NDK, Bionic libc, Native Libraries',
      'Build System: Soong, Make, Blueprint, Custom Build Scripts',
      'Apps Layer: React Native, TypeScript, Kotlin, Custom Launcher, Trading UI Framework',
      'Web3 Integration: Solana SDK, Web3.js, Wallet Core, Hardware Security Module',
      'Tools: ADB, Fastboot, Repo, Git, QEMU, Custom Debugging Tools',
    ],
    features: [
      'Custom Android OS built for traders',
      'Hardware-level trading optimizations',
      'Native blockchain integration',
      'Real-time portfolio management',
      'Custom launcher and UI framework',
      'Secure wallet integration',
      'Performance-optimized for trading apps',
      'Team leadership and architecture',
    ],
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
    slug: 'litmus',
    title: 'Litmus',
    category: 'AI · Security · SaaS',
    status: 'active',
    tagline: 'Full-stack AI pre-audit for apps and dApps',
    description: 'AI pre-audit tool covering smart contracts, databases, and payment flows. One clear verdict before you ship: Ready, Testnet only, or Not ready.',
    fullDescription: [
      'Litmus is an AI pre-audit platform for modern apps and dApps, covering smart contracts (Solidity, Solana, Move), databases, and Stripe payment flows from one tool.',
      'Every finding is cross-checked by two independent AI engines across three passes (critical bugs, logic flaws, and attack vectors), then reconciled into a single verdict: Ready, Testnet only, or Not ready.',
      'Teams connect a repo or upload files and get a founder-readable PDF report in minutes, with severity scores, exploit scenarios, and a prioritized fix plan. A second opinion before you ship, not a replacement for a formal audit.',
    ],
    image: '/audit-platform-preview.png',
    images: [
      '/ai-auditor-screenshots/Image 16-04-2026 at 04.51.PNG',
      '/ai-auditor-screenshots/Image 16-04-2026 at 04.52.PNG',
      '/ai-auditor-screenshots/Image 16-04-2026 at 04.57.PNG',
    ],
    tech: ['Python', 'TypeScript', 'Next.js', 'AI Engines (Claude / OpenAI)', 'Solidity', 'Rust', 'PostgreSQL', 'Stripe', 'AWS'],
    features: [
      'Findings cross-checked by two independent AI engines',
      'Three review passes: critical bugs, logic flaws, attack vectors',
      'One clear verdict: Ready, Testnet only, or Not ready',
      'Smart contracts across Solidity, Solana, and Move',
      'Database and payment-flow auditing',
      'Founder-readable PDF reports with prioritized fix plans',
      'Transparent, explainable 0-100 scoring',
      'GitHub repo import or direct file upload',
    ],
    liveUrl: 'https://www.litmusaudit.xyz/',
  },
  {
    slug: 'ai-game-engine',
    title: 'AI Game Engine',
    category: 'AI · Gaming',
    status: 'sunset',
    tagline: 'Custom AI game engine built for Scrolly, sunset alongside it',
    description: 'Custom AI game engine enabling rapid game creation, deployment, and publishing infrastructure with 3rd party client integrations. Sunset alongside Scrolly in 2026.',
    fullDescription: [
      'Custom-built AI game engine created to power Scrolly, with integrations for 3rd party clients.',
      'Enabled rapid game creation through AI-driven generation, automated deployment pipelines, and complete publishing infrastructure.',
      'Designed for scalability and flexibility, supporting multiple game types and integration patterns. Sunset alongside Scrolly in 2026.',
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
    status: 'archived',
    tagline: 'Full-stack ecosystem accelerator for Avalanche',
    description: 'Tracking builder scores, funding pipelines, chain support coordination, and bilateral accountability metrics. Ops platform connecting developers with resources.',
    fullDescription: [
      'Comprehensive ecosystem infrastructure platform built for the Avalanche blockchain community.',
      'Tracks builder scores, manages funding pipelines, coordinates chain support, and measures bilateral accountability across the ecosystem.',
      'Serves as an operations platform connecting developers with resources, grants, and support to accelerate ecosystem growth.',
    ],
    image: '/avax-ecosystem-preview.png',
    images: [
      '/avax-ecosystem-screenshots/1.png',
      '/avax-ecosystem-screenshots/2.png',
      '/avax-ecosystem-screenshots/3.jpg',
    ],
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
