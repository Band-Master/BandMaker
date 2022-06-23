import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStopwatch } from 'react-timer-hook';
import { fetchSongThunk } from "../store/singleSong";
import PartPlayBack from "./PartPlayBack";
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillReplyFill} from 'react-icons/bs';
import PartForm from './PartForm';


const SingleSong = (props) => {
  const {parts} = useSelector((state) => state.song);
  const song = useSelector((state) => state.song);
  const [submit, setSubmit] = useState(false);
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false, offsetTimestamp: 0 });
  const [duration, setDuration] = useState(300)

  const clickRef = useRef();

  const checkWidth = (e)=>
  {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = offset / width * 100;
    const time = new Date();
    time.setSeconds(time.getSeconds() + (divprogress / 100 * duration));
    reset(time, false);
    console.log(time);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    const songId = props.match.params.songId;
    dispatch(fetchSongThunk(songId));
  }, [submit]);


  return (
    <div className="songs_container">
      <div style={{fontSize: '60px'}}>{song.song.title}</div>
      <ul className="loi">
        {parts.length ?
          <div className='song_container'>
            <div style={{fontSize: '30px'}}>
              <p>main</p>
            </div>
            <div className="navigation">
              <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
                <div className="seek_bar" style={{width: `${seconds+"%"}`}}></div>
              </div>
                <div className="controls_wrapper">
                  <div style={{fontSize: '80px'}}>
                    <span>{minutes}</span>:<span>{seconds}</span>
                  </div>
                  {isRunning ? <BsFillPauseCircleFill className='btn_action pp' onClick={pause}/> : <BsFillPlayCircleFill className='btn_action pp' onClick={start}/>} 
                  <BsFillReplyFill className='btn_action pp' onClick={reset} />
                </div>
            </div>
          </div>
         : null}
        </ul>
      <ul className="loi">
        {parts.length
          ? parts.map((part) => <PartPlayBack part={part} key={part.id} isRunning={isRunning} seconds={seconds}/>) 
          : null}
        {song ? <PartForm setSubmit={setSubmit} submit={submit} /> : null}
      </ul>
    </div>
  );
};

export default SingleSong;
