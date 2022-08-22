import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStopwatch } from 'react-timer-hook';
import { fetchSongThunk } from "../store/singleSong";
import PartPlayBack from "./PartPlayBack";
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillReplyFill} from 'react-icons/bs';
import PartForm from './PartForm';
import { Link } from "react-router-dom";


const SingleSong = (props) => {
  const {parts, audio} = useSelector((state) => state.song);
  const song = useSelector((state) => state.song);
  const band = useSelector((state) => state.band);
  const [submit, setSubmit] = useState(false);
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });
  const [duration, setDuration] = useState(null);

  const clickRef = useRef();

  const totalSeconds = seconds + (minutes * 60);
  
  const checkWidth = (e)=>
  {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divprogress = offset / width * 100;
    const stateTime = (divprogress / 100 * duration);
    const stateMinutes = (divprogress / 100 * duration)/60;
    const stopwatchOffset = new Date();
    stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + stateTime);
    reset(stopwatchOffset, false);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    const songId = props.match.params.songId;
    dispatch(fetchSongThunk(songId));
  }, [submit]);

  useEffect(() => {
    if(parts.length) {
      if(audio.length === parts.length) {
        audio.sort((a,b)=>{return a.current.duration-b.current.duration})
        setDuration(audio[0]);
        console.log("audio array",audio, "duration", duration );
      }
    }
  }, [audio]);

  return (
    <div className="songs_container">
      <div style={{fontSize: '60px'}}>{song.song.title}</div>
      <ul className="loi">
        <Link to={`/bands/${band.id}`} style={{fontSize: '20px', color: 'white'}}>Back</Link>
        {duration ?
          <div className='song_container'>
            <div style={{fontSize: '30px'}}>
              <p>main</p>
            </div>
            <div className="navigation">
              <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
                <div className="seek_bar" style={{width: `${((totalSeconds/duration)*100)+"%"}`}}></div>
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
          ? parts.map((part) => <PartPlayBack part={part} key={part.id} isRunning={isRunning} seconds={totalSeconds} duration={duration} setDuration={setDuration} />) 
          : null}
        {song ? <PartForm setSubmit={setSubmit} submit={submit} /> : null}
      </ul>
    </div>
  );
};

export default SingleSong;
