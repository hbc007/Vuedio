export default class HighSpeedClock {
    constructor() {
        this.listeners = []
        this.pending = null
        this.boundOnTick = null
        this.lastTickTime = -1
        this.running = false
    }

    start() {
        this.running = true
        if (!this.boundOnTick) {
            this.boundOnTick = this.onTick.bind(this)
        }
        if (this.pending === null) {
            this.pending = requestAnimationFrame(this.boundOnTick)
        }
    }

    stop() {
        this.running = false
        if (this.pending !== null) {
            cancelAnimationFrame(this.pending)
            this.pending = null
        }
    }

    tick(listener) {
        this.listeners.push(listener)
    }

    force() {
        return this.onTick(performance.now(), true)
    }

    async onTick(now, once = false) {
        this.lastTickTime = now
        await Promise.all(this.listeners.map((it) => it(now)))
        if (!once && this.running) {
            this.pending = requestAnimationFrame(this.boundOnTick)
        }
    }
}
