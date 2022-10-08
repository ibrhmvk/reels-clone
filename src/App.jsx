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
  const [loading, setLoading] = useState(true)
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [error, setError] = useState(null);

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
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setVideos(actualData);
        setCurrentPlayer(actualData[0].video)
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setVideos(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onVideoClick = (id) => {
    setCurrentPlayer(id);
  };

  console.log(currentPlayer)
  return (
    <div className="app">
      {loading && <div>Loading...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <div className="video-container  snap-mandatory snap-y scrollbar-hide shadow-2xl relative" id="video" >
        {videos && videos.map((item, index) =>
          <button onClick={() => onVideoClick(item.video)} key={index} className='relative' >
            <ReactPlayer
              ref={vidRef}
              className="snap-always snap-start "
              playing={currentPlayer === item.video}
              width='43.6vh'
              loop
              height='77.7vh'
              url={item.video} />
            <p className='absolute z-50 top-[85%] left-4 text-white text-base font-semibold'>@{item.name}</p>
          </button>
        )}
        <div className='bg-black flex p-5 justify-between w-[43.6vh] fixed z-50 top-[87%] items-center'>
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
  );
}


//   return (
//     <div className="app ">
//       {/* 
//       {loading ?
//         <div className="w-full bg-slate-200">

//         </div> : */}
//       <div className="video-container  snap-mandatory snap-y scrollbar-hide shadow-2xl relative" id="video" >
//         {videos.map((item, index) =>
//             <button onClick={() => onVideoClick(item.video)} key={index} className='relative' >
//               <ReactPlayer
//                 ref={vidRef}
//                 className="snap-always snap-start "
//                 playing={currentPlayer === item.video}
//                 width='43.6vh'
//                 loop
//                 height='77.7vh'
//                 url={item.video} />
//               <p className='absolute z-50 top-[85%] left-4 text-white text-base font-semibold'>@{item.name}</p>
//             </button>
//         )}
//         <div className='bg-black flex p-5 justify-between w-[43.6vh] fixed z-50 top-[87%] items-center'>
//           <div className='w-[20px] flex flex-col justify-center items-center'>
//             <HomeIcon />
//             <p className='text-white text-[8px]'>Home</p>
//           </div>
//           <div className='flex flex-col justify-center items-center'>
//             <div className='w-[20px]'>
//               <SearchIcon />
//             </div>
//             <p className='text-white text-[8px]'>Discover</p>
//           </div>
//           <div className='w-[40px]'>
//             <AddIcon />
//           </div>
//           <div className='w-[20px] flex flex-col justify-centeritems-center'>
//             <InboxIcon />
//             <p className='text-white text-[8px]'>Inbox</p>
//           </div>
//           <div className='w-[20px] flex flex-col justify-center items-center'>
//             <ProfileIcon />
//             <p className='text-white text-[8px]'>Me</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
