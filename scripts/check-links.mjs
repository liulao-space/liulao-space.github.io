#!/usr/bin/env node
/**
 * 站内链接健康检查
 * 扫描 docs 下全部 .md
 * 校验 markdown 内链与图片目标是否存在
 * 忽略外链(http/https/锚点/邮箱)
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, resolve, dirname } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const DOCS = join(ROOT, 'docs')
const PUBLIC = join(DOCS, 'public')

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (entry.startsWith('.') || entry === 'dist' || entry === 'cache') continue
    if (statSync(full).isDirectory()) walk(full, files)
    else if (full.endsWith('.md')) files.push(full)
  }
  return files
}

function extractLinks(content) {
  const links = []
  const re = /!?\[[^\]]*\]\(([^)]+)\)/g
  let m
  while ((m = re.exec(content)) !== null) {
    const raw = m[1].trim()
    if (/^(https?:|mailto:|#|tel:|javascript:)/.test(raw)) continue
    links.push({ raw, target: raw.split('#')[0].split('?')[0] })
  }
  return links
}

const files = walk(DOCS)
let errors = 0

for (const file of files) {
  const content = readFileSync(file, 'utf8')
  const links = extractLinks(content)
  for (const { raw, target } of links) {
    if (!target) continue
    const targetPath = target.startsWith('/')
      ? join(DOCS, target)
      : resolve(dirname(file), target)
    const candidate = target.endsWith('/')
      ? join(targetPath, 'index.md')
      : targetPath.endsWith('.md') || /\.(svg|png|jpg|webp)$/.test(target)
        ? targetPath
        : targetPath + '.md'
    const htmlFallback = target.startsWith('/') ? join(targetPath.slice(0, -1) || '/', 'index.md') : null

    // 静态资源：public/ 原样发布到站点根（/demos/xxx/ → docs/public/demos/xxx/index.html）
    const publicTarget = target.startsWith('/')
      ? join(PUBLIC, target.slice(1))
      : ''
    const publicCandidate = target.endsWith('/')
      ? join(publicTarget, 'index.html')
      : publicTarget || ''

    const ok = existsSync(candidate)
      || (htmlFallback && existsSync(htmlFallback))
      || (publicCandidate && existsSync(publicCandidate))
    if (!ok) {
      errors++
      console.error(`✗ ${file.replace(DOCS + '/', '')} → ${raw}`)
    }
  }
}

if (errors) {
  console.error(`\n${errors} 个失效链接`)
  process.exit(1)
}
console.log(`✓ 检查通过：${files.length} 个 md，全部内链/图片有效`)
