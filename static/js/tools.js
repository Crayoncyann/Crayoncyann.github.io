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
    /*
    request 是一个 object，有如下属性
        method，请求的方法，string
        url，请求的路径，string
        data，请求发送的数据，如果是 GET 方法则没有这个值，string
        callback，响应回调，function
    */
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
