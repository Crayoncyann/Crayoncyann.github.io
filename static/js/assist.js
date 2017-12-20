// 补全空白
const makeupSection = () => {
    var main = e('main')
    let foot = e('.foot')
    let client_h = document.documentElement.clientHeight - 30
    var main_h = main.clientHeight
    if (main_h != client_h && main_h < client_h) {
        var margin = client_h - main_h + 50
        foot.style.margin = `${margin}px auto 0`
    }
}

// 边角
const templateFoot = () => {
    let t = `
        <div class="foot-right">
            <img src="/icon/blog/trademark.png"/>
            <span>2017</span>
            <img src="/icon/blog/author.png"/>
            <span>Blog Demo By 蜡笔酱</span>
            <img src="/icon/blog/watchers.png"/>
            <span class="foot-watchers">1</span>
        </div>
    `
    return t
}

const insertFoot = () => {
    let div = e('.foot')
    let t = templateFoot()
    appendHTML(div, t)
}

// 点击弹出动画
const transAdd = () => {
    e('body').classList.add('body-trans')
    e('body').classList.add('body-style')
    e('main').classList.add('main-style')
    e('.inner').classList.add('inner-style')
    e('header').classList.add('header-style')
    e('main').classList.add(`animation-bubbling`)
    e('.list-div').classList.add(`animation-bubbling`)
}

const transRemove = () => {
    e('body').classList.remove('body-style')
    e('body').classList.add(`body2`)
    e('.inner').classList.add(`inner2`)
    e('header').classList.remove('header-style')
    e('header').classList.add(`header2`)
    e('body').classList.remove('body-trans')
}

const trans = (css) => {
    transAdd()
    setTimeout(() => {
        transRemove()
    }, 200)
}

// 主题加载效果
const animationReload = () => {
    var head = e('.blog-header')
    var section = e('section')
    var foot = e('.foot')
    head.classList.add('op-none')
    section.classList.add('op-none')
    foot.classList.add('op-none')
    head.classList.add('reloadshow-animation')
    bindEvent(head, 'animationend', () => {
        head.classList.remove('op-none')
        head.classList.remove('reloadshow-animation')
        section.classList.add('reloadshow-animation')
        bindEvent(section, 'animationend', () => {
            section.classList.remove('op-none')
            section.classList.remove('reloadshow-animation')
            foot.classList.add('reloadshow-animation')
            bindEvent(foot, 'animationend', () => {
                foot.classList.remove('op-none')
                foot.classList.remove('reloadshow-animation')
            })
        })
    })
}
