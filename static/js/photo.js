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

const templateTime = (time) => {
    let t = `
        <div class="photo-time">
            <p class="photo-time-p">${time}</p>
        </div>
    `
    return t
}

const insertTime = (photos) => {
    let div = e('.photos-div')
    let r = []
    let html = ``
    for (var i = 0; i < photos.length; i++) {
        let p = photos[i].created_time
        r.push(p)
    }
    r = _.uniq(r)
    for (var i = 0; i < r.length; i++) {
        let time = r[i]
        html += templateTime(time)
    }
    appendHTML(div, html)
}

const templatePhoto = (path, id) => {
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
    let html = `
        <div class="photo">
            <img class="photo-img" src="${url}" data-id="${id}"/>
            <span class="photo-line"></span>
        </div>
    `
    return html
}

const timeFindDiv = (time, html) => {
    let div = es('.photo-time')
    for (var i = 0; i < div.length; i++) {
        var p = div[i].querySelector('p')
        var d = div[i]
        if (p.innerHTML == time) {
            appendHTML(d, html)
        }
    }
}

const insertPhoto = (photos) => {
    for (var i = 0; i < photos.length; i++) {
        let p = photos[i]
        let id = i + 1
        let html = templatePhoto(p.url, id)
        timeFindDiv(p.created_time, html)
    }
}

const imgHover = () => {
    let photos = es('.photo')
    bindAll(photos, 'mouseenter', (event) => {
        let self = event.target
        let line = self.querySelector('.photo-line')
        if (!line.classList.contains('photo-line-hover')) {
            line.classList.toggle('photo-line-hover')
        }
    })
    bindAll(photos, 'mouseleave', (event) => {
        let self = event.target
        let line = self.querySelector('.photo-line')
        if (line.classList.contains('photo-line-hover')) {
            line.classList.toggle('photo-line-hover')
        }
    })
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
            insertTime(photos)
            insertPhoto(photos)
            insertFoot()
            makeupSection()
            imgHover()
        }
    }
    ajax(request)
}

var __main = () => {
    photoAll()
    animationReload()
}

__main()
