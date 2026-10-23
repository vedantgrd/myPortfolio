import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { Article, baseArticles } from '@/data/writing'

const CUSTOM_ARTICLES_FILE = path.join(process.cwd(), 'data', 'custom-articles.json')
const FEATURED_MEMOIR_FILE = path.join(process.cwd(), 'data', 'featured-memoir.json')

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function calculateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

function readFeaturedSlug(): string {
  try {
    if (fs.existsSync(FEATURED_MEMOIR_FILE)) {
      const data = JSON.parse(fs.readFileSync(FEATURED_MEMOIR_FILE, 'utf8'))
      return data.slug || 'so-suicide'
    }
  } catch {}
  return 'so-suicide'
}

function readCustomArticles(): Article[] {
  try {
    if (!fs.existsSync(CUSTOM_ARTICLES_FILE)) {
      return []
    }
    const data = fs.readFileSync(CUSTOM_ARTICLES_FILE, 'utf8')
    return JSON.parse(data) as Article[]
  } catch (error) {
    console.error('Error reading custom articles:', error)
    return []
  }
}

function saveCustomArticles(articles: Article[]) {
  fs.writeFileSync(CUSTOM_ARTICLES_FILE, JSON.stringify(articles, null, 2), 'utf8')
}

const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'vedantgrd'
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME || 'myPortfolio'
const GITHUB_REPO_BRANCH = process.env.GITHUB_REPO_BRANCH || 'main'

async function commitFileToGitHub({
  token,
  filePath,
  content,
  message,
}: {
  token: string
  filePath: string
  content: string
  message: string
}) {
  const url = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${filePath}`
  const headers = {
    Authorization: `Bearer ${token.trim()}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'myPortfolio-Publisher',
  }

  // 1. Get existing file sha
  let sha: string | undefined
  try {
    const getRes = await fetch(url, { headers })
    if (getRes.ok) {
      const getData = await getRes.json()
      sha = getData.sha
    }
  } catch (err) {
    console.error('Error fetching file SHA from GitHub:', err)
  }

  // 2. Put updated content
  const base64Content = Buffer.from(content, 'utf8').toString('base64')
  const putRes = await fetch(url, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      content: base64Content,
      ...(sha ? { sha } : {}),
      branch: GITHUB_REPO_BRANCH,
    }),
  })

  if (!putRes.ok) {
    const errText = await putRes.text()
    let errorDetail = errText
    try {
      const parsedErr = JSON.parse(errText)
      errorDetail = parsedErr.message || errText
    } catch {}
    throw new Error(`GitHub Commit failed (${putRes.status}): ${errorDetail}`)
  }

  const result = await putRes.json()
  return {
    commitUrl:
      result.commit?.html_url ||
      `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/commit/${result.commit?.sha}`,
    sha: result.content?.sha,
  }
}

// GET: Fetch list of articles & currently pinned best work slug
export async function GET() {
  const custom = readCustomArticles()
  const featuredSlug = readFeaturedSlug()
  return NextResponse.json({
    customArticles: custom,
    totalCount: custom.length + baseArticles.length,
    articles: [...custom, ...baseArticles],
    featuredSlug,
  })
}

// PUT: Update the manually pinned best work / top-rated piece
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { slug } = body
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const githubToken =
      req.headers.get('x-github-token') ||
      body.githubToken ||
      process.env.GITHUB_TOKEN ||
      process.env.GH_TOKEN

    let isSavedLocally = false
    try {
      fs.writeFileSync(FEATURED_MEMOIR_FILE, JSON.stringify({ slug }, null, 2), 'utf8')
      isSavedLocally = true
    } catch (fsErr: any) {
      if (fsErr.code !== 'EROFS' && !fsErr.message?.includes('read-only')) {
        throw fsErr
      }
    }

    if (!isSavedLocally) {
      if (githubToken) {
        try {
          const ghResult = await commitFileToGitHub({
            token: githubToken,
            filePath: 'data/featured-memoir.json',
            content: JSON.stringify({ slug }, null, 2),
            message: `Pin featured memoir to ${slug}`,
          })
          return NextResponse.json({
            success: true,
            publishedToGithub: true,
            commitUrl: ghResult.commitUrl,
            featuredSlug: slug,
            message: `Best work pinned and committed to GitHub!`,
          })
        } catch (ghErr: any) {
          return NextResponse.json(
            { error: `GitHub Commit Error: ${ghErr.message}`, isReadOnly: true },
            { status: 400 }
          )
        }
      }
      return NextResponse.json({
        isReadOnly: true,
        needsGithubToken: true,
        featuredSlug: slug,
        message: 'Read-only environment. Enter a GitHub Token to update pinned memoir live.',
      })
    }

    return NextResponse.json({
      success: true,
      featuredSlug: slug,
      message: `Best work pinned to ${slug}`,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST: Add a new article (Prepends so it appears on top)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      title,
      subtitle = '',
      category = 'Being Human',
      tags = [],
      date,
      readTime,
      featured = false,
      excerpt = '',
      photoFrame,
      content,
    } = body

    if (!title || !title.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    if (!content || !content.lead) {
      return NextResponse.json({ error: 'Article lead content is required' }, { status: 400 })
    }

    const existingCustom = readCustomArticles()
    const baseSlugs = new Set(baseArticles.map((a) => a.slug))

    // Generate slug
    let baseSlug = body.slug ? slugify(body.slug) : slugify(title)
    if (!baseSlug) baseSlug = `entry-${Date.now()}`
    let slug = baseSlug

    // If colliding with immutable base articles, suffix with a number
    if (baseSlugs.has(slug)) {
      let counter = 2
      while (baseSlugs.has(`${baseSlug}-${counter}`)) {
        counter++
      }
      slug = `${baseSlug}-${counter}`
    }

    // Auto calculate read time if not provided
    const allText = [
      content.lead,
      ...(content.sections || []).flatMap((s: any) => s.paragraphs || []),
    ].join(' ')
    const finalReadTime = readTime?.trim() || calculateReadTime(allText)

    // Exact Timestamp Generation (Automatic Nostalgic Logging in IST)
    const now = new Date()
    const autoDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Kolkata',
    }).format(now)

    const autoTime =
      new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      }).format(now) + ' IST'

    const finalDate =
      date && date.trim() && date.trim().toLowerCase() !== 'personal journal'
        ? date.trim()
        : autoDate

    const finalPublishedTime =
      body.publishedTime && typeof body.publishedTime === 'string' && body.publishedTime.trim()
        ? body.publishedTime.trim()
        : autoTime

    const finalPublishedAt =
      body.publishedAt && typeof body.publishedAt === 'string' && body.publishedAt.trim()
        ? body.publishedAt.trim()
        : now.toISOString()

    // Parse tags if provided as comma-separated string
    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
      ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : []

    const newArticle: Article = {
      slug,
      title: title.trim(),
      subtitle: subtitle.trim(),
      date: finalDate,
      publishedTime: finalPublishedTime,
      publishedAt: finalPublishedAt,
      readTime: finalReadTime,
      category,
      tags: parsedTags.length > 0 ? parsedTags : ['Journal', 'Memoir'],
      featured: Boolean(featured),
      excerpt: excerpt.trim() || content.lead.slice(0, 160) + '...',
      ...(photoFrame && photoFrame.url ? { photoFrame } : {}),
      ...(Array.isArray(body.references) && body.references.length > 0
        ? {
            references: body.references
              .filter((r: any) => r && (r.title || r.url))
              .map((r: any) => ({
                title: (r.title || r.url || '').trim(),
                url: (r.url || '').trim(),
              })),
          }
        : {}),
      content: {
        lead: content.lead.trim(),
        sections: (content.sections || []).map((sec: any) => ({
          heading: sec.heading?.trim() || undefined,
          paragraphs: Array.isArray(sec.paragraphs)
            ? sec.paragraphs.filter((p: string) => p && p.trim())
            : typeof sec.paragraphs === 'string'
            ? sec.paragraphs.split('\n\n').map((p: string) => p.trim()).filter(Boolean)
            : [],
          ...(sec.photoFrame && sec.photoFrame.url ? { photoFrame: sec.photoFrame } : {}),
          ...(sec.photoFrames && Array.isArray(sec.photoFrames) ? { photoFrames: sec.photoFrames } : {}),
          ...(sec.image && sec.image.url ? { image: sec.image } : {}),
          ...(sec.codeBlock && sec.codeBlock.code ? { codeBlock: sec.codeBlock } : {}),
          ...(sec.callout && sec.callout.body ? { callout: sec.callout } : {}),
          ...(Array.isArray(sec.references) && sec.references.length > 0
            ? {
                references: sec.references
                  .filter((r: any) => r && (r.title || r.url))
                  .map((r: any) => ({
                    title: (r.title || r.url || '').trim(),
                    url: (r.url || '').trim(),
                  })),
              }
            : {}),
        })),
      },
    }

    // Prepend to custom articles array (newest / updated appears first on top)
    const filteredCustom = existingCustom.filter((a) => a.slug !== newArticle.slug)
    const updatedCustom = [newArticle, ...filteredCustom]

    const githubToken =
      req.headers.get('x-github-token') ||
      body.githubToken ||
      process.env.GITHUB_TOKEN ||
      process.env.GH_TOKEN

    let isSavedLocally = false
    try {
      saveCustomArticles(updatedCustom)
      isSavedLocally = true
    } catch (fsErr: any) {
      if (fsErr.code !== 'EROFS' && !fsErr.message?.includes('read-only')) {
        throw fsErr
      }
    }

    if (!isSavedLocally) {
      if (githubToken) {
        try {
          const ghResult = await commitFileToGitHub({
            token: githubToken,
            filePath: 'data/custom-articles.json',
            content: JSON.stringify(updatedCustom, null, 2),
            message: `Publish article: ${newArticle.title} (${newArticle.slug})`,
          })
          return NextResponse.json({
            success: true,
            publishedToGithub: true,
            commitUrl: ghResult.commitUrl,
            slug: newArticle.slug,
            message: `Article published and committed to GitHub! Live deployment in progress.`,
            article: newArticle,
          })
        } catch (ghErr: any) {
          return NextResponse.json(
            {
              error: `GitHub Commit Error: ${ghErr.message}`,
              isReadOnly: true,
              needsGithubToken: true,
              slug: newArticle.slug,
              article: newArticle,
              updatedCustomJson: JSON.stringify(updatedCustom, null, 2),
            },
            { status: 400 }
          )
        }
      }

      return NextResponse.json(
        {
          error:
            'EROFS: Read-only file system detected on deployed site (Vercel / Serverless). Connect your GitHub Personal Access Token to publish directly to your live portfolio.',
          isReadOnly: true,
          needsGithubToken: true,
          code: 'EROFS',
          slug: newArticle.slug,
          article: newArticle,
          updatedCustomJson: JSON.stringify(updatedCustom, null, 2),
        },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      slug: newArticle.slug,
      message: 'Article published successfully and placed first in order',
      article: newArticle,
    })
  } catch (error: any) {
    console.error('Error publishing article:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to publish article' },
      { status: 500 }
    )
  }
}
