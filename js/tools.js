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
const appenHTML = (element, html) => element.insertAdjacentHTML('beforeend', html)
// 禁止选中
