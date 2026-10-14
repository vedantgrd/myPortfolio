export interface SkillCategory {
  title: string
  description: string
  color: string
  items: {
    name: string
    context: string
    relatedProjectSlug?: string
    relatedProjectTitle?: string
  }[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages & Core Systems',
    description: 'Foundational programming languages used for systems programming, backend architectures, and algorithmic scripting.',
    color: '#e1523d',
    items: [
      { name: 'TypeScript / JavaScript', context: 'Primary language for modern web applications, Next.js, and client-side simulation engines.', relatedProjectSlug: 'vidyut', relatedProjectTitle: 'Vidyut' },
      { name: 'Python', context: 'Used for discrete-event supply chain modeling, Pygame engine development, and crop analysis scripts.', relatedProjectSlug: 'bullwhip-ai', relatedProjectTitle: 'Bullwhip AI' },
      { name: 'Java', context: 'Applied during native Android mobile development for drone ground control telemetry.', relatedProjectSlug: 'agridrone', relatedProjectTitle: 'Agriculture Drone' },
      { name: 'SQL', context: 'Relational data modeling, index optimization, and complex queries across PostgreSQL & MySQL.', relatedProjectSlug: 'vidyut', relatedProjectTitle: 'Vidyut' },
      { name: 'PHP', context: 'Full-stack event discovery platform and administrative management portal.', relatedProjectSlug: 'devsprint', relatedProjectTitle: 'DevSprint' },
    ],
  },
  {
    title: 'Frontend & Visual Engineering',
    description: 'Architectures for high-density interfaces, editorial typography, accessible state, and interactive data visualization.',
    color: '#3b68ff',
    items: [
      { name: 'Next.js 16 (App Router)', context: 'Production web framework for high-performance editorial websites and applications.', relatedProjectSlug: 'vidyut', relatedProjectTitle: 'Vidyut' },
      { name: 'React 19', context: 'Component-driven UI, state management, and custom interactive simulation hooks.', relatedProjectSlug: 'bullwhip-ai', relatedProjectTitle: 'Bullwhip AI' },
      { name: 'Tailwind CSS 4', context: 'Custom design tokens, responsive editorial layouts, and tactile aesthetic systems.', relatedProjectSlug: 'vidyut', relatedProjectTitle: 'Vidyut' },
      { name: 'Framer Motion', context: 'Restrained physics-based UI transitions, scroll-linked progress, and element choreography.' },
      { name: 'Recharts & Custom SVG', context: 'Interactive data visualization, supply chain oscillation charts, and frequency analysis histograms.', relatedProjectSlug: 'bullwhip-ai', relatedProjectTitle: 'Bullwhip AI' },
    ],
  },
  {
    title: 'Backend, APIs & Cloud',
    description: 'Enterprise backend patterns, microservice coordination, and data persistence.',
    color: '#10b981',
    items: [
      { name: 'FastAPI / Node.js', context: 'RESTful microservices, criteria matching endpoints, and JSON schema validation.' },
      { name: 'PostgreSQL / MySQL', context: 'Normalized database design, foreign key constraints, and indexing for low-latency queries.', relatedProjectSlug: 'devsprint', relatedProjectTitle: 'DevSprint' },
      { name: 'API Debugging & Optimization', context: 'Enterprise endpoint tracing, connection pooling, and performance auditing during VFS Global internship.' },
      { name: 'Authentication & Security', context: 'Role-based access control, token signing, and session management.' },
    ],
  },
  {
    title: 'Hardware, Security & Forensics',
    description: 'Specialization areas spanning physical IoT integration, avionics, and cryptographic analysis.',
    color: '#f59e0b',
    items: [
      { name: 'Hardware-Software Integration', context: 'Telemetry radio bridges, motor ESCs, IMU vibration dampening, and flight controller avionics.', relatedProjectSlug: 'agridrone', relatedProjectTitle: 'Agriculture Drone' },
      { name: 'Applied Cryptography', context: 'Classical cipher cryptanalysis, entropy calculation, and avalanche effect demonstrations.', relatedProjectSlug: 'cipherlab', relatedProjectTitle: 'CipherLab' },
      { name: 'Data Forensics & InfoSec', context: 'Academic specialization focus at Pillai College of Engineering covering secure system design and forensic inspection.' },
      { name: 'Native Android Ground Station', context: 'Serial telemetry monitoring, GPS tracking, and real-time flight HUD.', relatedProjectSlug: 'agridrone', relatedProjectTitle: 'Agriculture Drone' },
    ],
  },
]
