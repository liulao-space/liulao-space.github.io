# 后续任务清单（liulao-space.github.io）

状态说明：主站已上线（https://liulao-space.github.io），以下为后续待办。
标注：🔴 必做 · 🟡 建议 · 🟢 二期。

## 🔴 收尾正确性

- [ ] 1. 抽查站内链接路由：确认 `/notes/`、`/vibe-coding/`、`/examples/` 无 404（user site base 已为 `/`，肉眼抽查 + grep 核验）
- [ ] 2. GitHub 仓库 Settings → Pages：确认 Source = **GitHub Actions**（避免旧 branch 部署缓存叠加）

## 🟡 体验 / 工程

- [ ] 3. 更新 GitHub 仓库 description：`前端学习记录` → `Vibe Coding 工程日志 · 前端深度笔记`
- [ ] 4. 存一张站点首页截图（本地归档，便于分享）
- [ ] 5. 全站链接健康检查脚本（grep 全部 markdown 内链，落脚本以便复用）

## 🟢 二期

- [ ] 6. 固化 OpenCode 智能体 `/vibe-log`：分析工作仓 → 脱敏草稿 → 配图 → 待确认发布（约定已在 content-policy/，无需回前台）
- [ ] 7. AI 位图替换：`docs/*/imgs/prompts/` 提示词已备好，等出图通道可用时把 SVG 换成 PNG
- [ ] 8. 持续补充日志与案例：按 writing-prompt 模板扩展系列

## 流程提示

- 新日志：只读分析工作仓 → content-policy 脱敏 → 写 docs/vibe-coding/YYYY-MM-DD-slug.md → 本地 npm run dev 预览 → commit + push（Pages 自动部署）
- 不要：把公司业务/真实仓名/域名/密钥写入公开仓；content-policy 只在写稿时遵守，不加入站点导航