export default class Html5Player {
    constructor(tech) {
        this.tech = tech
    }

    get timestamp() {
        return this.tech.currentTime
    }

    set timestamp(val) {
        this.tech.currentTime = val
    }

    get duration() {
        return this.tech.duration
    }

    get src() {
        return this.tech.currentSrc
    }

    set src(val) {
        this.tech.src = val
        this.tech.load()
    }

    off(event, handler) {
        this.tech.removeEventListener(event, handler)
    }

    on(event, handler) {
        this.tech.addEventListener(event, handler)
    }

    get paused() {
        return this.tech.paused
    }

    set paused(val) {
        if (val) {
            this.tech.pause()
        } else {
            this.tech.play()
        }
    }

    destroy() {
        this.tech.src = ''
    }

    get speed() {
        return this.tech.playbackRate
    }

    set speed(val) {
        this.tech.playbackRate = val
    }
}
