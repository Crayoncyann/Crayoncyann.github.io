// 渲染模板
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
        let html = templatePhoto(p.url, i)
        timeFindDiv(p.created_time, html)
    }
}

const templateSlideImg = (path, id) => {
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
        <img class="photo-slide-img" src="${url}" data-id="${id}"/>
    `
    return html
}

const insertSlideImg = (photos) => {
    let div = e('.photo-slide')
    let imgs = photos.length
    let t = `
        <div class="slide-imgs" data-imgs="${imgs}" data-active="-1">

        </div>
    `
    appendHTML(div, t)
    let html = ''
    for (var i = 0; i < photos.length; i++) {
        let p = photos[i]
        html += templateSlideImg(p.url, i)
    }
    appendHTML(e('.slide-imgs'), html)
    e('#slide-length').innerHTML = photos.length
}

var insertAll = (photos) => {
    insertDiv(photos)
    insertTime(photos)
    insertPhoto(photos)
    insertSlideImg(photos)
}

// 鼠标移动动画
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

// 相片播放器
const photoInfo = (id) => {
    let now = e('#slide-now')
    let index = parseInt(id) + 1
    now.innerHTML = index
}

// 复制了一个 Music淡入淡出 动画，避免 JS 加载顺序出现的 BUG
const photoShowAnimation = (e) => {
    if (e.classList.contains('opacity-active')) {
        e.classList.remove('display-active')
        // 先移除display, 再异步处理动画
        setTimeout(() => {
            e.classList.remove('opacity-active')
        }, 20)
    } else {
        e.classList.add('opacity-active')
        bindEvent(e, 'transitionend', () => {
            // 只有动画存在的情况下, display = none
            if (e.classList.contains('opacity-active')) {
                e.classList.add('display-active')
            }
        })
    }
}

const photoShowAciton = () => {
    let photos = es('.photo-img')
    let slidePlayer = e('.photo-slide')
    let imgs = es('.photo-slide-img')
    bindAll(photos, 'click', (event) => {
        let self = event.target
        let photoId = self.dataset.id
        // slidePlayer.classList.toggle('dis-none')
        photoShowAnimation(slidePlayer)
        for (var i = 0; i < imgs.length; i++) {
            let img = imgs[i]
            if (photoId == img.dataset.id) {
                photoInfo(img.dataset.id)
                img.classList.toggle('img-active')
                e('.slide-imgs').dataset.active = img.dataset.id
            }
        }
    })
}

const nextIndex = (offset) => {
    let imgsOfNum = parseInt(e('.slide-imgs').dataset.imgs)
    let now = parseInt(e('.slide-imgs').dataset.active)
    var index = (imgsOfNum + now + offset) % imgsOfNum
    let imgs = es('.photo-slide-img')
    for (var i = 0; i < imgs.length; i++) {
        let img = imgs[i]
        img.classList.remove('img-active')
    }
    e('.slide-imgs').dataset.active = index
    return index
}

const nextShowImg = (offset) => {
    let imgs = es('.photo-slide-img')
    let index = nextIndex(offset)
    for (var i = 0; i < imgs.length; i++) {
        let img = imgs[i]
        if (img.dataset.id == index) {
            photoInfo(img.dataset.id)
            img.classList.add('img-active')
        }
    }
}

const nextAction = () => {
    let bs = es('.slide-hide')
    bindAll(bs, 'click', (e) => {
        let offset = parseInt(e.target.dataset.offset)
        nextShowImg(offset)
    })
}

const loopAction = () => {
    let loop = e('#slide-loop')
    let timer = undefined
    bindEvent(loop, 'click', () => {
        let active = parseInt(loop.dataset.active)
        if (active == 0) {
            timer = setInterval(() => {
                nextShowImg(1)
            }, 1800)
            window.timer = timer
            loop.classList.add('slide-loop')
            loop.dataset.active = 1
        } else if (active == 1) {
            clearInterval(timer)
            loop.classList.remove('slide-loop')
            loop.dataset.active = 0
        }
    })
}

const exitAction = () => {
    let exit = e('#slide-exit')
    let slidePlayer = e('.photo-slide')
    let imgs = es('.photo-slide-img')
    bindEvent(exit, 'click', () => {
        clearInterval(window.timer)
        e('#slide-loop').classList.remove('slide-loop')
        e('#slide-loop').dataset.active = 0
        photoShowAnimation(slidePlayer)
        for (var i = 0; i < imgs.length; i++) {
            let img = imgs[i]
            img.classList.remove('img-active')
        }
    })
}

var slideAction = () => {
    photoShowAciton()
    nextAction()
    loopAction()
    exitAction()
}

var photoAll = function() {
    var request = {
        method: 'GET',
        url: '/api/photo/all',
        contentType: 'application/json',
        callback: function(response) {
            var photos = JSON.parse(response)
            insertAll(photos)
            imgHover()
            slideAction()
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
