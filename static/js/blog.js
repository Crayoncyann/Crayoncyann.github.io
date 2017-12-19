var templateBlog = function(blog) {
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
                <a class="art-title">
                    ${title}
                </a>
                <br>
                <img src="/icon/blog/creat.png"/>
                <span class="text-low">发布于</span>
                <span class="text-low">${time}</span>
                <span class="text-low">&nbsp;|&nbsp;</span>
                <img src="/icon/blog/folder.png"/>
                <span class="text-low">分类于</span>
                <a class="art-cate" href="/blog/category">${cate}</a>
            </header>
            <div class="post-body">
                ${content}
            </div>
            <footer class="art-foot">
                <img src="/icon/blog/read.png"/>
                <a class="art-read"  href="/blog/${id}" data-id="${id}">阅读全文</a>
            </footer>
            <div class="art-line"></div>
        </article>
    `
    return t
}

var insertBlogAll = function(blogs) {
    var html = ''
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        var t = templateBlog(b)
        html += t
    }
    var div = e('section')
    appendHTML(div, html)
}

var blogAll = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            console.log('响应', response)
            var blogs = JSON.parse(response)
            window.blogs = blogs
            insertBlogAll(blogs)
            insertFoot()
            makeupSection()
        }
    }
    ajax(request)
}

var __main = function() {
    // 载入博客列表
    blogAll()
    animationReload()
}

__main()
