# 共享包 Shared Packages

## 一句话

把**跨 app 复用**的代码放进 `packages/*`，用 `workspace:*` 引用；app 之间不要互相 import。

## 什么该进 packages

| 适合 | 不适合 |
|------|--------|
| 设计 token、UnoCSS/ESLint/TSConfig | 某个后台页面业务 |
| 按钮、布局等纯 UI | 绑死单一产品 API 的模块 |
| 日期/请求封装等 utils | 「暂时复用一下」的业务 store |

经验法则：**没有业务语义、两个 app 都要，才进 packages。**

## 单向依赖

```text
apps/admin  ──►  packages/*
apps/www    ──►  packages/*
packages/*  ──x──►  apps/*     （禁止）
```

反向依赖会让包边界崩溃，最后变成「假 monorepo、真乱成一团」。

## 最小共享配置示例

```ts
// packages/unocss-config/src/index.ts
import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [presetWind3({ prefix: 'u-' })],
  shortcuts: {
    'u-flex-center': 'u-flex u-items-center u-justify-center',
  },
})
```

```ts
// apps/admin/uno.config.ts 与 apps/www/uno.config.ts
export { default } from '@learnspace/unocss-config'
```

两端样式语言一致，改一处两边生效。

## 从零时建议预留

即使第一天只共享 UnoCSS，也可以先建空目录约定：

```text
packages/
  unocss-config/
  eslint-config/   # 可选，稍后
  tsconfig/        # 可选，稍后
  ui/              # 可选，稍后
```

避免每共享一次就大搬家。

## 相关

- [pnpm workspace](/notes/pnpm-workspace)  
- [案例：mini-monorepo](/examples/mini-monorepo)
