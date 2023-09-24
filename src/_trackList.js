import dummy from './assets/tracks/track1/track1.mp3'
import album1 from './assets/tracks/track1/albumArt.jpg'

const trackList = [
    {
        trackId: 1,
        trackName: "FirstTrack",
        trackLink: { dummy },
        albumArt: { album1 }
    },
    {
        trackId: 2,
        trackName: "SecondTrack",
        trackLink: { dummy },
        albumArt: { album1 }
    },
]

export default trackList