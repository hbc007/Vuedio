<template>
    <div
            class="vuedio-seek"
            @touchstart="mouseDown"
            @mousedown.left="mouseDown"
            @mouseover="updateHover"
            @mousemove="updateHover"
            @mouseout="mouseOut"
    >
        <div class="vuedio-seek--back"></div>
        <div
                class="vuedio-seek--buffer"
                :style="{ 'max-width': (buffered / duration * 100) + '%' }"
        ></div>
        <div
                class="vuedio-seek--played"
                :style="{ 'max-width': (currentTime / duration * 100) + '%' }"
        ></div>
        <div
                class="vuedio-seek--thumb"
                :style="{ left: (currentTime / duration * 100) + '%' }"
                @dragstart.prevent="() => {}"
        ></div>
        <div
                :style="{ left: hoveredFraction * 100 + '%' }"
                v-show="hoveredFraction >= 0"
                class="vuedio-seek--hovered"
        >
            <div class="vuedio-seek--grip"></div>
            <div class="vuedio-seek-tooltip">{{ hoveredFraction >= 0 ? formatTime(hoveredFraction * duration) : '' }}
            </div>
        </div>
    </div>

</template>

<script>
import formatTime from '../helpers/format-time'

export default {
    name: 'VideoSeekbar',
    props: {
        time: {
            type: Number
        },
        buffered: {
            type: Number
        },
        duration: {
            type: Number
        }
    },
    data: () => (
        {
            hoveredFraction: -1,
            dragging: false,
            boundMouseUp: null,
            boundMouseMove: null
        }
    ),
    computed: {
        currentTime: {
            get() {
                return this.time
            },
            set(val) {
                this.$emit('update:time', val)
            }
        }
    },
    methods: {
        rect() {
            return this.$el.getBoundingClientRect()
        },
        mouseDown(e) {
            this.dragging = true
            if (!this.boundMouseUp) {
                this.boundMouseMove = this.handleMove.bind(this)
                this.boundMouseUp = this.mouseUp.bind(this)
            }
            document.addEventListener('mousemove', this.boundMouseMove)
            document.addEventListener('touchmove', this.boundMouseMove, { passive: false })
            document.addEventListener('mouseup', this.boundMouseUp)
            document.addEventListener('touchend', this.boundMouseUp, { passive: false })
            this.handleMove(e)
            this.$emit('dragstarted')
        },
        mouseUp(e) {
            this.dragging = false
            document.removeEventListener('mousemove', this.boundMouseMove)
            document.removeEventListener('touchmove', this.boundMouseMove)
            document.removeEventListener('mouseup', this.boundMouseUp)
            document.removeEventListener('touchend', this.boundMouseUp)
            this.$emit('dragended')
        },
        updateHover(e) {
            this.hoveredFraction = Math.min(1, Math.max(0, (
                e.clientX - this.rect().left
            ) / this.rect().width))
        },
        mouseOut(e) {
            this.hoveredFraction = -1
        },
        handleMove(e) {
            if (!this.dragging) { return }
            let x
            if (e instanceof MouseEvent) {
                x = e.clientX
            } else {
                x = e.changedTouches[0].clientX
            }
            let frac = (
                x - this.rect().left
            ) / this.rect().width
            if (frac < 0) {
                frac = 0
            }
            if (frac > 1) {
                frac = 1
            }
            const secs = frac * this.duration
            this.$emit('dragged', secs)
            e.preventDefault()
        },
        formatTime(secs, guide = this.duration) {
            return formatTime(secs, guide)
        }
    }
}
</script>

<style lang="scss">
.vuedio-seek {
    flex-grow: 1;
    position: relative;
    margin: 0 4px;
    display: flex;
    height: 18px;
    cursor: pointer;

    &--back {
        position: absolute;
        height: 6px;
        background-color: #828282;
        width: 100%;
        border-radius: 3px;
        align-self: center;
        z-index: 0
    }

    &--buffer {
        width: 100%;
        max-width: 0;
        transition: max-width 0.15s linear;
        position: absolute;
        height: 6px;
        background-color: #5f5f5f;
        border-radius: 3px;
        align-self: center;
        z-index: 1;
    }

    &--played {
        width: 100%;
        max-width: 0;
        transition: max-width 0.15s linear;
        position: absolute;
        height: 6px;
        border-radius: 3px;
        background-color: #ff0000;
        z-index: 3;
        align-self: center;
    }

    &--thumb {
        transition: left 0.15s linear;
        position: absolute;
        width: 12px;
        height: 12px;
        align-self: center;
        background-color: #fbfbfb;
        z-index: 5;
        border-radius: 8px;
        box-shadow: 0 3px 8px -2px black;
        transform: translateX(-4px);
        cursor: pointer;
    }

    &--hovered {
        position: absolute;
        align-self: center;

        .vuedio-seek-tooltip {
            position: absolute;
            font-size: 13px;
            background-color: rgba(251, 251, 251, 0.97);
            padding: 5px 7px;
            border-radius: 6px;
            height: 23px;
            bottom: 8px;
            transform: translateX(-50%);
            box-shadow: 0 3px 5px -3px black;
        }

        .vuedio-seek--grip {
            position: absolute;
            width: 1px;
            height: 6px;
            background: #000;
            top: -3px;
            z-index: 4;
        }
    }
}
</style>
