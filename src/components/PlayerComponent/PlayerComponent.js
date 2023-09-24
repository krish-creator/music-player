import React, { useState, useRef } from 'react';
import './PlayerComponent.scss';
import ringer from '../../assets/tracks/track1/track1.mp3';
import album1 from '../../assets/tracks/track1/albumArt.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const PlayerComponent = () => {
    const [isHidden, setHidden] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
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
        audioRef.current = new Audio(ringer);
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

    return (
        <div className='player'>
            <div className='album-art' style={{ backgroundImage: `url(${album1})` }}>
                <div className="fake-player">
                    <button
                        role="play"
                        className={`play d-${isHidden ? "none" : "block"}`}
                        onClick={togglePlayback}
                    ></button>
                    <button
                        role="pause"
                        className={`pause ${isHidden ? "block" : "none"}`}
                        onClick={togglePlayback}
                    ></button>
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
                <button onClick={toggleMute} className='ms-2'>
                    <div className='d-flex flex-row'>
                        <div className='d-none'><FontAwesomeIcon icon="fa-solid fa-volume-xmark" /></div>
                        <div><FontAwesomeIcon icon="fa-solid fa-volume-high" /></div>
                        <div> {muted ? "Muted" : "Unmuted"} </div>
                    </div>
                </button>
            </section>

            <strong>Track Name</strong>
        </div >
    );
};

export default PlayerComponent;
