const bindEventPerson = () => {
    let button = e('#person')
    let div = e('.login-div')
    log(button, div.classList)
    bindEvent(button, 'click', () => {
        div.classList.toggle('dis-none')
    })
}

var __main = () => {
    bindEventPerson()
}

__main()
