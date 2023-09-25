import React, { useState, useRef, useEffect } from 'react';
import './PlayerComponent.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import trackList from '../../_trackList';


const PlayerComponent = () => {
    const [isHidden, setHidden] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const [currentTrack, setCurrentTrack] = useState({
        trackId: trackList[0].trackId,
        trackName: trackList[0].trackName,
        trackLink: trackList[0].trackLink,
        albumArt: trackList[0].albumArt,
        loop: false,
        repeat: false
    })

    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);

    const audioRef = useRef(null);

    const togglePlayback = () => {
        setHidden(!isHidden);
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        audioRef.current = new Audio(currentTrack.trackLink);
        audioRef.current.loop = currentTrack.loop;
        audioRef.current.volume = volume;
    }, [currentTrack, volume, audioRef])


    const handleVolumeChange = (event) => {
        const newVolume = event.target.valueAsNumber;
        setVolume(newVolume);
        audioRef.current.volume = muted ? 0 : newVolume;
    };

    const toggleMute = () => {
        const newMuted = !muted;
        setMuted(newMuted);
        audioRef.current.volume = newMuted ? 0 : volume;
    };

    const nextTrack = () => {
        setCurrentTrack(
            {
                trackId: trackList[1].trackId,
                trackName: trackList[1].trackName,
                trackLink: trackList[1].trackLink,
                albumArt: trackList[1].albumArt
            }
        )
    }

    const prevTrack = () => {
        setCurrentTrack(
            {
                trackId: trackList[0].trackId,
                trackName: trackList[0].trackName,
                trackLink: trackList[0].trackLink,
                albumArt: trackList[0].albumArt
            }
        )
    }

    useEffect(() => {
        console.log(audioRef);
    }, [currentTrack])

    return (
        <>
            <div className='player'>
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
                <section className='d-flex justify-content-center align-items-center'>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.02}
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </section>

                <section className='d-flex justify-content-center align-items-center'>
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
                    <button onClick={prevTrack} className='btn'><FontAwesomeIcon icon="fa-solid fa-caret-left" /></button>
                    <strong>{currentTrack.trackName}</strong>
                    <button onClick={nextTrack} className='btn'><FontAwesomeIcon icon="fa-solid fa-caret-right" /></button>
                </div>

            </div >
        </>
    );
};

export default PlayerComponent;
