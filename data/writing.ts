export interface Article {
  slug: string
  title: string
  subtitle: string
  date: string
  readTime: string
  category: 'Being Human' | 'Cinema & Culture' | 'Real Life & Journeys' | 'Books & Idols' | 'Systems & Engineering'
  tags: string[]
  featured: boolean
  excerpt: string
  coverImage?: {
    url: string
    caption: string
  }
  content: {
    lead: string
    sections: {
      heading?: string
      paragraphs: string[]
      image?: {
        url: string
        caption: string
      }
      codeBlock?: {
        language: string
        filename?: string
        code: string
      }
      callout?: {
        type: 'note' | 'insight' | 'warning' | 'quote'
        title: string
        body: string
      }
    }[]
  }
}

export const articles: Article[] = [
  {
    slug: 'so-suicide',
    title: 'So, Suicide.',
    subtitle: 'On RJ Mitte, Robin Williams, Men’s Mental Health, and Why We Mistake Making Others Happy for Happiness Itself',
    date: 'Recent Journal Entry',
    readTime: '5 min read',
    category: 'Being Human',
    tags: ['Mental Health', 'Life & Death', 'Vulnerability', 'Men', 'Cinema', 'Memoir'],
    featured: true,
    excerpt: 'How can someone who brings happiness into other people’s lives be hurting so much inside? It makes you wonder how often we mistake someone’s ability to make others happy for happiness itself.',
    content: {
      lead: 'I woke up to the news of RJ Mitte from Breaking Bad allegedly dying by suicide, and I couldn\'t believe what I was reading. Seeing people talk about his kindness, humility, and how genuinely sweet he was made me wonder about something.',
      sections: [
        {
          heading: 'Why?',
          paragraphs: [
            'How can someone who brings happiness into other people\'s lives be hurting so much inside?',
            'According to the World Health Organization, more than 720,000 people die by suicide every year. Behind every number is a person, a family, a friend, and a story we\'ll never fully know.',
            'Think about it. Someone you see laughing, someone who seems to be living their life to the fullest, someone who always makes sure everyone else is okay. You never really know what they\'re fighting when they\'re alone.',
          ],
          callout: {
            type: 'quote',
            title: 'The Paradox of the Smiling Face',
            body: 'Robin Williams made the world laugh, yet he died by suicide in 2014. Kapil Sharma and Yo Yo Honey Singh have spoken publicly about their struggles with mental health, too. It makes you wonder how often we mistake someone\'s ability to make others happy for happiness itself.',
          },
        },
        {
          heading: 'And Then There\'s the Question of Men.',
          paragraphs: [
            'We grow up hearing that men don\'t cry, that they have to be strong, that they must provide, succeed, and figure everything out on their own. We laugh when a man expresses his emotions. We tell him to "man up" when he admits he\'s struggling.',
            'But who does he talk to when he doesn\'t feel strong anymore?',
            'This isn\'t to say women don\'t suffer. They do, and their pain deserves just as much attention. But I think we need to talk more about the way men are taught to hide theirs.',
            'Maybe we should check on our friends more often. Maybe we should listen instead of immediately offering solutions. Maybe we should stop assuming that the person who makes everyone laugh has nothing to cry about.',
            'And maybe we should learn to say, "I\'m not okay," without feeling ashamed of it.',
          ],
        },
        {
          heading: 'None of Us Knows How Our Story Ends',
          paragraphs: [
            'I don\'t have the answers. I don\'t think anyone has one answer that explains every person\'s pain. And I don\'t want to pretend that a few words can solve something this complicated.',
            'But incidents like these force me to think about life. About how I\'m living mine, about the people around me, and about all the things we leave unsaid because we assume there will always be another day.',
            'Sometimes, I wonder if this is simply a part of life. That all of us, in one way or another, will eventually have to leave it. None of us knows how our story ends, or when the last ordinary day will turn into a memory.',
            'I don\'t know how to live my life yet. I\'m still figuring it out. But every time something like this happens, it makes me stop and think about how I want to live, what I want to mean to people, and whether I\'m giving the people I love enough reasons to know that they matter.',
            'And somehow, after all these thoughts, I still find myself returning to the same question I started with.',
          ],
          callout: {
            type: 'insight',
            title: 'Why?',
            body: 'I don\'t know. But I hope we learn to listen a little more, judge a little less, and tell the people around us that they matter while they\'re still here to hear it.',
          },
        },
        {
          heading: 'To Anyone Finding It Hard',
          paragraphs: [
            'And if you\'re reading this and life has been particularly difficult lately, I hope you give yourself the chance to see what tomorrow might bring. You don\'t have to figure everything out today.',
            'Because, as a certain movie once reminded us, we never really know what life has waiting around the corner.',
            'And just in case I don\'t see you...',
            'Good afternoon, good evening, and good night.',
          ],
        },
      ],
    },
  },
  {
    slug: 'orphanage-visit-human-values',
    title: 'Some Experiences Teach You What No Classroom Can',
    subtitle: 'Visiting an Orphanage, Social Responsibility, and Why I Want to Stay and Build in India',
    date: 'College Journal',
    readTime: '3 min read',
    category: 'Real Life & Journeys',
    tags: ['Human Values', 'Social Ethics', 'Student Life', 'Perspective', 'India', 'Pillai College of Engineering'],
    featured: true,
    excerpt: 'We often get so caught up in academics, careers, placements, and our own goals that we forget to look beyond ourselves. Spending time at the orphanage made me realize how much we take for granted.',
    content: {
      lead: 'Some experiences teach you things that no classroom can. This week, as a part of our Human Values and Social Ethics subject, under the module Socialization, we had the opportunity to visit an orphanage and spend some time there.',
      sections: [
        {
          heading: 'Looking Beyond Ourselves',
          paragraphs: [
            'Honestly, it was an eye-opening experience.',
            'We often get so caught up in academics, careers, placements, and our own goals that we sometimes forget to look beyond ourselves. Spending time there made me realise how much we take certain things in life for granted and how important it is to contribute to the society around us, even in small ways.',
          ],
          callout: {
            type: 'insight',
            title: 'Why I Want to Build in India',
            body: 'It also made me think about something more personal. I have always thought about building my career and exploring opportunities outside India, but experiences like these remind me why I want to stay here and hopefully be a part of creating positive change in my own country.',
          },
        },
        {
          heading: 'Change Starts With Showing Up',
          paragraphs: [
            'Change does not always have to start with something huge. Sometimes, it starts with showing up, listening, understanding, and simply being there.',
            'A big thank you to my college, Pillai College of Engineering, and the faculty members for encouraging us to participate in activities like these instead of limiting our learning to academics. These are the experiences that stay with you long after the class is over.',
            'Grateful for the experience and the perspective it gave me. 🇮🇳',
          ],
        },
      ],
    },
  },
  {
    slug: 'why-we-need-heroes',
    title: 'Why We Need Heroes: Spider-Man, Batman, and the Burden of Caring',
    subtitle: 'What Pop Culture, Superheroes, and Cinema Taught Me About Guilt, Duty, and Becoming an Adult',
    date: 'Film & Pop Culture Notes',
    readTime: '6 min read',
    category: 'Cinema & Culture',
    tags: ['Cinema', 'Superheroes', 'Spider-Man', 'Batman', 'Pop Culture', 'Morality'],
    featured: false,
    excerpt: 'The reason Spider-Man endures isn\'t because he can crawl up walls; it\'s because he catches a train with his bare hands, passes out from exhaustion, and everyday commuters gently carry him back, promising not to tell anyone who he is.',
    content: {
      lead: 'Whenever people dismiss superhero films as childish CGI noise, I think they miss the point entirely. The greatest superhero stories aren\'t power fantasies. They are stories about the excruciating burden of having a conscience.',
      sections: [
        {
          heading: 'The Rent is Late, but the City Needs You',
          paragraphs: [
            'Look at Peter Parker. He doesn\'t get a billionaire trust fund or a high-tech fortress. He has a bruised shoulder, wet socks from swinging through winter rain, and a landlord knocking on his door for overdue rent. He misses dinner with Mary Jane because an armored madman is tearing up the West Side highway.',
            'Spider-Man taught my generation that doing the right thing rarely comes with applause. Most of the time, doing the right thing costs you personal comfort, sleep, and relationships. Yet, you get back up anyway because "when you can do the things that I can, but you don\'t, and then the bad things happen, they happen because of you."',
          ],
        },
        {
          heading: 'The Dark Knight and the Moral Anchor',
          paragraphs: [
            'In Christopher Nolan\'s The Dark Knight, Batman doesn\'t win by beating up the Joker in physical combat. The climax of the film isn\'t a brawl; it\'s two civilian ferry boats refusing to blow each other up. The hero\'s true victory is proving that humanity, under the worst imaginable terror, can choose not to become monsters.',
            'Cinema gives us modern mythology. When the real world feels cynical, fragmented, and exhausting, watching someone stand firm on their principles — even when it ruins them — gives you a reason to hold your head a little higher the next morning.',
          ],
          callout: {
            type: 'quote',
            title: 'Why Superheroes Matter to Builders',
            body: 'Engineers build tools, but stories build character. A person with immense technical power and zero empathy is a villain in every comic book ever written. Heroes remind us that ability without sacrifice is just vanity.',
          },
        },
      ],
    },
  },
  {
    slug: 'the-films-and-idols-that-shaped-me',
    title: 'The Films, Books, and Idols That Built My Moral Compass',
    subtitle: 'Dead Poets Society, The Truman Show, Interstellar, and Choosing to Live Deliberately',
    date: 'Personal Archive',
    readTime: '5 min read',
    category: 'Books & Idols',
    tags: ['Cinema', 'Books', 'Robin Williams', 'Idols', 'Philosophy', 'Memoir'],
    featured: false,
    excerpt: 'There are certain scenes in cinema that alter your DNA. When Robin Williams stands on the desk in Dead Poets Society, or when Truman bows to the camera and walks through the door into the unknown.',
    content: {
      lead: 'I have always been deeply moved by films and books. In an era where everyone is trying to optimize their time, reading a novel or sitting in a dark theater watching a story unfold is the closest we come to experiencing someone else’s soul.',
      sections: [
        {
          heading: 'O Captain! My Captain!',
          paragraphs: [
            'Dead Poets Society ruined me in the best way possible. John Keating whispering to teenagers in front of black-and-white photos of past students: "They\'re not that different from you, are they? Same haircuts. Full of hormones, just like you. Invincible, just like you feel... But if you listen real close, you can hear them whisper their legacy to you. Carpe Diem. Seize the day, boys. Make your lives extraordinary."',
            'Robin Williams didn\'t just play a teacher; he personified the joy of intellectual rebellion. He showed that poetry, beauty, romance, and love are what we stay alive for.',
          ],
        },
        {
          heading: 'The Truman Show and the Courage to Leave',
          paragraphs: [
            'Peter Weir\'s The Truman Show is often treated as a commentary on media and reality TV, but to me, it has always been about existential courage. Truman Burbank has a comfortable life. He has a picket-fence house, a steady job, and predictable routines. But it is an artificial dome built to keep him contained.',
            'When he sails his small boat to the literal edge of his world, punctures the sky, and finds the exit door, Christof speaks from the clouds: "There\'s no more truth out there than there is in the world I created for you. Same lies. Same deceit. But in my world, you have nothing to fear." And Truman simply smiles, takes a bow, and steps into the dark unknown.',
            'That is what growing up feels like. It is terrifying, uncertain, and completely unfinished. But you have to step through the door.',
          ],
        },
      ],
    },
  },
  {
    slug: 'unfinished-by-design',
    title: 'Unfinished by Design: Why I Prefer Messy Prototypes Over Polished Slides',
    subtitle: 'A Personal Manifesto on Learning in Public, Technical Curiosity, and Rejecting the Cult of Perfection',
    date: 'March 2026',
    readTime: '4 min read',
    category: 'Being Human',
    tags: ['Philosophy', 'Learning', 'Personal', 'Unfinished', 'Memoir'],
    featured: false,
    excerpt: 'The internet is drowning in developers pretending to be 10x rockstars with flawlessly organized GitHub profiles and polished personal brands. Here is why I’d rather show you my broken prototypes, my strange experiments, and the things I haven’t figured out yet.',
    content: {
      lead: 'There is an unspoken pressure in modern tech culture to present yourself as a finished product. Your portfolio is supposed to look like a Silicon Valley agency website. Your GitHub history should be a seamless green checkerboard. Your projects should all claim "scaled to 100k active users" even if the only person who ever logged in was your roommate.',
      sections: [
        {
          heading: '1. The Deception of the Polished Portfolio',
          paragraphs: [
            'I spent months looking at typical developer websites. They all blur together: neon purple gradients, floating 3D astronauts, identical cards with three tech tags, and a list of arbitrary skill bars claiming "React: 95%, Python: 90%". What does 95% React even mean? Did you contribute to the React core reconciler, or did you follow a tutorial and know how to call useState?',
            'When you hide all the friction, you also hide all the thinking. You hide the night you spent three hours tracking down a CORS error caused by a trailing slash in an environment variable. You hide the drone prototype that crashed because you reversed two servo pins. You hide the real person.',
          ],
        },
        {
          heading: '2. "UNFINISHED" as an Engineering & Life Philosophy',
          paragraphs: [
            'I chose to name this digital space VEDANT / UNFINISHED not as an excuse for sloppy work, but as a commitment to intellectual and emotional honesty. A good human being is never finished. The moment you think you have mastered yourself or software, an entire paradigm shifts, or life humbles you with an unexpected turn.',
            'An unfinished website allows for living experiments. It means I can write about mental health and suicide alongside a supply chain simulator. It means I can talk about visiting an orphanage in India right next to low-level Python collision physics.',
          ],
          callout: {
            type: 'note',
            title: 'A Living Memoir',
            body: 'This website is not just for recruiters. If I leave this earth tomorrow, I want this place to reflect who I genuinely was: a curious, flawed, empathetic kid who loved movies, cared about people, built strange machines, and tried his best to make sense of the world.',
          },
        },
      ],
    },
  },
  {
    slug: 'why-agents-understand-chaos',
    title: 'Why We Need Agents That Understand Chaos',
    subtitle: 'Notes on the Bullwhip Effect, Perishable Logistics, and Why Independent Rationality Causes Collective Failure',
    date: 'February 2026',
    readTime: '6 min read',
    category: 'Systems & Engineering',
    tags: ['Multi-Agent AI', 'Supply Chain', 'Simulation', 'System Dynamics'],
    featured: false,
    excerpt: 'When consumer demand shifts by 5%, the upstream factory orders often shift by 40%. In food supply chains, this oscillation doesn’t just cause inventory waste — it causes tons of fresh food to rot. Here is why autonomous agents with signal dampening are our best hope.',
    content: {
      lead: 'Every supply chain researcher knows the classical Beer Game: players act as retailers, wholesalers, and breweries. Even when customer demand stays nearly constant with just a tiny bump, panic cascades backwards. By round twenty, the brewery is producing five times what the market drinks, drowning in backlogs and cancelled orders. When I started working on Bullwhip AI, I wondered: why does collective intelligence collapse so predictably when each actor makes locally rational decisions?',
      sections: [
        {
          heading: '1. The Anatomy of an Amplified Wave',
          paragraphs: [
            'The core mathematical driver of the bullwhip effect is not malice or incompetence. It is time lag combined with independent safety stock calculation. When a retailer experiences an unexpected run on an item, they do two things simultaneously: they order enough to cover the shortfall, and they raise their safety buffer to prepare for higher future demand.',
            'The wholesaler receives this magnified order, misinterprets it as a permanent upward shift in baseline demand, and repeats the same calculation with an even larger safety multiplier. By the time this signal reaches the raw agricultural producer or factory, a 5% consumer spike has mutated into an uncontrollable 35% oscillation wave.',
          ],
          codeBlock: {
            language: 'typescript',
            filename: 'inventory-policy.ts',
            code: `// The naive local reorder formula that triggers upstream chaos
function naiveReorder(demandEstimate: number, leadTime: number, safetyMultiplier: number): number {
  const safetyStock = safetyMultiplier * Math.sqrt(leadTime) * demandVariance;
  // Local actor orders for immediate deficit PLUS magnified safety buffer
  return Math.max(0, demandEstimate * leadTime + safetyStock - currentInventory);
}`,
          },
        },
        {
          heading: '2. Why Perishable Food Chains Suffer Most',
          paragraphs: [
            'In electronics or automotive hardware, excess inventory is an expensive financial liability. In food supply chains, it is an ecological disaster. Fresh produce, milk, and seasonal staples cannot wait in a warehouse for demand to recover. If a distributor over-orders tomatoes because of a phantom signal, thousands of pounds rot on loading docks.',
          ],
          callout: {
            type: 'insight',
            title: 'The Core Simulation Finding',
            body: 'When agents share point-of-sale customer demand directly with upstream tiers rather than relying solely on their immediate downstream neighbor’s order volume, upstream order variance drops by more than 30%. Transparency dampens panic.',
          },
        },
      ],
    },
  },
  {
    slug: 'hardware-software-agridrone',
    title: 'Bridging the Physical Divide: What Building a Drone Taught Me About Software',
    subtitle: 'From Clean Code to Motor Telemetry, Wind Drift, and Why Field Testing Humbles Every Programmer',
    date: 'November 2025',
    readTime: '7 min read',
    category: 'Systems & Engineering',
    tags: ['Robotics', 'Android', 'IoT', 'Embedded Systems', 'Agridrone'],
    featured: false,
    excerpt: 'On a computer, when an exception occurs, you get a clean stack trace. On a 1.5kg quadcopter flying 20 meters above ground, an unhandled race condition means carbon fiber props snapping against dirt. Here are the hard lessons from building Agridrone.',
    content: {
      lead: 'As software developers, we live in a comforting sandbox of deterministic abstractions. Memory allocators clean up after us, garbage collectors sweep up unused references, and unit tests execute in milliseconds. The moment you solder a telemetry transceiver onto a drone flight controller and take it out into an open field in Maharashtra, that comfortable delusion ends.',
      sections: [
        {
          heading: '1. Reality Does Not Throw Exceptions',
          paragraphs: [
            'When we began building the Agriculture Drone (Agridrone), our goal was straightforward on paper: build a quadcopter that captures aerial crop imagery, streams telemetry over a 433MHz serial link to a custom Android ground station, and tags GPS coordinates for crop health analysis.',
            'The first test flight lasted eight seconds. The drone lifted, wavered, drifted violently to the left, and flipped. The culprit wasn’t our Android app or our flight path logic. It was high-frequency motor vibrations traveling through the airframe into the flight controller’s gyroscope, convincing the onboard attitude estimator that the drone was tilting when it was actually level. The firmware responded by overcompensating, causing an immediate feedback loop.',
          ],
          callout: {
            type: 'warning',
            title: 'Lesson in Physical Isolation',
            body: 'You cannot debug physics with print statements. We had to physically dampen the flight controller mount with silicone grommets and re-balance every rotor blade individually before writing a single line of telemetry code.',
          },
        },
      ],
    },
  },
]
