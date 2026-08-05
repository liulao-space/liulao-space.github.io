# 知识点卡片 · 深度原理

每张卡片用同一套深度模板：直觉 → 底层原理 → tradeoff → 实战 → 排查 → 误区 → 面试三连。

| 卡片 | 一句话 | 深度看点 |
|------|--------|----------|
| [Monorepo 深度原理](/notes/monorepo) | 本质是依赖图 + 原子变更，不是"代码放一起" | DAG / fixed vs independent / Lerna→Nx→Turbo |
| [pnpm workspace 深度原理](/notes/pnpm-workspace) | pnpm 靠 store+hardlink 快，靠 isolated 根治幽灵依赖 | 三种 node_modules 布局·filter 图选择器·catalog |
| [Nuxt vs Vite SPA 深度原理](/notes/nuxt-vs-vite-spa) | HTML 从哪来决定渲染模式; SSR/SSG/CSR/ISR | hydration mismatch·useFetch payload·部署矩阵 |
| [共享包深度原理](/notes/shared-packages) | 共享包是接口契约不是复用池 | workspace:*发布改写·exports 锁面·版本漂移 |

相关日志：[从单仓 SPA 到 pnpm Monorepo](/vibe-coding/2026-08-05-pnpm-monorepo-from-spa)