import React, { useRef, useState } from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import "./styling.css";

const MediaPlayer = ({ children }) => {
  const Music = [
    // {
    //   cover:
    //     "https://res.cloudinary.com/cloudloom/image/upload/v1653329480/Meditations/lofi-modified_ippq60.png",
    //   musicSrc:
    //     "https://res.cloudinary.com/cloudloom/video/upload/v1653329600/Meditations/LOFI_q7fb1x.mp3",
    //   name: "MUSIC - LOFI",
    // },
    // {
    //   cover:
    //     "https://res.cloudinary.com/cloudloom/image/upload/v1653329481/Meditations/calm-modified_upc4hh.png",
    //   musicSrc:
    //     "https://res.cloudinary.com/cloudloom/video/upload/v1653329664/Meditations/Calm_kzn1v5.mp3",
    //   name: "MUSIC - Calm",
    // },
    // {
    //   cover:
    //     "https://res.cloudinary.com/cloudloom/image/upload/v1653329476/Meditations/ambient_h2qfcp.png",
    //   musicSrc:
    //     "https://res.cloudinary.com/cloudloom/video/upload/v1653329658/Meditations/Ambient_Night_Sky_lmhm24.mp3",
    //   name: "MUSIC - Ambient Night Sky",
    // },
    // {
    //   cover:
    //     "https://res.cloudinary.com/cloudloom/image/upload/v1653326866/Meditations/ocean-modified_mkea5h.png",
    //   musicSrc:
    //     "https://res.cloudinary.com/cloudloom/video/upload/v1653323370/Meditations/MUSIC_-_Ocean_Sounds_oskpip.mp3",
    //   name: "MUSIC - Ocean",
    // },
    // {
    //   cover:
    //     "https://res.cloudinary.com/cloudloom/image/upload/v1653326866/Meditations/10_min_meditation_for_sleep-modified_b8zjdb.png",
    //   musicSrc:
    //     "https://res.cloudinary.com/cloudloom/video/upload/v1653142307/Meditations/5-MinuteMeditationYou_CanDoAnywhere_u33cj7.mp3",
    //   name: "MEDITATION - 5 Min Anywhere Meditation ",
    // },
    // ,
    // {
    //   cover:
    //     "https://res.cloudinary.com/cloudloom/image/upload/v1653326865/Meditations/meditation-modified_rolswx.png",
    //   musicSrc:
    //     "https://res.cloudinary.com/cloudloom/video/upload/v1653142347/Meditations/10-MinuteMeditationForAnxiety_ebbzcv.mp3",
    //   name: "MEDITATION - 10 min Meditation for Anxiety",
    // },
    // {
    //   cover:
    //     "https://res.cloudinary.com/cloudloom/image/upload/v1653326865/Meditations/10_min_meditation_stress-modified_jz5g3s.png",
    //   musicSrc:
    //     "https://res.cloudinary.com/cloudloom/video/upload/v1653142342/Meditations/10-MinuteMeditationForStress_kc5m9f.mp3",
    //   name: "MEDITATION - 10 min Meditation for Stress",
    // },
    // {
    //   cover:
    //     "https://res.cloudinary.com/cloudloom/image/upload/v1653326865/Meditations/5min_meditation-modified_clrusx.png",
    //   musicSrc:
    //     "https://res.cloudinary.com/cloudloom/video/upload/v1653142343/Meditations/10-MinuteMeditationForSleep_wknfdo.mp3",
    //   name: "MEDITATION - 10 min Meditation for Sleep",
    // },
  ];
  const [playerMode, setPlayerMode] = useState("mini");
  const chatbot = useRef(null);
  if (chatbot.current) {
    if (playerMode == "full") {
      chatbot.current.shadowRoot
        .querySelector(".df-messenger-wrapper")
        .querySelector("#widgetIcon").style.bottom = "10vh";
    } else {
      chatbot.current.shadowRoot
        .querySelector(".df-messenger-wrapper")
        .querySelector("#widgetIcon").style.bottom = "0vh";
    }
  }

  return (
    <>
      <div>
        <ReactJkMusicPlayer
          theme="auto"
          defaultVolume={70}
          spaceBar={true}
          responsive={true}
          glassBg={true}
          showMediaSession
          showDownload={false}
          showThemeSwitch={false}
          showMiniModeCover={true}
          autoPlay={false}
          onModeChange={(mode) => setPlayerMode(mode)}
          autoHiddenCover={true}
          remove={false}
          audioLists={Music}
        />
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
  );
};

export default MediaPlayer;
