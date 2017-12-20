class AudioState {
    constructor() {
        this.comp = e('.audio-component')
        this.state = e('.audio-state')
        this.lock = e('#audio-lock')
        this.index = 0
    }
    img() {
        this.index += 1
        if (this.index % 2 == 0) {
            this.lock.style.background = 'url(/icon/music/unlock.png)'
            this.state.style.bottom = '0px'
        } else {
            this.lock.style.background = 'url(/icon/music/lock.png)'
            this.state.style.bottom = '45px'
        }
    }
}

var state = () => {
    var state = new AudioState()
    bindEvent(state.state, 'click', () => {
        state.img()
        animation(state.comp)
    })
}
