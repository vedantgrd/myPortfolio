#!/usr/bin/env node

/**
 * CLI Tool: Fast Article Publisher
 * 
 * Usage:
 *   node scripts/publish-article.js [path-to-json-file]
 * 
 * If no file is provided, it reads scripts/new-article.template.json
 * Prepends the new article to data/custom-articles.json so it immediately
 * appears first (on top) in /writing and /writing/[slug].
 */

const fs = require('fs')
const path = require('path')

const ROOT_DIR = path.resolve(__dirname, '..')
const CUSTOM_ARTICLES_FILE = path.join(ROOT_DIR, 'data', 'custom-articles.json')
const TEMPLATE_FILE = path.join(__dirname, 'new-article.template.json')

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function calculateReadTime(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

function run() {
  const targetFile = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : TEMPLATE_FILE

  if (!fs.existsSync(targetFile)) {
    console.error(`\x1b[31mError: Article file not found at: ${targetFile}\x1b[0m`)
    console.log(`\nTip: You can use scripts/new-article.template.json or create your own JSON file.`)
    process.exit(1)
  }

  let inputData
  try {
    const raw = fs.readFileSync(targetFile, 'utf8')
    inputData = JSON.parse(raw)
  } catch (err) {
    console.error(`\x1b[31mError parsing JSON in ${targetFile}: ${err.message}\x1b[0m`)
    process.exit(1)
  }

  if (!inputData.title || !inputData.title.trim()) {
    console.error(`\x1b[31mError: "title" is required in article JSON.\x1b[0m`)
    process.exit(1)
  }

  if (!inputData.content || !inputData.content.lead) {
    console.error(`\x1b[31mError: "content.lead" is required in article JSON.\x1b[0m`)
    process.exit(1)
  }

  // Load existing custom articles
  let existingCustom = []
  if (fs.existsSync(CUSTOM_ARTICLES_FILE)) {
    try {
      existingCustom = JSON.parse(fs.readFileSync(CUSTOM_ARTICLES_FILE, 'utf8'))
    } catch (e) {
      existingCustom = []
    }
  }

  const slug = inputData.slug ? slugify(inputData.slug) : slugify(inputData.title)
  
  // Calculate read time if omitted
  const allText = [
    inputData.content.lead,
    ...(inputData.content.sections || []).flatMap((s) => s.paragraphs || []),
  ].join(' ')
  const readTime = inputData.readTime || calculateReadTime(allText)

  const date =
    inputData.date ||
    new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())

  const newArticle = {
    slug,
    title: inputData.title.trim(),
    subtitle: inputData.subtitle ? inputData.subtitle.trim() : '',
    date,
    readTime,
    category: inputData.category || 'Being Human',
    tags: Array.isArray(inputData.tags) ? inputData.tags : ['Journal', 'Memoir'],
    featured: Boolean(inputData.featured),
    excerpt: inputData.excerpt ? inputData.excerpt.trim() : inputData.content.lead.slice(0, 160) + '...',
    ...(inputData.photoFrame ? { photoFrame: inputData.photoFrame } : {}),
    content: {
      lead: inputData.content.lead.trim(),
      sections: (inputData.content.sections || []).map((sec) => ({
        heading: sec.heading ? sec.heading.trim() : undefined,
        paragraphs: Array.isArray(sec.paragraphs) ? sec.paragraphs : [sec.paragraphs],
        ...(sec.photoFrame ? { photoFrame: sec.photoFrame } : {}),
        ...(sec.callout ? { callout: sec.callout } : {}),
      })),
    },
  }

  // Prepend to top of array
  const updatedCustom = [newArticle, ...existingCustom.filter((a) => a.slug !== slug)]
  fs.writeFileSync(CUSTOM_ARTICLES_FILE, JSON.stringify(updatedCustom, null, 2), 'utf8')

  console.log(`\n\x1b[32m✔ SUCCESS: Article published and placed FIRST on top!\x1b[0m`)
  console.log(`  Title:     ${newArticle.title}`)
  console.log(`  Slug:      ${newArticle.slug}`)
  console.log(`  Category:  ${newArticle.category}`)
  console.log(`  Read time: ${newArticle.readTime}`)
  console.log(`  Date:      ${newArticle.date}`)
  console.log(`\nLive URLs:`)
  console.log(`  - Dedicated reader: \x1b[36mhttp://localhost:3000/writing/${newArticle.slug}\x1b[0m`)
  console.log(`  - Main journal:     \x1b[36mhttp://localhost:3000/writing\x1b[0m\n`)
}

run()
