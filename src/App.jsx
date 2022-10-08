import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { InboxIcon, HomeIcon, ProfileIcon, SearchIcon, BarIcon, AddIcon } from "./icons/TabBar"
// import VideoJS from './VideoJs'
import ReactPlayer from 'react-player'


const API_URL =
  'https://63149e7ffc9dc45cb4f082c1.mockapi.io/videos'

export default function App() {
  const [videos, setVideos] = useState([])
  const playerRef = React.useRef(null);
  const [loading, setloading] = useState(true)
  const [isVideoPlaying, setisVideoPlaying] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('');

  const vidRef = useRef();

  useEffect(() => {
    const scroll = document.getElementById("video");

    if (scroll) {
      scroll.addEventListener("scroll", (e) => {
        console.log('scrolling')
        setCurrentPlayer('asdas')
      });
    }
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((data) => data.json())
      .then((data) => {
        setVideos(data)
        setCurrentPlayer(data[0].video)
        setloading(false)
      })
  }, [])


  const onVideoClick = (id) => {
    setCurrentPlayer(id);
  };

  console.log(currentPlayer)


  return (
    <div className="app ">
      {/* 
      {loading ?
        <div className="w-full bg-slate-200">

        </div> : */}
      <div className="video-container  snap-mandatory snap-y scrollbar-hide shadow-2xl relative" id="video" >
        {videos.map((item, index) =>
          <div className='relative'>
            <button onClick={() => onVideoClick(item.video)} key={index} >
              <ReactPlayer
                ref={vidRef}
                className="snap-always snap-start "
                playing={currentPlayer === item.video}
                width='100%'
                loop
                height='100%'
                url={item.video} />
              <p className='absolute z-50 top-[85%] left-4 text-white text-base font-semibold'>@{item.name}</p>
            </button>
          </div>
        )}
        <div className='bg-black flex p-5 justify-between w-[42.760vh] fixed z-50 top-[85%] items-center'>
          <div className='w-[20px] flex flex-col justify-center items-center'>
            <HomeIcon />
            <p className='text-white text-[8px]'>Home</p>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <div className='w-[20px]'>
              <SearchIcon />
            </div>
            <p className='text-white text-[8px]'>Discover</p>
          </div>
          <div className='w-[40px]'>
            <AddIcon />
          </div>
          <div className='w-[20px] flex flex-col justify-centeritems-center'>
            <InboxIcon />
            <p className='text-white text-[8px]'>Inbox</p>
          </div>
          <div className='w-[20px] flex flex-col justify-center items-center'>
            <ProfileIcon />
            <p className='text-white text-[8px]'>Me</p>
          </div>
        </div>
      </div>
    </div>
  )
}
