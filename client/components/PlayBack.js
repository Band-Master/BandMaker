import './App.css';
import Player from './Player/Player.jsx';
import React,{ useRef, useState, useEffect } from 'react';

const PlayBack = ({songs}) => {
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState([...songs]);

  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    }
    else {
      audioElem.current.pause();
    }
  }, [isplaying])

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration })

  }


  return (
    <div className="App">
      <audio src={currentSong.map((song) => song.audioUrl)} ref={audioElem} onTimeUpdate={onPlaying} />
      <Player songs={songs} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} />
    </div>
  );
}

export default PlayBack;