# 仿造一个 HEXO NEXT 主题博客

- 基于 Node.js Express JS 搭建的 Blog

1. 构造前端，参照[EZLippi-浮生志](https://www.ezlippi.com)、[Litten的博客](http://litten.me/) 布局静态 HTML，使用 **HTML5** 和 **CSS3** 新特性
2. 使用 **原生JS** 绑定基本事件、封装好 **AJAX**，使用 **Lodash** 便于快速开发
3. 构造后端，建立 **blog API** **comment API**，模拟存储格式为 **JSON**
4. 渲染页面，文章通过 **动态路由** 渲染，评论 id 与博客 id 连接
5. Debug
    1. 修改路由获取方式
    2. 修改渲染层级关系
    3. 调整 div 缩进问题
    4. 调整加载页面动画
    5. 修改 JS，使用 ES6

- 基本功能

1. 博客的发布、修改、删除
2. 评论用户添加，评论的发布、修改、删除
3. 基本动画效果

- update

1. 添加 canvas 动画
2. 添加博主功能
3. 添加了一些按钮动画

- update

1. 修改矢量图，参照[iconfont](http://www.iconfont.cn/)
2. 修改发布功能，使用[markdown](http://www.jianshu.com/p/q81RER)
3. 修改博主登录功能(user:A, pw:1)，删除博主的修改、删除功能，通过后台数据管理
4. 修改评论，删除以前的 JSON 存储格式，删除原有评论渲染，使用[来必力](https://livere.com/)管理
5. 添加了一些按钮动画

- update

1. 添加页面底部的音乐播放器，参照[网易云音乐](http://music.163.com/)，添加了一些音乐
2. 添加一些 alert
3. 优化了页面动画效果
