// tools
const log = console.log.bind(console)

const e = (selector) => document.querySelector(selector)

const es = (selector) => document.querySelectorAll(selector)

const bindEvent = (element, eventName, callback) => element.addEventListener(eventName, callback)

const bindAll = (elements, eventName, callback) => {
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const appendHTML = (element, html) => element.insertAdjacentHTML('beforeend', html)

const ajax = function(request) {
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType != undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    if (request.method == 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}
