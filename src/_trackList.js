import track1 from './assets/tracks/track1/track1.mp3'
import album1 from './assets/tracks/track1/albumArt.jpg'
import track2 from './assets/tracks/track2/track2.mp3'
import album2 from './assets/tracks/track2/album2.jpg'

const trackList = [
    {
        trackId: 1,
        trackName: "FirstTrack",
        trackLink: { track1 },
        albumArt: { album1 }
    },
    {
        trackId: 2,
        trackName: "SecondTrack",
        trackLink: { track2 },
        albumArt: { album2 }
    },
]

export default trackList