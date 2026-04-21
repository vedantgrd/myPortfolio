'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Award, Briefcase } from 'lucide-react'

interface TimelineEntry {
  year: string
  title: string
  institution: string
  description: string
  icon: 'graduation' | 'award' | 'briefcase'
  status?: 'current' | 'completed'
}

const timeline: TimelineEntry[] = [
  {
    year: '2025 - Present',
    title: 'Bachelor of Technology',
    institution: 'Pillai College of Engineering, New Panvel',
    description: 'Pursuing Information Technology (Specialization in Information Security and Data Forensics) with a focus on software systems, problem-solving, and modern development practices. Exploring how real-world systems are designed, scaled, and maintained.',
    icon: 'graduation',
    status: 'current',
  },
  {
    year: '2022-2025',
    title: 'Diploma Completed',
    institution: 'Vidya Prasarak Mandals Polytechnic, Thane',
    description: 'Built a strong foundation in programming, computer science fundamentals, and applied engineering concepts. Focused on learning how to think like a developer, not just code like one.',
    icon: 'award',
    status: 'completed',
  },
  {
    year: '2010-2022',
    title: 'Primary & Secondary Education',
    institution: 'St. John The Baptist High School, Thane',
    description: 'Completed foundational schooling while gradually developing curiosity for computers, logic, and how technology shapes everyday life.',
    icon: 'award',
    status: 'completed',
  },
]

const internships: TimelineEntry[] = [
  {
    year: 'Jul 2024',
    title: 'Backend Developer',
    institution: 'VFS Global, Mumbai',
    description: 'Gained hands-on experience in backend development, working on APIs, databases, debugging, and performance optimization while collaborating on system improvements.',
    icon: 'briefcase',
    status: 'completed',
  },
]

function getIcon(icon: TimelineEntry['icon']) {
  if (icon === 'graduation') return GraduationCap
  if (icon === 'briefcase') return Briefcase
  return Award
}

function TimelineItem({ entry, index, isLast }: { entry: TimelineEntry; index: number; isLast: boolean }) {
  const Icon = getIcon(entry.icon)

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true, margin: '-50px' }}
      className="relative flex items-start gap-6"
    >
      {/* Timeline line and node */}
      <div className="relative flex flex-col items-center">
        {/* Node */}
        <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 ${
          entry.status === 'current' 
            ? 'border-primary bg-primary/20' 
            : 'border-border bg-background'
        }`}>
          <Icon className={`h-5 w-5 ${entry.status === 'current' ? 'text-primary' : 'text-muted-foreground'}`} />
          {entry.status === 'current' && (
            <span className="absolute inset-0 animate-ping rounded-full border border-primary opacity-30" />
          )}
        </div>
        
        {/* Line to next */}
        {!isLast && (
          <div className="absolute top-12 h-full w-px bg-gradient-to-b from-border to-transparent" />
        )}
      </div>

      {/* Content card */}
      <div className="glass glass-hover mb-12 flex-1 rounded-xl p-6">
        {/* Year badge */}
        <div className="mb-3 flex items-center gap-3">
          <span className={`font-mono text-xs tracking-wider ${
            entry.status === 'current' ? 'text-primary' : 'text-muted-foreground'
          }`}>
            {entry.year}
          </span>
          {entry.status === 'current' && (
            <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Active
            </span>
          )}
        </div>

        {/* Title and institution */}
        <h3 className="text-lg font-semibold text-foreground">
          {entry.title}
        </h3>
        <p className="mt-1 text-sm text-primary/80">
          {entry.institution}
        </p>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {entry.description}
        </p>
      </div>
    </motion.div>
  )
}

export function EducationSection() {
  return (
    <>
      <section className="relative min-h-screen px-4 py-32">
        <div className="mx-auto max-w-3xl">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-primary">
              // ACADEMIC LOG
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Education
            </h2>
            <p className="mt-4 text-muted-foreground">
              Powered mostly by curiosity and deadlines
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative pl-4">
            {timeline.map((entry, index) => (
              <TimelineItem
                key={entry.year + entry.title}
                entry={entry}
                index={index}
                isLast={index === timeline.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen px-4 py-32">
        <div className="mx-auto max-w-3xl">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-primary">
              // WORK LOG
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Internships
            </h2>
            <p className="mt-4 text-muted-foreground">
              Where I fixed one bug and unlocked three more
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative pl-4">
            {internships.map((entry, index) => (
              <TimelineItem
                key={entry.year + entry.title}
                entry={entry}
                index={index}
                isLast={index === internships.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}