const templateTitle = (photos) => {
    let num = photos.length
    let t = `
        <article>
            <span class="photo-head">目前共有 <span class="photo-head-style">${num}</span> 张相片</span>
            <div class="photos-div">
            </div>
        </article>
    `
    return t
}

const insertDiv = (photos) => {
    let div = e('section')
    let t = templateTitle(photos)
    appendHTML(div, t)
}

const templatePhoto = (path) => {
    let url = ''
    for (var i = 0; i < path.length; i++) {
        var p = path[i]
        if (p == '\\') {
            url += '/'
        } else {
            url += p
        }
    }
    url = url.slice(6)
    log(url)
    let html = `
        <div class="photo">
            <img class="photo-img" src="${url}"/>
            <span class="photo-line"></span>
        </div>
    `
    return html
}

const insertPhoto = (photos) => {
    let div = e('.photos-div')
    let t = ``
    for (var i = 0; i < photos.length; i++) {
        var p = photos[i]
        t += templatePhoto(p)
    }
    appendHTML(div, t)
}

const photoAll = function() {
    var request = {
        method: 'GET',
        url: '/api/photo/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            // console.log('响应', response)
            var photos = JSON.parse(response)
            insertDiv(photos)
            insertPhoto(photos)
            insertFoot()
            makeupSection()
        }
    }
    ajax(request)
}

var __main = () => {
    photoAll()
    animationReload()
}

__main()
