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
  photoFrame?: {
    url: string
    caption: string
    aspect?: string
  }
  content: {
    lead: string
    sections: {
      heading?: string
      paragraphs: string[]
      photoFrame?: {
        url: string
        caption: string
        aspect?: string
        tilt?: 'left' | 'right' | 'none'
      }
      photoFrames?: {
        url: string
        caption: string
        aspect?: string
        tilt?: 'left' | 'right' | 'none'
      }[]
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
    readTime: '3 min read',
    category: 'Being Human',
    tags: ['Mental Health', 'Life & Death', 'Vulnerability', 'Men', 'Cinema', 'Memoir'],
    featured: true,
    excerpt: 'How can someone who brings happiness into other people’s lives be hurting so much inside? It makes you wonder how often we mistake someone’s ability to make others happy for happiness itself.',
    photoFrame: {
      url: '/images/rj-mitte.png',
      caption: 'you will be missed, bro.',
      aspect: 'aspect-[3/4]',
    },
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
    subtitle: 'On Childhood, Social Responsibility, the Things We Take for Granted, and Why I Want to Stay and Build in India',
    date: 'College Journal',
    readTime: '5 min read',
    category: 'Real Life & Journeys',
    tags: [
      'Human Values',
      'Social Ethics',
      'Student Life',
      'Perspective',
      'India',
      'Social Responsibility',
      'Pillai College of Engineering'
    ],
    featured: true,
    excerpt: 'We spend so much of our lives preparing for the future that we sometimes forget to look beyond ourselves in the present. A visit to an orphanage as part of our Human Values and Social Ethics course made me reflect on the privileges we rarely notice, the responsibility we carry towards the society around us, and why I want to build a future in India.',
    photoFrame: {
      url: '/images/orphanage-gate.jpg',
      caption: 'ANUGRAH VIDYA MANDIR // AMBERNATH (E)',
      aspect: 'aspect-[4/3]',
    },
    content: {
      lead: 'Some experiences teach you things that no classroom can. Recently, as part of our Human Values and Social Ethics subject, under the module Socialization, we had the opportunity to visit an orphanage and spend time with the children there. It was supposed to be an academic activity, an opportunity to understand social responsibility beyond the pages of a textbook. But somewhere between the conversations, the activities, and simply being present, I found myself thinking about things that had very little to do with an examination.',
      sections: [
        {
          heading: 'Looking Beyond Ourselves',
          paragraphs: [
            'As students, so much of our daily energy revolves around a predictable cycle of concerns—assignments, submissions, unit tests, internships, and the constant mental calculation of what comes next. Ambition matters, and there is nothing wrong with working hard for the life you want. But it is remarkably easy to get so wrapped up in your own milestones that you forget an entire world exists outside your personal schedule.',
            'Visiting the orphanage disrupted that self-absorbed rhythm. It reminded me that understanding society cannot be confined to memorizing ethical theories or writing neat answers on an exam paper. Sometimes, you have to physically step outside your everyday circles and pay attention to lives whose realities look nothing like yours.',
            'You quickly realise how invisible certain privileges become when you have always had them. The safety nets you take for granted, the unquestioned assumption that someone is in your corner, and the freedom to map out your twenties without worrying about basic security—these are not universal baselines. They are unearned head starts.'
          ],
          callout: {
            type: 'insight',
            title: 'A Perspective Worth Carrying',
            body: 'Gratitude is not just about feeling thankful for what we have. It is about recognising that our baseline is someone else\'s luxury, and allowing that realisation to shape how we treat the people around us.'
          }
        },
        {
          heading: 'Beyond the Classroom and the Curriculum',
          paragraphs: [
            'What made the afternoon at Anugrah Vidya Mandir special was how quickly the academic pretense fell away. We were not there as observers analyzing a social case study; we were sitting down, chatting, and sharing an afternoon.',
            'We spent hours talking with the kids—hearing about their daily routines, favourite school subjects, games, and the things they hope to become. We also had the privilege of joining a birthday celebration with them, cutting cake and cheering together, which turned what could have been a stiff academic field trip into a genuinely warm, personal memory.',
            'The thing that stayed with me most was how essential it is that children are allowed to just be children. They have sharp senses of humour, fierce curiosities, favourite stories, and distinct personalities that cannot and should not be reduced to their circumstances. Their lives are not an object of pity or an exhibit for someone else’s moral growth.',
            'Genuine empathy requires meeting people with dignity rather than condescension. A single afternoon cannot explain another person’s life, and it would be dishonest to claim we understood everything about their world. But perhaps the real value was learning how much we don\'t know, and why approaching others with humility is the only honest way forward.'
          ],
          photoFrame: {
            url: '/images/orphanage-kids.jpg',
            caption: 'AN AFTERNOON WITH THE CHILDREN // CONVERSATIONS & CELEBRATIONS',
            aspect: 'aspect-[4/3]',
            tilt: 'left'
          }
        },
        {
          heading: 'What Does Social Responsibility Actually Mean?',
          paragraphs: [
            'We often speak about social responsibility as though it is reserved for philanthropists with millions to donate, large NGOs, or people in high political office. But if we convince ourselves that responsibility only begins once we have surplus wealth or authority, we give ourselves permission to postpone caring indefinitely.',
            'The truth is, most of us are still figuring out our own lives. We are engineering students trying to pass exams, learn technologies, and find our place in the world. We cannot fix every systemic disparity we see, and nobody expects us to solve poverty by next week.',
            'Responsibility begins much closer to home: by simply choosing to pay attention. It means listening without assuming you already know the answers, refusing to turn a blind eye just because a problem doesn’t touch you directly, and treating every person you encounter with fundamental dignity.',
            'I have come to believe that social responsibility is rarely a grand, cinematic gesture. It is the quiet conscience you bring into ordinary decisions—whether you see other people as fellow human beings sharing this country, or as strangers whose struggles are irrelevant to your success.'
          ],
          callout: {
            type: 'insight',
            title: 'Change Starts With Showing Up',
            body: 'You do not have to solve an entire problem to make a meaningful difference. Sometimes, the first and hardest step is simply choosing to care enough to show up.'
          }
        },
        {
          heading: 'Why I Want to Stay and Build in India',
          paragraphs: [
            'The visit also sharpened a question that has been on my mind for a long time: what kind of engineer do I want to be, and where do I want my work to matter?',
            'Like almost every engineering student around me, I have thought about leaving India. The temptation of better infrastructure, higher salaries, cleaner roads, and an easier day-to-day life is undeniable. I have written deeply about this unresolved conflict in my journal essay, ["I Don\'t Want to Leave a Country I Haven\'t Tried to Change"](/writing/country-i-havent-tried-to-change).',
            'Yet afternoons like this remind me why the desire to stay and build here runs so deep. India is where I am growing up, stumbling, learning, and gathering my skills. It is also a place where engineering and technology have the immediate potential to lift people, streamline broken systems, and solve deeply human problems.',
            'Technology cannot exist in an ivory tower. An elegant software architecture or an impressive demo is meaningless if it is disconnected from the realities of the society it inhabits. As I continue learning software and robotics, I don’t just want to build things that look impressive on a tech résumé. I want to build things that are useful to the people who need them most.'
          ],
          callout: {
            type: 'quote',
            title: 'The Kind of Future I Hope to Build',
            body: 'I want to build a career I can be proud of, but I also want to build things that matter beyond my own career. If I can use what I learn to make even a small corner of life better for someone else, that is the work I want to do.'
          }
        },
        {
          heading: 'The Things That Stay With You',
          paragraphs: [
            'Looking back, the most valuable part of the visit wasn\'t completing a task for Human Values and Social Ethics. The subject provided the requirement, but what we took away was entirely personal.',
            'A college degree can teach us how to write algorithms, design circuits, and optimize systems. But learning how to navigate the privileges and responsibilities of knowledge requires a different kind of education. I am genuinely grateful to Pillai College of Engineering and our professors for encouraging us to step out of the lecture halls and engage with the real world.',
            'I did not leave Ambernath with grand answers or a simplified worldview. What I carried away was simpler: a reminder to keep looking up from my own screens, to remain curious about lives different from my own, and to remember that genuine success is not measured only by what you achieve for yourself, but by what you choose to do with the opportunities you were handed.',
            'Some of the most essential things we learn will never be tested on an exam paper, and some of the moments that shape us most will never appear on a transcript.',
            'Sometimes, the lesson begins simply by showing up.'
          ]
        }
      ]
    }
  },
  {
    slug: "the-ordinary-days",
    title: "The Ordinary Days Are Going to Kill Me Someday",
    subtitle: "On growing up, the strange violence of nostalgia, and missing things before they're gone",
    date: "Personal Journal",
    readTime: "3 min read",
    category: "Real Life & Journeys",
    tags: ["Growing Up", "Nostalgia", "Time", "Memory", "Being Human"],
    featured: true,
    excerpt: "One day, I'll miss a day I currently consider ordinary. A commute I complain about. A conversation I barely remember. An afternoon I spent waiting for something better to happen. And the worst part is that I won't know which day it was until it's gone.",
    content: {
      lead: "I think one of the cruelest things about being alive is that you rarely recognise the good old days while you're living them. You recognise them later, usually when you're standing somewhere familiar and everything feels unfamiliar at the same time.",
      sections: [
        {
          heading: "The Future Has a Terrible Sense of Humour",
          paragraphs: [
            "Right now, there are probably things about my life that I cannot wait to get past. The deadlines, the uncertainty, the routine, the feeling that I should be doing something more important with my time. There are days when all I want is for this particular chapter to end so I can get to the part where things finally make sense.",
            "But I wonder what an older version of me would say if he could spend an afternoon here. Not the successful version who has everything figured out. Just the version who has lived long enough to know what cannot be recovered.",
            "Would he tell me to work harder? Probably. Would he tell me to stop wasting time? Maybe. But I suspect he would also ask me to look around for a second.",
            "Look at the people who are still here. The conversations that happen without an appointment. The familiar routes, the stupid jokes, the things I complain about because I have become so accustomed to them that I have forgotten they are part of my life.",
            "The future has a terrible sense of humour. It takes the things you wanted to escape and, sometimes, turns them into the things you would give anything to experience one more time."
          ]
        },
        {
          heading: "We Are Always Somewhere Else",
          paragraphs: [
            "When we're younger, we want to grow up. When we're studying, we want the exams to end. When we're working, we wait for the weekend. During the weekend, we worry about Monday. We spend an extraordinary amount of our lives negotiating with the present as if it were an inconvenience.",
            "I do it too. I think about the person I want to become, the work I want to do, the places I want to see, and the things I want to accomplish. There is nothing inherently wrong with wanting more. Ambition can be a beautiful thing.",
            "But somewhere along the way, wanting a better life can become a reason to postpone enjoying the one you already have. You begin treating happiness like a reward that will be issued after you finish enough tasks.",
            "Finish the degree. Get the job. Earn the money. Move somewhere better. Become someone better. And then, finally, perhaps, you can relax.",
            "Except there is always another milestone. There is always another version of yourself waiting on the other side of the next achievement, asking you to do a little more before you are allowed to feel that your life belongs to you.",
            "I don't want to spend so long preparing to live that I forget I am already doing it."
          ],
          callout: {
            type: "insight",
            title: "A thought worth keeping",
            body: "You do not have to stop wanting a different future to appreciate the life that is carrying you towards it."
          }
        },
        {
          heading: "There Will Be a Last Time",
          paragraphs: [
            "There will be a last time you see certain friends regularly. A last afternoon in a classroom. A last journey along a route you know by heart. A last time someone calls you by a nickname you have heard for years.",
            "Most of these endings will not announce themselves. Nobody will pause the afternoon and tell you that you should pay attention because this particular moment will never happen in quite the same way again.",
            "You will probably be thinking about something else. You will be tired. You will want to get home. You will assume there is another day, because until there isn't, another day feels like the most reasonable assumption in the world.",
            "I don't think we should become frightened of this. If we tried to memorise every second, we would turn living into another exhausting assignment. Some moments are allowed to pass without being photographed, documented, or understood.",
            "I just think we could be a little kinder to the days we are so eager to leave behind.",
            "Maybe growing up is partly learning that the ordinary is not the opposite of extraordinary. Sometimes, ordinary is simply extraordinary before you know enough to recognise it.",
            "And someday, when life looks completely different, I hope I remember that there was a version of me who got to live these days without knowing how much he would miss them.",
            "I hope I was there for at least some of them."
          ]
        }
      ]
    }
  },
  {
    slug: "country-i-havent-tried-to-change",
    title: "I Don't Want to Leave a Country I Haven't Tried to Change",
    subtitle: "On India, ambition, frustration, and the complicated meaning of staying",
    date: "Personal Journal",
    readTime: "3 min read",
    category: "Being Human",
    tags: ["India", "Purpose", "Ambition", "Society", "Belonging"],
    featured: true,
    excerpt: "I understand why people leave. Better opportunities, better infrastructure, better pay, and the possibility of a life that does not require quite so much fighting for the basics. But I keep coming back to a question: what does it mean to give up on a place you still believe could be better?",
    content: {
      lead: "I have thought about opportunities outside India. I would be lying if I said I hadn't. It is difficult not to look at the possibilities elsewhere and wonder what kind of life you could build if you went looking for it. But there is another thought that keeps returning, and I haven't managed to settle it.",
      sections: [
        {
          heading: "I Understand Why People Leave",
          paragraphs: [
            "I don't think leaving India makes anyone a traitor. I don't think staying automatically makes someone patriotic, either. People have families to support, careers to build, bills to pay, and lives that are too complicated to fit inside a slogan.",
            "If someone finds an opportunity abroad that gives them security, dignity, and the chance to do meaningful work, I understand why they take it. You cannot ask people to sacrifice their entire futures to prove that they love the place they came from.",
            "And loving a place does not mean pretending it is perfect. You can love a country and still be exhausted by its bureaucracy, its inequalities, its infrastructure, its casual cruelty, or the way people learn to accept things that should never have become normal.",
            "Sometimes, the most frustrating thing about a place is not that it has problems. It is that you can imagine how much better it could be.",
            "That imagination is a difficult thing to carry. It makes you notice the distance between what exists and what should exist. Once you start noticing that distance, it becomes hard to stop."
          ]
        },
        {
          heading: "The Privilege of Looking Away",
          paragraphs: [
            "There is a version of success that asks you to leave every problem behind. Get the degree. Get the offer. Find the better city. Build a comfortable life. Surround yourself with people who have similar opportunities, and eventually the problems you once encountered every day become things you read about in the news.",
            "There is nothing wrong with wanting comfort. I want a good life too. I want the freedom to make choices without constantly calculating what they will cost. I want to build things that work, learn from people who are better than me, and have the space to become good at what I do.",
            "But I wonder what happens when success becomes synonymous with distance. When the measure of having made it is how far away you have managed to get from the things that once frustrated you.",
            "Perhaps the answer is not to stay at all costs. Perhaps it is to remember that leaving and caring are not mutually exclusive. People can leave and still contribute. People can stay and do nothing. Geography alone does not determine what a person gives back.",
            "The question I keep asking myself is smaller and more uncomfortable: while I am here, what am I actually going to do?"
          ],
          callout: {
            type: "insight",
            title: "The question is not where you live",
            body: "It is whether your idea of success leaves any room for the people and places that helped make it possible."
          }
        },
        {
          heading: "I Don't Want Patriotism to Be an Excuse",
          paragraphs: [
            "I don't want to turn this into a speech about how young people must stay in India and change the nation. That sounds noble from a distance, but it can become an unfair demand when directed at individuals who are still trying to establish themselves.",
            "I also don't want to use love for my country as an excuse to ignore what is wrong with it. Love that cannot tolerate criticism is not particularly useful. If anything, caring about something should make you more willing to look at it honestly.",
            "I am still a student. I am still learning how to build things that work outside a classroom, how to work with people, how to understand problems before rushing towards solutions. I do not have the resources or experience to pretend I can solve the enormous problems of a country.",
            "But perhaps that is precisely why I should begin with the things I can understand. Build something useful. Do work that respects the people it affects. Learn how systems fail. Refuse to become comfortable with doing a careless job simply because nobody is watching.",
            "None of this is going to fix a country overnight. It might not even make a visible difference for a long time. But I am beginning to suspect that meaningful change is often less dramatic than we would like it to be."
          ]
        },
        {
          heading: "For Now, I Want to Try",
          paragraphs: [
            "I might leave one day. I might find an opportunity that makes sense for me and the people I love. I don't want to make promises about a future I haven't lived yet.",
            "But I don't want my decision to be based entirely on what I can get away from. I want to think about what I can contribute, what I can learn, and whether I can help make something a little better than I found it.",
            "I want to know that I gave this place more than my complaints. That I tried to understand its problems rather than treating them as background noise. That I used whatever opportunities I was fortunate enough to receive to build something useful for someone else, too.",
            "Maybe I will succeed. Maybe I will discover that the world is much more complicated than my ideals allow. I hope I have enough humility to learn either way.",
            "For now, I am here. I have a great deal to learn, a great deal to build, and no convincing reason to believe that caring is pointless.",
            "I don't know if I will spend my entire life in India.",
            "I just don't want to leave without ever having tried."
          ]
        }
      ]
    }
  },
  {
    slug: "grew-up-on-the-internet",
    title: "We Grew Up on the Internet. Who Taught Us How to Live?",
    subtitle: "On digital childhoods, comparison, and growing up in public",
    date: "Personal Journal",
    readTime: "4 min read",
    category: "Cinema & Culture",
    tags: ["Internet Culture", "Growing Up", "Social Media", "Identity", "Generations"],
    featured: false,
    excerpt: "We learned about careers from strangers, relationships from fictional couples, success from people who were already successful, and happiness from photographs selected to look like happiness. We had access to an astonishing amount of information. I am not sure we were ever taught what to do with it.",
    content: {
      lead: "There is something strange about growing up in a world where you can compare your life with thousands of other lives before breakfast. People have always compared themselves with others. What feels different now is the scale of it, the frequency, and the fact that we can do it without ever leaving our rooms.",
      sections: [
        {
          heading: "Everyone Else Seems to Be Ahead",
          paragraphs: [
            "Open any social platform long enough and you will find someone your age doing something extraordinary. Someone has founded a company, landed a remarkable job, travelled somewhere beautiful, bought a house, published a book, or announced a life milestone you have not even begun to think about.",
            "You can be genuinely happy for them and still feel a little worse about yourself afterwards. These feelings can exist together, however much we would prefer to pretend they cannot.",
            "The internet gives us access to other people's highlights while we remain painfully familiar with our own unfinished drafts. We know every mistake we made this morning. We know the tasks we postponed, the things we do not understand, and the uncertainty that follows us around. We rarely know the equivalent details about the stranger whose achievements we are using to measure ourselves.",
            "And so we compare the inside of our lives with the outside of somebody else's. We lose the comparison before it has even begun, then wonder why we feel behind.",
            "I don't think the solution is to stop celebrating other people's achievements. Their success is real, and it deserves to be celebrated. But their timeline is not evidence that we have missed ours."
          ]
        },
        {
          heading: "We Learned to Perform Before We Learned to Be",
          paragraphs: [
            "The internet has made it possible to document almost anything. What we eat, where we go, what we build, what we believe, what we read, what we listen to. Even our attempts to disconnect can become content if we are not careful.",
            "There is nothing inherently wrong with sharing your life. Some of my favourite things about the internet are the people I have discovered, the work I have learned from, and the ideas I would never have encountered otherwise.",
            "But when everything can be displayed, it becomes tempting to experience life with an imaginary audience in mind. Is this worth posting? Does this make me look interesting? Will people understand what I am trying to say? Will anyone care?",
            "The questions are not always conscious. They simply begin to sit beside the experience itself.",
            "I wonder how many things we have stopped enjoying because they did not photograph well. How many interests we abandoned because we were not immediately good at them. How many opinions we softened because we were afraid of being misunderstood by people who did not know us.",
            "There is a difference between having a life and maintaining a convincing account of one. I am not always sure we remember that difference."
          ],
          callout: {
            type: "insight",
            title: "A life is not a profile",
            body: "Some of the most important things you will ever do may never become a post, receive recognition, or make sense to anyone except you."
          }
        },
        {
          heading: "Information Is Not the Same as Wisdom",
          paragraphs: [
            "We can search for almost any answer. We can watch tutorials, read explanations, follow experts, and learn a new skill without asking anyone for permission. This is extraordinary. I would never want to return to a world where knowledge was harder to reach.",
            "But knowing what to do and knowing how to live are different problems.",
            "You can learn how to build a career without knowing what kind of life you want that career to support. You can read a hundred explanations of healthy relationships and still struggle to have an uncomfortable conversation with someone you love. You can consume endless advice about productivity while never asking why you are so afraid of being unproductive.",
            "Information can tell us what other people believe worked for them. It cannot automatically decide what matters to us.",
            "Some answers require time. Some require failure. Some require conversations in which neither person knows exactly what to say. And some require sitting with a question long enough to discover that the first answer was not really yours at all."
          ]
        },
        {
          heading: "Maybe We Need to Be Beginners Again",
          paragraphs: [
            "I don't want to blame the internet for everything. It has connected people, made learning accessible, given overlooked voices an audience, and created opportunities that previous generations could not have imagined.",
            "I want to keep the good parts. I just want to become more deliberate about the parts I let shape me.",
            "I want to be able to do something badly without announcing that I am learning it. I want to enjoy a film without immediately reading ten opinions about it. I want to spend time with people without mentally turning the experience into a story I might tell later.",
            "Most importantly, I want to remember that becoming a person is not a competition with a public leaderboard.",
            "There is no final achievement that makes you immune to uncertainty. There is no age at which everybody else stops having doubts. We are all improvising more than we let on.",
            "We grew up with access to an astonishing amount of the world. We are still learning how to live in our own.",
            "Perhaps that is not a failure. Perhaps it is a place to begin."
          ]
        }
      ]
    }
  },
  {
    slug: "one-version-of-you",
    title: "Some People Are Only Meant to Know One Version of You",
    subtitle: "On old friendships, changing identities, and the grief nobody names",
    date: "Personal Journal",
    readTime: "3 min read",
    category: "Being Human",
    tags: ["Friendship", "Change", "Memory", "Growing Up", "Relationships"],
    featured: false,
    excerpt: "There are people who knew you before you knew how to explain yourself. They remember versions of you that no longer exist, and sometimes that is precisely why being around them feels like coming home. Sometimes, it is why it feels like you cannot move forward.",
    content: {
      lead: "Not every important person in your life is going to remain an important part of your everyday life. I think this is one of those things we understand intellectually long before we are prepared to accept it emotionally.",
      sections: [
        {
          heading: "The People Who Remember Before",
          paragraphs: [
            "There is a particular kind of comfort in being around someone who knew you years ago. You do not have to explain every reference. You can mention a place, a teacher, an embarrassing incident, or a person neither of you has thought about in years, and suddenly an entire part of your life comes back into focus.",
            "For a moment, you are not the person trying to figure out a career or make sense of the future. You are simply someone who existed before all of that. Someone who had different worries, different ambitions, and a completely different understanding of the world.",
            "These people hold memories you cannot recreate alone. They remember things you forgot, and sometimes they remember you differently from how you remember yourself. There is something beautiful about that. Our lives exist partly in the memories other people carry of us.",
            "But time changes the relationship between who we were and who we are becoming. The things you once had in common may no longer occupy the same space in your lives. Conversations that used to last for hours may become shorter. You might discover that you have to explain yourself to someone who once seemed to understand you without trying.",
            "Nobody necessarily did anything wrong. Sometimes, life simply kept happening."
          ]
        },
        {
          heading: "When Familiarity Becomes a Time Machine",
          paragraphs: [
            "I think one reason old relationships can be difficult is that familiarity has a way of making the past feel more permanent than it really was.",
            "Someone remembers you as the quiet one, the funny one, the irresponsible one, the person who always did a particular thing. Even when they mean no harm, you can find yourself slipping into that familiar role because it is the version of you they recognise.",
            "And perhaps you do it to yourself, too. You return to people who knew you before everything changed and hope that being around them will make you feel like that person again.",
            "Sometimes it works. Sometimes the comfort is exactly what you needed. Other times, you leave feeling strangely lonely, as if you spent an afternoon visiting a place that still looks like home but no longer belongs to you in quite the same way.",
            "It is a difficult feeling to explain because the person is still there. The memories are still there. Nothing dramatic happened. You just cannot quite return to the version of life that made the relationship what it was.",
            "Maybe the hardest part is accepting that missing someone does not always mean you should try to recreate what you had."
          ],
          callout: {
            type: "quote",
            title: "Two things can be true",
            body: "Someone can have been genuinely important to you, and the relationship you shared can have reached the end of the form it once took."
          }
        },
        {
          heading: "We Keep Calling It Distance",
          paragraphs: [
            "We have a hundred ways to describe relationships that change. We say people got busy. We say we lost touch. We say everyone has their own life now. These explanations are often true, but they can also make a quiet kind of grief difficult to acknowledge.",
            "There is no ceremony for a friendship that slowly becomes a memory. No clear date on which you are expected to accept that things are different. You simply notice that you have not spoken in a while, then realise that a while has become a long time.",
            "You might still care about the person. You might still want good things for them. You might even be able to pick up a conversation as though no time has passed. But the everyday closeness that once made the friendship a part of your life has changed.",
            "I don't think we should treat every fading relationship as a failure. Some relationships survive change beautifully. Others belong to a particular season of life, and asking them to remain unchanged forever may be asking them to become something they were never meant to be.",
            "There is sadness in that, certainly. But there can also be gratitude. A person does not have to stay forever to have made a difference."
          ]
        },
        {
          heading: "Let Them Have Known You",
          paragraphs: [
            "I am trying to make peace with the idea that growing up means becoming someone that not everyone from your past will fully recognise.",
            "That does not make the old version of you embarrassing or the new version automatically better. They are both real. Each was doing the best they could with what they understood at the time.",
            "I want to remember people without demanding that they remain exactly as I remember them. I want to let old friendships mean something without turning their changes into accusations. I want to be able to look back at a chapter of my life and feel thankful that someone was there, even if they are no longer beside me.",
            "And when I think about the people who knew me before I knew myself, I hope I can be generous enough to let them remember whoever they knew.",
            "They were part of my story. I was part of theirs.",
            "Perhaps that is enough to make the time we shared matter."
          ]
        }
      ]
    }
  },
  {
    slug: "life-is-not-a-resume",
    title: "I Don't Want My Life to Become a Résumé",
    subtitle: "On ambition, achievement, and the person behind the accomplishments",
    date: "Personal Journal",
    readTime: "4 min read",
    category: "Real Life & Journeys",
    tags: ["Ambition", "Career", "Identity", "Technology", "Purpose"],
    featured: true,
    excerpt: "I want to build things. I want to become good at what I do. I want to earn opportunities I once could only imagine. But I don't want to reach some distant version of success and discover that I have become excellent at describing my life without knowing how to live it.",
    content: {
      lead: "I spend a lot of time thinking about the future. What I want to build, the work I want to do, the opportunities I should pursue, and the person I might become if I keep learning. These are good things to think about. But sometimes I wonder when preparing for a life became so much like trying to qualify for one.",
      sections: [
        {
          heading: "The Person You Can Put on Paper",
          paragraphs: [
            "A résumé is a useful document. It tells people what you have done, what you can do, and why they might want to work with you. I understand why we need them, especially when opportunities are limited and everyone is trying to stand out.",
            "But a résumé has a very particular way of looking at a human being. It likes progress that can be demonstrated. Skills that can be named. Achievements that can be counted. Projects with outcomes. Experiences with titles. Everything must fit into a format that allows a stranger to make a decision about you in a few minutes.",
            "The problem begins when you start looking at yourself the same way.",
            "You finish something and immediately wonder what it qualifies you to do next. You learn a skill and start thinking about how to demonstrate it. You build a project and wonder how it will look to someone evaluating you. Even the things you enjoy can begin to feel like investments that should eventually produce a return.",
            "I know that opportunities do not arrive simply because you are passionate. Work matters. Competence matters. Showing people what you can do matters.",
            "I just don't want every part of my life to become a strategy for making the next part of my life more impressive."
          ]
        },
        {
          heading: "What Happens When Nobody Is Evaluating You?",
          paragraphs: [
            "Imagine doing something you love and never putting it on your portfolio. Imagine learning something difficult without telling anyone. Imagine spending an afternoon reading a book that has nothing to do with your career, watching a film you cannot turn into a thoughtful social media post, or helping someone without wondering whether it will count as experience.",
            "Would these things feel less valuable if nobody knew about them?",
            "I think about that question because I am not immune to the pressure to make progress visible. We live in a world where opportunities often depend on being seen, and it is reasonable to want our work to be recognised.",
            "But recognition can quietly become the reason for doing something in the first place. You start with curiosity, then discover that the activity looks good on paper, and eventually you cannot tell whether you still enjoy it or simply enjoy being the kind of person who does it.",
            "I want to build things because I am curious about whether I can make them work. I want to write because there are thoughts I need to get out of my head and into the world. I want to read because other people's ideas can change the way I understand my own life.",
            "Some of these things may lead to opportunities. I hope they do. But I would like them to remain worthwhile even when they don't."
          ],
          callout: {
            type: "insight",
            title: "A different measure of progress",
            body: "Not everything meaningful has to become evidence that you are becoming more employable, more successful, or more impressive."
          }
        },
        {
          heading: "I Still Want to Succeed",
          paragraphs: [
            "I want to be careful here. I am not romanticising failure or suggesting that ambition is somehow shallow. Financial independence matters. Building a career matters. Being able to support yourself and the people you care about matters.",
            "There is dignity in getting good at something. There is satisfaction in taking an idea that once existed only in your head and making it work. There is nothing wrong with wanting your work to be recognised or wanting the freedom that comes with doing it well.",
            "I want all of those things.",
            "What I am questioning is the idea that these achievements should become the entire definition of a person. A career can be a meaningful part of your life without becoming the only language you use to describe yourself.",
            "I would like to be good at my work and still be a person who knows how to listen. I would like to build ambitious projects without becoming dismissive of people who have different ambitions. I would like to succeed without treating every hour that does not contribute to success as wasted time.",
            "I don't know how easy that will be. It is very easy to write these words when the future is still uncertain. It may be harder when opportunities, deadlines, and responsibilities begin competing for the same hours."
          ]
        },
        {
          heading: "When Someone Asks Who You Are",
          paragraphs: [
            "I hope that, eventually, when someone asks who I am, I can answer with something more interesting than a list of things I have accomplished.",
            "I hope I can talk about the work I care about without making it the entirety of my identity. About the books and films that changed my mind. About the people who taught me something without knowing they were teaching me. About the mistakes I made, the things I still do not understand, and the questions I have not managed to answer.",
            "I hope I can be proud of what I build without believing that what I build is the only thing that makes me worth knowing.",
            "There will always be another qualification, another project, another opportunity, another person who appears to be further ahead. If I wait until I have done enough to consider myself a complete person, I suspect I will be waiting for the rest of my life.",
            "So I will keep working. I will keep learning. I will keep trying to become someone capable of doing meaningful things.",
            "But I want to leave a little room for the person who exists when the laptop is closed, the certificates are put away, and there is nothing left to prove for the day.",
            "I hope that person has a life, too."
          ]
        }
      ]
    }
  },
  {
    slug: "film-ends-life-begins",
    title: "The Film Ends. You Have to Go Back to Your Life.",
    subtitle: "On cinema, the walk home, and the strange comfort of fictional lives",
    date: "Cinema Journal",
    readTime: "3 min read",
    category: "Books & Idols",
    tags: ["Cinema", "Film", "Stories", "Emotion", "Robin Williams", "Memoir"],
    featured: false,
    excerpt: "A film can make you cry over people who do not exist, grieve a future that was never yours, and feel understood by a stranger who was written by someone you will never meet. Then the credits roll, the lights come on, and somehow you have to carry all of that back into your actual life.",
    content: {
      lead: "I have always found it interesting that we willingly spend hours caring about people whose lives are not real. We worry about their decisions, celebrate their victories, and sometimes feel a genuine sense of loss when their stories end. We know they are fictional. The feelings, however, are not.",
      sections: [
        {
          heading: "Borrowing Someone Else's Life",
          paragraphs: [
            "A good film gives you access to a life you will never live. For a little while, you can inhabit someone else's fears, see the world through their mistakes, and understand why they make choices you might never have made yourself.",
            "You can watch a character ruin something important and recognise a little of yourself in the decision. You can watch someone find the courage to leave a familiar life and wonder whether you have been staying somewhere out of fear. You can watch someone forgive another person and discover that you have been carrying an old resentment around for longer than you realised.",
            "The remarkable thing is that the story does not have to resemble your life very closely. Sometimes, the distance is what makes it possible to understand something you could not look at directly.",
            "There is a reason people talk about films changing them. Not because two hours of fiction magically solve the problems waiting outside the theatre, but because a story can give shape to a feeling you had never quite managed to articulate.",
            "Sometimes you do not need a film to give you an answer. You need it to help you ask a better question."
          ]
        },
        {
          heading: "O Captain, My Captain",
          paragraphs: [
            "I think about Dead Poets Society and the way John Keating encourages his students to look at their lives differently. The film understands something important about growing up: it is possible to follow every instruction, satisfy every expectation, and still arrive at a life that does not feel entirely your own.",
            "The appeal of Keating is not simply that he tells his students to seize the day. It is that he treats them as people capable of thinking for themselves, even when the world around them would prefer that they remain obedient.",
            "That idea becomes especially powerful when you are young enough to feel that your future is being assembled from decisions you have not entirely learned how to make.",
            "A film like this does not mean that rules are useless or that every expectation should be rejected. It means that a life cannot be reduced to following a sequence of instructions. At some point, you have to ask what you believe, what you value, and what you are willing to stand behind.",
            "The questions remain long after the classroom disappears from the screen."
          ]
        },
        {
          heading: "The Walk Home",
          paragraphs: [
            "My favourite part of certain films is not necessarily the climax. It is what happens afterwards, when the story has ended but the feeling has not.",
            "You leave the cinema. Or you close the laptop. The room is exactly where you left it. There are messages you have not answered, work waiting for you, and ordinary responsibilities that have made no special arrangements to accommodate your emotional experience.",
            "For a moment, the contrast can feel almost absurd. You have just witnessed a story about sacrifice, love, courage, or the meaning of life, and now you are deciding what to eat for dinner.",
            "But perhaps that is where the real value of a story begins. Not in escaping your life, but in returning to it with a slightly different way of seeing.",
            "Maybe you call someone you have been meaning to speak to. Maybe you reconsider a decision. Maybe nothing changes immediately, but a line of dialogue returns to you months later at precisely the moment you need it.",
            "A story cannot make your choices for you. It cannot guarantee that you will become braver, kinder, or more honest. It can only leave something behind for you to carry."
          ],
          callout: {
            type: "quote",
            title: "What stories leave behind",
            body: "The film ends, but the question it leaves you with can follow you for the rest of your life."
          }
        },
        {
          heading: "Why I Keep Coming Back",
          paragraphs: [
            "I do not think every film has to teach us something. Sometimes a film can simply be entertaining. Sometimes I want spectacular action, an absurd comedy, a brilliant performance, or two hours in which the world is allowed to be somebody else's problem.",
            "There is room for all of it. We do not have to turn every experience into a lesson to justify enjoying it.",
            "Still, there are stories I return to because they have become part of how I understand the world. Their characters have accompanied me through different stages of life, and the same scenes sometimes mean different things depending on who I have become since the last viewing.",
            "That is one of the reasons I love cinema. The film remains the same. You do not.",
            "A scene that once felt inspiring can later feel tragic. A character you once judged can become someone you understand. A line you barely noticed can suddenly seem to describe a problem you have spent years trying to explain.",
            "And then, one day, the credits roll again. You return to your life, which is still unfinished and still entirely your responsibility.",
            "Perhaps that is the best a story can do. It cannot live for you. It cannot spare you from the difficult parts. It can remind you that other people have struggled to make sense of being alive, too.",
            "And sometimes, on a difficult day, that reminder is enough to make the walk home feel a little less lonely."
          ]
        }
      ]
    }
  }
];
