import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'liulao space',
  description: 'Vibe Coding 工程日志 · 前端知识沉淀',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#3E94FF' }],
  ],
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: 'liulao space',
    nav: [
      { text: '首页', link: '/' },
      { text: 'Vibe Coding', link: '/vibe-coding/' },
      { text: '知识点', link: '/notes/' },
      { text: '案例', link: '/examples/' },
    ],
    sidebar: {
      '/vibe-coding/': [
        {
          text: 'Vibe Coding 日志',
          items: [
            { text: '日志索引', link: '/vibe-coding/' },
            {
              text: '从单仓 SPA 到 pnpm Monorepo',
              link: '/vibe-coding/2026-08-05-pnpm-monorepo-from-spa',
            },
          ],
        },
      ],
      '/notes/': [
        {
          text: '知识点卡片',
          items: [
            { text: '索引', link: '/notes/' },
            { text: 'Monorepo 深度原理', link: '/notes/monorepo' },
            { text: 'pnpm workspace 深度原理', link: '/notes/pnpm-workspace' },
            { text: 'Nuxt vs Vite SPA 深度原理', link: '/notes/nuxt-vs-vite-spa' },
            { text: '共享包深度原理', link: '/notes/shared-packages' },
          ],
        },
      ],
      '/examples/': [
        {
          text: '案例',
          items: [
            { text: '案例列表', link: '/examples/' },
            { text: 'mini-monorepo', link: '/examples/mini-monorepo' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liulao-space/liulao-space.github.io' },
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '没有结果',
            resetButtonTitle: '清除',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },
    outline: {
      label: '本页目录',
      level: [2, 3],
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    lastUpdated: {
      text: '最后更新',
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    footer: {
      message: 'Vibe Coding 工程日志 · 可复用前端知识',
      copyright: 'Copyright © 2026 liulao-space',
    },
  },
})
