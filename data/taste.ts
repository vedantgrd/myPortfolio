export interface FilmEntry {
  slug: string
  title: string
  director: string
  year: number
  genre: string
  favoriteQuote: string
  memorableScene: string
  whyILoveIt: string
  whatItMadeMeFeel: string
  theme: string
  accentColor: string
  posterUrl: string
  linkedEssaySlug?: string
}

export interface MusicArtist {
  id: string
  name: string
  era: string
  genre: string
  notableWorks: string[]
  whyTheyMatter: string
  musicalImpact: string
  personalNote?: string
  accentColor: string
  posterUrl: string
}

export interface BookEntry {
  id: string
  title: string
  author: string
  year: number
  genre: string
  whyChosen: string
  coreTakeaways: string[]
  memorablePassage: {
    text: string
    context: string
  }
  personalReflection: string
  posterUrl: string
  linkedEssaySlug?: string
}

export interface TasteCollection {
  films: FilmEntry[]
  artists: MusicArtist[]
  books: BookEntry[]
}

export const tasteData: TasteCollection = {
  films: [
    {
      slug: 'taxi-driver',
      title: 'Taxi Driver',
      director: 'Martin Scorsese',
      year: 1976,
      genre: 'Psychological Neo-Noir / Drama',
      favoriteQuote: 'Loneliness has followed me my whole life, everywhere. In bars, in cars, sidewalks, stores, everywhere. There\'s no escape. I\'m God\'s lonely man.',
      memorableScene: 'Travis Bickle pacing in his bare apartment, staring into the mirror, rehearsing confrontation with his imaginary reflection: "You talkin\' to me? ... Well, I\'m the only one here."',
      whyILoveIt: 'The definitive cinematic portrait of isolation, urban alienation, and the distortion of morality. Scorsese and Paul Schrader craft a protagonist who desperately yearns for moral purpose and human connection, but is slowly poisoned by the cold indifference of a city that watches him drift into madness.',
      whatItMadeMeFeel: 'Unsettled, deeply reflective, and acutely aware of how quiet loneliness can warp a person’s perception of reality.',
      theme: 'Urban Alienation, Loneliness & Moral Ambiguity',
      accentColor: '#e1523d',
      posterUrl: '/images/taste/taxi-driver.jpg',
    },
    {
      slug: 'manchester-by-the-sea',
      title: 'Manchester by the Sea',
      director: 'Kenneth Lonergan',
      year: 2016,
      genre: 'Drama',
      favoriteQuote: 'I can\'t beat it. I can\'t beat it. I\'m sorry.',
      memorableScene: 'The sidewalk encounter between Lee and Randi. Randi tearfully pleads for forgiveness and tries to unburden both of them, but Lee cannot bear it — his hands tremble, he stammers, and walks away because some grief cannot be healed with a Hollywood reconciliation.',
      whyILoveIt: 'The most brutally honest film about grief ever put on screen. It refuses to flatter the audience with false catharsis or easy redemption arcs. Some tragedies permanently fracture you; you don\'t "move on," you simply learn to survive inside the silence.',
      whatItMadeMeFeel: 'Humbled by real human sorrow. It teaches you that listening and letting someone just exist with their pain is more compassionate than demanding they cheer up.',
      theme: 'Grief, Irreparable Loss & Quiet Dignity',
      accentColor: '#3b68ff',
      posterUrl: '/images/taste/manchester-by-the-sea.jpg',
    },
    {
      slug: 'shutter-island',
      title: 'Shutter Island',
      director: 'Martin Scorsese',
      year: 2010,
      genre: 'Psychological Thriller / Mystery',
      favoriteQuote: 'Which would be worse: to live as a monster, or to die as a good man?',
      memorableScene: 'The final quiet exchange on the stone hospital steps. Teddy Daniels looks at Chuck, drops the devastating final line, stands up, and calmly walks with the orderlies toward the lighthouse, having chosen his own tragic peace.',
      whyILoveIt: 'A psychological tour-de-force exploring guilt, denial, and the elaborate mental fortresses we construct to evade unbearable truth. DiCaprio’s descent is masterfully choreographed with atmospheric storm lighting, ominous classical dissonance, and unforgettable pacing.',
      whatItMadeMeFeel: 'Chilled by the power of the human subconscious to rewrite memory to survive guilt.',
      theme: 'Guilt, Memory Denial & Tragic Autonomy',
      accentColor: '#10b981',
      posterUrl: '/images/taste/shutter-island.jpg',
    },
    {
      slug: 'the-hangover',
      title: 'The Hangover',
      director: 'Todd Phillips',
      year: 2009,
      genre: 'Comedy / Mystery',
      favoriteQuote: 'Remember, what happens in Vegas stays in Vegas. Except for herpes, that shit\'ll come back with you.',
      memorableScene: 'The morning-after suite reveal. Stepping through the shattered suite with a burning sofa, a wandering rooster, a baby in the closet, and a live Bengal tiger in the bathroom while nobody remembers a single minute of the night.',
      whyILoveIt: 'Unlike superficial comedy, The Hangover is engineered like a razor-sharp mystery procedural. Every absurd artifact discovered in the morning connects logically to the chaotic night before. Unapologetic kinetic comedy with timeless chemistry between Cooper, Helms, and Galifianakis.',
      whatItMadeMeFeel: 'Pure unadulterated joy. A reminder that cinema doesn’t always have to be solemn; sometimes genius is making millions of people laugh uncontrollably at sheer chaos.',
      theme: 'Brotherhood, Kinetic Comedy & Chaos',
      accentColor: '#f59e0b',
      posterUrl: '/images/taste/hangover.jpg',
    },
  ],

  artists: [
    {
      id: 'one-direction',
      name: 'One Direction',
      era: '2010 — 2016',
      genre: 'Pop / Pop Rock',
      notableWorks: ['Night Changes', 'Story of My Life', 'History', 'Midnight Memories'],
      whyTheyMatter: 'One Direction was the soundtrack to growing up. Their music carries an unmistakable nostalgia of school afternoons, friendship, and the bittersweet passage of time before adult responsibilities set in.',
      musicalImpact: 'Defined a global generation with acoustic-driven vocal harmonies and stadium anthems that aged surprisingly well.',
      personalNote: 'Songs like "Night Changes" hit differently as you enter your twenties and realize how quickly people and chapters drift apart.',
      accentColor: '#e1523d',
      posterUrl: '/images/taste/one-direction.jpg',
    },
    {
      id: 'the-beatles',
      name: 'The Beatles',
      era: '1960 — 1970',
      genre: 'Rock / Psychedelic / Pop',
      notableWorks: ['Yesterday', 'Let It Be', 'Here Comes the Sun', 'In My Life'],
      whyTheyMatter: 'The Beatles represent the gold standard of songwriting craftsmanship. The melodic clarity of Paul McCartney combined with the philosophical introspection of John Lennon created melodies that feel discovered rather than merely written.',
      musicalImpact: 'Revolutionized studio recording, chord progressions, and proved that popular music could be as emotionally complex as literature.',
      personalNote: '"In My Life" is perhaps the most poignant three minutes of music ever recorded about memory and the people who shaped you.',
      accentColor: '#f59e0b',
      posterUrl: '/images/taste/the-beatles.jpg',
    },
    {
      id: 'michael-jackson',
      name: 'Michael Jackson',
      era: '1970 — 2009',
      genre: 'Pop / R&B / Soul / Rock',
      notableWorks: ['Billie Jean', 'Man in the Mirror', 'Beat It', 'Smooth Criminal'],
      whyTheyMatter: 'An incomparable standard of performance discipline and rhythmic mastery. Jackson taught the world that rhythm is not just percussion — it lives in the breath, the vocal hitch, the bassline, and pure physical expression.',
      musicalImpact: 'Redefined music videos into cinematic short films and broke racial barriers across global media.',
      personalNote: '"Man in the Mirror" is an anthem of personal accountability: if you want to make the world a better place, look at yourself and make that change.',
      accentColor: '#3b68ff',
      posterUrl: '/images/taste/michael-jackson.jpg',
    },
    {
      id: 'the-smiths',
      name: 'The Smiths',
      era: '1982 — 1987',
      genre: 'Indie Rock / Post-Punk / Jangle Pop',
      notableWorks: ['There Is a Light That Never Goes Out', 'This Charming Man', 'Please, Please, Please Let Me Get What I Want', 'How Soon Is Now?'],
      whyTheyMatter: 'The juxtaposition of Johnny Marr\'s bright, arpeggiated Rickenbacker guitar chords with Morrissey\'s darkly humorous, melancholic lyrics captures the precise feeling of youth alienation and longing.',
      musicalImpact: 'Pioneered independent guitar pop in Britain and influenced alternative rock bands for decades.',
      personalNote: 'Perfect music for late-night walks and quiet commutes on the Mumbai suburban railway when your head is full of unresolved thoughts.',
      accentColor: '#10b981',
      posterUrl: '/images/taste/the-smiths.jpg',
    },
  ],

  books: [
    {
      id: 'steve-jobs-walter-isaacson',
      title: 'Steve Jobs',
      author: 'Walter Isaacson',
      year: 2011,
      genre: 'Biography / Technology & Design',
      whyChosen: 'Steve Jobs proved that technology at its zenith sits at the intersection of liberal arts and sciences. Isaacson\'s biography is unflinching: it does not sanitize Jobs’s flaws or temper tantrums, making his achievements and design philosophies even more instructive.',
      coreTakeaways: [
        'The intersection of humanities and engineering is where products become memorable.',
        'Simplicity is the ultimate sophistication; removing clutter is much harder than adding features.',
        'A team of A-players thrives when held to uncompromising standards, but empathy must not be discarded in the process.',
        'Caring about the parts unseen: the back of the cabinet, the hidden traces on a circuit board, the subtle micro-interactions.',
      ],
      memorablePassage: {
        text: 'The people who are crazy enough to think they can change the world are the ones who do.',
        context: 'From the iconic 1997 "Think Different" campaign narrative recounted in the biography.',
      },
      personalReflection: 'Reading this book made me realize why I refuse to settle for boring, default developer portfolios with purple gradients. Jobs believed that tools should be beautiful, tactile, and respect the dignity of the person using them. As an engineering student, that philosophy shapes how I build Vidyut and how I design this living archive.',
      posterUrl: '/images/taste/steve-jobs.jpg',
    },
    {
      id: 'atomic-habits-james-clear',
      title: 'Atomic Habits',
      author: 'James Clear',
      year: 2018,
      genre: 'Psychology / Systems & Personal Growth',
      whyChosen: 'Dismantles the deceptive cult of "overnight motivation" and replaces it with deterministic systems engineering for human behavior. Clear demonstrates that goals are overrated; systems and compounding iterations are what dictate real trajectories.',
      coreTakeaways: [
        'You do not rise to the level of your goals. You fall to the level of your systems.',
        'Small habits don’t add up; they compound exponentially over years.',
        'Identity-based habit formation: decide who you want to be, then prove it to yourself with small consistent wins.',
        'Environment design is far more effective than relying on volatile willpower.',
      ],
      memorablePassage: {
        text: 'Every action you take is a vote for the type of person you wish to become.',
        context: 'On the foundational shift from outcome-based habits to identity-based habits.',
      },
      personalReflection: 'Writing code for Vidyut and working out regularly taught me that Clear is 100% right. When you show up every day to write 50 lines or balance one drone propeller, nothing seems different that afternoon. But 18 months later, you have built things most people only talk about.',
      posterUrl: '/images/taste/atomic-habits.jpg',
    },
    {
      id: 'design-of-everyday-things-don-norman',
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      year: 2013,
      genre: 'Cognitive Science / Human-Centered Design',
      whyChosen: 'The definitive foundation on human affordances, signifiers, and feedback loops. Norman argues that when humans push the wrong door or crash a system, it is almost always a failure of design affordance, not user incompetence.',
      coreTakeaways: [
        'Good design is invisible; poor design screams with frustration.',
        'Affordances and signifiers must communicate physical and digital possibilities instinctively.',
        'Immediate, unambiguous feedback is required to close the human cognitive execution loop.',
        'Human-centered design starts with understanding people, not forcing people to understand the computer.',
      ],
      memorablePassage: {
        text: 'Good design is actually a lot harder to notice than poor design, in part because good designs fit our needs so well that the design is invisible.',
        context: 'On why people blame themselves for bad door handles and confusing software interfaces.',
      },
      personalReflection: 'Crucial for our Agriculture Drone ground control station. In a dusty open field under bright sunlight, a farmer or student cannot navigate nested menus. Norman’s principles dictated high-contrast telemetry indicators and unambiguous physical controls.',
      posterUrl: '/images/taste/design-of-everyday-things.jpg',
    },
    {
      id: 'deep-work-cal-newport',
      title: 'Deep Work',
      author: 'Cal Newport',
      year: 2016,
      genre: 'Productivity / Cognitive Craftsmanship',
      whyChosen: 'In a distracted culture addicted to social dopamine loops and fragmented multitasking, Newport provides an intellectual defense of uninterrupted, long-form concentration as a rare and valuable economic capability.',
      coreTakeaways: [
        'Deep work: professional activities performed in a state of distraction-free concentration that push cognitive capabilities to their limit.',
        'Shallow work keeps you busy but creates zero durable value and is easily outsourced or automated.',
        'Embrace boredom: training your brain to resist instant distraction is a prerequisite for complex engineering.',
        'Drain the shallows: ruthlessly protect deep working blocks from superficial meeting schedules.',
      ],
      memorablePassage: {
        text: 'The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy.',
        context: 'The central thesis on why depth of concentration is the ultimate competitive advantage.',
      },
      personalReflection: 'Whether it is tracking down an asynchronous race condition in the supply chain simulator or writing a deeply vulnerable essay on mental health, nothing worthwhile gets produced in fragmented five-minute slices. Deep work is where craft happens.',
      posterUrl: '/images/taste/deep-work.jpg',
    },
  ],
}
