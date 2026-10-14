export interface NowData {
  lastUpdated: string
  currentLocation: string
  academicFocus: string
  building: {
    title: string
    description: string
    status: string
    link?: string
  }[]
  learning: {
    topic: string
    context: string
  }[]
  reading: {
    title: string
    author: string
    notes: string
  }[]
  watching: {
    title: string
    type: string
    reflection: string
  }[]
  thinkingAbout: string[]
  currentMotto: string
}

export const nowData: NowData = {
  lastUpdated: 'October 2026',
  currentLocation: 'Thane & New Panvel, Maharashtra, India',
  academicFocus: 'B.Tech in Information Technology (Specialization in Information Security & Data Forensics) at Pillai College of Engineering',
  currentMotto: '“A life, in progress. Still figuring it out. Still building anyway.”',
  building: [
    {
      title: 'Vidyut // Scholarship Discovery Engine',
      description: 'Refining the Education DNA schema to automate multi-variable matching constraints across regional student aid programs.',
      status: 'Active Prototype',
      link: '/work/vidyut',
    },
    {
      title: 'Bullwhip AI // Perishable Logistics Simulation',
      description: 'Experimenting with multi-agent demand signal smoothing to measure dampening factors across 4-tier supply chains.',
      status: 'Simulation Research',
      link: '/lab',
    },
    {
      title: 'This Living Archive',
      description: 'Treating this portfolio not as a static resume, but as an enduring journal of my thoughts, cinema, and development.',
      status: 'Continuous Evolution',
      link: '/archive',
    },
  ],
  learning: [
    {
      topic: 'Applied Cryptography & Data Forensics',
      context: 'Deepening academic coursework in memory dump inspection, cipher avalanche entropy, and network traffic security.',
    },
    {
      topic: 'Decentralized Agent Coordination',
      context: 'Studying how independent actors communicate under stochastic latency without a centralized orchestrator.',
    },
    {
      topic: 'Writing & Emotional Honesty',
      context: 'Learning to write openly about mental health, uncertainty, and personal experiences without hiding behind corporate jargon.',
    },
  ],
  reading: [
    {
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      notes: 'Understanding how physical affordances shape user intuition — applied directly to our drone ground control station UI.',
    },
    {
      title: 'Essays on Ethics & Social Responsibility',
      author: 'Selected Authors',
      notes: 'Reflecting on what we owe to the communities we grow up in, sparked by our orphanage visit.',
    },
  ],
  watching: [
    {
      title: 'The Truman Show & Dead Poets Society',
      type: 'Films (Peter Weir)',
      reflection: 'Rewatching formative films to understand how stories give young people the courage to question artificial ceilings.',
    },
    {
      title: 'Christopher Nolan Retrospective',
      type: 'Cinema',
      reflection: 'Analyzing how The Dark Knight and Interstellar treat sacrifice, time, and moral duty under extreme pressure.',
    },
  ],
  thinkingAbout: [
    'Why men are taught to suppress emotional pain, and why we mistake making others laugh for happiness itself.',
    'Why building software that solves unglamorous problems in India (like scholarship access or agricultural efficiency) feels far more meaningful than chasing superficial prestige.',
    'How memories fade if you don\'t write them down: the late-night lab sessions, the drone crashes, the post-exam chai debriefs.',
  ],
}
