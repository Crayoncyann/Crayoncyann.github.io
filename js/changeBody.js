let insertHTML = () => {
    let html = `
        <div class="list-div">
            <ul>
                <li class="list-li">
                    <div class="list-head">
                        <img src="./icon/listTitle.png"/>
                        <a href="#">这是一个 Demo</a>
                    </div>
                    <div class="list-foot">
                        <img src="./icon/creatWhite.png" alt="" />
                        <span>2017-12-2</span>
                        <div class="list-tag">
                            <img src="./icon/tag.png" alt="" />
                            <span>测试</span>
                        </div>
                    </div>
                </li>
                <li class="list-li">
                    <div class="list-head">
                        <img src="./icon/listTitle.png"/>
                        <a href="#">这是一个 Demo</a>
                    </div>
                    <div class="list-foot">
                        <img src="./icon/creatWhite.png" alt="" />
                        <span>2017-12-2</span>
                        <div class="list-tag">
                            <img src="./icon/tag.png" alt="" />
                            <span>测试</span>
                        </div>
                    </div>
                </li>
                <li class="list-li">
                    <div class="list-head">
                        <img src="./icon/listTitle.png"/>
                        <a href="#">这是一个 Demo</a>
                    </div>
                    <div class="list-foot">
                        <img src="./icon/creatWhite.png" alt="" />
                        <span>2017-12-2</span>
                        <div class="list-tag">
                            <img src="./icon/tag.png" alt="" />
                            <span>测试</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    `
    appenHTML(e('body'), html)
}

const changeBody = () => {
    let b = e('#info-arct')
    let css = e('#body-css')


    let body = e('body')
    let main = e('main')
    // let inner = e('.inner')

    bindEvent(b, 'click', () => {
        log('click')
        insertHTML()
        css.setAttribute('href', './css/body2.css')
        main.classList.add('opHigh')

        // body.style.background = 'linear-gradient(to left bottom, #A1CFE4, #DFC388)'
        // main.style.margin-right = '620px'
        // inner.style.background = 'linear-gradient(to left bottom, #A1CFE4, #DFC388)'
        // inner.style.border = '2px solid white'
        let list = e('.list-div')

        list.classList.add('shake-animation')
        // let main = e('main')
        main.classList.add('shake-animation')
        setTimeout = (() => {
            log('clear')
            list.classList.remove('shake-animation')
            main.classList.remove('shake-animation')
        }, 1100)
    })
}

changeBody()
