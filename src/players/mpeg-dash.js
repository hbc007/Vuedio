import { MediaPlayer, MediaPlayerClass } from 'dashjs'

export default class MpegDashPlayer {
    constructor(tech) {
        this.tech = tech
        this.dash = MediaPlayer().create()
        this.dash.initialize(tech)
    }

    destroy() {
        this.dash.reset()
    }

    get duration() {
        return this.dash.duration()
    }

    off(event, handler) {
        this.dash.off(event, handler)
        this.tech.removeEventListener(event, handler)
    }

    on(event, handler) {
        // @ts-ignore
        this.dash.on(event, handler)
        this.tech.addEventListener(event, handler)
    }

    get paused() {
        try {
            return this.dash.isPaused()
        } catch (e) {
            return true
        }
    }

    set paused(val) {
        try {
            if (val) {
                this.dash.pause()
            } else {
                this.dash.play()
            }
        } catch (e) {}
    }

    get src() {
        return this.dash.getSource()
    }

    set src(url) {
        this.dash.attachSource(url)
    }

    get timestamp() {
        try {
            return this.dash.time()
        } catch (e) {
            return 0
        }
    }

    set timestamp(val) {
        this.dash.seek(val)
    }

    get speed() {
        return this.dash.getPlaybackRate()
    }

    set speed(val) {
        this.dash.setPlaybackRate(val)
    }
}
