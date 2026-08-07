---
type: flowchart
style: warm-notebook
filename: 08-flowchart-revert-merge-trap.png
---

Premium digital notebook flowchart, GoodNotes style. Warm cream paper with dot grid.

Title sticky: 「revert 合并不等于撤销，是反向补丁」

Three horizontal sticky cards:
1 mint: 误合并 merge M（feat/role-manager · +103 文件）
2 amber: revert 提交 R（git revert -m 1 M · −103 文件）
3 salmon: 再次 merge 进 develop（R 的删除被当普通 diff 应用）

Below: salmon result box 「develop 合并结果」: 只有 3 个显式冲突 + deleted 100+ 文件（静默暂存）

Soft shadows, Chinese labels, teaching context only. 16:9. No company names.
