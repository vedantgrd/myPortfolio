'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'tools'
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'TailwindCSS', category: 'frontend' },
  { name: 'Three.js', category: 'frontend' },
  { name: 'Redux Toolkit', category: 'frontend' },
  { name: 'React Query / TanStack Query', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  { name: 'Web Performance Optimization', category: 'frontend' },
  { name: 'Progressive Web Apps (PWA)', category: 'frontend' },

  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'Express.js', category: 'backend' },
  { name: 'NestJS', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'FastAPI', category: 'backend' },
  { name: 'Java', category: 'backend' },
  { name: 'Spring Boot', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'GraphQL', category: 'backend' },
  { name: 'Microservices Architecture', category: 'backend' },
  { name: 'Authentication (JWT, OAuth)', category: 'backend' },

  // DevOps / Cloud
  { name: 'AWS', category: 'tools' },
  { name: 'Google Cloud Platform', category: 'tools' },
  { name: 'Docker', category: 'tools' },
  { name: 'Kubernetes', category: 'tools' },
  { name: 'CI/CD (GitHub Actions, Jenkins)', category: 'tools' },
  { name: 'Nginx', category: 'tools' },
  { name: 'Terraform', category: 'tools' },

  // AI / Modern Stack
  { name: 'LLM Integration (OpenAI APIs)', category: 'tools' },
  { name: 'LangChain', category: 'tools' },
  { name: 'Vector Databases (Pinecone, Weaviate)', category: 'tools' },
  { name: 'RAG (Retrieval-Augmented Generation)', category: 'tools' },
  { name: 'Agentic AI Systems', category: 'tools' },

  // Testing & Quality
  { name: 'Jest', category: 'tools' },
  { name: 'Cypress', category: 'tools' },
  { name: 'Playwright', category: 'tools' },
  { name: 'Unit & Integration Testing', category: 'tools' },

  // General Tools
  { name: 'Git', category: 'tools' },
  { name: 'Linux', category: 'tools' },
  { name: 'Figma', category: 'tools' },
  { name: 'Postman', category: 'tools' },
];

const categoryColors = {
  frontend: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    glow: 'hover:shadow-cyan-500/20',
  },
  backend: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    glow: 'hover:shadow-purple-500/20',
  },
  tools: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    glow: 'hover:shadow-green-500/20',
  },
}

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools & DevOps',
}

function SkillNode({ skill, index }: { skill: Skill; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const colors = categoryColors[skill.category]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative cursor-default rounded-lg border px-4 py-3 transition-all duration-300 ${colors.bg} ${colors.border} ${colors.glow} hover:shadow-lg`}
    >
      <span className={`font-mono text-sm ${colors.text} transition-all group-hover:font-medium`}>
        {skill.name}
      </span>
      
      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`absolute inset-0 -z-10 rounded-lg blur-xl ${colors.bg}`}
        />
      )}
    </motion.div>
  )
}

export function SkillsSection() {
  const groupedSkills = {
    frontend: skills.filter((s) => s.category === 'frontend'),
    backend: skills.filter((s) => s.category === 'backend'),
    tools: skills.filter((s) => s.category === 'tools'),
  }

  return (
    <section className="relative min-h-screen px-4 py-32">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-primary">
            // SKILL MATRIX
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Technologies
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills constellation */}
        <div className="space-y-12">
          {(Object.keys(groupedSkills) as Array<keyof typeof groupedSkills>).map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {/* Category label */}
              <div className="flex items-center gap-4">
                <span className={`font-mono text-xs tracking-wider ${categoryColors[category].text}`}>
                  {categoryLabels[category]}
                </span>
                <div className={`h-px flex-1 ${categoryColors[category].bg}`} />
              </div>

              {/* Skills grid */}
              <div className="flex flex-wrap gap-3">
                {groupedSkills[category].map((skill, index) => (
                  <SkillNode 
                    key={skill.name} 
                    skill={skill} 
                    index={index + catIndex * 5} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 flex items-center justify-center gap-8 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />
            <span>Frontend</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-500" />
            <span>Backend</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span>Tools</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
