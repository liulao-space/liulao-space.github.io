# mini-monorepo 教学 Demo

可运行的最小 monorepo，**与任何公司项目无关**。用于理解：

- pnpm workspace  
- `apps/admin` + `apps/www`  
- `packages/unocss-config` + `workspace:*`  

源码在仓库根目录：[`examples/mini-monorepo`](https://github.com/liulao-space/liulao-space.github.io/tree/master/examples/mini-monorepo)

## 结构

```text
examples/mini-monorepo/
├── package.json
├── pnpm-workspace.yaml
├── apps/
│   ├── admin/          # Vite + Vue 壳
│   └── www/            # Nuxt 壳
└── packages/
    └── unocss-config/  # @learnspace/unocss-config
```

## 快速开始

需要 Node.js ≥ 18。

```bash
git clone https://github.com/liulao-space/liulao-space.github.io.git
cd liulao-space.github.io/examples/mini-monorepo
corepack enable
pnpm install

pnpm dev:admin   # 默认 http://localhost:5173
pnpm dev:www     # 默认 http://localhost:3000
```

## 你应该看到什么

- admin：页面标题带品牌色，class 使用 `u-` 前缀  
- www：Nuxt 页面同样使用共享 shortcuts（如 `u-flex-center`）  
- 修改 `packages/unocss-config` 中的 shortcut，两端样式语义保持一致  

## 和日志的对应关系

完整叙事见：[从单仓 SPA 到 pnpm Monorepo](/vibe-coding/2026-08-05-pnpm-monorepo-from-spa)
