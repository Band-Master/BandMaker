import './App.css';
import PartPlayer from './Player/PartPlayer.jsx';
import React,{ useRef, useState, useEffect } from 'react';

const PartPlayBack = ({part, isSongPlaying}) => {
  const [isplaying, setisplaying] = useState(false);
  const [currentPart, setCurrentPart] = useState(part);

  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    }
    else {
      audioElem.current.pause();
    }
  }, [isplaying])


  useEffect(() => {
    if (isSongPlaying) {
      console.log("audioElem", audioElem);
      audioElem.current.currentTime = 0;
      setisplaying(true);
    } else {
      setisplaying(false);
    }
  }, [isSongPlaying])

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentPart({ ...currentPart, "progress": ct / duration * 100, "length": duration })

  }


  return (
    <div className="App">
      <audio src={currentPart.audioUrl} ref={audioElem} onTimeUpdate={onPlaying} />
      <PartPlayer part={part} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentPart={currentPart} setCurrentPart={setCurrentPart} />
    </div>
  );
}

export default PartPlayBack;