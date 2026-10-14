export interface ArchiveEntry {
  id: string
  year: number
  date: string
  title: string
  subtitle?: string
  type: 'essay' | 'project' | 'photo' | 'cinema' | 'milestone' | 'fragment'
  category: string
  description: string
  tags: string[]
  internalLink?: string
  externalLink?: string
  quote?: string
}

export const archiveEntries: ArchiveEntry[] = [
  // 2026
  {
    id: 'arch-2026-so-suicide',
    year: 2026,
    date: 'October 2026',
    title: 'So, Suicide.',
    subtitle: 'On RJ Mitte, Robin Williams, Men’s Mental Health, and Why We Mistake Making Others Happy for Happiness Itself',
    type: 'essay',
    category: 'Being Human',
    description: 'A deeply candid reflection on human vulnerability, the facade of strength men are taught to project, and the question of why people who bring happiness can hurt so much inside.',
    tags: ['Mental Health', 'Vulnerability', 'Men', 'Life & Death', 'Cinema'],
    internalLink: '/writing/so-suicide',
    quote: 'We mistake someone’s ability to make others happy for happiness itself.',
  },
  {
    id: 'arch-2026-vidyut',
    year: 2026,
    date: 'Ongoing R&D',
    title: 'Vidyut: Autonomous Scholarship Matching Platform',
    subtitle: 'Education DNA Schema & Deterministic Criteria Evaluation',
    type: 'project',
    category: 'AI & Systems',
    description: 'Engineering an intelligent matching engine to automate scholarship discovery for underprivileged students, featuring < 45ms deterministic passes.',
    tags: ['Next.js 16', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Education DNA'],
    internalLink: '/work/vidyut',
  },
  {
    id: 'arch-2026-orphanage',
    year: 2026,
    date: 'September 2026',
    title: 'An Afternoon at the Orphanage',
    subtitle: 'Human Values, Social Ethics, and Building in India',
    type: 'photo',
    category: 'Real Life & Journeys',
    description: 'Visiting an orphanage in Navi Mumbai under our Socialization module. An experience that proved change starts by simply showing up, and anchored my desire to build in India.',
    tags: ['Human Values', 'Social Ethics', 'Pillai College', 'India'],
    internalLink: '/writing/orphanage-visit-human-values',
  },
  {
    id: 'arch-2026-heroes',
    year: 2026,
    date: 'August 2026',
    title: 'Why We Need Heroes: Spider-Man, Batman, and the Burden of Caring',
    subtitle: 'Cinema, Pop Culture, and the Moral Weight of Having Capabilities',
    type: 'cinema',
    category: 'Cinema & Culture',
    description: 'An essay on why Peter Parker missing rent moves us more than any billionaire hero, and what superheroes teach us about everyday sacrifice.',
    tags: ['Spider-Man', 'The Dark Knight', 'Cinema', 'Morality'],
    internalLink: '/writing/why-we-need-heroes',
  },
  {
    id: 'arch-2026-frag-end',
    year: 2026,
    date: 'March 2026',
    title: 'Fragment: How Our Story Ends',
    type: 'fragment',
    category: 'Philosophy',
    description: 'None of us knows how our story ends, or when the last ordinary day will turn into a memory. Tell the people around you that they matter while they are still here to hear it.',
    tags: ['Life & Death', 'Gratitude'],
    quote: 'None of us knows how our story ends, or when the last ordinary day will turn into a memory.',
  },

  // 2025
  {
    id: 'arch-2025-pce-enrollment',
    year: 2025,
    date: 'August 2025',
    title: 'Enrolled in B.Tech IT at Pillai College of Engineering',
    subtitle: 'Specialization in Information Security & Data Forensics',
    type: 'milestone',
    category: 'Education',
    description: 'Transitioned into undergraduate degree at Pillai College of Engineering, New Panvel, focusing on secure distributed architectures, forensics, and systems.',
    tags: ['Pillai College', 'B.Tech IT', 'InfoSec', 'Forensics'],
    internalLink: '/about',
  },
  {
    id: 'arch-2025-bullwhip-ai',
    year: 2025,
    date: 'Late 2024 - 2025',
    title: 'Bullwhip AI: Perishable Supply Chain Multi-Agent System',
    subtitle: 'Decentralized Demand Dampening Simulation',
    type: 'project',
    category: 'Multi-Agent AI',
    description: 'Modeled 4-tier supply chain oscillations and designed decentralized agent policies dampening food spoilage risk by ~34%.',
    tags: ['Python', 'Simulation', 'Recharts', 'Multi-Agent'],
    internalLink: '/work/bullwhip-ai',
  },
  {
    id: 'arch-2025-vpm-graduation',
    year: 2025,
    date: 'May 2025',
    title: 'Completed Diploma in Computer Engineering',
    subtitle: 'Vidya Prasarak Mandal’s Polytechnic, Thane',
    type: 'milestone',
    category: 'Education',
    description: 'Graduated with strong foundations in low-level systems, algorithms, hardware interfacing, and capstone project leadership.',
    tags: ['VPM Polytechnic', 'Computer Engineering', 'Graduation'],
    internalLink: '/about',
  },

  // 2024
  {
    id: 'arch-2024-vfs-global',
    year: 2024,
    date: 'July 2024',
    title: 'Backend Developer Intern at VFS Global, Mumbai',
    subtitle: 'Enterprise APIs, Query Optimization & System Debugging',
    type: 'milestone',
    category: 'Industry Experience',
    description: 'Hands-on enterprise backend engineering: tracing API bottlenecks, query execution plans, and learning how microservices communicate under heavy visa application loads.',
    tags: ['Backend', 'APIs', 'Database Optimization', 'VFS Global'],
    internalLink: '/about',
  },
  {
    id: 'arch-2024-agridrone',
    year: 2024,
    date: 'March 2024',
    title: 'Agriculture Drone (Agridrone) Prototype Completed',
    subtitle: 'Quadcopter Avionics & Android Ground Control Station',
    type: 'project',
    category: 'Hardware & IoT',
    description: 'Built a semi-automated quadcopter with 433MHz serial radio bridge, GPS position hold, and a native Android ground station for localized crop health inspection.',
    tags: ['Android', 'MAVLink', 'IoT', 'Hardware-Software', 'Agridrone'],
    internalLink: '/work/agridrone',
  },
  {
    id: 'arch-2024-drone-prop-night',
    year: 2024,
    date: 'February 2024',
    title: 'The Propeller Balancing Night',
    type: 'photo',
    category: 'College & Building',
    description: '3:30 AM with a digital gram scale, sand paper, and four carbon fiber drone blades trying to stop motor vibrations from confusing our gyroscope.',
    tags: ['Hardware', 'Fieldwork', 'Late Night'],
    internalLink: '/ordinary-days',
  },

  // 2023
  {
    id: 'arch-2023-pokemon-rpg',
    year: 2023,
    date: 'October 2023',
    title: 'Pokémon RPG Engine in Pygame',
    subtitle: '2D Tile Physics, AABB Sliding Collision & Battle State Machines',
    type: 'project',
    category: 'Interactive & Games',
    description: 'Engineered a complete 2D RPG from scratch in Python to master delta-timing, memory atlas caching, and hierarchical game loops.',
    tags: ['Python', 'Pygame', 'Game Dev', 'State Machine'],
    internalLink: '/work/pokemon-rpg',
  },
  {
    id: 'arch-2023-devsprint',
    year: 2023,
    date: 'July 2023',
    title: 'DevSprint: Hackathon Aggregator Platform',
    type: 'project',
    category: 'Web Platforms',
    description: 'Full-stack platform connecting student developers with hackathons and coding competitions across India.',
    tags: ['PHP', 'MySQL', 'Figma', 'UI/UX'],
    internalLink: '/work/devsprint',
  },
]
