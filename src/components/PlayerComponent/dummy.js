import React, { useState, useRef } from 'react';
import './PlayerComponent.scss';
import ringer from '../../assets/tracks/track1/track1.mp3';

const PlayerComponent = () => {
    const [isHidden, setHidden] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const finalVolume = muted ? 0 : volume ** 2;

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
        audioRef.current.volume = finalVolume; // Set initial volume
    }

    // Function to handle volume change
    const handleVolumeChange = (event) => {
        const newVolume = event.target.valueAsNumber;
        setVolume(newVolume);
        audioRef.current.volume = muted ? 0 : newVolume ** 2;
    };

    return (
        <div className='player'>
            <div className='album-art'>
                <div className="fake-player">
                    <button
                        role="play"
                        className={`play ${isHidden ? "hidden" : ""}`}
                        onClick={togglePlayback}
                    ></button>
                    <button
                        role="pause"
                        className={`pause ${isHidden ? "" : "hidden"}`}
                        onClick={togglePlayback}
                    ></button>
                </div>
            </div>

            <section>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.02}
                    value={volume}
                    onChange={handleVolumeChange}
                />
                <button onClick={() => setMuted((m) => !m)}>
                    {muted ? "Muted" : "Unmuted"}
                </button>
            </section>
            <section>
                <p>Final volume: {finalVolume.toFixed(3)}</p>
            </section>

            <div>Track Name</div>
        </div>
    );
};

export default PlayerComponent;
