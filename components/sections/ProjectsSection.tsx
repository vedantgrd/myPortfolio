'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Project {
  title: string
  description: string
  tech: string[]
  liveUrl: string
  sourceUrl: string
  gradient: string
}

const projects: Project[] = [
  {
    title: 'Agriculture Drone',
    description: 'Semi-Automated Drone (Prototype) + Mobile Application & Crop Detection Algorithm.',
    tech: ['IoT', 'Python', 'Hardware-Software Integration', 'Android Application Development'],
    liveUrl: 'https://drive.google.com/file/d/1JI8v2gI2H4H6vbARE09fdLaI3zcfK9k9/view',
    sourceUrl: 'https://github.com/vedantgrd/AgricultureDrone',
    gradient: 'from-cyan-500/20 via-blue-500/20 to-purple-500/20',
  },
  {
    title: 'Pokemon RPG',
    description: 'A pokemon-esque Rpg game using pygame with Game Physics, Character Movement and Battle UI.',
    tech: ['Pygame', 'Python', 'Game-Development', 'Game-Design','In-Game Physics'],
    liveUrl: 'https://drive.google.com/file/d/1iXtMwanVc9ejY1I6BGfJmxk4y3PPZCz6/view?usp=sharing',
    sourceUrl: 'https://github.com/kryyo1441/pygame-pokemon-rpg',
    gradient: 'from-purple-500/20 via-pink-500/20 to-red-500/20',
  },
  {
    title: 'DevSprint',
    description: 'A platform that helps devs find nearby hackathons and coding events + Admin Panel to manage.',
    tech: ['PHP', 'HTML', 'CSS','JS','Three.js','Figma','MySQL','UI/UX'],
    liveUrl: '#',
    sourceUrl: 'https://github.com/vedantgrd/DevSprint',
    gradient: 'from-green-500/20 via-cyan-500/20 to-blue-500/20',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      className="group relative"
    >
      <div className="glass glass-hover overflow-hidden rounded-xl p-6">
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <span className="font-mono text-xs tracking-wider text-primary">
                PROJECT_{String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-1 text-xl font-semibold text-foreground">
                {project.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                asChild
              >
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label="View source code">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                asChild
              >
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="View live project">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Description */}
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-background/50 px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  return (
    <section className="relative min-h-screen px-4 py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-primary">
            // FEATURED WORK
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-muted-foreground">
            A collection of things I built instead of sleeping
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
        <Button
           asChild
            variant="outline"
            className="group border-border hover:border-primary hover:text-primary"
          >
          <a
            href="https://github.com/vedantgrd?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>View All Projects</span>
            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
        </motion.div>
      </div>
    </section>
  )
}
