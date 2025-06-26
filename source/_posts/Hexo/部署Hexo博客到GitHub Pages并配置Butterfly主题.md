---
title: 部署Hexo博客到GitHub Pages并配置Butterfly主题
date: 2025-03-03 12:58:58
updated: 2025-06-26 22:36:00
tags:
  - Hexo 
  - Butterfly
  - GitHub Pages
categories:
  - [Hexo]
  - [GitHub]
keywords: 
  - Hexo
  - Butterfly
  - GitHub Pages
  - 静态网站
  - 个人博客
description: 
---

## 初始化Hexo项目

初始化Hexo：

```bash
npm install hexo-cli -g
hexo init 博客仓库名
cd 博客仓库名
npm install
```

生成的仓库中，`_config.yml`是配置文件，`source`包含了许多资源文件，如markdown、img 、js、css、html和搜索的数据文件。我们的博客md文件位于`source/_post`文件夹下。

## 安装并应用Butterfly主题

安装主题为子模块，位置为`theme`目录下：

```bash
# 添加为子模块
git submodule add https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly

# 后续更新主题命令
cd themes/butterfly
git pull origin master
```

安装pug和stylus的渲染器：

```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

设置`_config.yml`中`theme`为`butterfly`。

接着将`themes/butterfly/_config.yml`复制到博客仓库根目录下的`_config.butterfly.yml`，没有就新建它，它的优先级比`_config.yml`高，且之后`themes/butterfly/_config.yml`不再生效。

## 配置Buttefly

我只记录我解决的比较有价值的问题，更详细配置信息[参考官方文档](https://butterfly.js.org/posts/4aa8abbe/)。

### 头像、顶部图片的存放位置

头像和顶部图片放在`source/img`下，路径使用相对路径`/img/<filename>`即可，但是最后生成的地址是要加上`<your-blogname>`的：`https://your-username.github.io/your-blogname/img/<filename>`。头像会自动加，顶部图片却不会，需要手动加：

```yml
avatar:
  img: /img/avatar.png
  effect: false

# Disable all banner images
disable_top_img: false

# If the banner of page not setting, it will show the default_top_img
default_top_img: /hexo-butterfly-blog/img/default_top_img.jpg
```

## 评论系统

之前用的waline，国内访问不了就放弃了。

换成Giscus好一点，再使用watt toolkit就很舒服了，只是使用Giscus就不能设置最新评论卡片了。

在https://giscus.app/配置好选项，之后就会在页面下部的启用Giscus一节里的JS代码里得到`_config.butterfly.yml`需要的参数值。

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
        data-input-position: top
        data-loading: lazy
```

### 搜索引擎

我浅浅配置过algolia，但是搜索效果不理想，网上也找不到详细配置文档，遂弃之，改用本地搜索[wzpan/hexo-generator-search: A plugin to generate search data for Hexo.](https://github.com/wzpan/hexo-generator-search)。

### 字体更换

查找免费字体CDN的方式：

- [ZSFT](https://fonts.zeoseven.com/)
- [中文网字计划](https://chinese-font.netlify.app/zh-cn/)
- 在jsDelivr、UNPKG、cdnjs等CDN上查找

复制喜欢的字体link到`_config.butterfly.yml`的`inject`：

```yml
inject:
  head:
      - <link href=" https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont@1.7.0/style.min.css " rel="stylesheet">
      - <link rel="stylesheet" href="/hexo-butterfly-blog/self/custom.css">
```

再设置相应的字体：

```yml
font:
  global_font_size: 18px
  code_font_size: 18px
  font_family: LXGW WenKai Screen
  code_font_family: LXGW WenKai Screen
```

### 文章的分类语法

此处询问的deepseek：

在 Hexo 中，文章的 Front Matter（头部元数据）通过 `categories` 字段添加分类。

{% tabs 文章分类 %}
<!-- tab 单类 -->
```yaml
---
title: 我的文章标题
date: 2023-01-01
categories: 技术笔记
---
```
<!-- endtab -->
<!-- tab 多级分类 -->
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
<!-- endtab -->
<!-- tab 并列 -->
```yaml
---
title: 我的文章标题
date: 2023-01-01
categories:
  - [技术笔记, Hexo]
  - [生活杂谈]
---
```

结果：文章被分类到`技术笔记 → Hexo` 和 `生活杂谈`。
<!-- endtab -->
{% endtabs %}

## 标签外挂

{% note orange 'fa fa-question' %}
标签{% label 外挂 green %}？应该就是字面意思，是特别牛皮的标签！
{% endnote %}

[Butterfly 文檔(四) 標簽外挂 | Butterfly](https://butterfly.js.org/posts/ceeb73f)

## 进阶使用

### 站点验证

{% tabs 站点验证 %}
<!-- tab Bing -->
登录 [Bing Webmaster Tools](https://www.bing.com/webmasters)，进入网站验证界面，选择 “XML文件”验证方式。Bing会生成一个名为 BingSiteAuth.xml 的文件，将下载的 BingSiteAuth.xml 文件放到Hexo项目的 source 目录下。在Hexo配置文件中跳过渲染BingSiteAuth.xml文件：

```yml
# _config.yml
skip_render:
  - BingSiteAuth.xml
```

{% note pink 'fas fa-sticky-note' %}
重新部署网站，在Bing Webmaster Tools验证成功后，Bing Webmaster Tools会提示你添加站点文件以加速处理：

Your data and reports are being processed and it may take upto 48 hours to reflect. Meanwhile, to speed up the indexing process, please submit your sitemap by using the Sitemaps feature.
{% endnote %}

使用插件生成 sitemap：

```bash
npm install hexo-generator-sitemap --save
```

修改`_config.yml`：

```yml
sitemap:
  path: sitemap.xml
```

登录Bing Webmaster Tools，提交 sitemap.xml 的URL（如your-site-url/sitemap.xml）。
<!-- endtab -->
<!-- tab 百度 -->
百度不能爬取GitHub内容，所以需要自行购买域名、备案并添加CNAME记录。
<!-- endtab -->
{% endtabs %}




### 插件

{% hideToggle hexo-filter-nofollow %}
{% note green 'fas fa-info' %}
hexo-filter-nofollow add `rel="noopener external nofollow noreferrer"` to all external links for security, privacy and SEO. [Read more](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).

[hexojs/hexo-filter-nofollow: Add nofollow attribute to all external links automatically.](https://github.com/hexojs/hexo-filter-nofollow)
{% endnote %}

noopener（安全）、noreferrer（隐私）和nofollow（阻止权重传递）


{% endhideToggle %}

{% hideToggle hexo-generator-feed %}
[hexojs/hexo-generator-feed: Feed generator for Hexo.](https://github.com/hexojs/hexo-generator-feed)
{% endhideToggle %}

### 图片压缩

{% note blue 'fa fa-info-circle' %}
图片压缩的显示优势和隐式优势挺多。
{% endnote %}

{% tabs 图片压缩 %}
<!-- tab Imgbot -->
[Imgbot · GitHub Marketplace](https://github.com/marketplace/imgbot)，一款 GitHub Marketplace App，安装后，会自动扫描指定仓库图片并压缩，然后提交 PR 给你。

通过 .imgbotconfig 文件可设置压缩频率（每日/周/月）、排除文件路径、启用有损压缩等。


结合 GitHub Actions 可实现自动合并 PR，减少手动操作（我觉得最好只用于图床）。

[利用ImgBot自动压缩Github图床，加速访问 | 笑枕晚风の小站](https://blog.zgzheng.top/posts/63060/)

<!-- endtab -->
<!-- tab 其他 -->
{% btn 'https://butterfly.js.org/posts/4073eda/#%E5%9C%96%E7%89%87%E5%A3%93%E7%B8%AE',参考这篇文章,,purple outline block center %}
<!-- endtab -->
{% endtabs %}

### 侧边栏访客地图

生成你的网站的访客地图 HTML：[ClustrMaps: Registration](https://clustrmaps.com/add)

添加代码到`source/_data/widget.yml`:

```yml
bottom:
  - class_name: user-map
    id_name: user-map
    name: 访客地图
    icon: fas fa-heartbeat
    order:
    html: '你获取到的<script>代码'
```

{% note orange 'fa-solid fa-circle-exclamation' %}
- 这个会可能被广告插件拦截，请将网站添加到白名单或关闭拦截插件。
- 每次要刷新首页才能显示，很鸡肋。
{% endnote %}

### 自定义代码配色

[自定義代碼配色 | Butterfly](https://butterfly.js.org/posts/b37b5fe3/)

如果你使用到highlight的话，就去[highlight.js/src/styles at main · highlightjs/highlight.js](https://github.com/highlightjs/highlight.js/tree/main/src/styles)选一个css文件，复制其中除`.hljs`外的样式代码到`source/self/theme-name.css`，然后根据前面链接的文章里提到修改几个全局变量，接着看看实际效果再调整如border样式之类的。

### 图标

[Find Icons with the Perfect Look & Feel | Font Awesome](https://fontawesome.com/icons)

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