export default async function determineDuration(src, player) {
    return Promise.all((
        src.urls || []
    ).map((it, i, all) => determineDurationFor(it, i, all, player)))
}

export function determineDurationFor(item, i, all, player) {
    return new Promise((resolve) => {
        const el = document.createElement('video')
        const pl = player.create(el)
        const handle = () => {
            item.duration = pl.duration || 0
            pl.off('durationchange', handle)
            pl.off('error', handle)
            pl.destroy()
            resolve(item.duration)
        }
        pl.on('durationchange', handle)
        pl.on('error', handle)

        if (!/metadata|auto/.test(el.preload)) {
            el.preload = 'metadata'
        }
        pl.src = item.src
    })
}

export function updateTimestamps(src) {
    let total = 0
    for (const it of (
        src.urls || []
    )) {
        it.start = total
        total += it.duration || 0
        it.end = total
    }
    return total
}
