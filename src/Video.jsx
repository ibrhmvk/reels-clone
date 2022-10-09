import React, { useEffect, useRef, useState } from "react";
import "./Video.css";
import useElementOnScreen from './hooks/useElementOnScreen'
import ReactHlsPlayer from 'react-hls-player'

const Video = ({ url, name }) => {
  const [playing, setPlaying] = useState(false);
  const playerRef = React.useRef();
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  }
  const isVisibile = useElementOnScreen(options, playerRef)
  const onVideoClick = () => {
    if (playing) {
      playerRef.current.pause();
      setPlaying(!playing);
    } else {
      playerRef.current.play();
      setPlaying(!playing);
    }
  };
  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
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
      className="video_player snap-always snap-start"
      loop preload="true" playerRef={playerRef} onClick={onVideoClick}
      src={url}
      />
      <p className='absolute z-50 top-[80%] left-4 text-white text-base font-semibold'>@{name}</p>
    </div>
  );
};
export default Video;



