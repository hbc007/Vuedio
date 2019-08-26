import Hls from 'hls.js'

export default class HlsPlayer {
    constructor(tech) {
        this.tech = tech
        this.hls = new Hls()
        this.hls.attachMedia(tech)
    }

    get duration() {
        return this.tech.duration
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

    get speed() {
        return this.tech.playbackRate
    }

    set speed(val) {
        this.tech.playbackRate = val
    }

    get src() {
        return this.tech.src
    }

    set src(val) {
        this.hls.loadSource(val)
    }

    get timestamp() {
        return this.tech.currentTime
    }

    set timestamp(val) {
        this.tech.currentTime = val
    }

    bind(instance) {
        this.vuedio = instance
        this.vuedio.progressiveLevels = true
        this.hls.on(Hls.Events.MANIFEST_PARSED, (ev, data) => {
            this.vuedio.progressiveLevels = (
                // @ts-ignore
                data.levels
            ).map((it, i) => (
                {
                    name: it.name || it.height + 'p',
                    id: i,
                    selected: i === data.firstLevel,
                    callback: () => {
                        this.hls.currentLevel = i
                    }
                }
            ))
            this.vuedio.subtitlesAvailable = this.hls.subtitleTracks.length > 0
        })
        this.hls.on(Hls.Events.LEVEL_SWITCHED, (ev, { level }) => {
            if (!Array.isArray(this.vuedio.progressiveLevels)) {
                return
            }
            for (const it of this.vuedio.progressiveLevels) {
                it.selected = it.id === level
            }
        })
        this.hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, (ev, { subtitleTracks }) => {
            this.vuedio.subtitlesAvailable = subtitleTracks.length > 0
            this.vuedio.subtitlesEnabled = this.hls.subtitleDisplay
        })
        this.vuedio.externalSubtitles = true
        this.vuedio.externalSubtitlesListener = this.subtitlesListener.bind(this)
    }

    off(event, handler) {
        this.hls.off(event, handler)
        this.tech.removeEventListener(event, handler)
    }

    on(event, handler) {
        this.hls.on(event, handler)
        this.tech.addEventListener(event, handler)
    }


    destroy() {
        this.hls.destroy()
    }

    subtitlesListener(enabled) {
        this.hls.subtitleDisplay = enabled
    }
}
