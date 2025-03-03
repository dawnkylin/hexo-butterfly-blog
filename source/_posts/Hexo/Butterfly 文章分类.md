---
title: Hexo Butterfly 主题文章分类设置
date: 2025-03-03 11:46:32
updated:
tags:
  - Hexo
  - Butterfly
categories:
  - Hexo
  - Butterfly
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

在 Hexo 中，文章的 Front Matter（头部元数据）通过 `categories` 字段添加分类。以下是具体操作方法和常见用法：

---

### 1. **基本单分类**
为文章添加单个分类（例如分类名为 `技术笔记`）：
```yaml
---
title: 我的文章标题
date: 2023-01-01
categories: 技术笔记
---
```

---

### 2. **多级分类（子分类）**
如果分类有层级（如 `技术笔记/Hexo`），需用数组格式：
```yaml
---
title: 我的文章标题
date: 2023-01-01
categories:
  - 技术笔记
  - Hexo
---
```
效果：  
`技术笔记` → `Hexo`（父子层级关系）。

---

### 3. **多个并列分类**
若文章属于多个并列分类（如 `技术笔记` 和 `生活杂谈`）：
```yaml
---
title: 我的文章标题
date: 2023-01-01
categories:
  - [技术笔记]
  - [生活杂谈]
---
```

---

### 4. **分类别名（可选）**
在主题配置文件 `_config.yml` 中设置分类别名（避免中文路径问题）：
```yaml
# 主题配置文件
category_map:
  技术笔记: tech
  Hexo: hexo
```
此时 Front Matter 仍可用中文，但生成的 URL 会转为别名：
```
/categories/tech/hexo/
```

---

### 5. **完整示例**
```yaml
---
title: Hexo分类使用指南
date: 2023-01-01
categories:
  - [技术笔记, Hexo]
  - [博客搭建]
tags:
  - Hexo
  - Butterfly
---
```

---

### 常见问题
1. **分类未显示在页面**  
   - 确保主题配置中启用了分类菜单（参考之前的配置）。
   - 运行 `hexo clean && hexo g` 重新生成。

2. **分类路径为中文**  
   通过 `category_map` 设置英文别名（见第4步）。

3. **多级分类层级错误**  
   使用数组层级时，需严格按照父子顺序：
   ```yaml
   categories:
     - 父分类
     - 子分类
   ```

---

通过上述方法，可以灵活地为文章添加分类，并兼容单分类、多级分类和多分类场景。