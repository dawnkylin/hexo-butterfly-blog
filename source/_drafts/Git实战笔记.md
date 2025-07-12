---
title: Git实战笔记
abbrlink: b7c59eef
keywords:
  - Git笔记
categories:
  - Git
tags:
  - Git
date: 2025-07-03 17:00:00
updated: 2025-07-03 17:00:00
description:
---
## git status执行后有几种情况

- **Changes to be committed**（绿色）：已暂存但未提交的更改
- **Changes not staged for commit**（红色）：已修改但未暂存的更改
- **Untracked files**：未跟踪的新文件

## 如果推送时还有未暂存更改或未提交已暂存更改怎么办？

推送操作不受本地未提交内容影响，`git push`只推送已提交的更改。