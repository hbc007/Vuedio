export default function determineSource(videos) {
    const preferred = parseInt(localStorage['vuedio-quality'] || 720, 10)
    for (const it of videos) {
        if (!it.height || it.height === preferred) {
            return it
        }
    }
    return videos[0]
}
