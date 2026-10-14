export interface DailyQuote {
  id: string
  quote: string
  author: string
  source?: string
  context?: string
  theme: 'curiosity' | 'building' | 'humanity' | 'cinema' | 'courage' | 'life'
}

export interface NowData {
  lastUpdated: string
  currentLocation: string
  academicStatus: string
  building: {
    title: string
    summary: string
    canonicalLink: string
    status: string
  }[]
  learning: {
    topic: string
    detail: string
  }[]
  consuming: {
    category: 'Reading' | 'Listening' | 'Watching'
    title: string
    creator: string
    note: string
    canonicalLink?: string
  }[]
  thinkingAbout: string[]
  currentMotto: string
}

export const curatedQuotes: DailyQuote[] = [
  {
    id: 'quote-01',
    quote: 'Stay hungry. Stay foolish.',
    author: 'Stewart Brand / Steve Jobs',
    source: 'Whole Earth Catalog / Stanford Commencement (2005)',
    context: 'A timeless reminder that the moment you think you have arrived, your curiosity begins to atrophy.',
    theme: 'curiosity',
  },
  {
    id: 'quote-02',
    quote: 'Carpe Diem. Seize the day, boys. Make your lives extraordinary.',
    author: 'John Keating (played by Robin Williams)',
    source: 'Dead Poets Society (1989)',
    context: 'Spoken in front of photographs of students from a century ago, reminding us that time is borrowed.',
    theme: 'cinema',
  },
  {
    id: 'quote-03',
    quote: 'Simplicity is the ultimate sophistication.',
    author: 'Leonardo da Vinci',
    source: 'Notebooks',
    context: 'True engineering maturity is removing unnecessary abstractions until only the essence remains.',
    theme: 'building',
  },
  {
    id: 'quote-04',
    quote: 'When you can do the things that I can, but you don\'t, and then the bad things happen, they happen because of you.',
    author: 'Peter Parker',
    source: 'Spider-Man (Marvel / Sam Raimi)',
    context: 'The quiet burden of having capabilities: doing nothing is itself a moral choice.',
    theme: 'courage',
  },
  {
    id: 'quote-05',
    quote: 'In case I don\'t see ya: Good afternoon, good evening, and good night!',
    author: 'Truman Burbank',
    source: 'The Truman Show (1998)',
    context: 'The courage to take a bow, walk through the door of a comfortable illusion, and step into the real world.',
    theme: 'cinema',
  },
  {
    id: 'quote-06',
    quote: 'We make a living by what we get, but we make a life by what we give.',
    author: 'Winston Churchill',
    source: 'Speech Archive',
    context: 'Reflecting on why giving back to our communities matters more than chasing empty metrics.',
    theme: 'humanity',
  },
  {
    id: 'quote-07',
    quote: 'You cannot connect the dots looking forward; you can only connect them looking backwards.',
    author: 'Steve Jobs',
    source: 'Stanford Commencement Address (2005)',
    context: 'Trust that every awkward failure and strange project eventually converges into who you become.',
    theme: 'life',
  },
  {
    id: 'quote-08',
    quote: 'Time is a resource. Just like food or water. We can\'t buy it back.',
    author: 'Joseph Cooper',
    source: 'Interstellar (2014)',
    context: 'Relativity may bend gravity, but nothing slows down the steady march of ordinary days.',
    theme: 'cinema',
  },
  {
    id: 'quote-09',
    quote: 'The people who are crazy enough to think they can change the world are the ones who do.',
    author: 'Rob Siltanen / Ken Segall',
    source: 'Apple "Think Different" (1997)',
    context: 'Reject the cynical assumption that things have to remain the way they have always been.',
    theme: 'building',
  },
  {
    id: 'quote-10',
    quote: 'It’s not who I am underneath, but what I do that defines me.',
    author: 'Bruce Wayne / Batman',
    source: 'Batman Begins (2005)',
    context: 'Good intentions mean nothing without concrete execution and sacrifice.',
    theme: 'courage',
  },
  {
    id: 'quote-11',
    quote: 'Most people overestimate what they can do in one year and underestimate what they can do in ten years.',
    author: 'Bill Gates',
    source: 'The Road Ahead (1995)',
    context: 'Patience in long-term compounding beats the frantic anxiety of short-term hype.',
    theme: 'building',
  },
  {
    id: 'quote-12',
    quote: 'There are places I\'ll remember all my life, though some have changed...',
    author: 'John Lennon & Paul McCartney',
    source: 'In My Life (1965)',
    context: 'A three-minute song capturing the beauty of memory and gratitude for people who touched your life.',
    theme: 'humanity',
  },
  {
    id: 'quote-13',
    quote: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson',
    source: 'Software Engineering Principles',
    context: 'Never rush to implement before deeply understanding the underlying human constraint.',
    theme: 'building',
  },
  {
    id: 'quote-14',
    quote: 'I don\'t want to be at the mercy of my emotions. I want to use them, to enjoy them, and to dominate them.',
    author: 'Oscar Wilde',
    source: 'The Picture of Dorian Gray (1890)',
    context: 'Channeling vulnerability and sensitivity into constructive creation.',
    theme: 'life',
  },
  {
    id: 'quote-15',
    quote: 'If you want to build a ship, don\'t drum up the men to gather wood, divide the work, and give orders. Instead, teach them to yearn for the vast and endless sea.',
    author: 'Antoine de Saint-Exupéry',
    source: 'The Wisdom of the Sands',
    context: 'Great engineering teams are inspired by a shared vision, not micro-managed checklists.',
    theme: 'building',
  },
  {
    id: 'quote-16',
    quote: 'None of us knows how our story ends. But we can decide what we stand for while we are here.',
    author: 'Vedant Garud',
    source: 'So, Suicide. (Notebook Essay)',
    context: 'Writing about mental health and the quiet questions we carry through ordinary days.',
    theme: 'humanity',
  },
  {
    id: 'quote-17',
    quote: 'The only true wisdom is in knowing you know nothing.',
    author: 'Socrates',
    source: 'Plato’s Apology',
    context: 'Staying intellectually humble in the face of complex distributed systems and life.',
    theme: 'curiosity',
  },
  {
    id: 'quote-18',
    quote: 'Even the smallest person can change the course of the future.',
    author: 'J.R.R. Tolkien',
    source: 'The Fellowship of the Ring (1954)',
    context: 'Great outcomes always start with small, quiet acts of consistency in an unglamorous room.',
    theme: 'courage',
  },
  {
    id: 'quote-19',
    quote: 'If you wanna make the world a better place, take a look at yourself and then make a change.',
    author: 'Siedah Garrett & Glen Ballard / Michael Jackson',
    source: 'Man in the Mirror (1988)',
    context: 'Personal accountability before external criticism.',
    theme: 'humanity',
  },
  {
    id: 'quote-20',
    quote: 'Beauty will save the world.',
    author: 'Fyodor Dostoevsky',
    source: 'The Idiot (1869)',
    context: 'Care deeply about craft, aesthetic integrity, and doing things with genuine love.',
    theme: 'life',
  },
  {
    id: 'quote-21',
    quote: 'You cannot debug physics with print statements. Hardware humbles every programmer.',
    author: 'Vedant Garud',
    source: 'Bridging the Physical Divide (Notebook Essay)',
    context: 'Lessons learned from the Agriculture Drone when rotor vibration broke the gyro estimator.',
    theme: 'building',
  },
  {
    id: 'quote-22',
    quote: 'The mind is not a vessel to be filled, but a fire to be kindled.',
    author: 'Plutarch',
    source: 'On Listening to Lectures',
    context: 'Education should spark lifelong wonder, not just fill test sheets with rote answers.',
    theme: 'curiosity',
  },
  {
    id: 'quote-23',
    quote: 'It does not do to dwell on dreams and forget to live.',
    author: 'J.K. Rowling',
    source: 'Harry Potter and the Philosopher\'s Stone',
    context: 'Balance grand architectural visions with showing up for the people right in front of you.',
    theme: 'life',
  },
  {
    id: 'quote-24',
    quote: 'Having empathy is not a vulnerability; it is the only compass that keeps technical systems ethical.',
    author: 'Personal Reflection',
    source: 'Notebook // Ethics & Software',
    context: 'Technical power without human empathy creates cold and alienating software.',
    theme: 'humanity',
  },
  {
    id: 'quote-25',
    quote: 'There is a crack in everything. That\'s how the light gets in.',
    author: 'Leonard Cohen',
    source: 'Anthem (1992)',
    context: 'Our imperfections, broken prototypes, and unfinished questions are where real learning happens.',
    theme: 'life',
  },
  {
    id: 'quote-26',
    quote: 'The best way to predict the future is to invent it.',
    author: 'Alan Kay',
    source: 'Palo Alto Research Center (1971)',
    context: 'Don’t wait for someone else to build the tools you wish existed.',
    theme: 'building',
  },
  {
    id: 'quote-27',
    quote: 'To live is the rarest thing in the world. Most people exist, that is all.',
    author: 'Oscar Wilde',
    source: 'The Soul of Man under Socialism (1891)',
    context: 'Seize the present chapter, explore cinema, make music, write honest thoughts, and stay alive.',
    theme: 'courage',
  },
  {
    id: 'quote-28',
    quote: 'Great things are done by a series of small things brought together.',
    author: 'Vincent van Gogh',
    source: 'Letters to Theo van Gogh',
    context: 'Software systems, writing portfolios, and character are built line by line, day by day.',
    theme: 'building',
  },
  {
    id: 'quote-29',
    quote: 'Change does not always have to start with something huge. Sometimes, it starts with showing up.',
    author: 'Vedant Garud',
    source: 'Some Experiences Teach You What No Classroom Can (Notebook Essay)',
    context: 'Reflecting on the orphanage visit and why staying in India to build matters.',
    theme: 'humanity',
  },
  {
    id: 'quote-30',
    quote: 'Courage is being scared to death, but saddling up anyway.',
    author: 'John Wayne',
    source: 'Interview Archive',
    context: 'Facing difficult technical exams, high-stakes deployments, and uncertain futures with determination.',
    theme: 'courage',
  },
  {
    id: 'quote-31',
    quote: 'A life, in progress. Still figuring it out. Still building anyway.',
    author: 'Vedant Garud',
    source: 'Living Archive Motto (2026)',
    context: 'The core philosophy of VEDANT / UNFINISHED.',
    theme: 'life',
  },
]

/**
 * Deterministically returns the daily quote based on the calendar date (YYYY-MM-DD).
 * It calculates a hash of year, month, and day so the quote remains 100% stable
 * for all visits on that calendar day, and automatically rolls forward on the next day.
 */
export function getDailyQuote(targetDate?: Date): DailyQuote {
  const date = targetDate || new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  // Deterministic hash based on Gregorian calendar date
  const dateSeed = year * 10000 + month * 100 + day
  // Prime multiplier hash to distribute evenly across quotes
  const hash = Math.abs((dateSeed * 2654435761) ^ (dateSeed >> 16))
  const index = hash % curatedQuotes.length

  return curatedQuotes[index] || curatedQuotes[0]
}

export const nowData: NowData = {
  lastUpdated: 'October 2026',
  currentLocation: 'Thane & New Panvel, Maharashtra, India',
  academicStatus: 'Third-Year B.Tech in Information Technology (InfoSec & Data Forensics) at Pillai College of Engineering',
  currentMotto: '“A life, in progress. Still figuring it out. Still building anyway.”',
  
  building: [
    {
      title: 'Vidyut: Scholarship Discovery Engine',
      summary: 'Engineering the Education DNA schema to automate deterministic filtering across regional scholarship criteria in < 45ms.',
      canonicalLink: '/work/vidyut',
      status: 'Active Prototype',
    },
    {
      title: 'Bullwhip AI: Perishable Supply Chain Simulation',
      summary: 'Refining discrete-event multi-agent models to measure how point-of-sale transparency dampens upstream bullwhip oscillations.',
      canonicalLink: '/work/bullwhip-ai',
      status: 'Research & Simulation',
    },
  ],

  learning: [
    {
      topic: 'Applied Cryptography & Memory Forensics',
      detail: 'Deepening academic coursework in buffer analysis, cipher diffusion entropy, and defensive security architectures.',
    },
    {
      topic: 'Decentralized Coordination in Supply Chains',
      detail: 'Investigating how autonomous software agents make rational local decisions without creating catastrophic systemic swings.',
    },
  ],

  consuming: [
    {
      category: 'Reading',
      title: 'Steve Jobs',
      creator: 'Walter Isaacson',
      note: 'Studying the intersection of liberal arts, industrial design, and uncompromising engineering standards.',
      canonicalLink: '/taste',
    },
    {
      category: 'Listening',
      title: 'The Smiths & The Beatles',
      creator: 'Various Tracks',
      note: 'Revisiting guitar arrangements and lyricism during late-night code and study sessions.',
      canonicalLink: '/taste',
    },
    {
      category: 'Watching',
      title: 'The Truman Show & Christopher Nolan Films',
      creator: 'Peter Weir & Christopher Nolan',
      note: 'Analyzing how moral courage and existential autonomy are framed visually in cinema.',
      canonicalLink: '/taste',
    },
  ],

  thinkingAbout: [
    'Why technical tools without human empathy end up alienating the very people they are meant to help.',
    'Why building software for foundational problems in India (education access, agricultural logistics) is more meaningful than superficial tech trends.',
    'How memories fade if you don\'t write them down: the late-night lab sessions, the drone flight tests, the post-exam chai debriefs.',
  ],
}
