import React, { useEffect, useState} from 'react'
import './App.css'
import {InboxIcon, HomeIcon, ProfileIcon, SearchIcon ,BarIcon, AddIcon } from "./icons/TabBar"
import VideoJS from './VideoJs'


const API_URL =
  'https://63149e7ffc9dc45cb4f082c1.mockapi.io/videos'

export default function App() {
  const [videos, setVideos] = useState([])
  const playerRef = React.useRef(null);
  const [isVisible, setIsVisible] = useState(0)

  useEffect(() => {
    fetch(API_URL)
      .then((data) => data.json())
      .then((data) => setVideos(data))
  }, [])

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <div className="app ">
       
      <div className="video-container snap-mandatory snap-y scrollbar-hide shadow-2xl relative" >
        {videos.map((item, index) => <VideoJS options={{
          autoplay: isVisible === index,
          controls: true,
          loop : true,
          paused: isVisible != index,
          responsive: true,
          fluid: true,
          userActions: {
            doubleClick: false
          },
          sources: [{
            src: item.video,
            type: 'application/x-mpegURL'
          }]
        }} onReady={handlePlayerReady} />
        )}
        <div className='bg-black flex p-5 justify-between w-[42.770vh] fixed z-50 top-[85%]'>
        <HomeIcon/>
        <SearchIcon/>
        <AddIcon/>
        <InboxIcon/>
        <ProfileIcon/>
       </div>
      </div> 
      
    </div>
  )
}
