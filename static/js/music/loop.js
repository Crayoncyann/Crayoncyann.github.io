/*
    @ 循环方式
    1.列表循环
    2.单曲
    3.随机
*/
class LoopMethod {
    constructor() {
        this.audio = e('audio')
        this.loopDiv = e('#audio-loop')
        this.playDiv = e('#controls-play')
        this.end = function(){}
    }
    played() {
        var timer = setTimeout(() => {
            if (this.audio.readyState == 4) {
                this.playDiv.style.background = 'url(/icon/music/pause.png)'
                this.audio.play()
            } else {
                this.playDiv.style.background = 'url(/icon/music/play.png)'
                this.audio.pause()
            }
        }, 500)
    }
    loop(list) {
        this.loopDiv.style.background = 'url(/icon/music/loop.png)'
        var index = Number(this.audio.dataset.index)
        bindEvent(this.audio, 'ended', this.end = () => {
            index = (index + 1) % list.length
            this.audio.dataset.index = index
            this.audio.src = '/music/' + list[index]
            this.played()
        })
    }
    single() {
        this.loopDiv.style.background = 'url(/icon/music/single.png)'
        bindEvent(this.audio, 'ended', this.end = () => {
            this.played()
        })
    }
    random(list) {
        this.loopDiv.style.background = 'url(/icon/music/random.png)'
        bindEvent(this.audio, 'ended', this.end = () => {
            var r = Math.random() * 10
            var index = r % list.length
            index = Math.floor(index)
            this.audio.dataset.index = index
            this.audio.src = '/music/' + list[index]
            this.played()
        })
    }
}

var loop = (list) => {
    var method = new LoopMethod()
    var def = method.loop(list)
    var index = Number(method.loopDiv.dataset.index)
    var array = ['loop', 'single', 'random']
    bindEvent(method.loopDiv, 'click', () => {
        method.audio.removeEventListener('ended', method.end)
        index = (index + 1) % array.length
        method.loopDiv.dataset.index = index
        var next = array[index]
        def = method[next](list)
    })
}
