export interface Fragment {
  id: string
  date: string
  timestamp: string
  text: string
  context: string
  tags: string[]
  theme: 'Being Human' | 'Engineering' | 'Cinema' | 'Life'
}

export const fragments: Fragment[] = [
  {
    id: 'frag-01',
    date: 'October 2026',
    timestamp: '02:14 AM',
    text: 'We mistake someone’s ability to make others happy for happiness itself. Who does the strong person talk to when they don’t feel strong anymore?',
    context: 'Late night reflection following the news of RJ Mitte and thinking about Robin Williams.',
    tags: ['Mental Health', 'Vulnerability', 'Men'],
    theme: 'Being Human',
  },
  {
    id: 'frag-02',
    date: 'February 2024',
    timestamp: '03:45 AM',
    text: 'You cannot debug physics with print statements. On a quadcopter, an unhandled race condition means carbon fiber snapping against dirt. Hardware humbles every programmer.',
    context: 'Field testing the Agriculture Drone prototype after motor gyro drift.',
    tags: ['Agridrone', 'Hardware', 'Humility'],
    theme: 'Engineering',
  },
  {
    id: 'frag-03',
    date: 'September 2026',
    timestamp: '06:30 PM',
    text: 'Change does not always have to start with something huge. Sometimes, it starts with showing up, listening, understanding, and simply being there.',
    context: 'Bus ride back to Pillai College of Engineering after visiting the orphanage.',
    tags: ['Human Values', 'Social Ethics', 'India'],
    theme: 'Life',
  },
  {
    id: 'frag-04',
    date: 'December 2025',
    timestamp: '11:20 PM',
    text: 'Peter Parker missing his rent while saving New York is the purest definition of heroism. Ability without sacrifice is just vanity.',
    context: 'Rewatching Spider-Man 2 and thinking about why superheroes matter.',
    tags: ['Cinema', 'Spider-Man', 'Morality'],
    theme: 'Cinema',
  },
  {
    id: 'frag-05',
    date: 'January 2026',
    timestamp: '01:10 AM',
    text: 'The fundamental bottleneck in higher education aid is not scarcity — it is discovery. Why should a student spend 40 hours reading government PDFs when algorithms can match them in 40 milliseconds?',
    context: 'Drafting the Education DNA schema for Vidyut.',
    tags: ['Vidyut', 'Education DNA', 'Systems'],
    theme: 'Engineering',
  },
  {
    id: 'frag-06',
    date: 'March 2026',
    timestamp: '12:05 AM',
    text: 'None of us knows how our story ends, or when the last ordinary day will turn into a memory. Tell the people around you that they matter while they are still here to hear it.',
    context: 'Closing lines of the personal journal entry on mortality.',
    tags: ['Life & Death', 'Gratitude', 'Memoir'],
    theme: 'Being Human',
  },
]
