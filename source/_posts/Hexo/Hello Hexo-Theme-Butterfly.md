---
title: Hello, Hexo-Theme-Butterfly
date: 2025-03-03 12:58:58
updated: 2025-03-11 12:58:58
tags:
  - Hexo 
  - Butterfly
  - GitHub Pages
categories:
  - [Hexo]
  - [GitHub]
keywords:
description:
top_img:
cover:
commets:
katex:
aplayer:
---

本文关于hexo-theme-butterfly的搭建、部署和使用。

---

## 初始化Hexo项目

```bash
npm install hexo-cli -g
hexo init <your-blogname>
cd <your-blogname>
npm install
```

生成的项目中，`_config.yml`文件和`source`文件夹将是以后我们常常操作、修改的地方。

`_config.yml`是配置文件，`source`包含了许多资源文件，如markdown、img 、js、css、html和搜索的数据文件。我们的博客位于`source/_post`文件夹下。 

初始化Hexo项目过程中，EJS、Stylus和Markdown渲染引擎会默认安装，后面按需取舍。

## 安装并应用Butterfly主题

参考这篇文章：[Butterfly 文檔(一) 快速開始 | Butterfly](https://butterfly.js.org/posts/21cfbf15/)。

其大致过程就是通过`git clone`或`npm`命令安装主题，然后设置`_config.yml`中`theme`，接着将`themes/butterfly/_config.yml`复制到根目录下的`_config.butterfly.yml`，没有就新建它，它的优先级比`_config.yml`高。

{% note blue 'fa fa-pencil' %}
作者在使用的过程发现使用`git clone`克隆的主题，在提交时会有警告和提示，然后将其转为sub module就好了。这个问题的根本原因就是`themes/butterfly`是别人的仓库，我们不能直接修改它。
{% endnote %}

{% note red 'fa fa-question' %}
将`themes/butterfly`的`.git`文件删除也行，但是后续的主题升级怎么办呢？
{% endnote %}

将使用`git clone`克隆的主题转为sub module的过程如下：

```bash
# 1. 移除已存在的主题目录（保留文件）
git rm --cached themes/butterfly

# 2. 添加为子模块
git submodule add https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly

# 3. 初始化子模块
git submodule init
git submodule update

# 后续更新主题命令
cd themes/butterfly
git pull origin master
```

## 配置Buttefly

详细过程在[Butterfly 文檔(三) 主題配置 | Butterfly](https://butterfly.js.org/posts/4aa8abbe/)。

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

### 搜索引擎

我浅浅配置过algolia，但是搜索效果不理想，网上也找不到详细配置文档，遂弃之，改用本地搜索[wzpan/hexo-generator-search: A plugin to generate search data for Hexo.](https://github.com/wzpan/hexo-generator-search)。

### 字体更换

推荐一个中文免费字体CDN网站：[✨中文网字计划-提供便捷实用的全字符集中文渲染方案](https://chinese-font.netlify.app/zh-cn/)。

复制喜欢的字体link到`_config.butterfly.yml`的`inject`：

```yml
inject:
  head:
    - <link rel='stylesheet' href='https://chinese-fonts-cdn.deno.dev/packages/sypxzs/dist/思源屏显臻宋/result.css' />
```

再设置相应的字体：

```yml
font:
  global_font_size: 16px
  code_font_size: 16px
  font_family: Consolas, 'Source Han Serif CN for Display'
  code_font_family: Consolas, 'Source Han Serif CN for Display'
```

### 文章的分类语法

此处询问的deepseek：[Hexo Butterfly 主题文章分类设置 | dawnkylin's hexo_blog](https://dawnkylin.github.io/hexo-butterfly-blog/2025/03/03/Hexo/Butterfly%20%E6%96%87%E7%AB%A0%E5%88%86%E7%B1%BB/)。

## 标签外挂

{% note orange 'fa fa-question' %}
标签{% label 外挂 green %}？应该就是字面意思，是特别牛皮的标签！
{% endnote %}

[Butterfly 文檔(四) 標簽外挂 | Butterfly](https://butterfly.js.org/posts/ceeb73f)

## 进阶使用

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
这个会可能被广告插件拦截，请将网站添加到白名单或关闭拦截插件。
{% endnote %}

### 自定义代码配色

[自定義代碼配色 | Butterfly](https://butterfly.js.org/posts/b37b5fe3/)

如果你使用到highlight的话，就去[highlight.js/src/styles at main · highlightjs/highlight.js](https://github.com/highlightjs/highlight.js/tree/main/src/styles)选一个css文件，复制其中除`.hljs`外的样式代码到`source/self/theme-name.css`，然后根据前面链接的文章里提到修改几个全局变量，接着看看实际效果再调整如border样式之类的。

### 图标

[Font Awesome](https://fontawesome.com/)

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