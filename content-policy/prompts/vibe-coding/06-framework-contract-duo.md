---
type: framework
style: warm-notebook
filename: 06-framework-contract-duo.png
---

Premium digital notebook illustration, GoodNotes style. Warm cream paper with dot grid. Soft shadows. (复用 `_style-prefix.md` 风格)

Title sticky note: 「配置端 ⇄ 展示端：契约并行」

Framework diagram:
- 左（amber note，apps/admin 配置端）：7-Tab 配置骨架 / 卡片编辑器 + 上传桶 / AI 助教智能体勾选 / 保存草稿·发布更新
- 右（mint note，apps/www 展示端）：Hero 首屏动效 / course/[id] 六 tab 路由 / CourseSideNav 吸顶高亮 / SSR 渲染
- 中间（blue accent 卡片）：契约 CourseDisplayConfig —— 类型 + 默认值 + 占位实现，后端后补齐，前端互不阻塞
- 双向虚线箭头：配置端发布 → 展示端展示

Chinese labels, teaching names only: learnspace, apps/admin, apps/www. 16:9.
