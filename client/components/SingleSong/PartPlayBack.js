import '../../public/App.css';
import PartPlayer from '../Player/PartPlayer.jsx';
import React,{ useRef, useState, useEffect } from 'react';

const PartPlayBack = ({part, isRunning, seconds, duration, setDuration }) => {
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
    if (isRunning) {
      audioElem.current.currentTime = seconds;
      setisplaying(true);
      if(isNaN(duration)) {
        setDuration(duration.current.duration)
      }
    } else {
      setisplaying(false);
    }
  }, [isRunning])

  const onPlaying = () => {
    if(isRunning) {
      const duration = audioElem.current.duration;
      const ct = seconds
      setCurrentPart({ ...currentPart, "progress": ct / duration * 100, "length": duration })
    }
    if(!isRunning) {
      const duration = audioElem.current.duration;
      const ct = audioElem.current.currentTime;
      setCurrentPart({ ...currentPart, "progress": ct / duration * 100, "length": duration })
    }
  }


  return (
    <div className="App">
      <audio src={currentPart.audioUrl} ref={audioElem} onTimeUpdate={onPlaying} />
      <PartPlayer part={part} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentPart={currentPart} setCurrentPart={setCurrentPart} duration={duration} setDuration={setDuration} />
    </div>
  );
}

export default PartPlayBack;