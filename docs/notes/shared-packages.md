# 共享包 Shared Packages 深度原理

> 系列：知识点卡片 · 契约篇  
> 读完目标：理解共享包的**本质是接口契约**而不是代码复用池；知道 `workspace:*` 发布时怎么被改写、共享包该不该编译。

## 1. 一句话直觉

共享包 = **跨应用的接口契约**：它通过包边界声明"这些能力归我所有，升级/改动由我负责"。引用方只看得到契约，改不到实现。

## 2. 底层原理

### 2.1 为什么必须单向依赖

```text
apps/admin ──► packages/*    ✅ 引用方向稳定
apps/www   ──► packages/*
packages/* ──x──► apps/*     ❌ 反向 = 死循环
```

机制层解释：

- 包是有**版本语义**的单元（即使 `workspace:*` 本地解析，未来发布也是独立版本）。反向依赖意味着"一个库的代码依赖某个应用"，库无法单独测试、发布、演进。
- 反向依赖造成**隐式循环**：应用 → 库 → 应用，构建缓存（Turbo）和拓扑排序全部失效。
- 判定标准一句话：**"这个包能不能脱离任何 app 独立存在？"** 不能 → 它不是共享包，是"搬出来的页面代码"。

### 2.2 `workspace:*` 的完整生命周期

```text
开发期：workspace:* → 本地目录 symlink，不查 registry
发布期：pnpm publish 时，workspace:* 被改写为实际版本号
        （如 workspace:* → 0.0.0 / 1.2.3）
```

- 所以 `packages/xxx` 发布到 npm 后，消费方拿到的是**普通 semver 依赖**，和 monorepo 无关。
- 发布前需 `publishConfig` 与 `files` 字段控制产物范围，避免把测试代码发布出去。

### 2.3 共享包要不要预编译？—— 两种模式

| 模式 | 做法 | 适合 | 风险 |
|------|------|------|------|
| **源码直出** | `exports: { ".": "./src/index.ts" }`，由 app 的构建链（Vite/Nuxt）编译 | 配置类、TS 源、内部快速迭代 | app 构建器必须支持编译 node_modules 里的 TS（Vite/Nuxt 通常 OK） |
| **预编译产物** | `dist/index.js` + `dist/index.d.ts`，用 tsc/vite build 产出 | 对外发布、被任意构建器消费 | 双份维护（src + dist）、热更新不直观 |

现代 Vite/Nuxt 生态对"TS 源直出"很宽容（esbuild 编译 node_modules 里的 TS 是支持的），内部包优先源码直出。**关键配套是 `exports` + `types` 字段**：

```json
{
  "name": "@learnspace/ui",
  "exports": {
    ".": { "types": "./src/index.d.ts", "import": "./src/index.ts" }
  }
}
```

`exports` 是**新的解析入口规范**：它既声明了入口，也**锁死了包的可导入面**（不在 exports 里的路径 import 直接报错）——这是包边界"契约化"的技术基础。

### 2.4 版本漂移与 Breaking Change

两个 app 各自引用共享包时，漂移的三种形态：

1. **版本不同**：admin 用 `ui@1.2`、www 用 `ui@1.3` → 双份 bundle，行为不一致
2. **隐式 API 依赖**：app 用了 ui 的**内部实现**（没声明在 exports）→ 升级 ui 即崩
3. **依赖冲突**：ui 依赖 vue@3.4，app 用 vue@3.5 → peerDependencies 解决

管理抓手：

- 内部包：catalog + `workspace:*` 让所有 app 解析到同一份 → 根上消灭形态 1
- API 面：exports 白名单 → 消灭形态 2
- peerDependencies 声明框架版本 → 化解形态 3

## 3. 为什么这样设计

- **契约 > 复用**：把共享包当"复用池"的人，会不断往里塞业务代码，最后谁都不敢动。把共享包当"契约"的人，会先定 API 面、再谈实现。
- **exports 锁面**：不是限制，是保护——引用方承诺只依赖公开面，包才能自由重构内部。

## 4. 资深实战要点

- 共享包**先定"最小契约"再动手**：设计 token → 纯函数 → 组件，从低风险高确定性开始。
- `files` 字段 + `.npmignore`/`publishConfig` 组合拳，发布前 `pnpm pack --dry-run` 看产物。
- 组件共享**提前想清楚样式体系**（UnoCSS 前缀、主题变量），否则"样式冲突"成为最大的隐性债。
- 共享包的 README 写"API 与变更记录"，不写"为什么 app 这么调"——契约文档，不是叙事。

## 5. 问题排查路径

| 现象 | 定位 | 解法 |
|------|------|------|
| 改了共享包，app 不生效 | dev server 缓存/解析 | 重启 dev server；确认 symlink 指向本地 |
| 升级共享包后 app 崩 | 用了未公开内部路径 | 把 import 路径收敛到 exports 声明面 |
| 两端样式不一致 | 双份 unocss 配置 | 两端 re-export 同一共享配置 |
| 发布后消费方编译报错 | 产物缺 types/依赖未声明 | `pnpm pack --dry-run` 检查产物；补 peerDependencies |

## 6. 常见误区

- ❌ "共享包=公共组件库" → 是**契约单元**，组件只是其中一种形态
- ❌ "workspace:* 发布后还能本地解析" → 发布即改写为版本号
- ❌ "共享包越多越好" → 每个共享包都是**变更传播半径**，越多越难升级

## 7. 面试官一问三连

1. `workspace:*` 发布时会发生什么？（答：被改写为实际版本号，消费方变普通 semver 依赖）
2. 为什么 packages 不能依赖 apps？（答：包失去独立性，循环依赖破坏构建图与缓存）
3. `exports` 字段的价值？（答：声明入口 + 锁定可导入面，是包契约的技术基础）

## 8. 扩展阅读

- [Node.js Package Exports](https://nodejs.org/api/packages.html#packages_exports)  
- [pnpm workspace 深度](/notes/pnpm-workspace) · [案例：mini-monorepo](/examples/mini-monorepo)
