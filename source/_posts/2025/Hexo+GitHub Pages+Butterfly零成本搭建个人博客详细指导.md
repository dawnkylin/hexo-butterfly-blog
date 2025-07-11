---
title: Hexo+GitHub Pages+Butterfly零成本搭建个人博客详细指导
description: 本文主要是介绍如何初始化Hexo项目，并为其安装和应用Butterfly主题，然后将其部署到GitHub Pages。其次还围绕着网站、主题的配置记录了一些重点内容。
keywords:
  - Hexo
  - Butterfly
  - GitHub Pages
  - 静态网站
  - 个人博客
categories:
  - [Hexo]
  - [GitHub]
tags:
  - Hexo
  - Butterfly
  - GitHub Pages
abbrlink: c74e2549
date: 2025-03-03 12:58:58
updated: 2025-07-02 20:13:01
---
## 初始化Hexo项目

初始化Hexo：

```
npm install hexo-cli -g
hexo init 博客仓库名
cd 博客仓库名
npm install
```

生成的仓库中，`_config.yml`是配置文件，`source`包含了许多资源文件，如markdown、img 、js、css、html和搜索的数据文件。我们的博客md文件位于`source/_post`文件夹下。

## 安装并应用Butterfly主题

安装主题为子模块（官方文档直接克隆的，应该都行），位置为`theme`目录下：

```bash
# 添加为子模块
git submodule add https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly

# 后续更新主题命令
cd themes/butterfly
git pull origin master
```

应用主题：设置`_config.yml`中`theme`为`butterfly`。

接着将`themes/butterfly/_config.yml`复制到博客仓库根目录下的`_config.butterfly.yml`，没有就新建它，它的优先级比`_config.yml`高，且之后`themes/butterfly/_config.yml`不再生效。这样做是为了防止主题更新时覆盖我们的配置。于是我们后期对网站的配置就是围绕站点配置`_config.xml`和Butterfly主题配置`_config.butterfly.yml`。

## Hexo和Butterfly基础配置

 ### 站点描述

`_config.xml`中的`description`字段就是站点说明，如果说明过长，搜索者可能无法看到所有文本；如果说明过短，搜索引擎可能会添加在页面其他位置找到的文本内容。建议150到160个字符。

### 站点URL和根节点

`_config.xml`：

```xml
url: https://你的GitHub用户名.github.io
root: 位于url后，例如 /，/blog/，都行
```

{% note info %}
如果站点部署在GitHub Pages的子目录下，例如`https://你的GitHub用户名.github.io/blog/`，则需要将`root`设置为`/blog/`。

如果站点位于另一个仓库，`url`设置为`https://你的GitHub用户名.github.io`或`https://你的GitHub用户名.github.io/仓库名`都行，`root`跟着设置就行。

本文最后一节会介绍如何配置自定义域名，有想法的这里可以先空着。
{% endnote %}

### 顶部图片

图片路径是相对于`source`目录的，例如`source/img/top.jpg`，则`default_top_img`设置为`/img/top.jpg`。

我建议使用渐变色或者外链图片，不要使用本地图片，因为本地图片会拖慢网站加载速度。

### 字体

不建议使用CDN字体，因为CDN字体加载速度慢，而且可能会被墙。

推荐字体设置：

在`source/css/custom.css`中设置：

```css
@font-face {
  font-family: Emoji;
  src: local("Apple Color Emoji"), local("Segoe UI Emoji"), local("Segoe UI Symbol"), local("Noto Color Emoji");
  unicode-range: U+1F000-1F644, U+203C-3299;
}

```

再在`_config.butterfly.yml`中设置：

```yml
font:
  global_font_size: 16px
  code_font_size: 16px
  font_family: system-ui, -apple-system, Segoe UI, Roboto, Emoji, Helvetica, Arial, sans-serif
  code_font_family: Menlo, Monaco, Consolas, "Liberation mono", "Courier new", monospace
```
### 评论系统

我之前用的waline，国内访问不了而且评论存储在第三方就放弃了。

换成Giscus好一点，再使用watt toolkit加Dev-Sidebar就很舒服了，只是使用Giscus就不能设置最新评论卡片了。

在[Giscus App](https://giscus.app/)配置好选项，之后就会在页面下部的“启用Giscus”一节里的JS代码里得到`_config.butterfly.yml`需要的参数值。

```yml
# Giscus
# https://giscus.app/
giscus:
    repo: 
    repo_id: 
    category_id: 
    light_theme: light
    dark_theme: dark
    js: 
    option:
        data-lang: zh-CN
        data-input-position: top
        data-loading: lazy
```

### 搜索引擎

我浅浅配置过algolia，但是搜索效果不理想，网上也找不到详细配置文档，遂弃之，改用本地搜索[wzpan/hexo-generator-search: A plugin to generate search data for Hexo.](https://github.com/wzpan/hexo-generator-search)。

安装插件：

```bash
npm install hexo-generator-search --save
```

在`_config.xml`中设置：

```yml
search:
  path: search.xml
  field: post
  content: true
  # template: ./search.xml
```

### 自定义代码主题

有Highlight.js和Prime.js两种代码高亮方案，但鉴于Prime.js已好几年没有更新了，所以使用Highlight.js。

在`_config.butterfly.yml`中设置：

```yml
highlight_theme: false
```

从[Highlight.js](https://github.com/highlightjs/highlight.js/tree/main/src/styles)仓库里复制你想要应用的主题代码到`source/css/code_theme.css`，并在`_config.butterfly.yml`中设置：

```yml
inject:
  head:
    - <link rel="stylesheet" href="/hexo-butterfly-blog/css/code_theme.css">
```

### 第三方CDN

```yml
internal_provider: local
third_party_provider: unpkg
```

Butterfly的CDN配置分为内部和第三方，提供方可以选择`local/jsdelivr/unpkg/cdnjs/custom`中任意一个。

cdnjs的版本比较落后，会导致与主题的默认配置不符；jsDelivr访问受限；unpkg勉强可以。

## 插件安裝

### 必安插件

```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

### 永久链接

一篇文章发布后，其链接最好不要经常修改，否则会导致搜索引擎索引失效，所以需要使用插件`hexo-abbrlink`为文章生成一个固定的使用crc16或crc32算法生成的十进制或十六进制数字标识。

在`_config.xml`中设置`permalink`为`posts/:abbrlink/`，并安装插件`hexo-abbrlink`。

```bash
npm install hexo-abbrlink --save
```

### 链接SEO优化

安装`hexo-filter-nofollow`插件，给所有外部链接添加`rel="noopener external nofollow noreferrer"`属性以增强安全性和SEO。

```bash
npm install hexo-filter-nofollow --save
```

### 复选框

由于`hexo-renderer-markdown-it`插件不支持复选框，所以需要安装插件`markdown-it-checkbox`。

安装插件`markdown-it-checkbox`：

```bash
npm install markdown-it-checkbox --save
```

还需要覆盖浏览器原生样式，在`source/css/custom.css`中设置：

```css
ul:has(input[type="checkbox"]) {
  list-style-type: none;
}

[type="checkbox"] {
  /* 调整位置 */
  margin: 0 5px 0 -1em;
  /* 与文字对齐 */
  vertical-align: middle;
  /* 不可勾选 */
  pointer-events: none;
}
```

### 生成订阅文件

安装插件`hexo-generator-feed`：

```bash
npm install hexo-generator-feed --save
```

在`_config.xml`中设置：

```yml
feed:
  enable: true
  type: atom
  path: atom.xml
  limit: 20
  hub:
  content:
  content_limit: 140
  content_limit_delim: ' '
  order_by: -date
  icon: icon.png
  autodiscovery: true
  template:
```

### 生成站点地图

站点地图是一个XML文件，用于告诉搜索引擎网站上所有页面的URL。

安装插件`hexo-generator-sitemap`：

```bash
npm install hexo-generator-sitemap --save
```

在`_config.xml`中设置：

```yml
sitemap:
  path: sitemap.xml
```

## 主题修改

### 标签云添加统计数量

在主仓库（非子模块）新建自定义 helper（比如 `scripts/helpers/my_cloudTags.js`）：

```bash
mkdir scripts && mkdir scripts/helpers
touch scripts/helpers/my_cloudTags.js
```

`my_cloudTags.js`内容：

```js
'use strict'

hexo.extend.helper.register('cloudTags', function (options = {}) {
  const env = this
  let { source, minfontsize, maxfontsize, limit, unit = 'px', orderby, order } = options

  if (limit > 0) {
    source = source.limit(limit)
  }

  const sizes = [...new Set(source.map(tag => tag.length).sort((a, b) => a - b))]

  const getRandomColor = () => {
    const randomColor = () => Math.floor(Math.random() * 201)
    const r = randomColor()
    const g = randomColor()
    const b = randomColor()
    return `rgb(${Math.max(r, 50)}, ${Math.max(g, 50)}, ${Math.max(b, 50)})`
  }

  const generateStyle = (size, unit) =>
    `font-size: ${parseFloat(size.toFixed(2)) + unit}; color: ${getRandomColor()};`

  const length = sizes.length - 1
  const result = source.sort(orderby, order).map(tag => {
    const ratio = length ? sizes.indexOf(tag.length) / length : 0
    const size = minfontsize + ((maxfontsize - minfontsize) * ratio)
    const style = generateStyle(size, unit)
    return `<a href="${env.url_for(tag.path)}" style="${style}">${tag.name} <span class="tag-count">(${tag.length})</span></a>`
  }).join('')

  return result
}) 

```

主要就是修改返回值，添加统计数量。以后主题更新，注意检查是否需要修改。

## 文章写作

在`source/_posts`目录下可以建立我们的markdown文章，其下可以分多个目录表示分类，单篇文章既可以是单个文件，也可以是一个文件夹，文件夹里有一个`index.md`就是文章源文件，还可以放一些其他文件，如图片、视频等，但一般不建议，因为静态资源会拖慢网站的加载速度。目录结构示例：

```plaintext
├ source
├─ _posts
├── 前端
├─── 前端技术概览.md
├─── Vue
├──── Vue的响应式原理.md
├──── Vue组件间的通信
├───── index.md
└── 后端
```

我更建议使用年份分类，因为

- 文章本身就有分类属性
- 有的文章不只属于一个分类
- 我们可能一年都写不了几篇文章

与一般的markdown文件不同，我们需要在文章开头添加一些元数据，称为Front Matter，如标题、发布日期、更新日期、分类、标签等。如以下示例：

```plaintext
---
title: Vue的响应式原理
date: 2023-01-01 12:00:00
updated: 2023-01-02 12:00:00
categories:
  - Vue
tags:
  - Vue
  - 响应式原理
---
```

### 分类语法

语法：

```
categries: CSS
或者
categories:
  - CSS
或者
categories:
  - [CSS]
或者 多层级分类
categories:
  - [前端, CSS] # 表示前端分类下的CSS子分类
或者 单独的多个分类
categories:
  - [CSS]
  - [Vue]
```

### 本地预览

接下来，开始构建网站，并启动Hexo本地服务器，访问`localhost:4000`即可预览博客。

```bash
hexo clean && hexo g && hexo s
```

如果不想每次都输入这么长的命令，可以在`package.json`中添加脚本：

```json
"scripts": {
    "server": "hexo clean && hexo g && hexo s"
}
```

这样就可以使用`npm run server`启动本地服务器。

## 自定义标签外挂

### 自定义代码块标签

- [ ] 代码块标签`codeblock`可配置标题和语言类型

## 部署博客到GitHub Pages

**第一步**：创建一个名为`your-username.github.io`的远程仓库。

**第二步**：创建一个名为`your-blogname`的仓库。

**第三步**：初始化你的本地Hexo为一个Git仓库：

```bash
git init
```

**第四步**：添加远程仓库：

```bash
git checkout main
git remote add origin https://github.com/<your-username>/<your-blogname>.git
```

**第五步**：部署

参考 Hexo 文档即可：

1. [在 GitHub Pages 上部署 Hexo | Hexo](https://hexo.io/zh-cn/docs/github-pages)
2. [将 Hexo 部署到 GitLab Pages | Hexo](https://hexo.io/zh-cn/docs/gitlab-pages)
3. [一键部署 | Hexo](https://hexo.io/zh-cn/docs/one-command-deployment)

## 使用cloudfare加速访问GitHub Pages

1. 注册cloudfare账号。购买cloudfare免费套餐。之后会提供cloudfare ns服务器名称。
2. 购买域名（我买的腾讯云，一年一块钱），需填写个人信息模板才能买，验证大概几分钟。
3. 修改域名名称服务器为cloudfare ns服务器名称。
4. 在cloudfare添加解析记录A类型和CNAME类型：{% inlineImg https://raw.githubusercontent.com/dawnkylin/images/main/2025/20250711160054182.png 50px %}
5. 去`your-username.github.io`仓库下修改pages的自定义域名为你买的域名。大概十几分钟的TLS证书安装，之后就可以启用`Enforce HTTPS`了。

修改配置文件`_config.yml`：

```yml
url: https://your-domain.com
root: /your-blogname/
```

最后去百度、Bing和谷歌的站长管理网站新增网站。