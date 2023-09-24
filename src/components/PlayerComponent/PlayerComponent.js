import React, { useState, useRef, useEffect } from 'react';
import './PlayerComponent.scss';
import ringer from '../../assets/tracks/track1/track1.mp3';
import album1 from '../../assets/tracks/track1/albumArt.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import trackList from '../../_trackList';


const PlayerComponent = () => {
    const [isHidden, setHidden] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [track, setTrack] = useState(ringer)
    const [album, setAlbum] = useState(album1)
    const [trackName, setTrackName] = useState("FirstTrack")
    const audioRef = useRef(null);

    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);

    const togglePlayback = () => {
        setHidden(!isHidden);
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    if (!audioRef.current) {
        audioRef.current = new Audio(track);
        audioRef.current.loop = true;
        audioRef.current.volume = volume;
    }

    // Function to handle volume change
    const handleVolumeChange = (event) => {
        const newVolume = event.target.valueAsNumber;
        setVolume(newVolume);
        audioRef.current.volume = muted ? 0 : newVolume;
    };

    // Function to handle mute/unmute
    const toggleMute = () => {
        const newMuted = !muted;
        setMuted(newMuted);
        audioRef.current.volume = newMuted ? 0 : volume;
    };

    const nextTrack = () => {
        setAlbum(trackList[1].albumArt);
        setTrack(trackList[1].trackLink);
        setTrackName(trackList[1].trackName);
    }

    const prevTrack = () => {
        setAlbum(trackList[0].albumArt);
        setTrack(trackList[0].trackLink);
        setTrackName(trackList[0].trackName);
    }

    useEffect(() => {
        console.log(trackList[1].albumArt);
    }, [])

    return (
        <div className='player'>
            <div className='album-art' style={{ backgroundImage: `url(${album})` }}>
                <div className='fake-player'>
                    {isPlaying ? (
                        <button
                            role="pause"
                            className="btn pause"
                            onClick={togglePlayback}
                        ></button>
                    ) : (
                        <button
                            role="play"
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
                <strong>{trackName}</strong>
                <button onClick={nextTrack} className='btn'><FontAwesomeIcon icon="fa-solid fa-caret-right" /></button>
            </div>

        </div >
    );
};

export default PlayerComponent;
