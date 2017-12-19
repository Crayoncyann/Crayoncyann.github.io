// 渲染文章、评论
const templateArticle = (blog) => {
    let id = blog.id
    let title = blog.title
    let category = blog.category
    let cate = ''
    for (var i = 0; i < category.length; i++) {
        let c = category[i]
        cate += '#' + c + ' '
    }
    let content = blog.content
    let d = new Date(blog.created_time * 1000)
    let time = d.toLocaleString()
    timeArray = time.split('/')
    timeArray[2] = timeArray[2].replace('上午', 'am ')
    timeArray[2] = timeArray[2].replace('下午', 'pm ')
    timeArray[2] = timeArray[2].slice(0, -3)
    timeArray[2] = timeArray[2].slice(0, 2) + timeArray[2].slice(5) + timeArray[2].slice(2, 5)
    time = timeArray[0] + '-' + timeArray[1] + '-' + timeArray[2]
    let t = `
        <article class="article-bottom">
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
                <div class="art-comm">
                    <div class="comm-head">
                        <span class="comm-head-cont">评论</span>
                        <span class="comm-head-line"></span>
                    </div>
                </div>
            </footer>
        </article>
    `
    return t
}

const insertArticle = (blog) => {
    var section = e('section')
    let t = templateArticle(blog)
    section.insertAdjacentHTML('afterbegin', t)
}

const blogArticle = (id) => {
    var request = {
        method: 'GET',
        url: '/api/blog/' + id,
        contentType: 'application/json',
        callback: function(response) {
            var b = JSON.parse(response)
            // 渲染页面
            insertArticle(b)
            insertFoot()
        }
    }
    ajax(request)
}

const templatePrvNxt = (id) => {
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

const insertPrvNxt = (blogs) => {
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

const blogPrvNxt = function() {
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
