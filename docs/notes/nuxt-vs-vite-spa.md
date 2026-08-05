# Nuxt vs Vite SPA

## 一句话

**Vite + Vue SPA**：浏览器里跑单页应用，适合登录后的管理后台。  
**Nuxt**：约定式全栈/SSR 框架，适合对外官网、SEO、首屏 HTML。

## 对比表

| 维度 | Vite Vue SPA | Nuxt |
|------|--------------|------|
| 典型场景 | 后台、控制台 | 门户、营销站、内容站 |
| 路由 | 手写 vue-router | 文件系统路由（可配） |
| 渲染 | CSR 为主 | SSR / SSG / CSR 可选 |
| SEO | 弱（除非再上方案） | 强（服务端出 HTML） |
| 目录 | 自由 | `app.vue`、`pages/`、`server/` 等约定 |
| 学习曲线 | 低（若已会 Vue） | 中（多模块与渲染模式） |

## 为何常拆成两个 app

同一家产品里很常见：

- **admin**：复杂交互、权限、表格，CSR 足够  
- **www**：对外品牌与内容，要 SSR/SSG  

拆开后：

- 依赖与构建互不拖累  
- 部署形态可以不同（静态 CDN vs Node）  
- 共享的只有设计 token / 组件 / 工具，而不是整站架构  

## Nuxt 最小起步

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@unocss/nuxt'],
})
```

```vue
<!-- app.vue -->
<template>
  <div>Hello Nuxt</div>
</template>
```

```bash
pnpm --filter www dev
```

## 相关

- [Monorepo](/notes/monorepo)  
- [日志原文](/vibe-coding/2026-08-05-pnpm-monorepo-from-spa)  
- [Nuxt 文档](https://nuxt.com/docs)
