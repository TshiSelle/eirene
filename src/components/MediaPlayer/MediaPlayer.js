import React, { useRef, useState } from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import "./styling.css"

const MediaPlayer = ({children}) => {
    const Music = "https://res.cloudinary.com/cloudloom/video/upload/v1650269930/samples/music/2_Minutes___Lofi_hip_hop_mix_study_sleep_homework_music_vtisxm.ogg";
	const [playerMode, setPlayerMode] = useState('mini');
	const chatbot = useRef(null);
	if (chatbot.current) {
		if (playerMode == 'full' ) {
			chatbot.current.shadowRoot.querySelector('.df-messenger-wrapper').querySelector('#widgetIcon').style.bottom = "10vh"
		} else {
			chatbot.current.shadowRoot.querySelector('.df-messenger-wrapper').querySelector('#widgetIcon').style.bottom = "0vh"
		}
	}

    return (
		<>
    		<div>
    		    <ReactJkMusicPlayer showMediaSession showDownload={false} showThemeSwitch={false}
    		        autoPlay={false}
					onModeChange={(mode) => setPlayerMode(mode)}
    		        autoHiddenCover={true} remove={false} audioLists={[{ name: 'Lofi cloudinary', musicSrc: Music }]} />
    		{children}
    		</div>
			<df-messenger
			ref={chatbot}
    		chat-title="Eirene"
    		agent-id="0ffba258-1ae3-4dcd-9497-7476a1c9819c"
    		language-code="en"
    		chat-icon="https://res.cloudinary.com/cloudloom/image/upload/v1653046865/logo/eirene_face_tzjqqu.webp"
    		></df-messenger>
		</>
    )
};


export default MediaPlayer;