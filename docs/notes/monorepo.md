# Monorepo 深度原理

> 系列：知识点卡片 · 认知篇  
> 读完目标：能解释 monorepo 的**本质收益**（不是"代码放一起"），知道 fixed/independent、changesets、Turborepo 为什么存在，以及什么时候不该用。

## 1. 一句话直觉

Monorepo 不是"多个仓库合并"，而是**把一组包的依赖关系图放进同一个 Git 事务**：任何跨包改动可以原子提交、一次 CI 验证、单一版本语义。

## 2. 底层原理

### 2.1 依赖图模型（DAG）

把每个包看作图的顶点，`dependencies` 是边：

```text
apps/www ──► packages/ui ──► packages/utils
apps/www ──► packages/unocss-config
apps/admin ─► packages/ui ──► packages/utils
```

monorepo 的全部能力（filter、构建顺序、变更检测、缓存失效）都是**在这张图上操作**：

| 能力 | 图上的操作 |
|------|-----------|
| `--filter admin...` | admin 的所有**上游**（依赖） |
| `--filter ...admin` | admin 的所有**下游**（依赖它的包） |
| `-r` 构建顺序 | 图的**拓扑排序** |
| 变更检测（affected） | 找「某个文件改了 → 哪些包受影响」的**可达集** |
| Turborepo 缓存失效 | 输入文件 hash 变 → 该顶点及其**下游**缓存全部失效 |

理解这张图，就理解了一大半 monorepo 工具的行为。

### 2.2 本质收益与代价

| 收益 | 机制 | 反例（polyrepo 做不到） |
|------|------|--------------------------|
| **原子提交** | 跨包改动在同一个 commit/PR | 改 API + 改调用方要开两个 PR，中间态永远发布不出去 |
| **单一版本源** | 根统一约束（catalog/workspace 协议） | 两个仓各自锁 vue，版本漂移 |
| **本地引用** | `workspace:*` 跳过 registry | 共享代码必须先发 npm 才能用 |
| **重构可追** | 跨包改动一起进 blame | git mv + 跨仓追踪历史 |

代价：

- 仓库膨胀：clone 变大、CI 若全量构建变慢 → 需要 **affected** 与缓存
- 权限粗粒度：一个仓内所有包对所有人可见（组织边界弱）
- 工具链必须统一：Node 版本、包管理器、lint/格式规则都要收敛到根

### 2.3 版本策略：fixed vs independent

| 策略 | 含义 | 场景 |
|------|------|------|
| **fixed（统一版）** | 所有包共用一个版本号，发布一起发 | 内部共享、一起演进的库（Babel、Vue 生态曾用） |
| **independent（独立版）** | 各包独立 semver | 对外发布的包，各自节奏（UI 库 + 工具库） |

发布管理：**Changesets**（约定式变更集：`changeset add` → CI 汇总 bump 版本 + 生成 changelog）。资深团队用它保证"版本变更可审查、changelog 自动生成"。

### 2.4 工具链为什么层层演进

1. **Lerna（2015）**：最早解决"多包发布"（bootstrap + 发布）。但**不知道依赖图**，构建是脚本化的。
2. **Nx（2016）**：引入**项目图（project graph）**与**影响图**，首创"只构建受影响的"。
3. **Turborepo（2020）**：把 Nx 的核心思想简化：**输入文件 hash → 远程缓存**。同样输入 = 直接命中，CI 时间从分钟级到秒级。

关键洞察：**"构建快"不是靠机器快，是靠缓存命中 + 不重复劳动**。Turborepo 的 `pipeline`（如 `build` 依赖 `^build`）就是把前面那张 DAG 变成构建调度。

## 3. 为什么这样设计

- 工具演进的主线是**图越来越显式**：Lerna 只管理"包列表"，Nx/Turbo 管理"包与包的关系"。关系越显式，能自动化的就越多（排序、缓存、affected）。
- pnpm 之所以够用（无 Turbo）也成立：当包少、图浅、构建快时，拓扑序 + filter 已覆盖 80% 需求。**先 pnpm，痛了再上 Turbo** 是理性路径。

## 4. 何时不该用 monorepo

| 信号 | 说明 |
|------|------|
| 包间无共享、无原子变更需求 | 收益趋近于零，只剩成本 |
| 团队/项目权限必须隔离 | 独立仓 + npm 私有包更合适 |
| 工具链无法统一（不同 Node/框架大版本） | 根约束会持续冲突 |
| 只有一个"大应用" | 先拆模块，不要为 monorepo 而 monorepo |

判断标准一句话：**"有没有跨包的原子变更经常发生？"** 没有 → polyrepo。

## 5. 资深实战要点

- 根 `package.json` 只放**仓级工具**（husky、lint-staged、changesets），不放业务依赖——业务依赖进各 app，否则根依赖升级会惊动所有包。
- CI 上 `turbo run build` + 远程缓存（Vercel Remote Cache），并发 + 命中双管齐下。
- 共享包版本策略：内部包用 `workspace:*` 永远本地解析；**对外**才谈独立版本。
- merge 冲突时"双结构并存"最痛：两套根配置（根 package.json / .gitignore / CI）会反复冲突，**缩短并存期**是硬约束。

## 6. 常见误区

- ❌ "monorepo = 一个仓库放所有代码" → 是**依赖图 + 原子变更**，放代码只是表象
- ❌ "必须用 Nx/Turbo" → 包少时 pnpm 原生能力足够，Turbo 是"规模化后的缓存层"
- ❌ "独立仓更安全" → 权限安全是**组织策略**问题，跟仓结构无必然关系

## 7. 面试官一问三连

1. monorepo 解决了什么 polyrepo 解决不了的事？（答：跨包原子提交 + 单一版本源 + 本地引用，核心是变更的原子性）
2. `pnpm -r run build` 为什么按拓扑序？（答：依赖图 DAG，保证被依赖者先构建）
3. Turborepo 缓存命中靠什么？（答：输入文件 hash + 依赖图下游失效传播）

## 8. 扩展阅读

- [Turborepo 概念](https://turbo.build/repo/docs/core-concepts)  
- [Changesets](https://github.com/changesets/changesets)  
- [pnpm workspace 深度](/notes/pnpm-workspace) · [日志：单仓到 monorepo](/vibe-coding/2026-08-05-pnpm-monorepo-from-spa)
