import React, { useState, useRef, useEffect } from 'react'
import './PlayerComponent.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import trackListOg from '../../_trackList'
import repeat from '../../assets/images/repeat.png'
import { useParams, useNavigate } from "react-router-dom"

const PlayerComponent = () => {

    const params = useParams()
    const navigate = new useNavigate()

    const [isHidden, setHidden] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [trackList, setTrackList] = useState(trackListOg)
    const [trackId, setTrackId] = useState(1)

    const [currentTrack, setCurrentTrack] = useState({
        trackId: trackList[0].trackId,
        trackName: trackList[0].trackName,
        trackLink: trackList[0].trackLink,
        albumArt: trackList[0].albumArt,
    })

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const [volume, setVolume] = useState(1)
    const [muted, setMuted] = useState(false)
    const [loop, setLoop] = useState(false)
    const [shuffle, setShuffle] = useState(false)

    const audioRef = useRef(null)

    const togglePlayback = () => {
        setHidden(!isHidden)
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    useEffect(() => {
        setTrackId(params.trackId ? params.trackId : '1')
    }, [params.trackId])

    useEffect(() => {
        setCurrentTrack({
            trackId: trackList[currentTrackIndex].trackId,
            trackName: trackList[currentTrackIndex].trackName,
            trackLink: trackList[currentTrackIndex].trackLink,
            albumArt: trackList[currentTrackIndex].albumArt,
        })
    }, [trackList, currentTrackIndex, trackId])


    useEffect(() => {
        audioRef.current = new Audio(currentTrack.trackLink)
        audioRef.current.id = currentTrack.trackId
        audioRef.current.volume = volume

        audioRef.current.addEventListener('loadedmetadata', () => {
            setDuration(audioRef.current.duration)
        })

        audioRef.current.addEventListener('timeupdate', () => {
            setCurrentTime(audioRef.current.currentTime)
        })

        audioRef.current.addEventListener('ended', () => {
            if (loop) {
                audioRef.current.currentTime = 0
                audioRef.current.play()
            } else {
                setIsPlaying(false)
                setHidden(false)
            }
        })

        console.log(
            typeof (trackId)
        );

        setCurrentTrackIndex(
            trackId
                ? trackList.findIndex((track) => track.trackId === Number(trackId))
                : 1
        )
        // eslint-disable-next-line
    }, [currentTrack, audioRef, trackId])

    const handleVolumeChange = (event) => {
        const newVolume = event.target.valueAsNumber
        setVolume(newVolume)
        audioRef.current.volume = muted ? 0 : newVolume
    }

    const handleTrackDurationChange = (event) => {
        const newPosition = event.target.valueAsNumber
        audioRef.current.currentTime = newPosition
        setCurrentTime(newPosition)
    }

    const toggleMute = () => {
        const newMuted = !muted
        setMuted(newMuted)
        audioRef.current.volume = newMuted ? 0 : volume
    }

    const nextTrack = () => {
        if (isPlaying) {
            audioRef.current.pause()
        }
        setIsPlaying(false)
        setHidden(false)

        const nextIndex = currentTrackIndex + 1

        setCurrentTrack((prevState) => {
            if (nextIndex < trackList.length) {
                return {
                    trackId: trackList[nextIndex].trackId,
                    trackName: trackList[nextIndex].trackName,
                    trackLink: trackList[nextIndex].trackLink,
                    albumArt: trackList[nextIndex].albumArt
                }
            }
            return prevState
        })

        if (nextIndex < trackList.length) {
            navigate(`/player/${trackList[nextIndex].trackId}`)
        }

    }

    const prevTrack = () => {
        if (isPlaying) {
            audioRef.current.pause()
        }
        setIsPlaying(false)
        setHidden(false)

        const prevIndex = currentTrackIndex - 1

        setCurrentTrack((prevState) => {
            if (prevIndex >= 0) {
                return {
                    trackId: trackList[prevIndex].trackId,
                    trackName: trackList[prevIndex].trackName,
                    trackLink: trackList[prevIndex].trackLink,
                    albumArt: trackList[prevIndex].albumArt
                }
            }
            return prevState
        })

        if (prevIndex >= 0) {
            navigate(`/player/${trackList[prevIndex].trackId}`)
        }

    }

    const toggleLoop = () => {
        setLoop(!loop)
        audioRef.current.loop = !loop
    }

    const shuffleArr = (array) => {
        return array.map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)
    }

    const toggleShuffle = () => {
        setShuffle(!shuffle)
        if (!shuffle) {
            if (isPlaying) {
                const shuffledTracks = shuffleArr(trackList.filter(track => track.trackId !== currentTrack.trackId))
                setTrackList([currentTrack, ...shuffledTracks])
            } else {
                const shuffledTracks = shuffleArr(trackList)
                setTrackList(shuffledTracks)
            }
        } else {
            setTrackList(trackListOg)
        }
    }

    useEffect(() => {
        console.log(trackId, currentTrackIndex)
        // eslint-disable-next-line
    }, [currentTrack, currentTrackIndex, duration, loop, trackList, trackId])

    return (
        <div className='container-fluid p-0'>
            <div className='player border'>
                <div className='album-art' style={{ backgroundImage: `url(${currentTrack.albumArt})` }}>
                    <div className='my-player'>
                        {isPlaying ? (
                            <button
                                className="btn pause"
                                onClick={togglePlayback}
                            ></button>
                        ) : (
                            <button
                                className="btn play"
                                onClick={togglePlayback}
                            ></button>
                        )}
                    </div>
                </div>

                <section className='d-flex'>
                    <div>
                        {currentTime ? (currentTime / 100).toFixed(2) : 0}
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={duration.toString()}
                        step={1}
                        value={currentTime}
                        onChange={handleTrackDurationChange}
                    />
                    <div>
                        {duration ? ((currentTime - duration) / 100).toFixed(2) : 0}
                    </div>
                </section>

                <section className='d-flex'>
                    <div className='p-2'>
                        <FontAwesomeIcon icon="fa-solid fa-volume-low" />
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.02}
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                    <button onClick={toggleMute} className='btn'>
                        {
                            muted
                                ? <FontAwesomeIcon icon="fa-solid fa-volume-xmark" />
                                : <FontAwesomeIcon icon="fa-solid fa-volume-high" />
                        }
                    </button>
                </section>

                <div>
                    {
                        shuffle
                            ? <button onClick={toggleShuffle} className='btn'><FontAwesomeIcon icon="fa-solid fa-shuffle" /></button>
                            : <button onClick={toggleShuffle} className='btn'><FontAwesomeIcon icon="fa-solid fa-arrow-right-long" /></button>
                    }

                    <button onClick={prevTrack} className='btn'><FontAwesomeIcon icon="fa-solid fa-caret-left" /></button>
                    <strong>{currentTrack.trackName}</strong>
                    <button onClick={nextTrack} className='btn'><FontAwesomeIcon icon="fa-solid fa-caret-right" /></button>
                    {
                        loop
                            ? <button onClick={toggleLoop} className='btn'><img src={repeat} alt="repeat-1-icon" className='img-fluid' height={21} width={21} /></button>
                            : <button onClick={toggleLoop} className='btn'><FontAwesomeIcon icon="fa-solid fa-repeat" /></button>
                    }
                </div>

            </div >
        </div>
    )
}

export default PlayerComponent
