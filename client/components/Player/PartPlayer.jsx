import React, { useRef, useEffect } from 'react';
import './player.scss';
import {BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { addAudioThunk } from '../../store/singleSong';


const PartPlayer = ({audioElem, isplaying, setisplaying, part, currentPart, duration, setDuration})=> {

  const clickRef = useRef();

  const PlayPause = ()=>
  {
    setisplaying(!isplaying);

  }
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(addAudioThunk(audioElem));
  }, []);


  const checkWidth = (e)=>
  {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = offset / width * 100;
    audioElem.current.currentTime = divprogress / 100 * audioElem.current.duration;

  }

  return (
    <div className='player_container'>
      <div className="title">
        <p>{part.name}</p>
      </div>
      <div className="navigation">
        <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef} style={{width: `${(duration / currentPart.length) +"%"}`}}>
          <div className="seek_bar" style={{width: `${currentPart.progress+"%"}`}}></div>
        </div>
        <div className="controls_wrapper">
            {isplaying ? <BsFillPauseCircleFill className='btn_action pp' onClick={PlayPause}/> : <BsFillPlayCircleFill className='btn_action pp' onClick={PlayPause}/>}      
        </div>
      </div>
    </div>
  
  )
}

export default PartPlayer