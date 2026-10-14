export interface VerifiedMilestone {
  id: string
  year: number
  dateDisplay: string
  title: string
  category: 'Education' | 'Projects' | 'Experience' | 'Hackathons & Research' | 'Community'
  factualSummary: string
  verificationLevel: 'Verified Academic Record' | 'Verified Project Repository' | 'Verified Experience' | 'Institutional Activity'
  canonicalLink?: {
    label: string
    url: string
    isExternal?: boolean
  }
  tags: string[]
}

export const verifiedMilestones: VerifiedMilestone[] = [
  // 2026
  {
    id: 'mile-2026-orphanage-immersion',
    year: 2026,
    dateDisplay: 'September 2026',
    title: 'Human Values & Social Ethics: Orphanage Community Immersion',
    category: 'Community',
    factualSummary: 'Participated in a field socialization visit to an orphanage in Navi Mumbai as part of the Human Values & Social Ethics curriculum at Pillai College of Engineering. Documented personal takeaways on social responsibility and building for Indian communities in a reflective notebook essay.',
    verificationLevel: 'Institutional Activity',
    canonicalLink: {
      label: 'Read Reflection in Notebook',
      url: '/writing/orphanage-visit-human-values',
    },
    tags: ['Human Values', 'Pillai College of Engineering', 'Social Ethics', 'Navi Mumbai'],
  },
  {
    id: 'mile-2026-vidyut-prototype',
    year: 2026,
    dateDisplay: '2025 — 2026',
    title: 'Vidyut: Scholarship Discovery Platform Architecture',
    category: 'Projects',
    factualSummary: 'Architected and implemented a prototype student aid engine with an Education DNA schema and a sub-45ms deterministic filtering pass to automate scholarship discovery for underprivileged students.',
    verificationLevel: 'Verified Project Repository',
    canonicalLink: {
      label: 'View Technical Case Study',
      url: '/work/vidyut',
    },
    tags: ['Next.js 16', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Education DNA'],
  },

  // 2025
  {
    id: 'mile-2025-pce-enrollment',
    year: 2025,
    dateDisplay: 'August 2025',
    title: 'Enrolled in B.Tech IT at Pillai College of Engineering',
    category: 'Education',
    factualSummary: 'Commenced Bachelor of Technology in Information Technology with Specialization in Information Security & Data Forensics at Pillai College of Engineering, New Panvel (University of Mumbai).',
    verificationLevel: 'Verified Academic Record',
    canonicalLink: {
      label: 'View Academic Narrative in About',
      url: '/about',
    },
    tags: ['B.Tech IT', 'InfoSec', 'Data Forensics', 'PCE Panvel'],
  },
  {
    id: 'mile-2025-bullwhip-ai',
    year: 2025,
    dateDisplay: '2024 — 2025',
    title: 'Bullwhip AI: Perishable Supply Chain Multi-Agent System',
    category: 'Hackathons & Research',
    factualSummary: 'Researched demand distortion in multi-echelon perishable food supply chains and implemented a discrete-event simulation with autonomous agents dampening bullwhip oscillations by ~34%.',
    verificationLevel: 'Verified Project Repository',
    canonicalLink: {
      label: 'View Technical Case Study',
      url: '/work/bullwhip-ai',
    },
    tags: ['Multi-Agent AI', 'Simulation', 'Python', 'Supply Chain Dynamics'],
  },

  // 2024
  {
    id: 'mile-2024-vfs-global',
    year: 2024,
    dateDisplay: 'July 2024',
    title: 'Backend Developer Intern at VFS Global',
    category: 'Experience',
    factualSummary: 'Completed a 1-month backend engineering internship at VFS Global in Mumbai, working on RESTful API query efficiency, database query execution plan analysis, and enterprise middleware documentation.',
    verificationLevel: 'Verified Experience',
    canonicalLink: {
      label: 'View Experience in About',
      url: '/about',
    },
    tags: ['Backend', 'APIs', 'Database Optimization', 'VFS Global', 'Mumbai'],
  },
  {
    id: 'mile-2024-agridrone',
    year: 2024,
    dateDisplay: 'Early 2024',
    title: 'Agriculture Drone (Agridrone): Hardware & Android Telemetry',
    category: 'Projects',
    factualSummary: 'Constructed a custom quadcopter drone with 433MHz serial telemetry radio bridge and developed a native Android ground control application for localized agricultural inspection as a polytechnic capstone.',
    verificationLevel: 'Verified Project Repository',
    canonicalLink: {
      label: 'View Technical Case Study',
      url: '/work/agridrone',
    },
    tags: ['Hardware', 'Avionics', 'Android', 'MAVLink', 'IoT'],
  },

  // 2023
  {
    id: 'mile-2023-sih-internal',
    year: 2023,
    dateDisplay: 'September 2023',
    title: 'Selected in College Internal Smart India Hackathon Round',
    category: 'Hackathons & Research',
    factualSummary: 'Qualified through the competitive internal college screening round for the Smart India Hackathon (SIH) with an automated software workflow proposal evaluated by departmental faculty.',
    verificationLevel: 'Institutional Activity',
    tags: ['Smart India Hackathon', 'Internal Round', 'Competition', 'Prototyping'],
  },
  {
    id: 'mile-2023-cipherlab',
    year: 2023,
    dateDisplay: '2023',
    title: 'CipherLab: Classical Cryptography & Avalanche Effect Workbench',
    category: 'Projects',
    factualSummary: 'Built an educational cryptanalysis tool covering classical polyalphabetic substitution, frequency analysis against standard English distributions, and bit-level avalanche diffusion measurement.',
    verificationLevel: 'Verified Project Repository',
    canonicalLink: {
      label: 'View Technical Case Study',
      url: '/work/cipherlab',
    },
    tags: ['Cryptography', 'Information Security', 'Algorithms', 'Interactive Tool'],
  },
  {
    id: 'mile-2023-pokemon-rpg',
    year: 2023,
    dateDisplay: 'Late 2023',
    title: 'Python Tile-Based RPG Engine Development',
    category: 'Projects',
    factualSummary: 'Developed a 2D tile-based Pokémon game engine in Pygame featuring Axis-Aligned Bounding Box (AABB) continuous collision detection and turn-based elemental combat state machines.',
    verificationLevel: 'Verified Project Repository',
    canonicalLink: {
      label: 'View Technical Case Study',
      url: '/work/pokemon-rpg',
    },
    tags: ['Python', 'Pygame', 'AABB Collisions', 'State Machine'],
  },

  // 2022
  {
    id: 'mile-2022-vpm-polytechnic',
    year: 2022,
    dateDisplay: 'August 2022 — 2025',
    title: 'Enrolled in Diploma in Computer Engineering',
    category: 'Education',
    factualSummary: 'Enrolled at Vidya Prasarak Mandal’s (VPM) Polytechnic in Thane, establishing foundations in object-oriented programming, data structures, computer networks, and microprocessors.',
    verificationLevel: 'Verified Academic Record',
    canonicalLink: {
      label: 'View Education in About',
      url: '/about',
    },
    tags: ['Diploma', 'Computer Engineering', 'VPM Polytechnic', 'Thane'],
  },
]
