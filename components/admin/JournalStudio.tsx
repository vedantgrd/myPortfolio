'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  BookOpen,
  Image as ImageIcon,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Quote,
  Code2,
  FileText,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  Tag,
  Calendar,
  Clock,
  Layers,
  Star,
  Download,
  Terminal,
  Key,
  X,
  UploadCloud,
  RefreshCw,
} from 'lucide-react'

interface SectionState {
  id: string
  heading: string
  paragraphsText: string
  hasPhotoFrame: boolean
  photoFrame: {
    url: string
    caption: string
    aspect: string
    tilt: 'left' | 'right' | 'none'
  }
  hasCallout: boolean
  callout: {
    type: 'note' | 'insight' | 'warning' | 'quote'
    title: string
    body: string
  }
}

const CATEGORIES = [
  'Being Human',
  'Cinema & Culture',
  'Real Life & Journeys',
  'Books & Idols',
  'Systems & Engineering',
] as const

const DEFAULT_CODE_TEMPLATE = `{
  slug: 'my-new-reflection',
  title: 'Title of My Article',
  subtitle: 'A thoughtful subtitle or secondary topic line',
  date: '16 October 2026',
  publishedTime: '11:45 AM IST',
  readTime: '5 min read',
  category: 'Being Human',
  tags: ['Faith', 'Humanity', 'Perspective', 'Life'],
  featured: false,
  excerpt: 'A short 1-2 sentence hook for the preview card.',
  content: {
    lead: 'The opening paragraph rendered in editorial typography...',
    sections: [
      {
        heading: 'First Section Heading',
        paragraphs: [
          'First paragraph of this section.',
          'Second paragraph goes here.'
        ]
      }
    ]
  }
}`

function parseArticleSnippet(input: string): { article?: any; error?: string } {
  let cleaned = input.trim()
  if (!cleaned) return {}

  // Strip leading variable declarations or exports
  cleaned = cleaned.replace(
    /^(export\s+)?(const|let|var)\s+[\w$]+(\s*:\s*[\w$<>\[\]]+)?\s*=\s*/,
    ''
  )
  // Strip trailing semicolon
  cleaned = cleaned.replace(/;\s*$/, '')

  // 1. Try standard JSON.parse
  try {
    const parsed = JSON.parse(cleaned)
    if (parsed && typeof parsed === 'object') {
      return { article: parsed }
    }
  } catch {
    // Fall through to JS object evaluator
  }

  // 2. Try JavaScript Object Evaluation
  try {
    const evaluator = new Function(`"use strict"; return (${cleaned});`)
    const parsed = evaluator()
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return { article: parsed }
    }
    if (Array.isArray(parsed) && parsed.length > 0) {
      return { article: parsed[0] }
    }
    return { error: 'Parsed code is not a valid article object.' }
  } catch (err: any) {
    return { error: err.message || 'Syntax error in JavaScript/JSON object format.' }
  }
}

export function JournalStudio() {
  const [composerMode, setComposerMode] = useState<'paste' | 'form'>('paste')

  // Pinned Best Work Management
  const [pinnedBestSlug, setPinnedBestSlug] = useState('so-suicide')
  const [allAvailableArticles, setAllAvailableArticles] = useState<{ slug: string; title: string }[]>([])
  const [isUpdatingPinned, setIsUpdatingPinned] = useState(false)
  const [pinnedSuccessMsg, setPinnedSuccessMsg] = useState('')

  // GitHub Direct-Publishing Token State
  const [githubToken, setGithubToken] = useState('')
  const [tokenInputDraft, setTokenInputDraft] = useState('')
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false)
  const [isCommittingDirect, setIsCommittingDirect] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('myportfolio_gh_token')
      if (saved) {
        setGithubToken(saved)
        setTokenInputDraft(saved)
      }
    } catch {}
  }, [])

  const handleSaveToken = (tokenToSave: string) => {
    const clean = tokenToSave.trim()
    setGithubToken(clean)
    setTokenInputDraft(clean)
    try {
      if (clean) {
        localStorage.setItem('myportfolio_gh_token', clean)
        toast.success('GitHub Token saved in your browser!')
      } else {
        localStorage.removeItem('myportfolio_gh_token')
        toast.info('GitHub Token removed from browser.')
      }
    } catch {}
  }

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.articles && Array.isArray(data.articles)) {
          setAllAvailableArticles(data.articles.map((a: any) => ({ slug: a.slug, title: a.title })))
        }
        if (data?.featuredSlug) {
          setPinnedBestSlug(data.featuredSlug)
        }
      })
      .catch(() => {})
  }, [])

  const handleUpdatePinned = async (slugToPin: string) => {
    setIsUpdatingPinned(true)
    setPinnedSuccessMsg('')
    const tId = toast.loading('Pinning best work...')
    try {
      const res = await fetch('/api/articles', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(githubToken ? { 'x-github-token': githubToken } : {}),
        },
        body: JSON.stringify({ slug: slugToPin, githubToken }),
      })
      const data = await res.json()
      if (res.ok) {
        setPinnedBestSlug(slugToPin)
        setPinnedSuccessMsg('Best work pinned! Active across all portfolio pages.')
        toast.success(data.publishedToGithub ? 'Pinned & committed to GitHub!' : 'Best work pinned locally!', { id: tId })
        setTimeout(() => setPinnedSuccessMsg(''), 4000)
      } else {
        toast.error(data.error || 'Failed to update pinned article', { id: tId })
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update pinned article', { id: tId })
    }
    setIsUpdatingPinned(false)
  }

  // Paste Code State
  const [rawCode, setRawCode] = useState('')
  const [isPublishingCode, setIsPublishingCode] = useState(false)
  const [copiedTemplate, setCopiedTemplate] = useState(false)

  // Interactive Form State
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [customSlug, setCustomSlug] = useState('')
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('Being Human')
  const [tagsInput, setTagsInput] = useState('')
  const [date, setDate] = useState(() =>
    new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
  )
  const [publishedTime, setPublishedTime] = useState(() =>
    new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date()) + ' IST'
  )
  const [customReadTime, setCustomReadTime] = useState('')
  const [featured, setFeatured] = useState(false)
  const [excerpt, setExcerpt] = useState('')
  const [lead, setLead] = useState('')

  // Cover Polaroid Frame
  const [hasCoverPhoto, setHasCoverPhoto] = useState(false)
  const [coverPhoto, setCoverPhoto] = useState({
    url: '',
    caption: '',
    aspect: 'aspect-[4/3]',
    tilt: 'left' as 'left' | 'right' | 'none',
  })

  // Dynamic Content Sections
  const [sections, setSections] = useState<SectionState[]>([
    {
      id: '1',
      heading: '',
      paragraphsText: '',
      hasPhotoFrame: false,
      photoFrame: {
        url: '',
        caption: '',
        aspect: 'aspect-[4/3]',
        tilt: 'left',
      },
      hasCallout: false,
      callout: {
        type: 'insight',
        title: '',
        body: '',
      },
    },
  ])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [readOnlyNotice, setReadOnlyNotice] = useState<{
    slug: string
    article: any
    updatedCustomJson?: string | null
    error?: string
  } | null>(null)
  const [copiedJson, setCopiedJson] = useState(false)
  const [copiedCmd, setCopiedCmd] = useState(false)

  // Direct Publish with GitHub Token
  const handlePublishWithToken = async (overrideToken?: string) => {
    const tokenToUse = (overrideToken || githubToken).trim()
    if (!tokenToUse) {
      toast.error('Please enter a GitHub Personal Access Token.')
      return
    }

    if (!readOnlyNotice?.article) {
      toast.error('No article payload available to publish.')
      return
    }

    setIsCommittingDirect(true)
    const tId = toast.loading('Committing article directly to GitHub (vedantgrd/myPortfolio)...')
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-github-token': tokenToUse,
        },
        body: JSON.stringify({
          ...readOnlyNotice.article,
          githubToken: tokenToUse,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'GitHub commit failed.')
      }

      handleSaveToken(tokenToUse)
      setPublishedSlug(data.slug || readOnlyNotice.slug)
      setReadOnlyNotice(null)
      setIsTokenModalOpen(false)
      toast.success('Committed to GitHub! Vercel build triggered (~45s).', {
        id: tId,
        duration: 9000,
        action: data.commitUrl
          ? {
              label: 'View Commit',
              onClick: () => window.open(data.commitUrl, '_blank'),
            }
          : undefined,
      })
    } catch (err: any) {
      toast.error(err.message || 'GitHub commit failed', { id: tId, duration: 6000 })
    } finally {
      setIsCommittingDirect(false)
    }
  }

  // Parsing result for Paste Code mode
  const parsedResult = useMemo(() => {
    if (!rawCode.trim()) return null
    return parseArticleSnippet(rawCode)
  }, [rawCode])

  // Word count & read time estimation for form
  const totalWordCount = useMemo(() => {
    const text = [lead, ...sections.map((s) => s.paragraphsText)].join(' ')
    return text.trim().split(/\s+/).filter(Boolean).length
  }, [lead, sections])

  const calculatedReadTime = useMemo(() => {
    const mins = Math.max(1, Math.ceil(totalWordCount / 200))
    return `${mins} min read`
  }, [totalWordCount])

  // Word count for pasted article
  const parsedStats = useMemo(() => {
    if (!parsedResult?.article) return null
    const art = parsedResult.article
    const leadText = art.content?.lead || ''
    const secTexts = (art.content?.sections || []).flatMap((s: any) =>
      Array.isArray(s.paragraphs) ? s.paragraphs : [s.paragraphs || '']
    )
    const combined = [leadText, ...secTexts].join(' ')
    const words = combined.trim().split(/\s+/).filter(Boolean).length
    const paragraphCount = 1 + secTexts.length
    const sectionCount = art.content?.sections?.length || 0
    return {
      words,
      paragraphCount,
      sectionCount,
      hasLead: Boolean(leadText.trim()),
      hasTitle: Boolean(art.title?.trim()),
    }
  }, [parsedResult])

  const handlePublishCode = async () => {
    setErrorMessage('')
    setPublishedSlug(null)

    if (!rawCode.trim()) {
      const msg = 'Please paste your article code snippet first.'
      setErrorMessage(msg)
      toast.error(msg)
      return
    }

    const res = parseArticleSnippet(rawCode)
    if (res.error || !res.article) {
      const msg = `Cannot publish: ${res.error || 'Invalid code structure'}`
      setErrorMessage(msg)
      toast.error(msg)
      return
    }

    const art = res.article
    if (!art.title || !art.title.trim()) {
      const msg = 'Article title is missing in your code object.'
      setErrorMessage(msg)
      toast.error(msg)
      return
    }
    if (!art.content || !art.content.lead || !art.content.lead.trim()) {
      const msg = 'Article content.lead is missing in your code object.'
      setErrorMessage(msg)
      toast.error(msg)
      return
    }

    setIsPublishingCode(true)
    const toastId = toast.loading('Publishing article...')

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(githubToken ? { 'x-github-token': githubToken } : {}),
        },
        body: JSON.stringify({ ...art, githubToken }),
      })

      const data = await response.json()
      if (!response.ok) {
        if (
          data.isReadOnly ||
          data.needsGithubToken ||
          data.code === 'EROFS' ||
          data.error?.includes('EROFS') ||
          data.error?.includes('read-only')
        ) {
          setReadOnlyNotice({
            slug: data.slug || art.slug,
            article: data.article || art,
            updatedCustomJson: data.updatedCustomJson || null,
            error: data.error,
          })
          setErrorMessage('')
          toast.error(
            data.error?.includes('GitHub Commit Error')
              ? data.error
              : 'Deployed site is read-only. Enter GitHub Token to publish live.',
            { id: toastId, duration: 6000 }
          )
          setIsTokenModalOpen(true)
          return
        }
        throw new Error(data.error || 'Failed to publish article')
      }

      setReadOnlyNotice(null)
      setPublishedSlug(data.slug)
      if (data.publishedToGithub) {
        toast.success('Article committed to GitHub! Live deployment in progress (~45s).', {
          id: toastId,
          duration: 9000,
          action: data.commitUrl
            ? {
                label: 'View Commit',
                onClick: () => window.open(data.commitUrl, '_blank'),
              }
            : undefined,
        })
      } else {
        toast.success('Article published successfully!', { id: toastId, duration: 5000 })
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error publishing article')
      toast.error(err.message || 'Error publishing article', { id: toastId })
    } finally {
      setIsPublishingCode(false)
    }
  }

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        heading: '',
        paragraphsText: '',
        hasPhotoFrame: false,
        photoFrame: {
          url: '',
          caption: '',
          aspect: 'aspect-[4/3]',
          tilt: 'left',
        },
        hasCallout: false,
        callout: {
          type: 'insight',
          title: '',
          body: '',
        },
      },
    ])
  }

  const removeSection = (id: string) => {
    if (sections.length === 1) return
    setSections((prev) => prev.filter((s) => s.id !== id))
  }

  const updateSection = (id: string, updates: Partial<SectionState>) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setPublishedSlug(null)

    if (!title.trim()) {
      const msg = 'Please provide an article title.'
      setErrorMessage(msg)
      toast.error(msg)
      return
    }

    if (!lead.trim()) {
      const msg = 'Please provide the opening lead paragraph.'
      setErrorMessage(msg)
      toast.error(msg)
      return
    }

    setIsSubmitting(true)
    const toastId = toast.loading('Publishing article...')

    try {
      const payload = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        slug: customSlug.trim() || undefined,
        category,
        tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
        date: date.trim(),
        publishedTime: publishedTime.trim() || undefined,
        readTime: customReadTime.trim() || calculatedReadTime,
        featured,
        excerpt: excerpt.trim() || lead.slice(0, 160) + '...',
        photoFrame: hasCoverPhoto && coverPhoto.url.trim() ? coverPhoto : undefined,
        content: {
          lead: lead.trim(),
          sections: sections
            .filter((s) => s.paragraphsText.trim() || s.heading.trim() || s.hasPhotoFrame)
            .map((s) => ({
              heading: s.heading.trim() || undefined,
              paragraphs: s.paragraphsText
                .split('\n\n')
                .map((p) => p.trim())
                .filter(Boolean),
              photoFrame:
                s.hasPhotoFrame && s.photoFrame.url.trim()
                  ? s.photoFrame
                  : undefined,
              callout:
                s.hasCallout && s.callout.body.trim()
                  ? s.callout
                  : undefined,
            })),
        },
        githubToken,
      }

      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(githubToken ? { 'x-github-token': githubToken } : {}),
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        if (
          data.isReadOnly ||
          data.needsGithubToken ||
          data.code === 'EROFS' ||
          data.error?.includes('EROFS') ||
          data.error?.includes('read-only')
        ) {
          setReadOnlyNotice({
            slug: data.slug || payload.slug || 'new-article',
            article: data.article || payload,
            updatedCustomJson: data.updatedCustomJson || null,
            error: data.error,
          })
          setErrorMessage('')
          toast.error(
            data.error?.includes('GitHub Commit Error')
              ? data.error
              : 'Deployed site is read-only. Enter GitHub Token to publish live.',
            { id: toastId, duration: 6000 }
          )
          setIsTokenModalOpen(true)
          return
        }
        throw new Error(data.error || 'Failed to publish article')
      }

      setReadOnlyNotice(null)
      setPublishedSlug(data.slug)
      if (data.publishedToGithub) {
        toast.success('Article committed to GitHub! Live deployment in progress (~45s).', {
          id: toastId,
          duration: 9000,
          action: data.commitUrl
            ? {
                label: 'View Commit',
                onClick: () => window.open(data.commitUrl, '_blank'),
              }
            : undefined,
        })
      } else {
        toast.success('Article published successfully!', { id: toastId, duration: 5000 })
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error publishing article')
      toast.error(err.message || 'Error publishing article', { id: toastId })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the form?')) {
      setTitle('')
      setSubtitle('')
      setCustomSlug('')
      setTagsInput('')
      setExcerpt('')
      setLead('')
      setHasCoverPhoto(false)
      setSections([
        {
          id: '1',
          heading: '',
          paragraphsText: '',
          hasPhotoFrame: false,
          photoFrame: {
            url: '',
            caption: '',
            aspect: 'aspect-[4/3]',
            tilt: 'left',
          },
          hasCallout: false,
          callout: {
            type: 'insight',
            title: '',
            body: '',
          },
        },
      ])
      setPublishedSlug(null)
      setErrorMessage('')
    }
  }

  const renderFeedbackBlock = () => {
    if (!publishedSlug && !errorMessage && !readOnlyNotice) return null

    return (
      <div className="space-y-4">
        {/* Success Notification */}
        {publishedSlug && (
          <div className="rounded-2xl border border-[#10b981]/40 bg-[#10b981]/10 p-5 space-y-3">
            <div className="flex items-center gap-3 text-[#34d399]">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <div>
                <h3 className="font-bold text-sm text-[#f2eee6]">Article Published Successfully!</h3>
                <p className="text-xs text-[#a7f3d0] font-mono mt-0.5">
                  Live at <code className="font-bold">/writing/{publishedSlug}</code> &bull; Added to top of journal archive.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href={`/writing/${publishedSlug}`}
                target="_blank"
                className="inline-flex items-center gap-2 rounded bg-[#10b981] px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-black font-semibold hover:bg-[#34d399] transition-colors"
              >
                <span>View Live Article</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
              <Link
                href="/writing"
                target="_blank"
                className="inline-flex items-center gap-2 rounded border border-[#10b981]/40 bg-[#14171d] px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-[#f2eee6] hover:bg-[#1a1e26] transition-colors"
              >
                <span>View in Journal Stream</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="rounded-xl border border-[#ef4444]/40 bg-[#ef4444]/10 p-4 font-mono text-xs text-[#fca5a5] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-[#ef4444]" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage('')}
              className="text-[#fca5a5]/70 hover:text-white text-xs px-2 py-0.5"
            >
              ✕
            </button>
          </div>
        )}

        {/* Read-Only Serverless Environment Notice */}
        {readOnlyNotice && (
          <div className="rounded-2xl border border-amber-500/40 bg-[#16130b] p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-start gap-3.5 text-amber-400">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-[#f2eee6]">
                  Serverless Production Detected (Read-Only Filesystem / EROFS)
                </h3>
                <p className="text-xs text-[#cfd6e0] leading-relaxed">
                  On the deployed Vercel site, file writes are blocked by serverless runtimes. Your article for <code className="text-amber-200 font-semibold font-mono">/writing/{readOnlyNotice.slug}</code> is ready! Choose an option below to make it live:
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => {
                  if (githubToken) {
                    handlePublishWithToken()
                  } else {
                    setIsTokenModalOpen(true)
                  }
                }}
                disabled={isCommittingDirect}
                className="inline-flex items-center gap-2 rounded bg-amber-500 px-4 py-2 font-bold text-black hover:bg-amber-400 transition-colors shadow-sm disabled:opacity-50"
              >
                {isCommittingDirect ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Deploying to GitHub...</span>
                  </>
                ) : (
                  <>
                    <Key className="h-3.5 w-3.5 text-black" />
                    <span>{githubToken ? 'Commit Directly to GitHub Now' : 'Enter GitHub Token to Publish Live'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  const content = readOnlyNotice.updatedCustomJson || JSON.stringify([readOnlyNotice.article], null, 2)
                  navigator.clipboard.writeText(content)
                  setCopiedJson(true)
                  toast.success('Copied custom-articles.json to clipboard!')
                  setTimeout(() => setCopiedJson(false), 3000)
                }}
                className="inline-flex items-center gap-2 rounded border border-amber-500/40 bg-[#1e1910] px-3.5 py-2 text-[#f2eee6] hover:bg-[#282114] transition-colors"
              >
                {copiedJson ? <Check className="h-3.5 w-3.5 text-amber-400" /> : <Copy className="h-3.5 w-3.5 text-amber-400" />}
                <span>{copiedJson ? 'Copied JSON!' : 'Copy custom-articles.json'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const content = readOnlyNotice.updatedCustomJson || JSON.stringify([readOnlyNotice.article], null, 2)
                  const blob = new Blob([content], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'custom-articles.json'
                  a.click()
                  URL.revokeObjectURL(url)
                  toast.success('custom-articles.json downloaded!')
                }}
                className="inline-flex items-center gap-2 rounded border border-amber-500/40 bg-[#1e1910] px-3.5 py-2 text-[#f2eee6] hover:bg-[#282114] transition-colors"
              >
                <Download className="h-3.5 w-3.5 text-amber-400" />
                <span>Download JSON</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const cmd = `git add data/custom-articles.json && git commit -m "Publish: ${readOnlyNotice.article?.title || readOnlyNotice.slug}" && git push`
                  navigator.clipboard.writeText(cmd)
                  setCopiedCmd(true)
                  toast.success('Copied Git command!')
                  setTimeout(() => setCopiedCmd(false), 3000)
                }}
                className="inline-flex items-center gap-2 rounded border border-[#2e2617] bg-[#110e08] px-3.5 py-2 text-[#cfd6e0] hover:text-[#f2eee6] hover:border-amber-500/50 transition-colors"
              >
                {copiedCmd ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Terminal className="h-3.5 w-3.5 text-amber-400" />}
                <span>{copiedCmd ? 'Copied Command!' : 'Copy Git Push Command'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#8b949e]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#e1523d] animate-pulse" />
            <span className="text-[#f2eee6] font-semibold">JOURNAL STUDIO</span>
            <span>//</span>
            <span>AUTHORING SYSTEM</span>
          </div>
          <span className="text-[#10b981] bg-[#10b981]/10 px-2.5 py-0.5 rounded border border-[#10b981]/25">
            NEW ARTICLES APPEAR FIRST ON TOP
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f2eee6]">
            Publish New Journal Entry
          </h2>
          <p className="text-xs sm:text-sm text-[#9ca3af] font-light max-w-2xl leading-relaxed">
            Write or paste your reflections directly. Every published entry is saved to disk, automatically prepended to the top of your journal archive, and immediately live at its dedicated URL.
          </p>
        </div>

        {/* Pinned Best Work Control Strip */}
        <div className="rounded-xl border border-[#232832] bg-[#0d0f12] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <Star className="h-4 w-4 text-[#e1523d] fill-[#e1523d] shrink-0" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#8b949e]">PINNED BEST WORK / TOP RATED PIECE:</span>
                <span className="text-[#f2eee6] font-bold">
                  {allAvailableArticles.find((a) => a.slug === pinnedBestSlug)?.title || 'So, Suicide.'}
                </span>
                <span className="text-[10px] text-[#e1523d]">(/writing/{pinnedBestSlug})</span>
              </div>
              <p className="text-[11px] text-[#6b7280] font-sans mt-0.5">
                Permanently locked to hero. Uploading new articles will never overwrite this until you change it.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={pinnedBestSlug}
              onChange={(e) => handleUpdatePinned(e.target.value)}
              disabled={isUpdatingPinned}
              className="rounded border border-[#232832] bg-[#14171d] px-3 py-1.5 text-xs font-mono text-[#f2eee6] focus:border-[#e1523d] focus:outline-none"
            >
              {allAvailableArticles.map((art) => (
                <option key={art.slug} value={art.slug}>
                  {art.title}
                </option>
              ))}
            </select>
            {pinnedSuccessMsg && (
              <span className="text-[#10b981] text-[11px] font-mono">
                ✓ Saved
              </span>
            )}
          </div>
        </div>

        {/* GitHub Live Direct Publishing Strip */}
        <div className="rounded-xl border border-[#232832] bg-[#0d0f12] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <Key className="h-4 w-4 text-amber-400 shrink-0" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#8b949e]">LIVE SITE PUBLISHING (GITHUB SYNC):</span>
                {githubToken ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Token Connected (vedantgrd/myPortfolio)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-amber-400/90 font-medium">
                    <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                    Required for 1-click live deploy on Vercel
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#6b7280] font-sans mt-0.5">
                Allows direct commits into <code className="text-[#cfd6e0]">vedantgrd/myPortfolio</code> from the deployed website, automatically triggering Vercel CI/CD.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsTokenModalOpen(true)}
              className="rounded border border-[#232832] bg-[#14171d] px-3 py-1.5 text-xs font-mono text-[#f2eee6] hover:border-[#e1523d] hover:text-[#e1523d] transition-colors flex items-center gap-1.5"
            >
              <Key className="h-3.5 w-3.5 text-amber-400" />
              <span>{githubToken ? 'Configure Token' : 'Connect GitHub Token'}</span>
            </button>
          </div>
        </div>

        {/* Composer Mode Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#1f242e] font-mono text-xs">
          <button
            type="button"
            onClick={() => {
              setComposerMode('paste')
              setErrorMessage('')
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold transition-all ${
              composerMode === 'paste'
                ? 'bg-[#e1523d] text-white shadow-md'
                : 'bg-[#0d0f12] text-[#8b949e] hover:text-[#f2eee6] border border-[#232832]'
            }`}
          >
            <Code2 className="h-4 w-4" />
            <span>Paste Code (Object / JSON)</span>
            <span className="rounded bg-black/25 px-1.5 py-0.2 text-[10px] uppercase">
              Fastest
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setComposerMode('form')
              setErrorMessage('')
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-semibold transition-all ${
              composerMode === 'form'
                ? 'bg-[#e1523d] text-white shadow-md'
                : 'bg-[#0d0f12] text-[#8b949e] hover:text-[#f2eee6] border border-[#232832]'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Interactive Form Composer</span>
          </button>
        </div>
      </div>

      {/* Top Feedback Block */}
      {renderFeedbackBlock()}

      {/* Mode 1: Paste Code Mode */}
      {composerMode === 'paste' ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-mono uppercase tracking-wider text-[#e1523d] font-semibold flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  <span>Paste Article Object / JSON Code</span>
                </h3>
                <p className="text-xs text-[#8b949e] font-light">
                  Paste your article code snippet. Supports JavaScript object literals (unquoted keys, single quotes, comments) and strict JSON.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setRawCode(DEFAULT_CODE_TEMPLATE)
                    setErrorMessage('')
                  }}
                  className="inline-flex items-center gap-1.5 rounded border border-[#232832] bg-[#0d0f12] px-3 py-1.5 text-[#cfd6e0] hover:text-[#f2eee6] hover:border-[#38404f] transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#e1523d]" />
                  <span>Load Template</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRawCode('')
                    setErrorMessage('')
                    setPublishedSlug(null)
                  }}
                  className="rounded border border-[#232832] bg-[#0d0f12] px-3 py-1.5 text-[#8b949e] hover:text-[#f2eee6] transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Code Textarea */}
            <div className="relative">
              <textarea
                value={rawCode}
                onChange={(e) => {
                  setRawCode(e.target.value)
                  setErrorMessage('')
                }}
                rows={18}
                spellCheck={false}
                placeholder={`Paste your article object code here, for example:\n\n${DEFAULT_CODE_TEMPLATE}`}
                className="w-full rounded-xl border border-[#232832] bg-[#090a0d] p-4 font-mono text-xs text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none leading-relaxed transition-all resize-y"
              />
            </div>

            {/* Live Parsing HUD */}
            {parsedResult?.error && (
              <div className="rounded-xl border border-[#f59e0b]/40 bg-[#f59e0b]/10 p-4 font-mono text-xs text-[#fcd34d] flex items-center gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 text-[#f59e0b]" />
                <div>
                  <strong className="font-semibold">Code Syntax Note:</strong>{' '}
                  <span>{parsedResult.error}</span>
                </div>
              </div>
            )}

            {parsedResult?.article && parsedStats && (
              <div className="rounded-xl border border-[#10b981]/30 bg-[#0d0f12] p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs border-b border-[#1f242e] pb-3">
                  <div className="flex items-center gap-2 text-[#34d399]">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-bold">PARSED ARTICLE TELEMETRY (VALID)</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#8b949e]">
                    <span>WORDS: <strong className="text-[#f2eee6]">{parsedStats.words}</strong></span>
                    <span>&bull;</span>
                    <span>SECTIONS: <strong className="text-[#f2eee6]">{parsedStats.sectionCount}</strong></span>
                    <span>&bull;</span>
                    <span>PARAGRAPHS: <strong className="text-[#f2eee6]">{parsedStats.paragraphCount}</strong></span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                    <span className="rounded bg-[#e1523d]/15 text-[#e1523d] px-2 py-0.5 border border-[#e1523d]/30 font-semibold">
                      {parsedResult.article.category || 'Being Human'}
                    </span>
                    <span className="text-[#8b949e]">
                      {parsedResult.article.date || '(Auto date on publish)'}
                    </span>
                    {parsedResult.article.publishedTime ? (
                      <>
                        <span className="text-[#6b7280]">&bull;</span>
                        <span className="text-[#e1523d]/90 font-mono">
                          {parsedResult.article.publishedTime}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-[#6b7280]">&bull;</span>
                        <span className="text-[#8b949e]/70 italic">
                          (Time auto-logged on publish)
                        </span>
                      </>
                    )}
                    <span className="text-[#6b7280]">&bull;</span>
                    <span className="text-[#8b949e]">
                      {parsedResult.article.readTime || `${Math.ceil(parsedStats.words / 200)} min read`}
                    </span>
                    {parsedResult.article.featured && (
                      <span className="rounded bg-[#f59e0b]/15 text-[#f59e0b] px-2 py-0.5 border border-[#f59e0b]/30 font-semibold">
                        ★ FEATURED / BEST WORK
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-bold text-[#f2eee6]">
                    {parsedResult.article.title || 'Untitled Article'}
                  </h4>

                  {parsedResult.article.subtitle && (
                    <p className="text-xs font-mono text-[#e1523d]">
                      {parsedResult.article.subtitle}
                    </p>
                  )}

                  <div className="pt-2">
                    <p className="text-xs text-[#9ca3af] font-mono">
                      Target URL Slug:{' '}
                      <span className="text-[#f2eee6] font-semibold">
                        /writing/{parsedResult.article.slug || '(auto-generated from title)'}
                      </span>
                    </p>
                  </div>

                  {parsedResult.article.tags && parsedResult.article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {parsedResult.article.tags.map((t: string) => (
                        <span
                          key={t}
                          className="rounded bg-[#1a1e26] border border-[#232832] px-2 py-0.5 font-mono text-[10px] text-[#8b949e]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}

                  {parsedResult.article.content?.lead && (
                    <div className="mt-3 p-3 rounded-lg bg-[#14171d] border border-[#1f242e] text-xs text-[#cfd6e0] italic leading-relaxed">
                      &ldquo;{parsedResult.article.content.lead.slice(0, 220)}...&rdquo;
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Inline Feedback Strip right above the button */}
            {renderFeedbackBlock()}

            {/* Publish Button Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1f242e]">
              <span className="font-mono text-xs text-[#8b949e]">
                Published entry immediately appears on top of /writing and is saved to disk.
              </span>

              <button
                type="button"
                onClick={handlePublishCode}
                disabled={isPublishingCode || !rawCode.trim()}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#e1523d] font-mono text-xs uppercase tracking-wider text-white font-bold hover:bg-[#ef634f] transition-colors shadow-lg disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {isPublishingCode ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Publishing Article from Code...</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="h-4 w-4" />
                    <span>Publish Article from Code (Appears First)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: Interactive Form Composer */
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Core Metadata Card */}
          <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#e1523d] font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>01 // Article Metadata</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="block font-mono text-xs text-[#a3abb6]">
                  Article Title <span className="text-[#e1523d]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Some Experiences Teach You What No Classroom Can"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded border border-[#232832] bg-[#0d0f12] p-3 text-sm text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block font-mono text-xs text-[#a3abb6]">
                  Subtitle / Topic Line
                </label>
                <input
                  type="text"
                  placeholder="e.g. On Childhood, Social Responsibility, and Why I Want to Stay and Build in India"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full rounded border border-[#232832] bg-[#0d0f12] p-3 text-xs sm:text-sm text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-[#a3abb6]">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full rounded border border-[#232832] bg-[#0d0f12] p-3 text-xs font-mono text-[#f2eee6] focus:border-[#e1523d] focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-[#a3abb6]">
                  Custom URL Slug (Optional)
                </label>
                <input
                  type="text"
                  placeholder="auto-generated from title if blank"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  className="w-full rounded border border-[#232832] bg-[#0d0f12] p-3 text-xs font-mono text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-[#a3abb6]">
                  Publication Date (Auto-Logged)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 16 October 2026"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded border border-[#232832] bg-[#0d0f12] p-3 text-xs font-mono text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-[#a3abb6]">
                  Exact Published Time (Auto-Logged IST)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 11:45 AM IST"
                  value={publishedTime}
                  onChange={(e) => setPublishedTime(e.target.value)}
                  className="w-full rounded border border-[#232832] bg-[#0d0f12] p-3 text-xs font-mono text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-[#a3abb6]">
                  Read Time (Auto: {calculatedReadTime})
                </label>
                <input
                  type="text"
                  placeholder={calculatedReadTime}
                  value={customReadTime}
                  onChange={(e) => setCustomReadTime(e.target.value)}
                  className="w-full rounded border border-[#232832] bg-[#0d0f12] p-3 text-xs font-mono text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block font-mono text-xs text-[#a3abb6]">
                  Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Faith, Religion, Humanity, Family, Personal Reflections"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full rounded border border-[#232832] bg-[#0d0f12] p-3 text-xs font-mono text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-[#f2eee6]">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded border-[#232832] text-[#e1523d] focus:ring-[#e1523d] bg-[#0d0f12] h-4 w-4"
                  />
                  <span>Set as Featured Memoir (Displays ★ BEST WORK / TOP RATED Scrapbook Sticker)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Lead & Excerpt Card */}
          <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#e1523d] font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>02 // Excerpt &amp; Opening Lead</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block font-mono text-xs text-[#a3abb6]">
                  Card Excerpt (1-2 sentences for preview card)
                </label>
                <textarea
                  rows={2}
                  placeholder="A brief summary that hooks the reader on the writing index..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full rounded border border-[#232832] bg-[#0d0f12] p-3 text-xs sm:text-sm text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-xs text-[#a3abb6]">
                  Opening Lead Paragraph <span className="text-[#e1523d]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="The opening paragraph rendered in large editorial serif font that starts the essay..."
                  value={lead}
                  onChange={(e) => setLead(e.target.value)}
                  className="w-full rounded border border-[#232832] bg-[#0d0f12] p-3 text-sm text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Cover Polaroid Photo Frame Card */}
          <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#e1523d] font-semibold flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span>03 // Cover Polaroid Frame (Optional)</span>
              </h3>
              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-[#f2eee6]">
                <input
                  type="checkbox"
                  checked={hasCoverPhoto}
                  onChange={(e) => setHasCoverPhoto(e.target.checked)}
                  className="rounded border-[#232832] text-[#e1523d] focus:ring-[#e1523d] bg-[#0d0f12] h-4 w-4"
                />
                <span>Attach Cover Polaroid</span>
              </label>
            </div>

            {hasCoverPhoto && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-[#a3abb6]">
                      Photo URL or Local Path
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. /images/orphanage-gate.jpg or https://..."
                      value={coverPhoto.url}
                      onChange={(e) => setCoverPhoto({ ...coverPhoto, url: e.target.value })}
                      className="w-full rounded border border-[#232832] bg-[#0d0f12] p-3 text-xs font-mono text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-[#a3abb6]">
                      Handwritten Polaroid Caption
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ANUGRAH VIDYA MANDIR // AMBERNATH (E)"
                      value={coverPhoto.caption}
                      onChange={(e) => setCoverPhoto({ ...coverPhoto, caption: e.target.value })}
                      className="w-full rounded border border-[#232832] bg-[#0d0f12] p-3 text-xs font-mono text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-[#a3abb6]">Aspect Ratio</label>
                      <select
                        value={coverPhoto.aspect}
                        onChange={(e) => setCoverPhoto({ ...coverPhoto, aspect: e.target.value })}
                        className="w-full rounded border border-[#232832] bg-[#0d0f12] p-2.5 text-xs font-mono text-[#f2eee6] focus:border-[#e1523d] focus:outline-none"
                      >
                        <option value="aspect-[4/3]">4:3 (Landscape)</option>
                        <option value="aspect-[3/4]">3:4 (Portrait)</option>
                        <option value="aspect-square">1:1 (Square)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-[#a3abb6]">Frame Tilt</label>
                      <select
                        value={coverPhoto.tilt}
                        onChange={(e) => setCoverPhoto({ ...coverPhoto, tilt: e.target.value as any })}
                        className="w-full rounded border border-[#232832] bg-[#0d0f12] p-2.5 text-xs font-mono text-[#f2eee6] focus:border-[#e1523d] focus:outline-none"
                      >
                        <option value="left">Tilt Left ↺ (-2°)</option>
                        <option value="none">Straight (0°)</option>
                        <option value="right">Tilt Right ↻ (+2°)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Polaroid Live Preview */}
                <div className="flex flex-col items-center justify-center p-4 bg-[#0d0f12] rounded-xl border border-[#232832]">
                  <span className="font-mono text-[10px] text-[#6b7280] mb-3 uppercase tracking-wider">
                    Live Polaroid Preview
                  </span>
                  <div
                    className={`relative bg-[#ffffff] p-2 pb-5 rounded-sm shadow-xl border-2 border-white max-w-[200px] ${
                      coverPhoto.tilt === 'left'
                        ? '-rotate-2'
                        : coverPhoto.tilt === 'right'
                        ? 'rotate-2'
                        : ''
                    }`}
                  >
                    <div
                      className={`relative ${coverPhoto.aspect} w-40 overflow-hidden rounded-[2px] bg-[#1a1e26] flex items-center justify-center`}
                    >
                      {coverPhoto.url ? (
                        <img
                          src={coverPhoto.url}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="font-mono text-[10px] text-[#8b949e]">No Image Set</span>
                      )}
                    </div>
                    <div className="pt-1.5 text-center font-mono text-[9px] text-[#2b2b2b] tracking-wider font-semibold uppercase">
                      {coverPhoto.caption || 'YOUR CAPTION HERE'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Sections Card */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#e1523d] font-semibold flex items-center gap-2">
                <Quote className="h-4 w-4" />
                <span>04 // Article Content Sections</span>
              </h3>
              <button
                type="button"
                onClick={addSection}
                className="inline-flex items-center gap-1.5 rounded border border-[#232832] bg-[#14171d] px-3 py-1.5 font-mono text-xs text-[#cfd6e0] hover:text-[#f2eee6] hover:border-[#e1523d] transition-colors"
              >
                <Plus className="h-3.5 w-3.5 text-[#e1523d]" />
                <span>Add Another Section</span>
              </button>
            </div>

            {sections.map((section, index) => (
              <div
                key={section.id}
                className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-8 space-y-6 relative"
              >
                <div className="flex items-center justify-between border-b border-[#232832] pb-4">
                  <span className="font-mono text-xs text-[#e1523d] font-bold">
                    SECTION {String(index + 1).padStart(2, '0')}
                  </span>
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(section.id)}
                      className="inline-flex items-center gap-1 font-mono text-xs text-[#ef4444] hover:text-[#f87171] transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete Section</span>
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-[#a3abb6]">
                      Section Heading (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Looking Beyond Ourselves"
                      value={section.heading}
                      onChange={(e) => updateSection(section.id, { heading: e.target.value })}
                      className="w-full rounded border border-[#232832] bg-[#0d0f12] p-3 text-sm text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block font-mono text-xs text-[#a3abb6]">
                        Paragraphs (Separate with an empty line)
                      </label>
                      <span className="font-mono text-[10px] text-[#6b7280]">
                        Markdown links like [Title](/path) supported
                      </span>
                    </div>
                    <textarea
                      rows={6}
                      placeholder="Write or paste your paragraphs here. Leave a blank line between paragraphs..."
                      value={section.paragraphsText}
                      onChange={(e) =>
                        updateSection(section.id, { paragraphsText: e.target.value })
                      }
                      className="w-full rounded border border-[#232832] bg-[#0d0f12] p-3 text-sm text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none leading-relaxed font-sans"
                    />
                  </div>

                  {/* Section Polaroid Frame Toggle */}
                  <div className="pt-2 border-t border-[#1f242e] space-y-4">
                    <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-[#f2eee6]">
                      <input
                        type="checkbox"
                        checked={section.hasPhotoFrame}
                        onChange={(e) =>
                          updateSection(section.id, { hasPhotoFrame: e.target.checked })
                        }
                        className="rounded border-[#232832] text-[#e1523d] focus:ring-[#e1523d] bg-[#0d0f12] h-4 w-4"
                      />
                      <span>Attach Polaroid Photo Frame to this Section</span>
                    </label>

                    {section.hasPhotoFrame && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#0d0f12] border border-[#232832]">
                        <div className="sm:col-span-2 space-y-3">
                          <div className="space-y-1">
                            <label className="block font-mono text-[11px] text-[#8b949e]">
                              Photo URL / Path
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. /images/orphanage-kids.jpg"
                              value={section.photoFrame.url}
                              onChange={(e) =>
                                updateSection(section.id, {
                                  photoFrame: { ...section.photoFrame, url: e.target.value },
                                })
                              }
                              className="w-full rounded border border-[#232832] bg-[#14171d] p-2 text-xs font-mono text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block font-mono text-[11px] text-[#8b949e]">
                              Polaroid Caption
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. CONVERSATIONS & CELEBRATIONS"
                              value={section.photoFrame.caption}
                              onChange={(e) =>
                                updateSection(section.id, {
                                  photoFrame: { ...section.photoFrame, caption: e.target.value },
                                })
                              }
                              className="w-full rounded border border-[#232832] bg-[#14171d] p-2 text-xs font-mono text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none uppercase"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="block font-mono text-[11px] text-[#8b949e]">
                                Aspect Ratio
                              </label>
                              <select
                                value={section.photoFrame.aspect}
                                onChange={(e) =>
                                  updateSection(section.id, {
                                    photoFrame: { ...section.photoFrame, aspect: e.target.value },
                                  })
                                }
                                className="w-full rounded border border-[#232832] bg-[#14171d] p-2 text-xs font-mono text-[#f2eee6] focus:border-[#e1523d] focus:outline-none"
                              >
                                <option value="aspect-[4/3]">4:3 Landscape</option>
                                <option value="aspect-[3/4]">3:4 Portrait</option>
                                <option value="aspect-square">1:1 Square</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="block font-mono text-[11px] text-[#8b949e]">
                                Tilt
                              </label>
                              <select
                                value={section.photoFrame.tilt}
                                onChange={(e) =>
                                  updateSection(section.id, {
                                    photoFrame: {
                                      ...section.photoFrame,
                                      tilt: e.target.value as any,
                                    },
                                  })
                                }
                                className="w-full rounded border border-[#232832] bg-[#14171d] p-2 text-xs font-mono text-[#f2eee6] focus:border-[#e1523d] focus:outline-none"
                              >
                                <option value="left">Tilt Left ↺</option>
                                <option value="none">Straight</option>
                                <option value="right">Tilt Right ↻</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Mini Preview */}
                        <div className="flex flex-col items-center justify-center p-2">
                          <div
                            className={`relative bg-[#ffffff] p-1.5 pb-4 rounded-sm shadow-md border border-white max-w-[140px] ${
                              section.photoFrame.tilt === 'left'
                                ? '-rotate-2'
                                : section.photoFrame.tilt === 'right'
                                ? 'rotate-2'
                                : ''
                            }`}
                          >
                            <div
                              className={`relative ${section.photoFrame.aspect} w-28 overflow-hidden rounded-[1px] bg-[#1a1e26] flex items-center justify-center`}
                            >
                              {section.photoFrame.url ? (
                                <img
                                  src={section.photoFrame.url}
                                  alt="Preview"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <span className="font-mono text-[8px] text-[#8b949e]">No Image</span>
                              )}
                            </div>
                            <div className="pt-1 text-center font-mono text-[7px] text-[#2b2b2b] tracking-wider font-semibold uppercase truncate">
                              {section.photoFrame.caption || 'CAPTION'}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Section Callout Toggle */}
                  <div className="pt-2 border-t border-[#1f242e] space-y-4">
                    <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-[#f2eee6]">
                      <input
                        type="checkbox"
                        checked={section.hasCallout}
                        onChange={(e) =>
                          updateSection(section.id, { hasCallout: e.target.checked })
                        }
                        className="rounded border-[#232832] text-[#e1523d] focus:ring-[#e1523d] bg-[#0d0f12] h-4 w-4"
                      />
                      <span>Attach Editorial Callout / Quote Box to this Section</span>
                    </label>

                    {section.hasCallout && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#0d0f12] border border-[#232832]">
                        <div className="space-y-1">
                          <label className="block font-mono text-[11px] text-[#8b949e]">
                            Callout Type
                          </label>
                          <select
                            value={section.callout.type}
                            onChange={(e) =>
                              updateSection(section.id, {
                                callout: { ...section.callout, type: e.target.value as any },
                              })
                            }
                            className="w-full rounded border border-[#232832] bg-[#14171d] p-2 text-xs font-mono text-[#f2eee6] focus:border-[#e1523d] focus:outline-none"
                          >
                            <option value="insight">Insight</option>
                            <option value="quote">Quote</option>
                            <option value="note">Note</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="block font-mono text-[11px] text-[#8b949e]">
                            Callout Title
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. A Perspective Worth Carrying"
                            value={section.callout.title}
                            onChange={(e) =>
                              updateSection(section.id, {
                                callout: { ...section.callout, title: e.target.value },
                              })
                            }
                            className="w-full rounded border border-[#232832] bg-[#14171d] p-2 text-xs font-mono text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-3 space-y-1">
                          <label className="block font-mono text-[11px] text-[#8b949e]">
                            Callout Body Text
                          </label>
                          <textarea
                            rows={2}
                            placeholder="The callout quote or key reflection..."
                            value={section.callout.body}
                            onChange={(e) =>
                              updateSection(section.id, {
                                callout: { ...section.callout, body: e.target.value },
                              })
                            }
                            className="w-full rounded border border-[#232832] bg-[#14171d] p-2 text-xs text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={addSection}
                className="inline-flex items-center gap-2 rounded-xl border border-dashed border-[#38404f] bg-[#14171d]/60 px-6 py-3 font-mono text-xs text-[#cfd6e0] hover:text-[#f2eee6] hover:border-[#e1523d] hover:bg-[#14171d] transition-all"
              >
                <Plus className="h-4 w-4 text-[#e1523d]" />
                <span>Add Another Content Section</span>
              </button>
            </div>
          </div>

          {/* Inline Feedback Strip right above the action bar */}
          {renderFeedbackBlock()}

          {/* Action Bar */}
          <div className="rounded-2xl border border-[#232832] bg-[#14171d] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 font-mono text-xs text-[#8b949e]">
              <span>WORDS: <strong className="text-[#f2eee6]">{totalWordCount}</strong></span>
              <span>•</span>
              <span>EST. READ: <strong className="text-[#e1523d]">{calculatedReadTime}</strong></span>
              <span>•</span>
              <span>SECTIONS: <strong className="text-[#f2eee6]">{sections.length}</strong></span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 rounded border border-[#232832] bg-[#0d0f12] text-xs font-mono text-[#8b949e] hover:text-[#f2eee6] hover:border-[#38404f] transition-colors"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded bg-[#e1523d] font-mono text-xs uppercase tracking-wider text-white font-bold hover:bg-[#ef634f] transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Publishing Article...</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="h-4 w-4" />
                    <span>Publish Article (Appears First)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* GitHub Direct Publishing Modal */}
      {isTokenModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-2xl border border-[#232832] bg-[#14171d] p-6 sm:p-7 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#e1523d]/15 border border-[#e1523d]/30 text-[#e1523d]">
                  <Key className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#f2eee6]">
                    GitHub 1-Click Live Publishing
                  </h3>
                  <p className="text-xs text-[#8b949e] font-mono mt-0.5">
                    Target: <code className="text-[#e1523d]">vedantgrd/myPortfolio</code> &bull; Branch: <code className="text-[#f2eee6]">main</code>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsTokenModalOpen(false)}
                className="rounded-lg p-1.5 text-[#8b949e] hover:text-white hover:bg-[#1f242e] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#cfd6e0] leading-relaxed">
              <p>
                Because Vercel serverless runtimes have an immutable read-only filesystem, publishing directly from the deployed site requires committing your article into <code className="text-amber-300">data/custom-articles.json</code> in your repository.
              </p>
              <p className="text-[#8b949e]">
                Provide a GitHub Personal Access Token (PAT) with <span className="text-[#f2eee6] font-mono font-semibold">repo</span> or <span className="text-[#f2eee6] font-mono font-semibold">Contents: Read and write</span> permissions. The token is saved in your browser&apos;s local storage.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-[#8b949e]">
                GITHUB PERSONAL ACCESS TOKEN
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={tokenInputDraft}
                  onChange={(e) => setTokenInputDraft(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full rounded-xl border border-[#232832] bg-[#090a0d] p-3 text-xs font-mono text-[#f2eee6] placeholder-[#4b5563] focus:border-[#e1523d] focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1">
                <a
                  href="https://github.com/settings/tokens/new?scopes=repo&description=myPortfolio-Live-Admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#e1523d] hover:underline font-mono"
                >
                  <span>Generate a token on GitHub &rarr;</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                {githubToken && (
                  <button
                    type="button"
                    onClick={() => {
                      handleSaveToken('')
                      setTokenInputDraft('')
                    }}
                    className="text-[#ef4444] hover:underline font-mono"
                  >
                    Remove Saved Token
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#1f242e]">
              <button
                type="button"
                onClick={() => setIsTokenModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-[#232832] bg-[#0d0f12] text-xs font-mono text-[#8b949e] hover:text-[#f2eee6]"
              >
                Cancel
              </button>

              {readOnlyNotice?.article ? (
                <button
                  type="button"
                  onClick={() => handlePublishWithToken(tokenInputDraft)}
                  disabled={isCommittingDirect || !tokenInputDraft.trim()}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#e1523d] text-xs font-mono font-bold text-white uppercase tracking-wider hover:bg-[#ef634f] transition-colors shadow-lg disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {isCommittingDirect ? (
                    <>
                      <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Committing &amp; Deploying...</span>
                    </>
                  ) : (
                    <>
                      <Key className="h-3.5 w-3.5" />
                      <span>Save &amp; Deploy Article Live Now</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    handleSaveToken(tokenInputDraft)
                    setIsTokenModalOpen(false)
                  }}
                  disabled={!tokenInputDraft.trim()}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#e1523d] text-xs font-mono font-bold text-white uppercase tracking-wider hover:bg-[#ef634f] transition-colors shadow-lg disabled:opacity-40"
                >
                  Save Token
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
