---
title: Hexo-Butterfly Katex无法显示问题
date: '2025-07-06 10:04'
updated: '2025-07-06 10:05'
categories:
  - - Hexo
tags:
  - Hexo
  - Butterfly
  - Katex
abbrlink: 486499ad
---

F12 查看元素发现`.katex`元素的`display`属性值为`none`，将其取消公式正常显示。

再看到浏览器控制台也报错：

```
23e07058/:354 Event {isTrusted: true, type: 'error', target: link, currentTarget: null, eventPhase: 0, …} Uncaught (in promise) 
(anonymous)	@	23e07058/:354
await in (anonymous)	
(anonymous)	@	23e07058/:354
```

定位到`23e07058/:354`，发现是`katex`加载错误导致的。

```js
(async () => {
  const showKatex = () => {
      document.querySelectorAll('#article-container .katex').forEach(el => el.classList.add('katex-show'))
  }

  if (!window.katex_js_css) {
      window.katex_js_css = true
      await btf.getCSS('https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.22/katex.min.css')
      if (false) {
          await btf.getScript('https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.22/contrib/copy-tex.min.js')
      }
  }

  showKatex()
}()
```

访问`https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.22/katex.min.css`和`https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.22/contrib/copy-tex.min.js`发现需要验证邮箱才能访问。 

经过不断修改链接中的版本，发现`0.16.9`版本可以正常访问。其实可以直接在cdnjs搜索就能发现它的katex最新版本只有`0.16.9`。

在VSCode中搜索找到该代码文件位于`/third-party/math/katex.pug`，其代码如下：

```pug
script.
(async () => {
  const showKatex = () => {
    document.querySelectorAll('#article-container .katex').forEach(el => el.classList.add('katex-show'))
  }

  if (!window.katex_js_css) {
    window.katex_js_css = true
    await btf.getCSS('!{url_for(theme.asset.katex)}')
    if (!{theme.math.katex.copy_tex}) {
      await btf.getScript('!{url_for(theme.asset.katex_copytex)}')
    }
  }

  showKatex()
})()
```

我并没有在配置文件中指定`katex`的版本，所以应该是主题的默认插件配置为`0.16.22`版本。

果然在`butterfly/plugins.yml`中发现：

```yml
katex:
  name: katex
  file: dist/katex.min.css
  other_name: KaTeX
  version: 0.16.22
katex_copytex:
  name: katex
  file: dist/contrib/copy-tex.min.js
  other_name: KaTeX
  version: 0.16.22
```

最好不要修改版本，我考虑更改CDN提供方。在`_config.butterfly.yml`中我曾修改了CDN默认提供方jsdelivr为cdnjs，因为jsDelivr访问不了，而katex在jsdelivr中的最新版本正好为`0.16.22`，这也就导致了我现在的情况。我试着换为了unpkg，目前看没有什么问题。