class PlayMethod {
    constructor() {
        this.audio = e('audio')
        this.music = e('#info-music')
        this.singer = e('#info-singer')
        this.ct = e('#progress-ct')
        this.dt = e('#progress-dt')
        this.playDiv = e('#controls-play')
        this.playList = ['play', 'pause']
        this.prvDiv = e('#controls-prv')
        this.nxtDiv = e('#controls-nxt')
        this.timer = null
        this.array = e('.audio-list-div')
        this.loop = e('#audio-loop')
        this.imgDiv = e('.audio-img')
    }
    formatTime(time) {
        var result = ''
        if (time > -1) {
            var min = Math.floor(time / 60) % 60
            var sec = time % 60
            if (min < 10) {
                result += '0'
            }
            result += min + ':'
            if (sec < 10) {
                result += '0'
            }
            result += sec
        }
        return result
    }
    info() {
        // Music&Singer
        var src = this.audio.src.split('/').slice(-1)
        src = decodeURI(src[0].split('.')[0])
        var m = src.split('-')[0]
        var s = src.split('-')[1]
        this.music.innerHTML = s
        this.singer.innerHTML = m
        // 封面图
        var img = this.imgDiv.querySelector('img')
        img.src = `/img/music/${s.slice(1)}.jpg`
        // 列表显示
        var li = es('.audio-list-li')
        for (var i = 0; i < li.length; i++) {
            var l = li[i]
            var value = l.innerHTML
            if (value == src) {
                l.classList.add('li-active')
            } else {
                l.classList.remove('li-active')
            }
        }
    }
    timerMethod() {
        // 当前时间
        var currentTime = parseInt(this.audio.currentTime)
        var duration = parseInt(this.audio.duration)
        this.ct.innerHTML = this.formatTime(currentTime)
        this.dt.innerHTML = this.formatTime(duration)
        this.info()
    }
    play() {
        this.playDiv.style.background = 'url(/icon/music/pause.png)'
        this.audio.play()
        this.timer = setInterval(() => {
            this.timerMethod()
        }, 1000)
    }
    pause() {
        this.playDiv.style.background = 'url(/icon/music/play.png)'
        this.audio.pause()
        clearInterval(this.timer)
    }
    playAndPause() {
        var index = Number(this.playDiv.dataset.index)
        bindEvent(this.playDiv, 'click', () => {
            if (index == 0) {
                this.play()
            } else if (index == 1) {
                this.pause()
            }
            index = (index + 1) % this.playList.length
            this.playDiv.dataset.index = index
        })
    }
    nxtMethod() {
        this.info()
        var playIndex = Number(this.playDiv.dataset.index)
        if (playIndex == 1) {
            this.audio.play()
        } else {
            this.ct.innerHTML = '--:--'
            this.dt.innerHTML = '--:--'
        }
    }
    changeMethod(math, list) {
        var index = Number(this.audio.dataset.index)
        index = (index + math) % list.length
        this.audio.dataset.index = index
        this.audio.src = '/music/' + list[index]
        this.nxtMethod()
    }
    random(list) {
        var r = Math.random() * 10
        var index = r % list.length
        index = Math.floor(index)
        this.audio.dataset.index = index
        this.audio.src = '/music/' + list[index]
        this.nxtMethod()
    }
    prv(list) {
        bindEvent(this.prvDiv, 'click', () => {
            this.prvDiv.style.background = 'url(/icon/music/prvRed.png)'
            if (this.loop.dataset.index == 2) {
                this.random(list)
            } else {
                this.changeMethod(list.length - 1, list)
            }
            setTimeout(() => {
                this.prvDiv.style.background = 'url(/icon/music/prv.png)'
            }, 500)
        })
    }
    nxt(list) {
        bindEvent(this.nxtDiv, 'click', () => {
            this.nxtDiv.style.background = 'url(/icon/music/nxtRed.png)'
            if (this.loop.dataset.index == 2) {
                this.random(list)
            } else {
                this.changeMethod(1, list)
            }
            setTimeout(() => {
                this.nxtDiv.style.background = 'url(/icon/music/nxt.png)'
            }, 500)
        })
    }
}
var controls = (list) => {
    var playMethod = new PlayMethod()
    playMethod.info()
    playMethod.playAndPause()
    playMethod.prv(list)
    playMethod.nxt(list)
}
