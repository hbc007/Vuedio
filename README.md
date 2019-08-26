# Vuedio
Vuedio is a standalone full-featured video player for modern Vue.js 
applications.
## Features
 - modern-looking interface
 - qualities
 - concatenated videos
 - keybinds
 - touch gestures
 - PiP support
 - ASS subtitles (using [SubtitlesOctopus](https://github.com/Dador/JavascriptSubtitlesOctopus))
 - HLS (using [hls.js](https://github.com/video-dev/hls.js/))
 - DASH (using [dash.js](https://github.com/Dash-Industry-Forum/dash.js/))

## Screenshots
![Subtitles](http://tggdesu.github.io/cdn/vuedio/img/FWN1k-2KTiKOvO_5USRg7w.png?1)  
![Qualities](http://tggdesu.github.io/cdn/vuedio/img/DPBHSyOfSJWwHi6072aisA.png?1)  
![HLS support](http://tggdesu.github.io/cdn/vuedio/img/okiC57q2TUWJFSAk2UPOFA.png?1)  


## Installation
### Usage with packers
1. install `vuedio` package: `npm install --save vuedio`
2. use it in your application:
    ```vue
    <template>
      ...
      <Vuedio ref="vuedio" />
      ...
    </template>
    
    <script>
      import { Vuedio } from 'vuedio'
      export default {
          components: {
              //...
              Vuedio
          },
          // ...
          mounted() {
              this.$refs.vuedio.src({
                  type: 'video/mp4',
                  src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
              })
          }
      }
    </script>
    ```

### Plain HTML usage
1. include `<script>` tag and styles somewhere:
    ```html
    <script src="https://cdn.jsdelivr.net/npm/vuedio@0.2.2/dist/vuedio.umd.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vuedio@0.2.2/dist/vuedio.min.css"></script>
    ```
2. use Vuedio in your application:
    ```js
    new Vue({
       el: '#app',
       template: '<Vuedio />'
    })
    ```

## Sources
Vuedio's sources must be changed dynamically via `.src()` method.  
That method takes one argument containing a single source 
or list of sources. Each source is described as:
```js
{
    type?: string            // MIME type of video. Used to determine player. 
                             // If none is passed then 'video/mp4' is implied
    src?: string             // Single url to video. Alias for `urls: <src>`
    urls?: string | string[] // Url to video or array of urls.
                             // If array is passed then videos will be
                             // concatenated. Has higher priority than `src`
}
```
## Subtitles
Vuedio supports ASS subtitles using SubtitlesOctopus. 
To enable subtitles support you should do the following:
1. Copy all files from [/demo/dist/static](demo/dist/static) 
to some directory on your server
2. Set `subtitles-worker` property of Vuedio to path with those files.

**Attention!** Since SubtitlesOctopus relies on ServiceWorkers, 
HTTPS must be present when deploying app to production.

## Keybinds
Vuedio implements commonly used keybinds on player element. 
Those are (case-insensitive):

| key | action |
|---------|-------------------|
| ` ` (space) | Toggle pause |
| `M` | Toggle mute |
| `F` | Toggle fullscreen |
| `ArrowLeft` | -10s
| `Ctrl + ArrowLeft` | -90s
| `ArrowRight` | +10s
| `Ctrl + ArrowRight` | +90s
| `ArrowUp` | +5% volume
| `ArrowDown` | -5% volume
| --- | --- |
| `Scroll up` | +5% volume
| `Scroll down` | -5% volume
| `Click` | Toggle pause
| `Double click` | Toggle fullscreen

Those before `---` can be disabled by setting `:keybinds="false"`

## Gestures
Vuedio also implements convenient touch gestures on player element:
 - **Swipe left**: seek backwards
 - **Swipe right**: seek forwards
 - **Swipe up**: turn up volume
 - **Swipe down**: turn down volume

They all can be disabled by settings `:gestures="false"`

## API reference
Vuedio module exposes 4 components, two of them are intended 
for internal usage, but can be used outside. Also Vuedio has some 
helper functions which can also be helpful outside Vuedio
### `Vuedio` component
**Description:** Vuedio video player component
#### Properties
| name | optional (default) | description |
| ---- | -------- | ----------- |
| `keybinds` | yes (`true`) | Whether keybinds should be enabled. May be changed at runtime. More in **Keybinds** section
| `gestures` | yes (`true`) | Whether touch gestures should be enabled. May be changed at runtime. More in **Gestures** section
| `no-inject-icons` | yes (`false`) | If `true` then Material Design icons will not be automatically injected. Use only if you provide own icons via CSS or are sure that MDI are present in the page.
| `subtitles-worker` | yes (`/libassjs-worker.js`) | Contains path to SubtitlesOctopus service worker. More in **Subtitles** section.
#### Methods
##### `src(sources)`
**Description:** used to change Vuedio sources list. More in **Sources** section  
**Returns:** `void`
##### `subtitles(src, options, srcType)`
**Description:** used to change Vuedio subtitles. More in **Subtitles** section  
**Parameters:**
 - `src`
   - **Type**: `string | null`
   - **Description**: Can be either subtitles URL, subtitles content or `null` (to destroy subtitles)
 - `options`
   - **Type**: `SubtitleOctopusOptions ?= {}`
   - **Description**: Additional options to underlying `SubtitlesOctopus` constructor. More in [SubtitlesOctopus' documentation](https://github.com/Dador/JavascriptSubtitlesOctopus#options).
 - `srcType`
   - **Type**: `'url' | any`
   - **Description**: `src` parameter type. Any value except `'url'` will count as raw ASS data.

##### `info(text, temp)`
**Description:** used to show a popup for informing about current state
##### `updateCurrentTime(secs)`
**Description:** used to change player current time. **Do not** use `.currentTime` 
or `.player.timestamp` as they won't update time player-wide
##### `pause()`
**Description:** puts video on pause
##### `unpause()`
**Description:** removes pause from video
##### `togglePause()`
**Description:** toggles pause on video
##### `formatTime(time)`
**Description:** alias for `formatTime(time, vuedio.totalDuration)`
### `PlayPauseIcon` component
**Description:** provides an animated play-pause icon.
#### Properties
| name | optional (default) | description |
| --- | --- | --- |
| `state` | yes (`pause`) | describes current icon's state. Must be one of `play`, `pause`
| `duration` | yes (`300`) | transition duration
