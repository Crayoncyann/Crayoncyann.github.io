const categoryNum = (blogs) => {
    let r = []
    for (let i = 0; i < blogs.length; i++) {
        let cate = blogs[i].category
        r.push(cate)
    }
    r = _.flatten(r, true)
    r = _.uniq(r)
    return r
}

const templateTitle = (blogs) => {
    let blogNum = blogs.length
    let cateNum = categoryNum(blogs).length
    let t = `
        <article>
            <span class="cate-head">目前共有 <span class="cate-head-style">${blogNum}</span> 篇日志，<span class="cate-head-style">${cateNum}</span> 种分类</span>
            <ul class="cate-list">
            </ul>
        </article>
    `
    return t
}

const insertTitle = (blogs) => {
    let div = e('section')
    let t = templateTitle(blogs)
    // div.insertAdjacentHTML('afterbegin', t)
    appendHTML(div, t)
}

const templateCate = (cate) => {
    let t = `
        <li>
            <span class="cate-fold">${cate}</span>
            <ul class="cate-li-list">
            </ul>
        </li>
        <div class="cate-list-line"></div>
    `
    return t
}

const insertCates = function(blogs) {
    var t = ''
    let cates = categoryNum(blogs)
    for (var i = 0; i < cates.length; i++) {
        let c = cates[i]
        t += templateCate(c)
    }
    var div = e('.cate-list')
    appendHTML(div, t)
}

const templateBlog = (blog) => {
    let id = blog.id
    let title = blog.title
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    time = time.split('/')
    time = time[0] + '-' + time[1] + '-' + time[2].slice(0, 2)
    let t = `
        <li data-id="${id}">
            <span class="cate-time">${time}</span>
            <a href="/blog/${id}"class="cate-cont">${title}</a>
        </li>
    `
    return t
}

const catesFindDiv = (cate, html) => {
    let cates = es('.cate-fold')
    for (var i = 0; i < cates.length; i++) {
        let c = cates[i]
        if (c.innerHTML == cate) {
            let div = c.closest('li')
            div = div.querySelector('.cate-li-list')
            appendHTML(div, html)
        }
    }
}

const insertBlog = (blogs) => {
    let cates = categoryNum(blogs)
    for (var i = 0; i < cates.length; i++) {
        let cate = cates[i]
        for (var j = 0; j < blogs.length; j++) {
            let blog = blogs[j]
            let blog_cate = JSON.stringify(blog.category)
            if (blog_cate.indexOf(cate) != -1) {
                let t = templateBlog(blog)
                catesFindDiv(cate, t)
            }
        }
    }
}

const blogAll = function() {
    let request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            // console.log('响应', response)
            var blogs = JSON.parse(response)
            insertTitle(blogs)
            insertCates(blogs)
            insertBlog(blogs)
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
