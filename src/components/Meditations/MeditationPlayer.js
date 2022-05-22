import React, { useState } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'


const MeditationPlayer = () => {
    const MeditationList = [
        {
            pic: fiveMin,
            musicSrc: "https://res.cloudinary.com/cloudloom/video/upload/v1653142307/Meditations/5-MinuteMeditationYou_CanDoAnywhere_u33cj7.mp3",
            name: 'Anywhere Meditation '
        }, {
            pic: Anxiety,
            musicSrc: "https://res.cloudinary.com/cloudloom/video/upload/v1653142347/Meditations/10-MinuteMeditationForAnxiety_ebbzcv.mp3",
            name: 'Meditation for Anxiety'
        },
        {
            pic: Stress,
            musicSrc: "https://res.cloudinary.com/cloudloom/video/upload/v1653142342/Meditations/10-MinuteMeditationForStress_kc5m9f.mp3",
            name: 'Meditation for Stress'
        }, {
            pic: Sleep,
            musicSrc: "https://res.cloudinary.com/cloudloom/video/upload/v1653142343/Meditations/10-MinuteMeditationForSleep_wknfdo.mp3",
            name: 'Meditation for Sleep'
        }
    ]



    const [playerMode, setPlayerMode] = useState('mini');

    return (
        <>
            <div>
                <ReactJkMusicPlayer showMediaSession showDownload={false} showThemeSwitch={false}
                    autoPlay={false}
                    onModeChange={(mode) => setPlayerMode(mode)}
                    autoHiddenCover={true} remove={false} audioLists={MeditationList}
                    toggleMode={false} />
                {children}
            </div>

        </>
    )
}

export default MeditationPlayer;