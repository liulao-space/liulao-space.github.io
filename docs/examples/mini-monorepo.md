# 案例：mini-monorepo

← [返回案例列表](/examples/)

pnpm monorepo 最小可运行示例，用于对照日志理解：

- pnpm workspace  
- `apps/admin` + `apps/www`  
- `packages/unocss-config` + `workspace:*`  

源码在仓库：[`examples/mini-monorepo`](https://github.com/liulao-space/liulao-space.github.io/tree/master/examples/mini-monorepo)

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

## 对应日志

完整叙事见：[从单仓 SPA 到 pnpm Monorepo](/vibe-coding/2026-08-05-pnpm-monorepo-from-spa)
