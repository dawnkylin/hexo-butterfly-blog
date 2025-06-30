---
title: IndexNow介绍及在Hexo中的使用
date: 2025-06-28 12:00:00
updated: 2025-06-28 12:00:00
tags:
  - Hexo
  - IndexNow
categories:
  - [Hexo]
  - [SEO]
keywords: 
  - Hexo
  - IndexNow
---
## 什么是IndexNow

IndexNow是一个免费的的开源协议，用于你更新网站时及时通知搜索引擎列表同步。相比传统的web爬虫，IndexNow具有更快的索引速度和更低的资源成本。

## 如何使用IndexNow

（1）使用集成了IndexNow的内容管理解决方案

以下是一些集成了IndexNow的内容管理解决方案（Content Management Solutions）：

- WIX.com
- duda
- GoDaddy
- xenForo
- MileStone
- shopify

使用内容管理系统就无需其他设置，开箱即用。

（2）使用第三方插件

> Hexo也有对应IndexNow插件：[hexo-indexnow](https://github.com/zkz098/hexo-indexnow)，只是项目已经存档，作者已无兴趣继续维护。

（3）使用CDN（Content Delivery Networks，内容分发网络）：从官网看，Cloudflare是唯一支持IndexNow的CDN。

（4）使用IndexNow的API手动集成。

1. 生成API密钥，用于将域名的拥有者和提交的URL相匹配。[点击去生成密钥](https://www.bing.com/indexnow/getstarted#implementation)。
2. 将UTF-8密钥文件放置网站根目录（Hexo博客就是source目录下），或者，将一到多个密钥文件放置在同一主机的其他位置，只是提交URL时需要指定`keyLocation`参数，例如`https://<searchengine>/indexnow?url=http://www.example.com/product.html&key=05d98a162f03444089be4ab481a90a3c&keyLocation=http://www.example.com/myIndexNowKey63638.txt`。
3. 提交URL：通过HTTP Post发送一个或一组URL，根据第二步的设置决定是否设置密钥位置参数。

发送一组URL的示例：

```http
POST /IndexNow HTTP/1.1
Content-Type: application/json; charset=utf-8
Host: api.indexnow.org
{
  "host": "www.example.org",
  "key": "05d98a162f03444089be4ab481a90a3c",
  "keyLocation": "https://www.example.org/05d98a162f03444089be4ab481a90a3c.txt",
  "urlList": [
      "https://www.example.org/url1",
      "https://www.example.org/folder/url2",
      "https://www.example.org/url3"
      ]
}
```

响应及其原因如下：

|HTTP Code|Response|原因|
|:-:|:-:|:-:|
|200|OK|URL提交成功|
|400|Bad Request|非法格式|
|403|Forbidden|密钥无效的情况|
|422|Unprocessable Entity|url不属于主机或者密钥在协议中无匹配的模式|
|429|Too Many Requests|提交频率过快|

怎么发送HTTP请求？

- 使用curl命令
- 使用Python的requests库
- 使用JavaScript的fetch API
- 使用Axios库
- 使用Postman