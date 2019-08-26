<template>
    <div
            class="vuedio-volume-slider"
            @touchstart="mouseDown"
            @mousedown.left="mouseDown"
    >
        <div
                class="vuedio-volume-slider--back"
        ></div>
        <div
                class="vuedio-volume-slider--value"
                :style="{ height: volume * 100 + '%' }"
        ></div>
        <div
                class="vuedio-volume-slider--thumb"
                :style="{ bottom: volume * 100 + '%' }"
                @dragstart.prevent="() => {}"
        ></div>
    </div>
</template>

<script>
export default {
  name: 'VolumeSlider',
    props: {
      value: {
          type: Number
      }
    },
    data: () => ({
        boundMouseUp: null,
        boundMouseMove: null
    }),
    computed: {
      volume: {
          get() {
              return this.value
          },
          set(v) {
              this.$emit('update:value', v)
          }
      }
    },
    methods: {
        mouseDown(e) {
            if (!this.boundMouseUp) {
                this.boundMouseUp = this.mouseUp.bind(this)
                this.boundMouseMove = this.mouseMove.bind(this)
            }
            document.addEventListener('mousemove', this.boundMouseMove)
            document.addEventListener('touchmove', this.boundMouseMove, { passive: false })
            document.addEventListener('mouseup', this.boundMouseUp)
            document.addEventListener('touchend', this.boundMouseUp, { passive: false })
            this.mouseMove(e)
            this.$emit('dragstarted')
        },
        mouseUp() {
            document.removeEventListener('mousemove', this.boundMouseMove)
            document.removeEventListener('touchmove', this.boundMouseMove)
            document.removeEventListener('mouseup', this.boundMouseUp)
            document.removeEventListener('touchend', this.boundMouseUp)
            this.$emit('dragended')
        },
        mouseMove(e) {
            let y
            if (e instanceof MouseEvent) {
                y = e.clientY
            } else {
                y = e.changedTouches[0].clientY
            }
            const vol = Math.min(1, Math.max(0,
                (this.rect().bottom - y) / this.rect().height
            ))
            this.$emit('dragged', vol)
            this.volume = vol
            e.preventDefault()
        },
        rect() {
            return this.$el.getBoundingClientRect()
        }
    }
}
</script>

<style lang="scss">
.vuedio-volume-slider {
    height: 80px;
    width: 18px;
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;

    &--back {
        position: absolute;
        width: 6px;
        background-color: #828282;
        height: 100%;
        border-radius: 3px;
        z-index: 0
    }

    &--value {
        position: absolute;
        width: 6px;
        background-color: #ff0000;
        border-radius: 3px;
        bottom: 0;
        z-index: 1;
    }

    &--thumb {
        position: absolute;
        width: 12px;
        height: 12px;
        background-color: #fbfbfb;
        z-index: 5;
        border-radius: 8px;
        box-shadow: 0 3px 8px -2px black;
        transform: translateY(4px);
        cursor: pointer;
    }
}
</style>
