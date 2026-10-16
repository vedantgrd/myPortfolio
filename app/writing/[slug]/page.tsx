import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Share2,
  Tag,
  AlertCircle,
  Lightbulb,
  Info,
  Quote,
  Heart,
} from 'lucide-react'
import fs from 'fs'
import path from 'path'
import { articles as staticArticles, baseArticles, Article } from '@/data/writing'

function getArticles(): Article[] {
  try {
    const customPath = path.join(process.cwd(), 'data', 'custom-articles.json')
    if (fs.existsSync(customPath)) {
      const data = JSON.parse(fs.readFileSync(customPath, 'utf8'))
      return [...data, ...baseArticles]
    }
  } catch (e) {
    // fallback
  }
  return staticArticles
}

export async function generateStaticParams() {
  return getArticles().map((article) => ({
    slug: article.slug,
  }))
}

function renderParagraphWithLinks(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: (string | React.ReactNode)[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const [fullMatch, linkText, url] = match
    const isInternal = url.startsWith('/')
    if (isInternal) {
      parts.push(
        <Link
          key={match.index}
          href={url}
          className="text-[#e1523d] underline decoration-[#e1523d]/50 underline-offset-4 hover:decoration-[#ef634f] hover:text-[#ef634f] transition-colors font-medium"
        >
          {linkText}
        </Link>
      )
    } else {
      parts.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#e1523d] underline decoration-[#e1523d]/50 underline-offset-4 hover:decoration-[#ef634f] hover:text-[#ef634f] transition-colors font-medium"
        >
          {linkText}
        </a>
      )
    }
    lastIndex = match.index + fullMatch.length
  }

  if (lastIndex === 0) return text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  return parts
}

export const dynamicParams = true

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const articles = getArticles()
  const article = articles.find((a) => a.slug === slug)
  if (!article) {
    return {
      title: 'Article Not Found // Vedant Garud',
    }
  }
  return {
    title: `${article.title} // Vedant Garud`,
    description: article.excerpt || article.subtitle,
  }
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const articles = getArticles()
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  const currentIndex = articles.findIndex((a) => a.slug === slug)
  const nextArticle = articles[(currentIndex + 1) % articles.length]
  const prevArticle =
    articles[(currentIndex - 1 + articles.length) % articles.length]

  return (
    <article className="min-h-screen bg-[#0d0f12] pt-6 pb-20 sm:pt-8 sm:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#232832] pb-6 font-mono text-xs text-[#8b949e]">
          <Link
            href="/writing"
            className="inline-flex items-center gap-1.5 text-[#e1523d] hover:text-[#ef634f] transition-colors font-semibold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to The Journal &amp; Memoir</span>
          </Link>
          <div className="flex items-center gap-2">
            <span>MEMOIR ENTRY // 0{currentIndex + 1} OF 0{articles.length}</span>
          </div>
        </div>

        {/* Article Masthead Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#8b949e]">
            <span className="mono-badge text-[#e1523d] border-[#e1523d]/30">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {article.date}
            </span>
            {article.publishedTime && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#e1523d]/90 font-mono">
                  <Clock className="h-3.5 w-3.5" />
                  {article.publishedTime}
                </span>
              </>
            )}
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#f2eee6] leading-[1.15]">
            {article.title}
          </h1>

          <p className="font-mono text-sm sm:text-base text-[#e1523d]">
            {article.subtitle}
          </p>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1f242e]">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-[#14171d] border border-[#232832] px-2.5 py-0.5 font-mono text-xs text-[#8b949e]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Lead In / Abstract + Commemorative Photo Frame */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 rounded-xl border-l-2 border-[#e1523d] bg-[#14171d] p-6 sm:p-8 text-base sm:text-lg text-[#cfd6e0] leading-relaxed italic font-serif">
            &ldquo;{article.content.lead}&rdquo;
          </div>
          {(article.photoFrame || article.slug === 'so-suicide') && (
            <div className="shrink-0">
              <div className="relative group cursor-pointer transition-all duration-300 ease-out rotate-2 hover:rotate-0 hover:scale-105">
                <div className="relative bg-[#ffffff] p-2.5 pb-6 sm:p-3 sm:pb-7 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.7)] border-2 border-white ring-1 ring-black/20">
                  <div
                    className={`relative ${
                      article.photoFrame?.aspect || 'aspect-[3/4]'
                    } w-48 sm:w-56 overflow-hidden rounded-[2px] bg-[#0d0f12]`}
                  >
                    <img
                      src={article.photoFrame?.url || '/images/rj-mitte.png'}
                      alt={article.photoFrame?.caption || 'Photo'}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-2 text-center font-mono text-[10px] sm:text-[10.5px] text-[#2b2b2b] tracking-wider select-none font-semibold uppercase">
                    {article.photoFrame?.caption || 'you will be missed, bro.'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Article Body Content */}
        <div className="prose-editorial space-y-10">
          {article.content.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="text-2xl font-bold text-[#f2eee6] tracking-tight border-b border-[#232832] pb-2">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {renderParagraphWithLinks(para)}
                </p>
              ))}

              {/* Optional Section Photo Frame (Single) */}
              {section.photoFrame && (
                <div className="my-8 flex justify-center">
                  <div
                    className={`relative group cursor-pointer transition-all duration-300 ease-out ${
                      section.photoFrame.tilt === 'left'
                        ? '-rotate-2'
                        : section.photoFrame.tilt === 'none'
                          ? 'rotate-0'
                          : 'rotate-2'
                    } hover:rotate-0 hover:scale-[1.02]`}
                  >
                    <div className="relative bg-[#ffffff] p-2.5 pb-6 sm:p-3 sm:pb-7 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.7)] border-2 border-white ring-1 ring-black/20 max-w-sm sm:max-w-md md:max-w-lg">
                      <div
                        className={`relative ${
                          section.photoFrame.aspect || 'aspect-[4/3]'
                        } w-64 sm:w-80 md:w-[440px] overflow-hidden rounded-[2px] bg-[#0d0f12]`}
                      >
                        <img
                          src={section.photoFrame.url}
                          alt={section.photoFrame.caption}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="pt-2.5 text-center font-mono text-[10px] sm:text-[11px] text-[#2b2b2b] tracking-wider select-none font-semibold uppercase">
                        {section.photoFrame.caption}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Optional Section Photo Frames (Multiple) */}
              {section.photoFrames && section.photoFrames.length > 0 && (
                <div className="my-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                  {section.photoFrames.map((frame, fIdx) => (
                    <div
                      key={fIdx}
                      className={`relative group cursor-pointer transition-all duration-300 ease-out ${
                        frame.tilt === 'left'
                          ? '-rotate-2'
                          : frame.tilt === 'none'
                            ? 'rotate-0'
                            : 'rotate-2'
                      } hover:rotate-0 hover:scale-105`}
                    >
                      <div className="relative bg-[#ffffff] p-2.5 pb-6 sm:p-3 sm:pb-7 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.7)] border-2 border-white ring-1 ring-black/20">
                        <div
                          className={`relative ${
                            frame.aspect || 'aspect-[4/3]'
                          } w-60 sm:w-72 overflow-hidden rounded-[2px] bg-[#0d0f12]`}
                        >
                          <img
                            src={frame.url}
                            alt={frame.caption}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="pt-2 text-center font-mono text-[10px] sm:text-[11px] text-[#2b2b2b] tracking-wider select-none font-semibold uppercase">
                          {frame.caption}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Optional Section Image */}
              {section.image && (
                <div className="my-6 rounded-lg border border-[#232832] bg-[#14171d] p-3 overflow-hidden space-y-2">
                  <img
                    src={section.image.url}
                    alt={section.image.caption}
                    className="w-full rounded object-cover"
                  />
                  <p className="text-[11px] font-mono text-[#8b949e] text-center">
                    {section.image.caption}
                  </p>
                </div>
              )}

              {/* Code Snippet if present */}
              {section.codeBlock && (
                <div className="my-6 rounded-lg border border-[#232832] bg-[#090a0d] overflow-hidden">
                  {section.codeBlock.filename && (
                    <div className="flex items-center justify-between border-b border-[#1f242e] bg-[#14171d] px-4 py-2 font-mono text-[11px] text-[#8b949e]">
                      <span>{section.codeBlock.filename}</span>
                      <span className="text-[#e1523d]">
                        {section.codeBlock.language}
                      </span>
                    </div>
                  )}
                  <pre className="p-4 overflow-x-auto font-mono text-xs text-[#e4decb] leading-relaxed">
                    <code>{section.codeBlock.code}</code>
                  </pre>
                </div>
              )}

              {/* Callout box if present */}
              {section.callout && (
                <div
                  className={`my-6 rounded-lg border p-6 space-y-2 ${section.callout.type === 'quote'
                    ? 'border-[#e1523d]/40 bg-[#e1523d]/10 text-[#fca5a5]'
                    : section.callout.type === 'warning'
                      ? 'border-[#dc2626]/40 bg-[#dc2626]/10 text-[#fca5a5]'
                      : section.callout.type === 'insight'
                        ? 'border-[#3b68ff]/40 bg-[#3b68ff]/10 text-[#bfdbfe]'
                        : 'border-[#f59e0b]/40 bg-[#f59e0b]/10 text-[#fde68a]'
                    }`}
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
                    {section.callout.type === 'quote' && <Quote className="h-4 w-4 text-[#e1523d]" />}
                    {section.callout.type === 'warning' && <AlertCircle className="h-4 w-4" />}
                    {section.callout.type === 'insight' && <Lightbulb className="h-4 w-4" />}
                    {section.callout.type === 'note' && <Info className="h-4 w-4" />}
                    <span>{section.callout.title}</span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed font-serif italic text-[#f2eee6]">
                    &ldquo;{section.callout.body}&rdquo;
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Nostalgic Archival Record Stamp */}
        <div className="rounded-xl border border-[#232832] bg-[#14171d]/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs text-[#8b949e]">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[#e1523d] animate-pulse" />
            <span className="text-[#f2eee6] font-semibold uppercase tracking-wider">
              MEMOIR ARCHIVAL RECORD
            </span>
            <span>//</span>
            <span>
              LOGGED ON {article.date.toUpperCase()}{article.publishedTime ? ` • ${article.publishedTime}` : ''}
            </span>
          </div>
          <div className="text-[11px] text-[#6b7280]">
            PERMANENT CHRONICLE // VEDANT GARUD
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="rounded-xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border border-[#e1523d]/50 shrink-0 bg-[#090a0d]">
            <img
              src="/images/profile.jpg"
              alt="Vedant Garud"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-1 text-xs text-[#9ca3af]">
            <div className="font-mono text-[#f2eee6] text-sm font-bold">
              Vedant Garud
            </div>
            <p className="leading-relaxed">
              Student engineer at Pillai College of Engineering, cinephile, and thinker. Writing about mental health, pop-culture, cinema, understanding humans, and technology. Unfinished by design and Unfiltered by content.
            </p>
            <div className="pt-1 font-mono text-[11px] text-[#e1523d]">
              Thane, Maharashtra // <Link href="/contact" className="hover:underline">Send a response or thought &rarr;</Link>
            </div>
          </div>
        </div>

        {/* Next / Previous Navigation */}
        <footer className="border-t border-[#232832] pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
          <Link
            href={`/writing/${prevArticle.slug}`}
            className="group rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-1 hover:border-[#8b949e] transition-colors"
          >
            <span className="text-[10px] text-[#8b949e] uppercase">&larr; Previous Entry</span>
            <div className="font-bold text-[#f2eee6] group-hover:text-[#e1523d] transition-colors truncate">
              {prevArticle.title}
            </div>
          </Link>

          <Link
            href={`/writing/${nextArticle.slug}`}
            className="group rounded-lg border border-[#232832] bg-[#14171d] p-4 space-y-1 text-left sm:text-right hover:border-[#8b949e] transition-colors"
          >
            <span className="text-[10px] text-[#8b949e] uppercase">Next Entry &rarr;</span>
            <div className="font-bold text-[#f2eee6] group-hover:text-[#e1523d] transition-colors truncate">
              {nextArticle.title}
            </div>
          </Link>
        </footer>
      </div>
    </article>
  )
}
