// 选中分类
const choiceCate = () => {
    let cates = es('.pub-cate')
    let stronge = []
    bindAll(cates, 'click', (event) => {
        let self = event.target
        let cate = self.closest('.pub-cate')
        let index = Number(cate.dataset.index)
        let img = cate.querySelector('img')
        let p = cate.querySelector('p')
        var value = p.innerText
        if (index % 2 == 0) {
            img.src = './icon/blog/cateActive.png'
            stronge.push(value)
        } else {
            img.src = './icon/blog/cate.png'
            _.pull(stronge, value)
        }
        cate.dataset.index = (index + 1) % 2
    })
    return stronge
}

// 添加分类
const addCate = () => {
    let cate = e('.cate-blog')
    let add = cate.querySelector('img')
    let line = cate.querySelector('input')
    bindEvent(add, 'click', () => {
        line.classList.toggle('dis-none')
    })
}

// markdown 显示
const pubInput = () => {
    let input = e('#text-input-src')
    bindEvent(input, 'input', (event) => {
        let src = event.target.value
        let md = new Remarkable()
        let html = md.render(src)
        e('.text-input-show').innerHTML = html
    })
}

const pubShow = () => {
    let div = e('.pub-cue')
    bindEvent(div, 'click', () => {
        e('.text-input-show').classList.toggle('dis-none')
    })
}

// 提交
const submit = () => {
    let submit = e('.pub-submit')
    bindEvent(submit, 'click', () => {
        let input = e('.text-input-show')
        let text = input.innerHTML
        // JSON 数据
        log(JSON.stringify(text))
    })
}

const pubApp = () => {
    choiceCate()
    addCate()
    pubInput()
    pubShow()
    submit()
}

pubApp()
