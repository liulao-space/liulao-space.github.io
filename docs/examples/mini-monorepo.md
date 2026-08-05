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

## 进阶 FAQ

**Q1：为什么 `pnpm dev:admin` 装得这么快？**  
A：pnpm 的全局 store 是内容寻址存储，项目里的 `node_modules` 是对 store 的**硬链接**——同一版本依赖只下载一次、不复制文件。原理见 [pnpm workspace 深度](/notes/pnpm-workspace)。

**Q2：改了 `packages/unocss-config`，为什么 admin/www 要重启 dev？**  
A：配置类源码被 Vite/Nuxt 在启动时读取（uno 配置是构建期内容），不是运行时的热更新依赖。改共享包后重启对应 app 即可。

**Q3：新增一个包要动哪几处？**  
1. 在 `packages/` 或 `apps/` 下建目录 + `package.json`（name 唯一）  
2. 若被其它包依赖，在依赖方 `dependencies` 里写 `"@learnspace/xxx": "workspace:*"`  
3. 根目录 `pnpm install` 更新链接  
4. `pnpm --filter <name> ...` 按需跑脚本验证

**Q4：为什么 www 里能用 `u-flex-center` 这种 class？**  
A：`apps/www/uno.config.ts` re-export 了 `@learnspace/unocss-config`，UniCSS 在构建时按该配置生成样式。样式契约在共享包里，两端一致。

## 对应日志

完整叙事见：[从单仓 SPA 到 pnpm Monorepo](/vibe-coding/2026-08-05-pnpm-monorepo-from-spa)
