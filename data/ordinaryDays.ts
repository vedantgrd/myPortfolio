export interface OrdinaryDayEntry {
  id: string
  date: string
  year: number
  title: string
  location: string
  caption: string
  story?: string
  tags: string[]
  theme: 'College & Building' | 'Friendship & Life' | 'Reflections' | 'Fieldwork'
  imagePlaceholderText?: string
}

export const ordinaryDays: OrdinaryDayEntry[] = [
  {
    id: 'day-orphanage-afternoon',
    date: 'September 2026',
    year: 2026,
    title: 'An Afternoon at the Orphanage',
    location: 'Navi Mumbai, India',
    caption: 'Quiet smiles, shared stories, and the realization that change starts by simply showing up.',
    story: 'We arrived expecting to "teach" or "present" something for our Human Values class. Within twenty minutes, the roles reversed completely. The kids showed us how to laugh without needing any reason. On the bus ride back to campus, nobody checked their phones. That afternoon permanently altered how I think about why I want to build things in India.',
    tags: ['Human Values', 'Social Ethics', 'Pillai College', 'Perspective'],
    theme: 'Friendship & Life',
  },
  {
    id: 'day-quadcopter-props-desk',
    date: 'February 2024',
    year: 2024,
    title: 'The Propeller Balancing Night',
    location: 'Thane, Maharashtra',
    caption: '3:30 AM with a digital gram scale, sand paper, and four carbon fiber drone blades.',
    story: 'Before our first successful GPS hold flight, we spent hours trying to eliminate motor vibrations. Our dorm desk looked like an avionics graveyard: soldering iron, multimeter, loose LiPo leads, and four props being micro-balanced on an improvised magnetic stand. None of this shows up on a résumé, but it was one of the most satisfying nights of my diploma.',
    tags: ['Agridrone', 'Hardware', 'VPM Polytechnic', 'Late Nights'],
    theme: 'College & Building',
  },
  {
    id: 'day-rain-in-thane',
    date: 'July 2024',
    year: 2024,
    title: 'Monsoon Commute After VFS Global',
    location: 'Thane Station, Mumbai',
    caption: 'Drenched sneakers, a hot cup of cutting chai, and debugging SQL execution plans in my head.',
    story: 'Commuting back from the backend internship during peak Mumbai monsoon. The local train was delayed by 40 minutes. Stood under the tin awning at Thane station watching the rain pour over the tracks. It was exhausting, but for the first time, I felt the quiet pride of doing real engineering work for real people.',
    tags: ['Internship', 'VFS Global', 'Monsoon', 'Growing Up'],
    theme: 'Reflections',
  },
  {
    id: 'day-pokemon-engine-first-step',
    date: 'October 2023',
    year: 2023,
    title: 'When the Red Square Stopped Walking Through Walls',
    location: 'Computer Lab, Thane',
    caption: 'The exact moment our custom tile collision detection worked without clipping.',
    story: 'I had been fighting Pygame sprite bounding box math for two full days. My character sprite kept sliding into water tiles and getting stuck inside trees. When the AABB resolution finally worked and the character slid smoothly along the fence boundary, I literally celebrated in an empty college lab.',
    tags: ['Pygame', 'Game Dev', 'Small Victories', 'Coding'],
    theme: 'College & Building',
  },
  {
    id: 'day-chai-after-deadlines',
    date: 'April 2025',
    year: 2025,
    title: 'Post-Finals Tea Stall Debrief',
    location: 'Outside College Gate, Panvel',
    caption: 'No deadlines left. Just four friends discussing which movie to watch first.',
    story: 'That distinct feeling when the final semester paper is submitted and the adrenaline abruptly leaves your body. You sit on plastic stools outside the gate, drink chai from glass cups, and realize that four years of your life just became memories. Those are the moments you carry forever.',
    tags: ['College Life', 'Friendship', 'PCE Panvel', 'Memory'],
    theme: 'Friendship & Life',
  },
]
