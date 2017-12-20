/*
    @ 进度条控制
    1.控制播放
    2.跟随歌曲显示进度
*/
class Progress {
    constructor() {
        this.audio = e('audio')
        this.div = e('.play-progress-div')
        this.pro = e('.play-progress')
        this.bar = e('#play-bar')
        this.con = e('#play-control')
        this.func = function() {}
        this.timer = null
    }
    calc(x) {
        var conX = x - 6
        this.bar.style.width = `${x}px`
        this.con.style.left = `${conX}px`
    }
    time(x) {
        var d = parseInt(this.audio.duration)
        var t = x / this.pro.offsetWidth * d
        this.audio.currentTime = t
    }
    control(event) {
        // 得到进度条距屏幕的距离
        var proX = this.pro.offsetLeft
        var parent = this.pro.offsetParent
        while (parent != null) {
            proX += parent.offsetLeft
            parent = parent.offsetParent
        }
        // 减去外层 div 宽度
        proX -= this.div.offsetWidth
        // 得到当前坐标
        var eventX = event.clientX
        // 判断是否在 pro 的横坐标里
        if (eventX - proX <= 0) {
            eventX = 0
        } else if (eventX - proX >= this.pro.offsetWidth) {
            eventX = this.pro.offsetWidth
        } else {
            eventX = eventX - proX
        }
        this.calc(eventX)
    }
    move() {
        bindEvent(document, 'mousemove', this.func = (event) => {
            this.control(event)
        })
    }
    remove() {
        var x = this.bar.offsetWidth
        var time = parseInt(x / 450 * parseInt(this.audio.duration))
        this.audio.currentTime = time
        document.removeEventListener('mousemove', this.func)
    }
    info() {
        var currentTime = this.audio.currentTime
        var duration = this.audio.duration
        var x = currentTime / duration * this.pro.offsetWidth
        if (currentTime == duration) {
            x = this.pro.offsetWidth
        }
        var conX = x - 6
        this.bar.style.width = `${x}px`
        this.con.style.left = `${conX}px`
    }
    proTimer() {
        this.timer = setInterval(() => {
            this.info()
        }, 200)
    }
}

var progress = () => {
    var pro = new Progress()
    var proEventState = false
    /*
        这块写的不好，监听事件应该放在一起
        但需要全局变量接一下定时器 ID
        把组件功能写在一起，方便查看&更新
        所有监听事件：
        1.定时器启动
            1.音乐播放
            2.在 control 鼠标按下抬起后，音频是播放状态
        2.定时器清除
            1.音乐暂停
            2.点击上一首、下一首
            3.点击选歌
            4.在 control 鼠标按下
    */
    // 播放
    bindEvent(pro.audio, 'play', () => {
        pro.proTimer()
    })
    // 暂停
    bindEvent(pro.audio, 'pause', () => {
        clearInterval(pro.timer)
    })
    // 上一首、下一首
    var div = e('.audio-controls')
    var prv = e('#controls-prv')
    var nxt = e('#controls-nxt')
    bindEvent(div, 'click', (event) => {
        var self = event.target
        if (self == prv || self == nxt) {
            clearInterval(pro.timer)
        }
    })
    // 选歌
    var list = es('.audio-list-li')
    bindAll(list, 'click', () => {
        clearInterval(pro.timer)
    })
    // 控制器按下
    bindEvent(pro.con, 'mousedown', () => {
        clearInterval(pro.timer)
        pro.move()
        proEventState = true
    })
    // 控制器抬起
    bindEvent(document, 'mouseup', () => {
        if (proEventState == true) {
            pro.remove()
            proEventState = false
            if (!pro.audio.paused) {
                pro.proTimer()
            }
        } else {
            return false
        }
    })
}
