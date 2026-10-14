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
      slug: 'the-truman-show',
      title: 'The Truman Show',
      director: 'Peter Weir',
      year: 1998,
      genre: 'Drama / Satire',
      favoriteQuote: 'In case I don\'t see ya: Good afternoon, good evening, and good night!',
      memorableScene: 'Truman sailing the Santa Maria into the painted sky horizon, puncturing the dome, and taking a polite bow before stepping through the exit door into total darkness.',
      whyILoveIt: 'Beyond its critique of media surveillance, The Truman Show is the most honest film ever made about the terror of growing up. Truman lives inside an artificial, comfortable dome where nothing can hurt him, but nothing is real. The decision to step through that door into uncertainty is what every young person must face.',
      whatItMadeMeFeel: 'A profound sense of existential liberation. It reminds me that staying comfortable is a dangerous trap, and that autonomy always costs certainty.',
      theme: 'Existential Courage & Autonomy',
      accentColor: '#3b68ff',
      linkedEssaySlug: 'the-films-and-idols-that-shaped-me',
    },
    {
      slug: 'dead-poets-society',
      title: 'Dead Poets Society',
      director: 'Peter Weir',
      year: 1989,
      genre: 'Drama',
      favoriteQuote: 'We don\'t read and write poetry because it\'s cute. We read and write poetry because we are members of the human race. And the human race is filled with passion.',
      memorableScene: 'John Keating leading the boys into the trophy hall, whispering into the quiet room as they stare at photographs of former students from a century ago: "Carpe Diem. Seize the day, boys. Make your lives extraordinary."',
      whyILoveIt: 'Robin Williams gave a performance that redefined intellectual rebellion for me. In an engineering discipline where people obsess over grades, certificates, and corporate packages, Keating reminds you that technical mastery sustains life, but passion, art, and empathy are what we stay alive for.',
      whatItMadeMeFeel: 'Inspired to live deliberately. It gave me permission to care deeply about things that cannot be quantified on a resume.',
      theme: 'Intellectual Freedom & Purpose',
      accentColor: '#e1523d',
      linkedEssaySlug: 'the-films-and-idols-that-shaped-me',
    },
    {
      slug: 'the-dark-knight',
      title: 'The Dark Knight',
      director: 'Christopher Nolan',
      year: 2008,
      genre: 'Neo-Noir / Superhero',
      favoriteQuote: 'Because he\'s the hero Gotham deserves, but not the one it needs right now.',
      memorableScene: 'The social experiment on the two ferries. When the convict throws the detonator into the river and the civilian businessman sets the detonator down, proving that ordinary people under terrifying pressure can still choose decency.',
      whyILoveIt: 'The Dark Knight is not a superhero brawl; it is an interrogation of human morality. Nolan demonstrated that true courage is refusing to become cynical, even when the world gives you every rational excuse to stop believing in people.',
      whatItMadeMeFeel: 'Humbled by moral conviction. It taught me that strength is quiet, and that doing the right thing rarely earns applause.',
      theme: 'Moral Courage Under Terror',
      accentColor: '#6b7280',
      linkedEssaySlug: 'why-we-need-heroes',
    },
    {
      slug: 'spider-man-2',
      title: 'Spider-Man 2',
      director: 'Sam Raimi',
      year: 2004,
      genre: 'Superhero / Drama',
      favoriteQuote: 'I believe there\'s a hero in all of us, that keeps us honest, gives us strength, makes us noble, and finally allows us to die with pride...',
      memorableScene: 'The elevated train sequence. Peter webbing the tracks with his bare hands until his suit tears, passing out from physical exhaustion, and regular commuters gently carrying his bruised body into the train car, promising not to tell anyone who he is.',
      whyILoveIt: 'Peter Parker is the definitive hero because having superpowers doesn’t fix his overdue rent, his failing college grades, or his strained relationships. He carries the burden of caring because inaction when you have the power to help is an abdication of character.',
      whatItMadeMeFeel: 'A deep respect for everyday sacrifice. It shows that caring about others is exhausting and unglamorous, but indispensable.',
      theme: 'Responsibility & Everyday Sacrifice',
      accentColor: '#ef4444',
      linkedEssaySlug: 'why-we-need-heroes',
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
    },
  ],

  books: [
    {
      id: 'steve-jobs-walter-isaacson',
      title: 'Steve Jobs',
      author: 'Walter Isaacson',
      year: 2011,
      genre: 'Biography / Technology & Design',
      whyChosen: 'Steve Jobs showed that technology at its highest level is not merely functional engineering — it sits at the intersection of liberal arts and sciences. Isaacson\'s biography is unflinching: it does not sanitize Jobs’s flaws or temper tantrums, making his achievements and design philosophies even more instructive.',
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
    },
  ],
}
