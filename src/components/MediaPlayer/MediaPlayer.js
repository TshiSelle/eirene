import React from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import Music from './music.mp3';
import Image from '../HomePage/images/banner.jpg';

const MediaPlayer = ({children}) => {
    return (
        <div style={{ }}>
            <ReactJkMusicPlayer showMediaSession  audioLists={[{ name: 'tiddies', musicSrc: Music, cover: Image }]} />
        {children}
        </div>
    )
};

export default MediaPlayer;