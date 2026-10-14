export interface CulturalWork {
  slug: string
  title: string
  creator: string
  year: number
  type: 'Film' | 'Television' | 'Superhero & Pop Culture' | 'Book'
  dateExperienced: string
  favoriteQuote: string
  favoriteSceneOrMoment: string
  reflection: string
  theme: string
  accentColor: string
  linkedArticleSlug?: string
}

export const culturalWorks: CulturalWork[] = [
  {
    slug: 'the-truman-show',
    title: 'The Truman Show',
    creator: 'Peter Weir',
    year: 1998,
    type: 'Film',
    dateExperienced: 'Rewatched Late 2025',
    favoriteQuote: 'In case I don\'t see ya: Good afternoon, good evening, and good night!',
    favoriteSceneOrMoment: 'Truman sailing the Santa Maria into the literal painted horizon, tearing a hole in the sky, and taking a bow before stepping into the dark unknown.',
    reflection: 'Everyone treats this as a movie about reality TV and hidden cameras. To me, it is the purest metaphor for growing up. We all live inside comfortable, predictable domes constructed by family, society, and institutions. Puncturing the sky and walking through the exit door into total uncertainty is terrifying — but it is the only way to become real.',
    theme: 'Existential Courage & Autonomy',
    accentColor: '#3b68ff',
    linkedArticleSlug: 'the-films-and-idols-that-shaped-me',
  },
  {
    slug: 'dead-poets-society',
    title: 'Dead Poets Society',
    creator: 'Peter Weir',
    year: 1989,
    type: 'Film',
    dateExperienced: 'First watched in 2023',
    favoriteQuote: 'We don\'t read and write poetry because it\'s cute. We read and write poetry because we are members of the human race. And the human race is filled with passion.',
    favoriteSceneOrMoment: 'John Keating leading the boys into the trophy hall to look at photographs of boys from a hundred years ago, whispering: "Carpe Diem."',
    reflection: 'Robin Williams in this movie gave me a standard for how I want to think. In engineering college, it is so easy to fall into the trap of viewing life as a checklist of SGPA scores, certificates, and corporate placements. Keating reminds you that medicine, law, engineering, and business are noble pursuits to sustain life; but poetry, beauty, romance, and love are what we stay alive for.',
    theme: 'Intellectual Rebellion & Purpose',
    accentColor: '#e1523d',
    linkedArticleSlug: 'the-films-and-idols-that-shaped-me',
  },
  {
    slug: 'the-dark-knight',
    title: 'The Dark Knight',
    creator: 'Christopher Nolan',
    year: 2008,
    type: 'Film',
    dateExperienced: 'Formative Cinema',
    favoriteQuote: 'Because he\'s the hero Gotham deserves, but not the one it needs right now.',
    favoriteSceneOrMoment: 'The two ferry boats. The convicts throwing the detonator out the window, and the civilians choosing not to push the button even as the midnight clock ticks.',
    reflection: 'The Dark Knight is not about Batman beating up the Joker. It is about whether humanity is fundamentally monstrous when pushed into panic. Nolan’s answer is quiet and profound: given the choice between self-preservation and decency, regular flawed people can choose decency. It taught me that moral strength is not loud; it is refusing to become cynical.',
    theme: 'Moral Courage Under Terror',
    accentColor: '#8b949e',
    linkedArticleSlug: 'why-we-need-heroes',
  },
  {
    slug: 'spider-man-2',
    title: 'Spider-Man 2',
    creator: 'Sam Raimi',
    year: 2004,
    type: 'Superhero & Pop Culture',
    dateExperienced: 'Childhood & Re-examined as an Adult',
    favoriteQuote: 'I believe there\'s a hero in all of us, that keeps us honest, gives us strength, makes us noble, and finally allows us to die with pride, even though sometimes we have to be steady, and give up the thing we want the most.',
    favoriteSceneOrMoment: 'The elevated train sequence. Peter webbing the tracks until his suit tears, passing out from physical exhaustion, and the commuters gently lifting his body and carrying him into the carriage, whispering: "He\'s just a kid. No older than my son."',
    reflection: 'Peter Parker is the greatest superhero because he has to worry about paying his rent to Mr. Ditkovich, passing his college exams, and disappointing his friends while saving lives. There is no billionaire butler to clean up his mess. He carries the burden because he refuses to let others suffer for his inaction.',
    theme: 'Responsibility & Everyday Sacrifice',
    accentColor: '#ef4444',
    linkedArticleSlug: 'why-we-need-heroes',
  },
  {
    slug: 'interstellar',
    title: 'Interstellar',
    creator: 'Christopher Nolan',
    year: 2014,
    type: 'Film',
    dateExperienced: 'Rewatched Winter 2024',
    favoriteQuote: 'Time is a resource. Just like food or water. We can\'t buy it back.',
    favoriteSceneOrMoment: 'Cooper watching 23 years of video messages from his children after returning from Miller\'s water planet, sobbing as his daughter ages into an adult before his eyes.',
    reflection: 'Behind the relativistic physics, wormholes, and black hole acoustics of Hans Zimmer, Interstellar is simply about how brutally fast time steals the people we love. Every time I watch that video message scene, it stops me in my tracks. It reminds me to call my family, check on my friends, and never treat an ordinary afternoon as guaranteed.',
    theme: 'Time, Mortality & Unbreakable Bonds',
    accentColor: '#f59e0b',
  },
  {
    slug: 'breaking-bad',
    title: 'Breaking Bad',
    creator: 'Vince Gilligan',
    year: 2008,
    type: 'Television',
    dateExperienced: 'Complete Series',
    favoriteQuote: 'I did it for me. I liked it. I was good at it. And I was really... I was alive.',
    favoriteSceneOrMoment: 'Walter White finally admitting the truth to Skyler in the kitchen in the finale, dropping the lifelong rationalization that he did it "for the family."',
    reflection: 'A masterclass in human pride, hubris, and the slow decay of conscience. Watching Walter White made me acutely aware of how people deceive themselves by dressing selfish ambitions in the language of noble sacrifice. It also made me reflect on RJ Mitte\'s portrayal of Walter Jr. — the only truly decent person in that entire tragedy.',
    theme: 'Ego, Rationalization & Tragedy',
    accentColor: '#10b981',
    linkedArticleSlug: 'so-suicide',
  },
]
