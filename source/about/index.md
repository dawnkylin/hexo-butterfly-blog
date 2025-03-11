---
title: 关于我
date: 2025-03-03 12:08:36
comments: true
aside: false
---
<img src="https://dawnkylin.github.io/hexo-butterfly-blog/img/avatar.png" 
       alt="" 
       class="avatar"
       style="width:150px; border-radius:50%; margin:0 auto 1rem; display:block;">

{% note red 'fa-solid fa-heart' %}
我是一名热爱技术与写作的开发者。

虽然现在没有特别强的技术，但是只要坚持学习下去，总有一天能学有所成、学以致用，达到与众多技术大拿肩并肩探讨交流甚至是合作贡献开源的地步，这也是我的梦想！
{% endnote %}

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=837773988&bvid=BV1Cg4y187uN&cid=181357145&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="320" loading="lazy"></iframe>

{% chartjs 40,true %}
<!-- chart -->
{
    "type": "pie",
    "data": {
        "labels": [
            "编程",
            "音乐",
            "美食",
            "游戏",
            "运动",
            "社交"
        ],
        "datasets": [
            {
                "label": "喜爱指数",
                "data": [
                    30,
                    24,
                    19,
                    14,
                    9,
                    4
                ],
                "backgroundColor": {
                    "dark-mode": [
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(255, 206, 86, 0.5)",
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(153, 102, 255, 0.5)",
                        "rgba(255, 159, 64, 0.5)"
                    ],
                    "light-mode": [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ]
                },
                "borderColor": {
                    "dark-mode": [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    "light-mode": [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ]
                }
            }
        ]
    },
    "options": {
        "plugins": {
            "legend": {
                "labels": {
                    "color": {
                        "dark-mode": "rgba(255, 255, 255, 0.8)",
                        "light-mode": "rgba(0, 0, 0, 0.8)"
                    }
                }
            }
        }
    }
}
<!-- endchart -->
<!-- desc -->
编程，让我认识世界！
<!-- enddesc -->
{% endchartjs %}
