const cache = {}

function prepare(lib) {
    lib = lib.default
    return {
        create(tech) {
            return new lib(tech)
        },
        constructor: lib
    }
}

export default async function getPlayer(mime) {
    if (process.env.DASH_AVAILABLE && mime === 'application/dash+xml') {
        if (cache.dash) {
            return cache.dash
        }
        const lib = await import('./mpeg-dash')
        cache.dash = prepare(lib)
        return cache.dash
    }
    if (process.env.HLS_AVAILABLE &&
        ['application/vnd.apple.mpegurl',
            'application/x-mpegURL',
            'video/mpegurl'
        ].indexOf(mime) > -1) {
        if (cache.hls) {
            return cache.hls
        }
        // @ts-ignore
        const lib = await import('./hls')
        cache.hls = prepare(lib)
        return cache.hls
    }
    if (cache.html5) {
        return cache.html5
    }
    const html5lib = await import('./html5')
    cache.html5 = prepare(html5lib)
    return cache.html5
}
