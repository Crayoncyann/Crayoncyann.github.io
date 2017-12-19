const templateBlogsNum = (blogs) => {
    let num = blogs.length
    let t = `
        <a>
            ${num}
            <br>
            日志
        </a>
    `
    return t
}

const insertBlogsNum = function(blogs) {
    let html = templateBlogsNum(blogs)
    let div = e('#info-arct')
    appendHTML(div, html)
}

const aside = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            var blogs = JSON.parse(response)
            window.blogs = blogs
            insertBlogsNum(blogs)
        }
    }
    ajax(request)
}

const templateListDiv = () => {
    let t = `
        <div class="list-div">
            <ul>
            </ul>
        </div>
    `
    return t
}

const insertListDiv = () => {
    let html = templateListDiv()
    let aside = e('aside')
    aside.insertAdjacentHTML('afterend', html)
}

const templateBlogList = (blog) => {
    let id = blog.id
    let title = blog.title
    let category = blog.category
    let cate = ''
    for (var i = 0; i < category.length; i++) {
        let c = category[i]
        cate += '#' + c + ' '
    }
    let d = new Date(blog.created_time * 1000)
    let time = d.toLocaleString()
    time = time.split('/')
    time = time[0] + '-' + time[1] + '-' + time[2].slice(0, 2)
    let t = `
        <li class="list-li">
            <div class="list-head">
                <img src="/icon/blog/listTitle.png"/>
                <a href="/blog/${id}">${title}</a>
            </div>
            <div class="list-foot">
                <img src="/icon/blog/creatY.png" alt="" />
                <span>${time}</span>
                <div class="list-tag">
                    <img src="/icon/blog/tag.png" alt="" />
                    <a href="/blog/category">${cate}</a>
                </div>
            </div>
        </li>
    `
    return t
}

const insertBlogList = (blogs) => {
    var div = e('.list-div')
    div = div.querySelector('ul')
    var html = ''
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        var t = templateBlogList(b)
        html += t
    }
    appendHTML(div, html)
}

const blogList = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            var blogs = JSON.parse(response)
            insertListDiv()
            insertBlogList(blogs)
            let css = e('#body-css')
            trans(css)
        }
    }
    ajax(request)
}

const bindEventBlogs = () => {
    let button = e('#info-arct')
    let css = e('#body-css')
    bindEvent(button, 'click', () => {
        if (e('.list-div') == null) {
            blogList()
        } else {
            e('.list-div').remove()
            blogList()
        }
    })
}

const templateAboutme = () => {
    let t = `
        <div class="list-div">
            <div class="am-div">
                <p class="am-cont">
                    这是一个介绍
                    <br>
                    啦啦啦
                    <br>
                    <br>
                    这是一个介绍，测试行数显示
                    <br>
                    啦啦啦
                    <br>
                    <br>
                    这是一个介绍，测试高度显示
                    <br>
                    啦啦啦
                </p>
            </div>
        </div>
    `
    return t
}

const insertAboutme = () => {
    let html = templateAboutme()
    let aside = e('aside')
    aside.insertAdjacentHTML('afterend', html)
    let css = e('#body-css')
    trans(css)
}

const bindEventAboutme = () => {
    let button = e('#about-me')
    let css = e('#body-css')
    bindEvent(button, 'click', () => {
        if (e('.list-div') == null) {
            insertAboutme()
        } else {
            e('.list-div').remove()
            insertAboutme()
        }
    })
}

var __main = () => {
    aside()
    bindEventBlogs()
    bindEventAboutme()
}

__main()
