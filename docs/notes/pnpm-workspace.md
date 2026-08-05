# pnpm workspace

## 一句话

用 `pnpm-workspace.yaml` 声明哪些目录是包，用 `pnpm --filter` 对指定包跑脚本。

## 最小配置

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

```json
// 根 package.json（编排层，尽量不放业务依赖）
{
  "private": true,
  "packageManager": "pnpm@9.15.0",
  "scripts": {
    "dev:admin": "pnpm --filter admin dev",
    "dev:www": "pnpm --filter www dev",
    "build": "pnpm -r run build"
  }
}
```

## 常用命令

```bash
pnpm install                 # 在根安装，所有 workspace 一起解析
pnpm --filter admin dev      # 只跑 name 为 admin 的包
pnpm --filter www build
pnpm -r run lint             # 递归所有包（包内有该 script 才跑）
```

## 本地包引用

```json
// apps/www/package.json
{
  "dependencies": {
    "@learnspace/unocss-config": "workspace:*"
  }
}
```

`workspace:*` 表示：始终用仓库里的本地版本，不要去 npm 拉。

## 心智模型

```text
根目录 = 遥控器
apps/* = 可独立运行的产品
packages/* = 被依赖的库（一般不单独部署）
```

## 注意

- 子包 `name` 字段必须稳定，`--filter` 靠它匹配  
- husky / CI 往往放在根；lint 路径要指向 `apps/xxx`  
- pnpm 新版本可能限制依赖的 postinstall 构建脚本，需按文档配置允许列表  

## 相关

- [Monorepo](/notes/monorepo)  
- [共享包](/notes/shared-packages)  
- [官方文档](https://pnpm.io/workspaces)
