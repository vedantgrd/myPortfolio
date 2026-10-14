export interface TimelineEvent {
  year: string
  period: string
  title: string
  organization: string
  location: string
  type: 'education' | 'experience' | 'milestone'
  status: 'active' | 'completed'
  summary: string
  details: string[]
  tags: string[]
  links?: { label: string; url: string }[]
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2025 - Present',
    period: '2025 — 2028 (Expected)',
    title: 'Bachelor of Technology in Information Technology',
    organization: 'Pillai College of Engineering',
    location: 'New Panvel, Navi Mumbai',
    type: 'education',
    status: 'active',
    summary: 'Pursuing Information Technology with Specialization in Information Security and Data Forensics. Focusing on distributed systems, cryptographic algorithms, network security, and full-stack software architecture.',
    details: [
      'Specialization in Information Security & Data Forensics, exploring applied cryptography, memory forensics, and defensive systems.',
      'Active builder collaborating on real-world software prototypes including Vidyut and multi-agent supply chain research.',
      'Studying core computer science curriculum: operating systems, database management systems, network protocols, and algorithm design.',
    ],
    tags: ['InfoSec', 'Data Forensics', 'B.Tech IT', 'Software Systems', 'PCE Panvel'],
  },
  {
    year: 'Jul 2024',
    period: 'July 2024',
    title: 'Backend Developer Intern',
    organization: 'VFS Global',
    location: 'Mumbai, India',
    type: 'experience',
    status: 'completed',
    summary: 'Completed intensive backend engineering internship focusing on enterprise API endpoints, database query optimization, system debugging, and cross-functional team collaboration.',
    details: [
      'Investigated backend API performance bottlenecks and contributed to query optimization for visa processing microservices.',
      'Participated in daily standups, code reviews, and API documentation alongside senior software engineers.',
      'Gained deep practical exposure to enterprise database indexing, error tracking, and secure middleware pipelines.',
    ],
    tags: ['Backend', 'APIs', 'Database Optimization', 'Enterprise Systems', 'VFS Global'],
  },
  {
    year: '2022 - 2025',
    period: '2022 — 2025',
    title: 'Diploma in Computer Engineering / Technology',
    organization: "Vidya Prasarak Mandal's Polytechnic",
    location: 'Thane, Maharashtra',
    type: 'education',
    status: 'completed',
    summary: 'Built rigorous fundamentals in computer science, low-level programming, data structures, and applied engineering. Developed hands-on capstone projects including the Agriculture Drone.',
    details: [
      'Graduated with strong foundation in object-oriented programming, relational databases, computer networks, and microprocessors.',
      'Led hardware and software development for the Agriculture Drone (Agridrone) capstone project, integrating avionics with an Android ground station.',
      'Represented college in technical symposiums, hackathons, and software exhibitions.',
    ],
    tags: ['Computer Engineering', 'Hardware-Software Integration', 'Agridrone Capstone', 'VPM Polytechnic'],
  },
  {
    year: '2010 - 2022',
    period: '2010 — 2022',
    title: 'Primary & Secondary Schooling',
    organization: 'St. John The Baptist High School',
    location: 'Thane, Maharashtra',
    type: 'education',
    status: 'completed',
    summary: 'Completed foundational primary and secondary schooling with distinction, where initial curiosity for computers, mathematics, logic, and building things was first sparked.',
    details: [
      'Discovered passion for programming through early algorithmic challenges and school computer labs.',
      'Participated in science exhibitions, mathematics competitions, and school leadership activities.',
    ],
    tags: ['Foundational Schooling', 'Mathematics & Logic', 'Thane'],
  },
]
