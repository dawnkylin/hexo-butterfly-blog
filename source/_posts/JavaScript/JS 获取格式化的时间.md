---
title: JS 获取格式化的时间
date: 2025-03-03 13:09:30
updated:
tags:
  - JavaScript
categories:
  - 前端
  - JavaScript
keywords:
description:
top_img:
comments:
cover:
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
abcjs:
noticeOutdate:
---

```javascript
function formatDateTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(
    second
  )}`;
}
 
function pad(num) {
  return num.toString().padStart(2, "0");
}

const date = new Date();
console.log(formatDateTime(date));
```