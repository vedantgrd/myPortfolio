export interface Project {
  slug: string
  title: string
  tagline: string
  year: string
  status: string
  category: 'AI & Systems' | 'Hardware & IoT' | 'Security & Systems' | 'Interactive & Games' | 'Web Platforms'
  role: string
  featured: boolean
  accentColor: string
  summary: string
  problem: string
  motivation: string
  architecture: string
  keyDecisions: { title: string; desc: string }[]
  challenges: { title: string; desc: string }[]
  tradeoffs: { title: string; desc: string }[]
  outcomes: string[]
  techStack: { name: string; category: string; purpose: string }[]
  links: { label: string; url: string; type: 'github' | 'live' | 'demo' | 'paper' }[]
  metrics?: { label: string; value: string; note: string }[]
  diagramType: 'student-journey' | 'supply-chain' | 'drone-architecture' | 'crypto-pipeline' | 'game-loop' | 'event-system'
}

export const projects: Project[] = [
  {
    slug: 'vidyut',
    title: 'Vidyut',
    tagline: 'AI-First Student Success & Autonomous Scholarship Discovery Architecture',
    year: '2025 - Present',
    status: 'In Active R&D / Prototype',
    category: 'AI & Systems',
    role: 'Lead Architect & Full-Stack Engineer',
    featured: true,
    accentColor: '#e1523d',
    summary: 'An intelligent scholarship matching engine and student-success platform designed to replace manual eligibility hunting with an "Education DNA" profile model, automated criteria matching, and verified application tracking.',
    problem: 'Every year, thousands of qualified students miss out on higher education funding because scholarship criteria are scattered across fragmented portals, poorly indexed, and buried behind complex PDF guidelines. Students spend hundreds of hours searching, while institutions struggle with non-standardized submissions.',
    motivation: 'Having witnessed peers in engineering programs struggle to navigate bureaucratic, fragmented aid portals, I wanted to build a system that moves from passive search to active matching — treating a student’s educational background like a structured profile that queries opportunities automatically.',
    architecture: 'Vidyut combines a structured Student Profile Engine (Education DNA) with a criteria parsing pipeline. Eligibility heuristics evaluate multi-variable constraints (academic metrics, socio-economic factors, geographic requirements, and institution categories) against vectorized scholarship parameters.',
    keyDecisions: [
      {
        title: 'Education DNA Schema',
        desc: 'Built a multi-dimensional JSON schema modeling student achievements, course history, domicile data, and category tags to enable one-to-many instantaneous eligibility querying.',
      },
      {
        title: 'Rule-Based Heuristic Matching Before LLM Evaluation',
        desc: 'Instead of passing raw profiles directly to expensive LLMs, Vidyut uses deterministic hard-filter stages first (cutoff marks, domicile, income caps) before invoking language models for essay evaluation and nuanced criteria synthesis.',
      },
      {
        title: 'Audit-Proof Verification Workflow',
        desc: 'Designed a state machine for scholarship applications: Draft -> Eligibility Verified -> Document Matched -> Submitted -> Institutional Review.',
      },
    ],
    challenges: [
      {
        title: 'Heterogeneous Scholarship Requirements',
        desc: 'Scholarship listings lack standardized schemas. Some evaluate cumulative percentages, others use semester SGPA, and eligibility cutoffs frequently change.',
      },
      {
        title: 'Data Privacy for Sensitive Student Records',
        desc: 'Income certificates and academic mark sheets require strict client-side encryption considerations and anonymized profile representations during preliminary matching.',
      },
    ],
    tradeoffs: [
      {
        title: 'Deterministic Filtering vs. Fuzzy Matching',
        desc: 'Strict rule filters eliminate false positives but require precise data inputs from students. We incorporated soft confidence scores for borderline eligibility.',
      },
      {
        title: 'Client-Side Document OCR vs. Server Latency',
        desc: 'Balancing client-side metadata extraction to protect privacy against server-side processing power.',
      },
    ],
    outcomes: [
      'Engineered structured prototype pipeline supporting multi-criteria filter evaluation.',
      'Designed interactive Education DNA profile viewer with instant match confidence indicators.',
      'Modeled institutional scholarship schema unifying 40+ diverse criteria parameters into a single queryable index.',
    ],
    techStack: [
      { name: 'Next.js 16', category: 'Frontend', purpose: 'Student portal, dynamic discovery dashboard & SSR' },
      { name: 'TypeScript', category: 'Language', purpose: 'Strict type safety across the Education DNA schema' },
      { name: 'Python / FastAPI', category: 'Backend', purpose: 'Criteria matching algorithms & evaluation service' },
      { name: 'PostgreSQL', category: 'Database', purpose: 'Relational storage for scholarship entities and student profiles' },
      { name: 'Tailwind CSS', category: 'UI', purpose: 'Accessible, high-density editorial information design' },
      { name: 'Framer Motion', category: 'Interaction', purpose: 'Interactive eligibility flow & status transitions' },
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/vedantgrd', type: 'github' },
      { label: 'System Overview', url: '#case-study', type: 'demo' },
    ],
    metrics: [
      { label: 'Criteria Evaluation Time', value: '< 45ms', note: 'Simulated multi-variable matching pass' },
      { label: 'Schema Attributes', value: '42', note: 'Standardized Education DNA parameters' },
      { label: 'Verification Stages', value: '5 Steps', note: 'From profile creation to audit review' },
    ],
    diagramType: 'student-journey',
  },
  {
    slug: 'bullwhip-ai',
    title: 'Bullwhip AI',
    tagline: 'Multi-Agent Simulation & Decision Support for Food Supply Chain Oscillations',
    year: '2024 - 2025',
    status: 'Research Prototype / Simulation',
    category: 'AI & Systems',
    role: 'System Designer & Algorithm Developer',
    featured: true,
    accentColor: '#3b68ff',
    summary: 'A multi-agent decision support system designed to model and mitigate the Bullwhip Effect — the distortion of demand signals across multi-echelon food and perishables supply chains — using decentralized agent coordination and safety buffer smoothing.',
    problem: 'Small fluctuations in consumer grocery demand amplify dramatically as orders cascade upstream from Retailers to Wholesalers, Distributors, and Agricultural Producers. In food supply chains, this leads to catastrophic food spoilage, phantom shortages, and inventory whiplash.',
    motivation: 'During my supply chain research and coursework, I became fascinated by how rational local decisions by independent buyers create systemic collective chaos upstream. I wanted to simulate whether cooperative autonomous agents with transparent visibility could dampen order variance without centralizing control.',
    architecture: 'Built a 4-tier decentralized agent environment (Retailer, Wholesaler, Distributor, Factory). Each node operates an independent agent managing order policies, reorder points, lead-time buffering, and demand signal dampening via exponential smoothing.',
    keyDecisions: [
      {
        title: 'Decentralized Agent Architecture',
        desc: 'Instead of assuming a mythical "all-knowing central planner", each agent only sees its immediate downstream order stream and local inventory, accurately replicating real-world siloed logistics.',
      },
      {
        title: 'Signal Dampening & Order Smoothing',
        desc: 'Implemented adaptive order-smoothing algorithms that contrast raw (s, S) min-max reordering with dynamic safety stock adjustments based on lead-time variance.',
      },
      {
        title: 'Interactive Parameter Tuning',
        desc: 'Created an in-browser simulation engine where researchers can manipulate customer demand shock waves and lead times to visualize the oscillation wave in real time.',
      },
    ],
    challenges: [
      {
        title: 'Perishable Expiry Constraints',
        desc: 'Unlike durable goods, food inventory decays. Modeling holding costs alongside spoilage penalties introduced non-linear optimization hurdles for agent restocking policies.',
      },
      {
        title: 'Feedback Delay Resonance',
        desc: 'Transportation lead times create phase lags where agents over-order while goods are in transit, causing severe supply overshoots.',
      },
    ],
    tradeoffs: [
      {
        title: 'Service Level vs. Inventory Cost',
        desc: 'Keeping 99% fulfillment during demand spikes requires large buffer stocks that increase spoilage risks in food supply chains.',
      },
      {
        title: 'Agent Autonomy vs. Global Efficiency',
        desc: 'Strict local optimization leads to bullwhip oscillation; shared demand signal visibility requires cross-organizational trust.',
      },
    ],
    outcomes: [
      'Developed mathematical simulation model demonstrating up to 34% reduction in order variance amplification across 4 echelons under coordinated signal sharing.',
      'Created interactive visual simulation dashboard comparing independent vs. agent-coordinated order policies.',
      'Documented supply chain dynamics postmortem detailing lead-time sensitivity in perishable logistics.',
    ],
    techStack: [
      { name: 'Python', category: 'Simulation Core', purpose: 'Discrete-event supply chain modeling and agent logic' },
      { name: 'Next.js & Recharts', category: 'Frontend', purpose: 'Real-time multi-echelon oscillation visualization' },
      { name: 'NumPy', category: 'Math', purpose: 'Statistical demand distribution and inventory state matrices' },
      { name: 'TypeScript', category: 'Architecture', purpose: 'Client-side simulation runtime for interactive browser exploration' },
    ],
    links: [
      { label: 'GitHub Simulation', url: 'https://github.com/vedantgrd', type: 'github' },
      { label: 'Launch Interactive Lab', url: '/lab', type: 'demo' },
    ],
    metrics: [
      { label: 'Simulated Tiers', value: '4 Tiers', note: 'Retailer -> Wholesaler -> Distributor -> Factory' },
      { label: 'Variance Dampening', value: '~34%', note: 'Observed under coordinated signal-smoothing policy' },
      { label: 'Lead Time Range', value: '1 - 6 wks', note: 'Configurable transit lag parameters' },
    ],
    diagramType: 'supply-chain',
  },
  {
    slug: 'agridrone',
    title: 'Agriculture Drone (Agridrone)',
    tagline: 'Semi-Automated Quadcopter Telemetry Platform, Mobile Ground Station & Crop Health Sensing',
    year: '2023 - 2024',
    status: 'Hardware Prototype & Android Ground Station',
    category: 'Hardware & IoT',
    role: 'Hardware-Software Lead & Android Developer',
    featured: true,
    accentColor: '#10b981',
    summary: 'A semi-automated unmanned aerial vehicle prototype integrated with an onboard sensor payload and a custom Android ground control station for localized crop health monitoring, flight telemetry, and aerial field inspection.',
    problem: 'Small-to-medium agricultural holdings lack affordable crop diagnostic tools. Existing commercial agricultural drones are cost-prohibitive, proprietary, and require complex flight-planning software inaccessible to rural farmers.',
    motivation: 'Built as an applied engineering project during my diploma studies, our goal was to demystify drone hardware by building an affordable quadcopter prototype paired with an intuitive Android ground station that translates raw sensor telemetry into actionable field insights.',
    architecture: 'Custom-built quadcopter airframe equipped with flight controller, telemetry radio, GPS, and optical sensor module. The companion Android application communicates via wireless serial bridge to display flight telemetry, altitude, GPS lock, and camera feed with crop health indexing heuristics.',
    keyDecisions: [
      {
        title: 'Custom Android Ground Control Interface',
        desc: 'Instead of relying solely on generic mission planner tools, built a native Android app tailored for simple field use: one-tap status check, battery telemetry, and localized crop inspection logs.',
      },
      {
        title: 'Modular Sensor Mount System',
        desc: 'Engineered hardware payload mounting to allow swapping sensor payloads (optical RGB camera, temperature/humidity sensors) without altering flight avionics wiring.',
      },
      {
        title: 'Failsafe Return-to-Launch Logic',
        desc: 'Programmed automatic return-to-home and emergency hover protocols triggered by telemetry signal loss or voltage drops below safety thresholds.',
      },
    ],
    challenges: [
      {
        title: 'Vibration Isolation on Avionics',
        desc: 'High-frequency motor vibrations induced sensor noise on the IMU/gyroscope, causing drift. Solved by dampening flight controller mounts and balancing rotor blades.',
      },
      {
        title: 'Battery Weight vs. Flight Endurance',
        desc: 'LiPo battery payload weight directly degraded flight endurance. Calibrated thrust-to-weight ratios to balance flight time with sensor payload stability.',
      },
    ],
    tradeoffs: [
      {
        title: 'Onboard Edge Computing vs. Ground Station Processing',
        desc: 'Heavy onboard computation reduced flight endurance; we shifted high-resolution image analysis to the ground mobile station while keeping flight stability on the dedicated MCU.',
      },
      {
        title: 'Proprietary Flight Controllers vs. Open-Source Firmware',
        desc: 'Opted for open-source flight firmware integration to allow low-level telemetry extraction directly into our Android application.',
      },
    ],
    outcomes: [
      'Constructed functional quadcopter prototype with stable hover and GPS position hold.',
      'Authored native Android mobile ground station application communicating over telemetry radio bridge.',
      'Field-tested flight logging and localized crop image collection workflows.',
    ],
    techStack: [
      { name: 'Android / Java', category: 'Mobile', purpose: 'Ground control station application and telemetry UI' },
      { name: 'Python', category: 'Algorithms', purpose: 'Crop index calculation and image analysis scripts' },
      { name: 'IoT / Microcontrollers', category: 'Hardware', purpose: 'Flight controller avionics, ESCs, GPS & telemetry transceivers' },
      { name: 'Serial Protocol / MAVLink', category: 'Communications', purpose: 'Ground-to-air telemetry data bridge' },
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/vedantgrd/AgricultureDrone', type: 'github' },
      { label: 'Drive Demo & Documentation', url: 'https://drive.google.com/file/d/1JI8v2gI2H4H6vbARE09fdLaI3zcfK9k9/view', type: 'demo' },
    ],
    metrics: [
      { label: 'Thrust-to-Weight', value: '2.1 : 1', note: 'Calibrated for stable payload flight' },
      { label: 'Telemetry Range', value: 'Up to 500m', note: 'Ground-to-air 433MHz transceiver link' },
      { label: 'Ground Station', value: 'Android APK', note: 'Native mobile dashboard with real-time HUD' },
    ],
    diagramType: 'drone-architecture',
  },
  {
    slug: 'cipherlab',
    title: 'CipherLab: Cryptographic & Forensics Playground',
    tagline: 'Interactive Cryptanalysis, Modern Cipher Evaluation & Data Forensics Suite',
    year: '2024 - 2025',
    status: 'Interactive Academic Project',
    category: 'Security & Systems',
    role: 'Creator & Security Researcher',
    featured: false,
    accentColor: '#f59e0b',
    summary: 'A cryptographic laboratory and visual cryptanalysis suite exploring classical ciphers, modern symmetric/asymmetric algorithms, hashing collision properties, and frequency analysis, directly reflecting my academic focus in Information Security and Data Forensics.',
    problem: 'Cryptography and information security are often taught through dry mathematical formulas without hands-on visual feedback. Students struggle to build intuition for entropy, diffusion, confusion, and why subtle key flaws break encryption.',
    motivation: 'As an IT student specializing in Information Security and Data Forensics at Pillai College of Engineering, I wanted to build an interactive tool that visually breaks and explains cryptographic concepts: seeing character frequency distributions shift, watching avalanche effects unfold in real time, and testing cipher strengths.',
    architecture: 'Modular JavaScript/TypeScript cryptanalysis engine supporting cipher pipelines (Classical substitution/transposition, modern AES/DES block mechanisms, SHA hashing) paired with SVG frequency histograms and entropy counters.',
    keyDecisions: [
      {
        title: 'Visual Frequency Distribution Histogram',
        desc: 'Interactive character frequency visualizer comparing ciphertext against English language standard frequencies to demonstrate statistical cryptanalysis.',
      },
      {
        title: 'Avalanche Effect Visualizer',
        desc: 'Shows how flipping a single bit in an input string cascades across hash outputs, illustrating cryptographic diffusion.',
      },
    ],
    challenges: [
      {
        title: 'Mathematical Accuracy in Web Runtime',
        desc: 'Implementing large integer modular arithmetic and matrix transformations in JavaScript without numerical precision drift.',
      },
    ],
    tradeoffs: [
      {
        title: 'Educational Simplicity vs. Production Security Libraries',
        desc: 'Built transparent, educational cipher implementations designed for step-by-step inspection rather than black-box native cryptographic libraries.',
      },
    ],
    outcomes: [
      'Developed 5+ interactive cipher modules with real-time frequency analysis histograms.',
      'Created visual demonstration of the Avalanche Effect for hash functions.',
      'Integrated into the Lab section of this portfolio for live visitor experimentation.',
    ],
    techStack: [
      { name: 'TypeScript', category: 'Language', purpose: 'Cipher algorithms, bitwise math & state management' },
      { name: 'SVG / Recharts', category: 'Visualization', purpose: 'Real-time frequency analysis & entropy meters' },
      { name: 'Next.js', category: 'Frontend', purpose: 'Interactive lab interface and educational annotations' },
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/vedantgrd', type: 'github' },
      { label: 'Open in Lab', url: '/lab', type: 'demo' },
    ],
    metrics: [
      { label: 'Cipher Algorithms', value: '5+', note: 'Caesar, Vigenère, Substitution, Affine & Hash models' },
      { label: 'Analysis Speed', value: 'Real-time', note: 'Instant keystroke cryptanalysis' },
    ],
    diagramType: 'crypto-pipeline',
  },
  {
    slug: 'pokemon-rpg',
    title: 'Pokémon RPG Engine',
    tagline: '2D Tile-Based RPG Engine, Battle State Machine & Custom Physics in Python',
    year: '2023 - 2024',
    status: 'Completed Game Project',
    category: 'Interactive & Games',
    role: 'Lead Developer & Gameplay Programmer',
    featured: false,
    accentColor: '#ef4444',
    summary: 'A Pokémon-inspired 2D role-playing game built in Python using Pygame, featuring a custom tile collision engine, camera viewport tracking, sprite animation state machines, and a complete turn-based battle interface.',
    problem: 'Game engines like Unity or Godot hide the fundamental mechanics of 2D game loops, delta timing, spatial partitioning, and state machines behind visual editors.',
    motivation: 'To truly understand software engineering fundamentals — object lifecycles, memory footprint, collision detection algorithms, and deterministic state machines — I decided to build a complete 2D RPG from scratch in Python with Pygame.',
    architecture: 'Custom architecture structured around an Entity-Component model: Game Loop -> State Manager (World, Menu, Dialogue, Battle) -> Camera Viewport -> Tilemap Collision Handler -> Animation Controller.',
    keyDecisions: [
      {
        title: 'Hierarchical State Machine for Game Flow',
        desc: 'Separated world exploration from turn-based battle scenes using an event-driven state stack, preventing state bleeding and race conditions.',
      },
      {
        title: 'AABB Tile Collision System',
        desc: 'Implemented Axis-Aligned Bounding Box collision detection with velocity resolution to enable smooth sliding along walls and obstacles.',
      },
      {
        title: 'Turn-Based Battle Resolution System',
        desc: 'Engineered battle mechanics modeling turn priorities, elemental type effectiveness multipliers, accuracy checks, and health interpolation animations.',
      },
    ],
    challenges: [
      {
        title: 'Frame Rate Independent Movement',
        desc: 'Pygame clock ticks can stutter across different hardware. Integrated delta-time normalization for consistent character velocities.',
      },
      {
        title: 'Sprite Sheet Memory Management',
        desc: 'Loading hundreds of directional animation frames risked high memory usage. Built a sprite atlas loader caching sub-surfaces on startup.',
      },
    ],
    tradeoffs: [
      {
        title: 'Pygame vs. Modern Engine',
        desc: 'Building from scratch sacrificed 3D capabilities and visual shaders, but yielded deep mastery of low-level 2D math, event loops, and game architecture.',
      },
    ],
    outcomes: [
      'Delivered fully playable 2D RPG experience with map exploration, NPC dialogues, and functioning battle mechanics.',
      'Engineered clean modular Python codebase separating rendering, physics, and game rules.',
    ],
    techStack: [
      { name: 'Python 3', category: 'Language', purpose: 'Core game architecture and mathematical simulation' },
      { name: 'Pygame', category: 'Game Library', purpose: 'Windowing, audio, surface blitting, and keyboard events' },
      { name: 'Tiled Map Editor', category: 'Design', purpose: 'Orthogonal 2D tilemap design and collision metadata' },
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/kryyo1441/pygame-pokemon-rpg', type: 'github' },
      { label: 'Gameplay Video Demo', url: 'https://drive.google.com/file/d/1iXtMwanVc9ejY1I6BGfJmxk4y3PPZCz6/view?usp=sharing', type: 'demo' },
    ],
    metrics: [
      { label: 'Target Frame Rate', value: '60 FPS', note: 'Consistent delta-time loop' },
      { label: 'Game States', value: '4 Discrete', note: 'World, Battle, Dialogue, Inventory' },
    ],
    diagramType: 'game-loop',
  },
  {
    slug: 'devsprint',
    title: 'DevSprint',
    tagline: 'Developer Hackathon Discovery & Event Management Platform',
    year: '2023',
    status: 'Completed Platform',
    category: 'Web Platforms',
    role: 'Full-Stack Developer & UI/UX Designer',
    featured: false,
    accentColor: '#06b6d4',
    summary: 'A full-stack web platform connecting student developers with hackathons, tech workshops, and coding competitions, complete with an administrative event submission and approval pipeline.',
    problem: 'Student developers miss hackathon deadlines because announcements are scattered across Discord servers, college notice boards, and unorganized social media posts.',
    motivation: 'During my polytechnic studies, teams often struggled to find local hackathons with enough preparation time. DevSprint was built to aggregate deadlines, eligibility criteria, prize pools, and team requirements in one clean catalog.',
    architecture: 'Three-tier web application architecture featuring a responsive web client, backend REST services, relational database schemas for events and organizers, and an admin review portal.',
    keyDecisions: [
      {
        title: 'Relational Schema for Event Filtering',
        desc: 'Designed normalized MySQL tables for events, tags, dates, and organizer credentials, supporting indexed multi-filter queries (mode: online/in-person, prize tier, date range).',
      },
      {
        title: 'Role-Based Admin Moderation',
        desc: 'Created an approval workflow allowing verified university clubs to post events while preventing spam submissions.',
      },
    ],
    challenges: [
      {
        title: 'Dynamic Timezone & Deadline Tracking',
        desc: 'Displaying accurate countdown timers relative to local participant timezones while storing UTC timestamps on the server.',
      },
    ],
    tradeoffs: [
      {
        title: 'Rapid Prototyping vs. Modern SPA Stack',
        desc: 'Initial version used PHP and MySQL for immediate university deployment; this experience motivated my subsequent transition to TypeScript and Next.js for scalable frontend state.',
      },
    ],
    outcomes: [
      'Built and deployed functioning hackathon aggregator with search, filtering, and event bookmarking.',
      'Designed responsive UI in Figma before translating into semantic markup and CSS.',
    ],
    techStack: [
      { name: 'PHP & MySQL', category: 'Backend & DB', purpose: 'Event CRUD operations, filtering queries, and relational data' },
      { name: 'JavaScript & Three.js', category: 'Frontend', purpose: 'Client-side event filtering and interactive 3D elements' },
      { name: 'HTML5 & CSS3', category: 'Styling', purpose: 'Responsive interface layouts' },
      { name: 'Figma', category: 'Design', purpose: 'Wireframing, UI component design, and user flows' },
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/vedantgrd/DevSprint', type: 'github' },
    ],
    metrics: [
      { label: 'Event Filters', value: '6 Types', note: 'Date, mode, prize, location, tags, difficulty' },
      { label: 'Database Tables', value: '8 Normalized', note: 'Users, events, categories, organizers, bookmarks' },
    ],
    diagramType: 'event-system',
  },
]
