const bindEventPerson = () => {
    let button = e('#person')
    let div = e('.login-div')
    bindEvent(button, 'click', () => {
        div.classList.toggle('dis-none')
    })
}

const loginInput = () => {
    let name = e('#login-name')
    let pw = e('#login-pw')
    let submit = e('#login-submit')
    let div = e('.login-div')
    let publish = e('#publish')
    var nameInput
    var pwInput
    bindEvent(name, 'input', () => {
        nameInput = name.value
    })
    bindEvent(pw, 'input', () => {
        pwInput = pw.value
    })
    bindEvent(submit, 'click', () => {
        log('click', nameInput, pwInput)
        if (nameInput == 'A' && pwInput == '1') {
            div.classList.toggle('dis-none')
            publish.classList.toggle('dis-none')
            e('#person').querySelector('img').src = '/icon/blog/personRed.png'
        } else {
            alert('账户或密码输入错误')
        }
    })
}

var __main = () => {
    bindEventPerson()
    loginInput()
}

__main()
