---
title: 部署Hexo博客到GitHub Pages并配置Butterfly主题
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
  - GitHub
  - Pages
abbrlink: c74e2549
date: 2025-03-03 12:58:58
updated: 2025-07-02 20:13:01
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

安装主题为子模块（官方文档直接克隆的，都行），位置为`theme`目录下：

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

如果不是直接使用的`xxx.github.io`，而是`xxx.github.io/your-blogname`，则要注意以下事情：

头像和顶部图片放在`source/img`下，路径使用相对路径`/img/<filename>`即可，但是最后生成的地址是要加上`<your-blogname>`的：`https://your-username.github.io/your-blogname/img/<filename>`。头像会自动加，顶部图片却不会，需要手动加，反正一般使用`/img/<filename>`，除非遇到`img`目录下图片无法显示。

```yml
avatar:
  img: /img/avatar.png
  effect: false

# Disable all banner images
disable_top_img: false

# If the banner of page not setting, it will show the default_top_img
default_top_img: /hexo-butterfly-blog/img/default_top_img.jpg
```

### 评论系统

之前用的waline，国内访问不了就放弃了。

换成Giscus好一点，再使用watt toolkit加Dev-Sidebar就很舒服了，只是使用Giscus就不能设置最新评论卡片了。

在[Giscus App](https://giscus.app/)配置好选项，之后就会在页面下部的“启用Giscus“一节里的JS代码里得到`_config.butterfly.yml`需要的参数值。

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

## 文章写作及本地预览

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

与一般的markdown文件不同，我们需要在文章开头添加一些元数据，称为Front Matter，如标题、发布日期、更新日期、分类、标签等。

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

更多详细元数据参考[Butterfly 文档(二) 主题页面](https://butterfly.js.org/posts/dc584b87/)。

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

## 标签外挂

{% note orange 'fa fa-question' %}
标签{% label 外挂 green %}？应该就是字面意思，是特别牛皮的标签！
{% endnote %}

[Butterfly 文檔(四) 標簽外挂 | Butterfly](https://butterfly.js.org/posts/ceeb73f)

## 进阶使用

### Bing 收录配置

（1）验证站点

登录 [Bing Webmaster Tools](https://www.bing.com/webmasters)，进入网站验证界面，选择“XML文件”验证方式。Bing会生成一个名为 BingSiteAuth.xml 的文件，将下载的 BingSiteAuth.xml 文件放到Hexo项目的 source 目录下。

在Hexo配置文件中跳过渲染BingSiteAuth.xml文件：

```yml
# _config.yml
skip_render:
  - BingSiteAuth.xml
```

（2）添加sitemap.xml

重新部署网站，在Bing Webmaster Tools验证成功后，Bing Webmaster Tools会提示你添加站点文件以加速处理：

Your data and reports are being processed and it may take upto 48 hours to reflect. Meanwhile, to speed up the indexing process, please submit your sitemap by using the Sitemaps feature.

安装插件hexo-generator-sitemap生成 sitemap：

```bash
npm install hexo-generator-sitemap --save
```

修改`_config.yml`：

```yml
sitemap:
  path: sitemap.xml
```

重新部署网站。

登录Bing Webmaster Tools，提交 sitemap.xml 的URL（如your-site-url/sitemap.xml）。sitemap.xml里必须是规范的URL。

过一段时间后在Bing搜索引擎搜索`site:your-site-url`，就能看到站点哪些页面被索引了。如果很长时间没有被索引，可以联系官方（或发邮件给 bwtsupport@microsoft.com）询问具体情况，如网站是不是被拉黑了。

Bing会定期抓取sitemap，但是如果网站出现重大变化，还是建议使用Bing Webmaster Tools手动重传。

（3）填写符合要求的`description`Front Matter

Bing搜索引擎爬网程序仅在搜索结果页面中显示该说明的前 150-160 个字符，因此如果说明过长，搜索者可能无法看到所有文本；如果说明过短，搜索引擎可能会添加在页面其他位置找到的文本内容。请注意，如果搜索引擎认为其他说明与用户搜索内容的相关性更高，则可能会显示其他说明，而非你编写的说明。

可以将`<meta description>` 标记中的描述长度更改为介于 25 到 160 个字符之间。

修改文章节选配置以关闭自动节选功能：

```yml
# _config.yml_
# Display the article introduction on homepage
# 1: description
# 2: both (if the description exists, it will show description, or show the auto_excerpt)
# 3: auto_excerpt (default)
# false: do not show the article introduction
index_post_content:
    method: 1
    # If you set method to 2 or 3, the length need to config
    length: 
```


（4）无效页面删除

若是索引页面无法访问，可以使用[Bing 内容删除工具](https://www.bing.com/webmasters/tools/contentremoval)删除。

更多Bing站点管理指南可参考[Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmasters-guidelines-30fba23a)。

### 有用的插件

#### hexo-abbrlink

为了避免我们需要时常修改博客文件名或者`title`元数据而导致原链接失效，就不能使用文件路径或标题作为url的一部分，hexo-abbrlink插件可以为文章生成一个固定的使用crc16或crc32算法生成的十进制或十六进制数字标识。配置如下：

```yml
# _config.yml
permalink: posts/:abbrlink/
abbrlink:
  alg: crc32 #算法： crc16(default) and crc32
  rep: hex #进制： dec(default) and hex
permalink_defaults:
pretty_urls:
  trailing_index: false # Set to false to remove trailing 'index.html' from permalinks
  trailing_html: false # Set to false to remove trailing '.html' from permalinks
```

#### hexo-filter-nofollow

给所有外部链接添加`rel="noopener external nofollow noreferrer"`属性以增强安全性和SEO。

noopener（安全）、noreferrer（隐私）和nofollow（阻止权重传递）

#### hexo-generator-feed

生成订阅文件。

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
