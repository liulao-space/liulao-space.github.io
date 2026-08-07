---
type: flowchart
style: warm-notebook
filename: 09-flowchart-merge-rescue.png
---

Premium digital notebook flowchart, GoodNotes style. Warm cream paper with dot grid.

Title sticky: 「救援：abort → 只挑真改动 → 重建分支」

Three numbered horizontal sticky cards:
1 amber 诊断：git log develop..分支 → 只有 1 个真提交 / 5 行
2 salmon 放弃危险合并：git merge --abort → 回到干净主干
3 mint cherry-pick 真改动：git cherry-pick e50b57a6 → 只搬 5 行

Below white box step 4: 验证再推送 git diff --stat → 只剩 1 文件 · git push
Bottom salmon box step 5: 重建私有分支 git reset --hard origin/develop · git push --force-with-lease

Soft shadows, Chinese labels, teaching context only. 16:9. No company names.
