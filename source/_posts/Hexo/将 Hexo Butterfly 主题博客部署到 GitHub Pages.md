---
title: 将 Hexo Butterfly 主题博客部署到 GitHub Pages
date: 2025-03-03 12:58:58
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

以下是將 Hexo 博客部署到 GitHub Pages 的完整流程，特别针对 Butterfly 主题的优化配置：

---

### 一、前期准备
1. **本地环境**
   - 确保已安装 [Node.js](https://nodejs.org/) (建议 14.x+)
   - 已初始化 Hexo 项目并配置好 Butterfly 主题
   - 安装 Git：[Git 下载](https://git-scm.com/)

2. **GitHub 仓库准备**
   - 创建新仓库，命名格式必须为：`<你的用户名>.github.io`  
     (例：用户名为 `john`，则仓库名为 `john.github.io`)
   - 分支规则：`main` 或 `master` 分支存放 Hexo 源码，`gh-pages` 分支存放生成的静态文件（推荐）

---

### 二、Hexo 部署配置
1. **修改站点配置文件** (`_config.yml`)
```yaml
# Deployment
deploy:
  type: git
  repo: 
    github: git@github.com:你的用户名/你的仓库名.git  # SSH 地址（推荐）
    # 或 HTTPS 地址：https://github.com/你的用户名/你的仓库名.git
  branch: gh-pages  # 部署到 gh-pages 分支
```

2. **安装部署插件**
```bash
npm install hexo-deployer-git --save
```

---

### 三、生成 SSH 密钥（可选但推荐）
1. 生成密钥对
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
2. 将公钥 `id_ed25519.pub` 内容添加到 GitHub：  
   [Settings → SSH and GPG keys → New SSH key](https://github.com/settings/keys)

---

### 四、首次部署
1. 生成静态文件
```bash
hexo clean && hexo g
```
2. 执行部署
```bash
hexo deploy
```
3. 访问网站：  
   `https://<你的用户名>.github.io`

---

### 五、自动化部署（GitHub Actions）
1. 创建 workflow 文件：  
   `.github/workflows/deploy.yml`
```yaml
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

2. **仓库设置**：  
   [Settings → Pages → Build and deployment]  
   选择 `gh-pages` 分支和 `/ (root)` 目录

---

### 六、Butterfly 主题特殊配置
1. **修正资源路径**  
   在站点配置文件中添加：
```yaml
url: https://你的用户名.github.io
root: /
```

2. **检查主题插件**  
   确保已安装 Butterfly 依赖的插件：
```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

---

### 七、自定义域名（可选）
1. 在博客根目录的 `source` 文件夹创建 `CNAME` 文件：  
   ```bash
   echo "yourdomain.com" > source/CNAME
   ```
2. **DNS 配置**：
   ```DNS
   CNAME 记录 → yourusername.github.io
   ```
3. 重新部署后，在仓库的 Pages 设置中会看到自定义域名

---

### 八、常见问题排查
| 问题现象                  | 解决方案                                                                 |
|--------------------------|--------------------------------------------------------------------------|
| 页面 404 空白             | 检查 `gh-pages` 分支是否成功生成，`public` 文件夹内容是否完整             |
| CSS/JS 资源加载失败       | 确认 `_config.yml` 的 `url` 和 `root` 配置正确                          |
| 部署时报权限错误          | 使用 HTTPS 地址时，确保使用 `https://<TOKEN>@github.com/...` 格式       |
| GitHub Actions 构建失败   | 检查 `.github/workflows/deploy.yml` 的缩进和分支名称是否正确             |
| Butterfly 主题样式丢失    | 重新安装主题依赖：`npm install hexo-renderer-pug hexo-renderer-stylus`   |

---

### 九、更新博客流程
1. 修改博客内容
2. 提交源码到仓库
```bash
git add .
git commit -m "更新内容"
git push origin main
```
3. GitHub Actions 会自动构建并部署到 `gh-pages`

--- 

通过以上步骤，你的 Butterfly 主题博客将稳定运行在 GitHub Pages 上。如果使用 CDN 加速，可考虑结合 Cloudflare 优化访问速度。