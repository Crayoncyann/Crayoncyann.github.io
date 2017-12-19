// 渲染文章、评论
var templateArticle = (blog) => {
    var id = blog.id
    var title = blog.title
    let category = blog.category
    let cate = ''
    for (var i = 0; i < category.length; i++) {
        let c = category[i]
        cate += '#' + c + ' '
    }
    var content = blog.content
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    timeArray = time.split('/')
    timeArray[2] = timeArray[2].replace('上午', 'am ')
    timeArray[2] = timeArray[2].replace('下午', 'pm ')
    timeArray[2] = timeArray[2].slice(0, -3)
    timeArray[2] = timeArray[2].slice(0, 2) + timeArray[2].slice(5) + timeArray[2].slice(2, 5)
    time = timeArray[0] + '-' + timeArray[1] + '-' + timeArray[2]
    var t = `
        <article>
            <header class="art-head">
                <div class="center">
                    <div class="art-center">
                        <a class="art-title">${title}</a>
                    </div>
                    <img src="/icon/blog/creat.png"/>
                    <span class="text-low">发布于</span>
                    <span class="text-low">${time}</span>
                    <span class="text-low">&nbsp;|&nbsp;</span>
                    <img src="/icon/blog/folder.png"/>
                    <span class="text-low">分类于</span>
                    <a class="art-cate" href="/blog/category">${cate}</a>
                </div>
            </header>
            <div class="post-body">
                <p>${content}</p>
            </div>
            <div class="art-line"></div>
            <footer class="art-foot">
                <div class="art-nav">
                    <div class="art-nav-center"></div>
                </div>
                <div class="new-comment">
                    <input class="comment-blog-id" type=hidden value="${id}">
                    <input class="comment-author" value="">
                    <input class="comment-content" value="">
                    <button class="comment-add">添加评论</button>
                </div>
                <div class="art-comm">
                    <div class="comm-head">
                        <span class="comm-head-cont">评论</span>
                        <span class="comm-head-line"></span>
                    </div>
                    <div class="comm-foot">
                        <!-- 来必力City版安装代码 -->
                        <div id="lv-container" data-id="city" data-uid="MTAyMC8zMjUxNS85MDc2">
                            <script type="text/javascript">
                            (function(d, s) {
                                var j, e = d.getElementsByTagName(s)[0];
                                if (typeof LivereTower === 'function') { return; }
                                j = d.createElement(s);
                                j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
                                j.async = true;
                                e.parentNode.insertBefore(j, e);
                            })(document, 'script');
                            </script>
                            <noscript> 为正常使用来必力评论功能请激活JavaScript</noscript>
                        </div>
                        <!-- City版安装代码已完成 -->
                    </div>
                </div>
            </footer>
        </article>
    `
    return t
}

var insertArticle = (blog) => {
    var section = e('section')
    var t = templateArticle(blog)
    appendHTML(section, t)
}

var templateComment = () => {
    var t = `
        <!-- 来必力City版安装代码 -->
        <div id="lv-container" data-id="city" data-uid="MTAyMC8zMjUxNS85MDc2">
            <script type="text/javascript">
            (function(d, s) {
                var j, e = d.getElementsByTagName(s)[0];
                if (typeof LivereTower === 'function') { return; }
                j = d.createElement(s);
                j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
                j.async = true;
                e.parentNode.insertBefore(j, e);
            })(document, 'script');
            </script>
            <noscript> 为正常使用来必力评论功能请激活JavaScript</noscript>
        </div>
        <!-- City版安装代码已完成 -->
    `
    return t
}

var insertComment = () => {
    var div = e('.comm-foot')
    var t = templateComment()
    appendHTML(div, t)
}

var blogArticle = (id) => {
    var request = {
        method: 'GET',
        url: '/api/blog/' + id,
        contentType: 'application/json',
        callback: function(response) {
            var b = JSON.parse(response)
            // 渲染页面
            insertArticle(b)
            // insertComment()
            insertFoot()
        }
    }
    ajax(request)
}

var templatePrvNxt = (id) => {
    var prv = Number(id) - 1
    var nxt = Number(id) + 1
    var t = `
        <a class="art-prv" href="${prv}">
            <img src="/icon/blog/prv.png" alt="">
            上一篇
        </a>
        <a class="art-nxt" href="${nxt}">
            下一篇
            <img src="/icon/blog/nxt.png" alt="">
        </a>
    `
    return t
}

var insertPrvNxt = (blogs) => {
    var nav = e('.art-nav-center')
    var id = e('body').dataset.id
    var t = templatePrvNxt(id)
    appendHTML(nav, t)
    if (id == 1) {
        e('.art-prv').remove()
        if (id == blogs.length) {
            e('.art-nxt').remove()
        }
    } else if (id == blogs.length) {
        e('.art-nxt').remove()
    }
}

var blogPrvNxt = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            var blogs = JSON.parse(response)
            insertPrvNxt(blogs)
            makeupSection()
        }
    }
    ajax(request)
}

// var commentNew = function(form, callback) {
//     var data = JSON.stringify(form)
//     var request = {
//         method: 'POST',
//         url: '/api/comment/add',
//         contentType: 'application/json',
//         data: data,
//         callback: function(response) {
//             log('响应', response)
//             var c = JSON.parse(response)
//             callback(c)
//         }
//     }
//     ajax(request)
// }

// var actionCommentAdd = (event) => {
//     var self = event.target
//     var form = self.closest('.new-comment')
//     var blogId = form.querySelector('.comment-blog-id').value
//     var author = form.querySelector('.comment-author').value
//     var content = form.querySelector('.comment-content').value
//     var d = {
//         blog_id: blogId,
//         author: author,
//         content: content,
//     }
//     commentNew(d, (comment) => {
//         log('新评论', comment)
//         var t = templateComment(comment)
//         var div = e('.comm-list')
//         div.insertAdjacentHTML('afterbegin', t)
//     })
// }

// document.body.addEventListener('click', function(event) {
//     log('click comment new')
//     var self = event.target
//     if (self.classList.contains('comment-add')) {
//         actionCommentAdd(event)
//     }
// })

var __main = () => {
    // 获取blog/id
    var id = Number(document.body.dataset.id)
    blogArticle(id)
    // 后台运算 blog number
    setTimeout(() => {
        blogPrvNxt()
    }, 0)
    animationReload()
}

__main()
