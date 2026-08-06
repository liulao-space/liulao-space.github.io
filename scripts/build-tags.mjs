#!/usr/bin/env node
/**
 * 标签索引生成器
 * 扫描 docs/vibe-coding/*.md 的 frontmatter（title/date/tags）
 * 生成 docs/tags.md（标签云 + 按标签列文章）
 * 用法：npm run gen:tags
 * 约束：标签页为生成产物，手动修改会被覆盖；改标签请改文章 frontmatter
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, resolve, basename } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const DOCS = join(ROOT, 'docs')
const POST_DIR = join(DOCS, 'vibe-coding')
const OUT = join(DOCS, 'tags.md')

function parseFrontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/)
  if (!m) return null
  const fm = {}
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (!kv) continue
    fm[kv[1]] = kv[2].replace(/^["']|["']$/g, '')
  }
  if (fm.tags) fm.tags = fm.tags.replace(/^\[|\]$/g, '').split(',').map((t) => t.trim()).filter(Boolean)
  else fm.tags = []
  return fm
}

const posts = []
const warnings = []
for (const file of readdirSync(POST_DIR).sort().reverse()) {
  if (!file.endsWith('.md') || file === 'index.md') continue
  const full = join(POST_DIR, file)
  const content = readFileSync(full, 'utf8')
  const fm = parseFrontmatter(content)
  const slug = basename(file, '.md')
  if (!fm) { warnings.push(`✗ 缺 frontmatter：${file}`); continue }
  if (!fm.title) { warnings.push(`✗ 缺 title：${file}`); continue }
  if (!fm.tags.length) { warnings.push(`✗ 缺 tags：${file}`); continue }
  posts.push({
    slug,
    title: fm.title,
    date: fm.date || slug.slice(0, 10),
    tags: fm.tags,
  })
}

const tagMap = new Map()
for (const p of posts) for (const t of p.tags) tagMap.set(t, (tagMap.get(t) || 0) + 1)
const tags = [...tagMap.keys()].sort((a, b) => a.localeCompare(b, 'zh'))

const lines = []
lines.push('# 标签索引', '')
lines.push('> 由 `scripts/build-tags.mjs` 自动生成。修改标签请改文章 frontmatter 后运行 `npm run gen:tags`。', '')
lines.push('## 标签云', '')
lines.push(tags.map((t) => `[\`${t}\`](#${encodeURIComponent(t)}) · ${tagMap.get(t)}`).join('　') || '（暂无标签）', '')
for (const t of tags) {
  lines.push('', `## ${t}`, '')
  const list = posts.filter((p) => p.tags.includes(t))
  lines.push(...list.map((p) => `- ${p.date} — [${p.title}](/vibe-coding/${p.slug})`))
}
lines.push('')

writeFileSync(OUT, lines.join('\n'))

console.log(`✓ 标签索引已生成：${posts.length} 篇文章 / ${tags.length} 个标签 → docs/tags.md`)
if (warnings.length) console.error(warnings.join('\n'))

if (!existsSync(OUT)) process.exit(1)
