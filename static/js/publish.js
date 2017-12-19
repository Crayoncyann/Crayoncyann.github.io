// 添加分类
const addCate = () => {
    let cate = e('.cate-blog')
    let add = cate.querySelector('img')
    let line = e('#creat-cate')
    bindEvent(add, 'click', () => {
        line.classList.toggle('dis-none')
        line.value = ''
    })
}

// markdown 显示
const markdownInput = () => {
    let input = e('#text-input-src')
    bindEvent(input, 'input', (event) => {
        let src = event.target.value
        let md = new Remarkable()
        let html = md.render(src)
        e('.text-input-show').innerHTML = html
    })
}

const markdownShow = () => {
    let div = e('.pub-cue')
    bindEvent(div, 'click', () => {
        e('.text-input-show').classList.toggle('dis-none')
    })
}

var bindEventStatic = () => {
    markdownInput()
    markdownShow()
    addCate()
}

var templateCate = function(cate) {
    var t = `
        <span class="pub-cate">
            <p class="pub-cate-p" data-index="0">${cate}</p>
        </span>
    `
    return t
}

var categorys = (blogs) => {
    var r = []
    for (var i = 0; i < blogs.length; i++) {
        var cate = blogs[i].category
        r.push(cate)
    }
    r = _.flatten(r, true)
    r = _.uniq(r)
    return r
}

var insertCates = function(blogs) {
    var cates = categorys(blogs)
    var html = ''
    for (var i = 0; i < cates.length; i++) {
        var cate = cates[i]
        var t = templateCate(cate)
        html += t
    }
    var div = e('.cate-div')
    appendHTML(div, html)
}

const catesStyle = () => {
    let catesDiv = es('.pub-cate')
    for (var i = 0; i < catesDiv.length; i++) {
        let img = catesDiv[i].querySelector('img').offsetWidth
        let p = catesDiv[i].querySelector('p').offsetWidth
        log(img, p)
    }
}

// 选中分类
const choiceCate = () => {
    let cates = es('.pub-cate-p')
    let cateArray = []
    bindAll(cates, 'click', (event) => {
        let self = event.target
        let index = Number(self.dataset.index)
        var value = self.innerText
        if (index % 2 == 0) {
            self.classList.add('cate-p-active')
            cateArray.push(value)
        } else {
            self.classList.remove('cate-p-active')
            _.pull(cateArray, value)
        }
        self.dataset.index = (index + 1) % 2
    })
    window.cateArray = cateArray
    return cateArray
}

var catesAll = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            // console.log('响应', response)
            var blogs = JSON.parse(response)
            window.blogs = blogs
            insertCates(blogs)
            choiceCate()
            makeupSection()
        }
    }
    ajax(request)
}

var blogNew = function(form) {
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/blog/add',
        contentType: 'application/json',
        data: data,
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            console.log('响应', response)
            var res = JSON.parse(response)
            var id = res.id
            setTimeout(() => {
                window.location = `/blog/${id}`
            }, 20)
        }
    }
    ajax(request)
}

var bindSumbit = function() {
    // 绑定发表新博客事件
    var submit = e('.pub-submit')
    bindEvent(submit, 'click', function(event) {
        // 得到用户填写的数据
        let input = e('.text-input-show')
        let text = input.innerHTML
        if (e('#creat-cate').classList.contains('dis-none') == false) {
            cateArray.push(e('#creat-cate').value)
        }
        var form = {
            title: e('#blog-title').value,
            category: cateArray,
            content: text,
        }
        blogNew(form)
    })
}

var __main = function() {
    bindEventStatic()
    // 载入博客列表
    catesAll()
    animationReload()
    // 绑定事件
    bindSumbit()
}

__main()
