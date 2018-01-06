# 仿造一个 HEXO NEXT 主题博客


- 基于 Node.js Express JS 搭建的 Blog

示例图如下 （12.20 更新）

![](https://github.com/Crayoncyann/Crayoncyann.github.io/blob/master/screenshots/blog.gif)


## 基本功能

1. 博客的发布、修改、删除
2. 评论的发布、修改、删除
3. 基本动画效果


## 构造过程

1. 遵从 **MVC** 开发模式
2. 参考[EZLippi-浮生志](https://www.ezlippi.com)、[Litten的博客](http://litten.me/), 使用 **HTML5** 和 **CSS3** 布局静态页面
3. 基于 **Node.js** 和 **Express** 搭建后端
- 配置静态路径
- 配置 DB(JSON)
- 配置动态路由
- 配置 API
- 配置地址(选择本地8000端口)
4. 使用 **JavaScript** 渲染页面
- 原生 JavaScript 封装 AJAX
- 获取数据并渲染
- 绑定事件委托

- 使用的一些工具

  Lodash [lodash](http://lodashjs.com/docs/)

- Debug
1. 修改路由获取方式
2. 修改渲染层级关系
3. 调整 div 间距问题
4. 调整页面加载时动画
5. 修改 **JavaScript**, 使用 **ES6** 语法


## 使用方式

1. 安装 express 和 body-parser, 在项目路径运行
   > ```yarn add express```
   > ```yarn add body-parser```

   也可直接运行 yarn, 按照 package 自行安装
   > ```yarn install```
2. 运行 app 文件
   > ```node app.js```

   提示运行成功即可
3. 在浏览器中访问提示中的地址 localhost:8000


## update

1. 添加 **canvas** 动画, 参考[canvas 鸟巢]
2. 添加博主功能
3. 添加了一些按钮动画


## update

1. 修改按钮, 使用矢量图, 参照[iconfont](http://www.iconfont.cn/)
2. 修改发布功能, 使用[markdown](http://www.jianshu.com/p/q81RER)
3. 修改博主登录功能(默认user:A, pw:1), 删除博主的修改、删除功能, 通过后台数据管理
4. 修改评论, 删除以前的 JSON 存储格式, 删除原有评论渲染, 使用[来必力](https://livere.com/)管理
5. 添加了一些按钮动画


## update

![](https://github.com/Crayoncyann/Crayoncyann.github.io/blob/master/screenshots/music.gif)

1. 添加页面底部的音乐播放器, 参照[网易云音乐](http://music.163.com/)
- 音乐的播放控制（开始、暂停、切歌）
- 音乐信息展示（播放时间、总时长、封面图、歌手名称、歌曲名称）
- 音乐进度条显示及控制
- 播放循环控制（单曲、列表循环、随机）
- 音量显示及控制
- 列表显示及控制
2. 添加一些 **alert** 提示
3. 添加一些 **CSS title** 提示
4. 优化了页面动画效果


## update

![](https://github.com/Crayoncyann/Crayoncyann.github.io/blob/master/screenshots/top.gif)

1. 引入 **jQuery**, 添加顶部回滚功能, 参考[jQuery 效果 - animate() 方法](http://www.w3school.com.cn/jquery/effect_animate.asp)
2. 修改播放器弹出按钮动画


## update

![](https://github.com/Crayoncyann/Crayoncyann.github.io/blob/master/screenshots/photo.gif)

1. 添加了相册功能
- 鼠标移动提示
- 相册展示
- 切换、轮播功能


截止到 12.24, Blog 基本实施完成, 开发时长约 3 周, 其他功能待添加 ...
