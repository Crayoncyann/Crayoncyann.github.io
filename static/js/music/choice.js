/*
    @ 播放列表
    1.列表显示
    2.列表选择
    3.动画
*/
class ChioceMethod {
    constructor() {
        this.array = e('.audio-list-div')
        this.playDiv = e('#controls-play')
        this.audio = e('audio')
    }
    tampelate(list) {
        var html = ''
        for (var i = 0; i < list.length; i++) {
            var l = list[i].split('.')[0]
            var h = `
            <li class="audio-list-li">${l}</li>
            `
            html += h
        }
        return html
    }
    insertList(list) {
        var ul = this.array.querySelector('ul')
        var t = this.tampelate(list)
        appendHTML(ul, t)
        var li = ul.querySelectorAll('li')
        var last = li[li.length - 1]
        last.style.border = 'none'
    }
    playState() {
        if (this.playDiv.dataset.index == 1) {
            this.audio.play()
        } else {
            this.audio.pause()
        }
    }
    chioce(list) {
        this.insertList(list)
        var li = es('.audio-list-li')
        // var info = new PlayMethod()
        bindAll(li, 'click', (event) => {
            // 清除所有样式
            for (var i = 0; i < li.length; i++) {
                li[i].classList.remove('li-active')
            }
            var self = event.target
            self.classList.add('li-active')
            var src = `${self.innerHTML}.mp3`
            this.audio.src = '/music/' + src
            for (var i = 0; i < list.length; i++) {
                var l = list[i]
                if (l == src) {
                    this.audio.dataset.index = i
                }
            }
            this.playState()
            // info.info()
        })
    }
}

var chioce = (list) => {
    var method = new ChioceMethod()
    method.chioce(list)
    var listButton = e('#audio-list')
    var listDiv = e('.audio-list-div')
    var index = Number(listButton.dataset.index)
    var array = ['list', 'listRed']
    bindEvent(listButton, 'click', () => {
        index = (index + 1) % array.length
        var src = array[index]
        listButton.style.background = 'url(/icon/music/' + src + '.png)'
        animation(listDiv)
    })
}
