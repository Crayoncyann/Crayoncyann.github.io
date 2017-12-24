# 仿造一个 HEXO NEXT 主题博客

- 基于 Node.js Express JS 搭建的 Blog


示例图如下 （12.20 更新）

![](Crayoncyann.github.io/示例图/博客示例图.gif)

1. 遵从 **MVC** 开发模式
2. 构造前端，参考[EZLippi-浮生志](https://www.ezlippi.com)、[Litten的博客](http://litten.me/) 布局 HTML，使用 **HTML5** 和 **CSS3** 新特性
3. 使用 **原生JS** 绑定基本事件、封装好 **AJAX**，使用 **Lodash** 便于快速开发
4. 构造后端，建立 **blog API** **comment API**，模拟存储格式为 **JSON**
5. 通过 **路由** 渲染页面
6. Debug
    1. 修改路由获取方式
    2. 修改渲染层级关系
    3. 调整 **div** 间距问题
    4. 调整页面加载时动画
    5. 修改 **JS**，使用 **ES6** 语法

- 基本功能

1. 博客的发布、修改、删除
2. 评论的发布、修改、删除
3. 基本动画效果

- update

1. 添加 **canvas** 动画，参考[canvas 鸟巢]
2. 添加博主功能
3. 添加了一些按钮动画

- update

1. 修改按钮，使用矢量图，参照[iconfont](http://www.iconfont.cn/)
2. 修改发布功能，使用[markdown](http://www.jianshu.com/p/q81RER)
3. 修改博主登录功能(默认user:A, pw:1)，删除博主的修改、删除功能，通过后台数据管理
4. 修改评论，删除以前的 JSON 存储格式，删除原有评论渲染，使用[来必力](https://livere.com/)管理
5. 添加了一些按钮动画

- update

![](Crayoncyann.github.io/示例图/网页音乐播放器插件.gif)

1. 添加页面底部的音乐播放器，参照[网易云音乐](http://music.163.com/)
    1. 音乐的播放控制（开始、暂停、切歌）
    2. 音乐信息展示（播放时间、总时长、封面图、歌手名称、歌曲名称）
    3. 音乐进度条显示及控制
    4. 播放循环控制（单曲、列表循环、随机）
    5. 音量显示及控制
    6. 列表显示及控制
2. 添加一些 **alert** 提示
3. 添加一些 **CSS title** 提示
4. 优化了页面动画效果

- update

![](Crayoncyann.github.io/示例图/顶部回滚.gif)

1. 引入 **jQuery**，添加顶部回滚功能，参考[jQuery 效果 - animate() 方法](http://www.w3school.com.cn/jquery/effect_animate.asp)
2. 修改播放器弹出按钮动画

- update

![](Crayoncyann.github.io/示例图/相册插件.gif)

1. 添加了相册功能
    1. 鼠标移动提示
    2. 相册展示
    3. 切换、轮播功能

截止到 12.24，Blog 基本实施完成，开发时长约 3 周，其他功能待添加...
