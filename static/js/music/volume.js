/*
    @ 音量设置
    1.音量调节
    2.音量显示
    3.动画
*/
class VolumeMethod {
    constructor() {
        this.audio = e('audio')
        this.muted = e('#audio-volume')
        this.div = e('.audio-volume-div')
        this.pro = e('.volume-progress')
        this.bar = e('#volume-bar')
        this.con = e('#volume-control')
        this.func = function() {}
    }
    mute() {
        if (this.muted.dataset.index == 1) {
            if (this.audio.volume == 0) {
                this.muted.style.background = 'url(/icon/music/muteRed.png)'
            } else {
                this.muted.style.background = 'url(/icon/music/volRed.png)'
            }
        } else {
            if (this.audio.volume == 0) {
                this.muted.style.background = 'url(/icon/music/mute.png)'
            } else {
                this.muted.style.background = 'url(/icon/music/vol.png)'
            }
        }
    }
    calc(y) {
        var conY = y - 6
        this.bar.style.height = `${y}px`
        this.con.style.top = `${conY}px`
    }
    info() {
        var v = this.audio.volume
        var y = 100 - v * 100
        this.calc(y)
        this.mute()
    }
    control(event) {
        // display: none, 不采用client测量
        var y = event.offsetY
        var self = event.target
        if (self.classList.contains('audio-volume-div')) {
            y = y - 9
            if (y < 0) {
                y = 0
            } else if (y > 100) {
                y = 100
            }
        } else if (self.classList.contains('volume-progress') || self.id == 'volume-bar') {
            y = event.offsetY
        } else {
            return false
        }
        this.calc(y)
        var v = (100 - y) / 100
        this.audio.volume = v
        this.mute()
    }
    move() {
        bindEvent(document, 'mousemove', this.func = (event) => {
            this.control(event)
        })
    }
    remove() {
        document.removeEventListener('mousemove', this.func)
    }
}

var volume = () => {
    var vol = new VolumeMethod()
    vol.audio.volume = 0.3
    var index = Number(vol.muted.dataset.index)
    bindEvent(vol.muted, 'click', () => {
        index = (index + 1) % 2
        vol.muted.dataset.index = index
        animation(vol.div)
        vol.info()
    })
    var volEventState = false
    bindEvent(vol.con, 'mousedown', () => {
        vol.move()
        volEventState = true
    })
    bindEvent(document, 'mouseup', () => {
        if (volEventState == true) {
            vol.remove()
            volEventState = false
        } else {
            return false
        }
    })
}
