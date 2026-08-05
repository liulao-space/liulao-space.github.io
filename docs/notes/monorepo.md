# Monorepo 是什么

## 一句话

**Monorepo** = 多个相关项目放在同一个 Git 仓库里，用工具编排依赖、脚本与共享代码。

## 为什么需要

| 痛点（多仓 polyrepo） | monorepo 常见收益 |
|----------------------|-------------------|
| 共享 UI/工具要发 npm 包 | 本地 `workspace:` 直接引用 |
| 改一处要开多个 PR | 原子提交，跨包改动一次合入 |
| 版本对不齐 | 根目录统一约束大版本 |
| 新人不知从哪 clone | 一个仓看清全貌 |

## 不是银弹

- 仓库会变大，CI 需要 **affected**（只构建变更包）才划算  
- 权限边界弱：默认所有人能看到仓内所有 app  
- 工具链要统一（Node / pnpm / lint 规则）

## 和本站案例的关系

教学项目 [learnspace](/examples/mini-monorepo) 用 monorepo 同时放：

- `apps/admin` — Vite Vue 管理端  
- `apps/www` — Nuxt 对外站  
- `packages/*` — 共享配置  

这是「两个前端产品 + 共享样式」的典型最小形态。

## 相关

- [pnpm workspace](/notes/pnpm-workspace)  
- [共享包](/notes/shared-packages)  
- [日志：单仓到 monorepo](/vibe-coding/2026-08-05-pnpm-monorepo-from-spa)
