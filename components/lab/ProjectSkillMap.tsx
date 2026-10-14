'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, Layers } from 'lucide-react'
import { skillCategories, SkillCategory } from '@/data/skills'

export function ProjectSkillMap() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>(
    skillCategories[0]
  )
  const [activeItem, setActiveItem] = useState(skillCategories[0].items[0])

  return (
    <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-[#232832]">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[#10b981] font-semibold">// EXPERIMENT 03</span>
          <span className="text-[#6b7280]">PROJECT-LINKED EVIDENCE MATRIX</span>
        </div>
        <h3 className="text-xl font-bold text-[#f2eee6] mt-1">
          Interactive Skill & Implementation Map
        </h3>
        <p className="text-xs text-[#9ca3af] mt-1 max-w-xl">
          No arbitrary 90% proficiency percentages. Every technology is directly linked to the actual system, capstone, or internship where it was implemented.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {skillCategories.map((cat) => {
          const isSelected = selectedCategory.title === cat.title
          return (
            <button
              key={cat.title}
              onClick={() => {
                setSelectedCategory(cat)
                setActiveItem(cat.items[0])
              }}
              className={`rounded px-3.5 py-1.5 font-mono text-xs transition-colors ${
                isSelected
                  ? 'bg-[#1a1e26] text-[#f2eee6] font-bold border border-[#e1523d]'
                  : 'bg-[#090a0d] text-[#8b949e] border border-[#232832] hover:text-[#f2eee6]'
              }`}
            >
              {cat.title}
            </button>
          )
        })}
      </div>

      {/* Grid of Tools + Inspection Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Technologies List */}
        <div className="md:col-span-6 space-y-2 font-mono text-xs">
          {selectedCategory.items.map((item) => {
            const isActive = activeItem.name === item.name
            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item)}
                className={`w-full text-left rounded-lg p-3.5 transition-all flex items-center justify-between border ${
                  isActive
                    ? 'border-[#e1523d] bg-[#1a1e26] text-[#f2eee6]'
                    : 'border-[#232832] bg-[#090a0d] text-[#a3abb6] hover:border-[#38404f] hover:text-[#f2eee6]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isActive ? 'bg-[#e1523d]' : 'bg-[#3b4252]'
                    }`}
                  />
                  <span className="font-semibold">{item.name}</span>
                </div>
                {item.relatedProjectTitle && (
                  <span className="text-[10px] text-[#8b949e]">
                    {item.relatedProjectTitle}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Selected Technology Evidence Card */}
        <div className="md:col-span-6 rounded-lg border border-[#232832] bg-[#090a0d] p-6 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#1f242e]">
            <span className="text-[#10b981] font-bold">IMPLEMENTATION EVIDENCE</span>
            <span className="text-[#8b949e]">{selectedCategory.title}</span>
          </div>

          <div>
            <h4 className="text-xl font-bold text-[#f2eee6]">
              {activeItem.name}
            </h4>
            <p className="font-sans text-xs text-[#a3abb6] mt-2 leading-relaxed">
              {activeItem.context}
            </p>
          </div>

          {activeItem.relatedProjectSlug && activeItem.relatedProjectTitle && (
            <div className="pt-4 border-t border-[#1f242e] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#6b7280] block">
                  ASSOCIATED SYSTEM
                </span>
                <span className="text-[#f2eee6] font-bold">
                  {activeItem.relatedProjectTitle}
                </span>
              </div>
              <Link
                href={`/work/${activeItem.relatedProjectSlug}`}
                className="inline-flex items-center gap-1.5 rounded bg-[#e1523d] px-3 py-1.5 text-[11px] text-white hover:bg-[#ef634f] transition-colors"
              >
                <span>Inspect Project</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
