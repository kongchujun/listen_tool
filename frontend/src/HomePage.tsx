import React, { useState } from 'react';

interface Track {
    id: number;
    description: string;
    file: string;
}

const tracks: Track[] = [
    { id: 1, description: 'Track 1', file: '/song1.mp3' },
    { id: 2, description: 'Track 2', file: '/song2.mp3' },
    { id: 3, description: 'Track 3', file: '/song3.mp3' },
];

const MediaPlayer: React.FC = () => {
    const [currentTrack, setCurrentTrack] = useState<string>("");

    const playTrack = (file: string) => {
        setCurrentTrack(file);
        const audio = new Audio(file);
        audio.play();
    };

    return (
        <div>
            <h1>MP3 Media Player</h1>
            <ul>
                {tracks.map(track => (
                    <li key={track.id}>
                        {track.description}
                        <button onClick={() => playTrack(track.file)}>Play</button>
                    </li>
                ))}
            </ul>
            {currentTrack && <audio src={currentTrack} controls autoPlay />}
        </div>
    );
};

export default MediaPlayer