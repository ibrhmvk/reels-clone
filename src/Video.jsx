import React, { useContext, useEffect, useRef, useState } from "react";
import "./Video.css";
import useElementOnScreen from './hooks/useElementOnScreen'
import ReactHlsPlayer from 'react-hls-player'
import { VideoContext } from "./App";

const Video = ({ url, name, index }) => {
  const { isAudioMuted, setIsAudioMuted } = useContext(VideoContext);


  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef();
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  }
  const isVisibile = useElementOnScreen(options, playerRef)


  const onVideoClick = () => {

    if (isAudioMuted) {
      setIsAudioMuted(false)
      // setIsMuted(false)
    }
    else {
      setIsAudioMuted(true)
    }
  };

  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        if (!isMuted) {
          playerRef.current.muted = false;
        }
        playerRef.current.play();
        setPlaying(true)
      }
    }
    else {
      if (playing) {
        playerRef.current.pause();
        setPlaying(false)
      }
    }
  }, [isVisibile])



  return (
    <div className="video">
      <ReactHlsPlayer
      playsInline
        className="video_player snap-always snap-start"
        loop preload="true" playerRef={playerRef} onClick={onVideoClick}
        muted={true}
        src={url}
      />
      <p className='absolute z-50 top-[80%] left-4 text-white text-base font-semibold'>@{name}</p>
    </div>
  );
};
export default Video;



