import React from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import Image from '../HomePage/images/banner.jpg';

const MediaPlayer = ({children}) => {
    const Music = "https://res.cloudinary.com/cloudloom/video/upload/v1650269930/samples/music/2_Minutes___Lofi_hip_hop_mix_study_sleep_homework_music_vtisxm.ogg";
    return (
        <div>
            <ReactJkMusicPlayer showMediaSession showDownload={false} showThemeSwitch={false}
                autoPlay={false}
                autoHiddenCover={true} remove={false} audioLists={[{ name: 'Lofi cloudinary', musicSrc: Music }]} />
        {children}
        </div>
    )
};

export default MediaPlayer;