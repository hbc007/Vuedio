<template>
    <div class="app">
        <h1>Vuedio demo</h1>
        <Vuedio
                :subtitlesWorker="worker"
                ref="vuedio"
                style="width: 640px; height: 360px; margin: 16px;"
        />
        <button @click="loadMp4">MP4</button>
        <button @click="loadMp4Qualities">MP4-quals</button>
        <button @click="loadMp4Concat">MP4-concat</button>
        <button @click="loadMp4QualitiesConcat">MP4-concat-quals</button>
        <button @click="loadDash">DASH</button>
        <button @click="loadHls">HLS</button>
        <br/>
        <button @click="addSubtitlesTest">subtitles(test)</button>
        <button @click="addSubtitlesKaraoke">subtitles(karaoke)</button>
    </div>
</template>

<script>
import { Vuedio } from '../src'

export default {
    name: 'VuedioDemo',
    components: {
        Vuedio
    },
    props: {
        worker: {
            type: String,
            default: '/libassjs-worker.js'
        }
    },
    methods: {
        loadMp4() {
            this.vuedio.src({
                type: 'video/mp4',
                src: 'https://animethemes.moe/video/ToaruKagakuNoRailgunS-OP1.webm'
            })
        },

        loadMp4Qualities() {
            this.vuedio.src(
                [
                    {
                        height: 240,
                        type: 'video/mp4',
                        src: 'https://vjs.zencdn.net/v/oceans.mp4#240'
                    }, {
                    height: 360,
                    type: 'video/mp4',
                    src: 'https://vjs.zencdn.net/v/oceans.mp4#360'
                }, {
                    height: 720,
                    type: 'video/mp4',
                    src: 'https://vjs.zencdn.net/v/oceans.mp4#720'
                }
                ]
            )
        },

        loadMp4Concat() {
            this.vuedio.src({
                type: 'video/mp4',
                // note that urls must be different, otherwise player will count them as same videos.
                urls: ['https://vjs.zencdn.net/v/oceans.mp4#1', 'https://vjs.zencdn.net/v/oceans.mp4#2']
            })
        },

        loadMp4QualitiesConcat() {
            this.vuedio.src(
                [
                    {
                        height: 240,
                        type: 'video/mp4',
                        urls: ['https://vjs.zencdn.net/v/oceans.mp4#240-1', 'https://vjs.zencdn.net/v/oceans.mp4#240-2']
                    }, {
                    height: 360,
                    type: 'video/mp4',
                    urls: ['https://vjs.zencdn.net/v/oceans.mp4#360-1', 'https://vjs.zencdn.net/v/oceans.mp4#360-2']
                }, {
                    height: 720,
                    type: 'video/mp4',
                    urls: ['https://vjs.zencdn.net/v/oceans.mp4#720-1', 'https://vjs.zencdn.net/v/oceans.mp4#720-2']
                }
                ]
            )
        },

        loadDash() {
            this.vuedio.src({
                type: 'application/dash+xml',
                src: 'https://dash.akamaized.net/envivio/Envivio-dash2/manifest.mpd'
            })
        },

        loadHls() {
            this.vuedio.src({
                type: 'application/vnd.apple.mpegurl',
                src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
            })
        },

        addSubtitlesTest() {
            this.vuedio.subtitles(
                'https://raw.githubusercontent.com/Dador/JavascriptSubtitlesOctopus/master/example/test.ass')
        },

        addSubtitlesKaraoke() {
            this.vuedio.subtitles(
                'https://gist.githubusercontent.com/tggdesu/1a81cfa314ac9efc7334818ecccb4412/raw/dc370a2aa43450efa7a684bc9ab02f98ed21e492/railgun_op.ass',
                {
                    fonts: [
                        'https://tggdesu.github.io/cdn/fonts/SourceSansPro-SemiBold.ttf',
                        'https://tggdesu.github.io/cdn/fonts/CabinCondensed-Regular.ttf'
                    ]
                }
            )
        }

    },
    computed: {
        vuedio() {
            return this.$refs.vuedio
        }
    },
    mounted() {
        this.loadMp4()
    }
}
</script>

<style lang="scss">
#app, .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
