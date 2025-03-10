---
title: Hello, Hexo-Theme-Butterfly
date: 2025-03-03 12:58:58
updated: 2025-03-03 12:58:58
tags:
  - Hexo 
  - Butterfly
  - GitHub Pages
categories:
  - [Hexo]
  - [GitHub]
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

我就不全部来一遍了，只记录一些我目前遇到的问题。

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

## 标签外挂和进阶使用

{% note orange 'fa fa-question' %}
标签{% label 外挂 green%}？应该就是字面意思，是特别牛皮的标签！
{% endnote %}

### Note 或者 Bootstrap Callout

我认为这就是“装修过”的引用块，当然作用就不只是cite或quote了。

{% btn 'https://butterfly.js.org/posts/ceeb73f/#Note-Bootstrap-Callout',看看它们的写法,fa fa-arrow-circle-right,purple outline block center larger%}

### Tag-hide

```md
// 文字隐藏
{% hideInline content,display,bg,color %}
哪个英文字母最酷？ {% hideInline 因为西装裤(C装酷),查看答案,#FF7242,#fff %}
// 块隐藏
{% hideBlock display,bg,color %}
content
{% endhideBlock %}
// 收缩框、展开框
{% hideToggle display,bg,color %}
content
{% endhideToggle %}
```

### Tabs

```md
{% tabs Unique name, [index] %}

<!-- tab [Tab caption] [@icon] -->

Any content (support inline tags too).

<!-- endtab -->

{% endtabs %}
```

{% tabs fruit, -1 %}

<!-- tab apple @fa fa-star -->

给你一个苹果

<!-- endtab -->

<!-- tab banana -->

给你一个香蕉

<!-- endtab -->

<!-- tab orange -->

给你一个橙子

<!-- endtab -->

{% endtabs %}

### 按钮

```md
{% btn [url],[text],[icon],[color] [style] [layout] [position] [size] %}
{% btn 'https://butterfly.js.org/posts/ceeb73f/#Note-Bootstrap-Callout',看看它们的写法,fa fa-arrow-circle-right,purple outline block center larger%}
```

### label

```
{% label text color %}
```

### inline img

```md
{% inlineImg [src] [height] %}
```

### 图廊 Gallery

```md
{% gallery true%}
![](https://i.loli.net/2019/12/25/Fze9jchtnyJXMHN.jpg)
![](https://i.loli.net/2019/12/25/ryLVePaqkYm4TEK.jpg)
![](https://i.loli.net/2019/12/25/gEy5Zc1Ai6VuO4N.jpg)
![](https://i.loli.net/2019/12/25/d6QHbytlSYO4FBG.jpg)
![](https://i.loli.net/2019/12/25/6nepIJ1xTgufatZ.jpg)
![](https://i.loli.net/2019/12/25/E7Jvr4eIPwUNmzq.jpg)
![](https://i.loli.net/2019/12/25/mh19anwBSWIkGlH.jpg)
![](https://i.loli.net/2019/12/25/2tu9JC8ewpBFagv.jpg)
{% endgallery %}
```

{% gallery true%}
![](https://i.loli.net/2019/12/25/Fze9jchtnyJXMHN.jpg)
![](https://i.loli.net/2019/12/25/ryLVePaqkYm4TEK.jpg)
![](https://i.loli.net/2019/12/25/gEy5Zc1Ai6VuO4N.jpg)
![](https://i.loli.net/2019/12/25/d6QHbytlSYO4FBG.jpg)
![](https://i.loli.net/2019/12/25/6nepIJ1xTgufatZ.jpg)
![](https://i.loli.net/2019/12/25/E7Jvr4eIPwUNmzq.jpg)
![](https://i.loli.net/2019/12/25/mh19anwBSWIkGlH.jpg)
![](https://i.loli.net/2019/12/25/2tu9JC8ewpBFagv.jpg)
{% endgallery %}

### series 文章系列/合集

```md
{% series %}
{% series [series name] %}
```

{% note blue 'fa fa-magic' %}
需要在 front matter 给 series 属性一个值/名称。
{% endnote%}

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

### 自定义代码配色

[自定義代碼配色 | Butterfly](https://butterfly.js.org/posts/b37b5fe3/)

如果你使用到highlight的话，就去[highlight.js/src/styles at main · highlightjs/highlight.js](https://github.com/highlightjs/highlight.js/tree/main/src/styles)选一个css文件，复制其中除`.hljs`外的样式代码到`source/self/theme-name.css`，然后根据前面链接的文章里提到修改几个全局变量，接着看看实际效果再调整如border样式之类的。

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

**第五步**：修改`_config.yml`

```yml
url: https://<your-username>.github.io/your-blogname  # 关键配置
root: /your-blogname/  # 必须以斜杠开头和结尾

# Deployment
deploy:
  type: git
  repo: 
    github: git@github.com:<your-username>/your-blogname.git  # SSH 地址（推荐）
    # 或 HTTPS 地址：https://github.com/<your-username>/your-blogname.git
  branch: gh-pages  # 部署到 gh-pages 分支
```

**第六步**：设置 GitHub Pages，进入仓库的 Settings → Pages：

- Branch: `gh-pages`
- Path: `/ (root)`

**第七步**：安装部署插件：

```bash
npm install hexo-deployer-git --save
```

**第八步**：部署：

```bash
hexo clean && hexo g && hexo deploy
```

这一步会生成`public`文件夹并将其推送到远程`gh-pages`分支，然后部署。

也可以配置自动化部署：创建 workflow 文件`.github/workflows/deploy.yml`：

```yml
name: Deploy Hexo

on:
  push:
    branches:
      - main  # 根据你的源码分支修改

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'

    - name: Install Dependencies
      run: |
        npm install -g hexo-cli
        npm install

    - name: Generate Files
      run: |
        hexo clean
        hexo generate

    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
        publish_branch: gh-pages
```

**第九步**：推送源码到主分支

```bash
git add .
git commit -m 'initial commit'
git push origin main
```