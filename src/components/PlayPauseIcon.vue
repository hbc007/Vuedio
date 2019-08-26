<template>
    <svg
            height="100%"
            width="100%"
            viewBox="0 0 24 24"
            class="play-pause-icon"
            :data-state="state"
    >
        <g ref="svg">
            <path ref="path1" d=""></path>
            <path ref="path2" d=""></path>
        </g>
    </svg>
</template>

<script>
const pause1 = [
    20, 4,
    20, 20,
    15, 20,
    15, 4
]
const pause2 = [
    4, 4,
    4, 20,
    9, 20,
    9, 4
]
const play1 = [
    12, 4,
    20, 20,
    12, 20,
    12, 4
]
const play2 = [
    12, 4,
    4, 20,
    12, 20,
    12, 4
]

function interp(t) {
    return t < .5 ? 2 * t * t : -1 + (
        4 - 2 * t
    ) * t
}

function interpPath(fr, to, pos) {
    if (fr.length !== to.length) {
        throw Error('Can\'t interpolate paths with different sizes.')
    }
    const ret = []
    for (let i = 0; i < fr.length; i++) {
        ret.push((
            to[i] - fr[i]
        ) * pos + fr[i])
    }
    return ret
}

function buildPath(path) {
    const positions = []
    for (let i = 0; i < path.length; i += 2) {
        positions.push(path[i] + ' ' + path[i + 1])
    }
    return 'M ' + positions.join(' L ') + ' Z'
}

export default {
    name: 'PlayPauseIcon',
    props: {
        state: {
            default: 'pause',
            validator: (v) => ['pause', 'play'].indexOf(v) > -1
        },
        duration: {
            default: 300,
            type: Number
        }
    },
    data: () => (
        {
            pendingAnimation: -1,
            pendingAnimationPos: -1
        }
    ),
    methods: {
        jumpTo(state) {
            if (state === 'pause') {
                this.updatePath(pause1, pause2)
                this.svg.style.transform = 'rotate(0deg)'
            } else if (state === 'play') {
                this.updatePath(play1, play2)
                this.svg.style.transform = 'rotate(90deg)'
            } else {
                throw Error('Invalid state: ' + state)
            }
        },
        updatePath(first, second) {
            this.path1.setAttribute('d', buildPath(first))
            this.path2.setAttribute('d', buildPath(second))
        },
        animateTo(state, force) {
            if (state === this.state && !force) {
                return
            }
            if (['pause', 'play'].indexOf(state) === -1) {
                throw Error('Invalid state: ' + state)
            }
            if (this.pendingAnimation > 0) { cancelAnimationFrame(this.pendingAnimation) }
            const skip = this.pendingAnimationPos > 0 ? 1 - this.pendingAnimationPos : 0
            const start = performance.now()
            const animate = (now) => {
                const frac = Math.min(
                    1,
                    (
                        now - start
                    ) / this.duration + skip
                )
                this.pendingAnimationPos = frac
                const pos = interp(frac)
                if (frac < 1) {
                    if (state === 'pause') {
                        this.updatePath(
                            interpPath(play1, pause1, pos),
                            interpPath(play2, pause2, pos)
                        )
                    } else {
                        this.updatePath(
                            interpPath(pause1, play1, pos),
                            interpPath(pause2, play2, pos)
                        )
                    }
                    this.svg.style.transform =
                        'rotate(' + (
                            (
                                state === 'pause' ? 1 - pos : pos
                            ) * 90
                        ) + 'deg)'
                    this.pendingAnimation = requestAnimationFrame(animate)
                } else {
                    this.pendingAnimationPos = -1
                    this.jumpTo(state)
                }
            }
            this.pendingAnimation = requestAnimationFrame(animate)
        }
    },
    watch: {
        state(val) {
            this.animateTo(val, true)
        }
    },
    computed: {
        svg() {
            return this.$refs.svg
        },
        path1() {
            return this.$refs.path1
        },
        path2() {
            return this.$refs.path2
        }
    },
    mounted() {
        this.jumpTo(this.state)
    }
}
</script>

<style>
.play-pause-icon g {
    transform-origin: center;
}
</style>
