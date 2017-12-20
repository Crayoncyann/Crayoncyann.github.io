// 淡入淡出动画
var animation = (e) => {
    if (e.classList.contains('opacity-active')) {
        e.classList.remove('display-active')
        // 先移除display, 再异步处理动画
        setTimeout(() => {
            e.classList.remove('opacity-active')
        }, 0)
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
