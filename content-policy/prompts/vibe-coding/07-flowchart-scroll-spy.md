---
type: flowchart
style: warm-notebook
filename: 07-flowchart-scroll-spy.png
---

Premium digital notebook illustration, GoodNotes style. Warm cream paper with dot grid. Soft shadows. (复用 `_style-prefix.md` 风格)

Title sticky note: 「吸顶侧栏：滚动高亮判定」

Left column（amber note，sticky 侧栏）垂直流程：
1. 点击 tab → scrollIntoView 平滑滚动
2. scroll 监听（passive）
3. 遍历 items 取最后 rect.top − offsetTop ≤ 0 的 key
4. 高亮 activeKey

Right column（paper note，页面 section 纵向排列）：
- outline「课程大纲」高亮（blue）、universe / ability / question 普通灰
- 底部虚线标注：scroll-margin-top 让出吸顶头部

Dashed pencil-like connectors, arrow from step 3 to the highlighted section. Chinese labels, teaching names only. 16:9.
