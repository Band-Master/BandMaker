import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongThunk } from "../store/singleSong";
import PartPlayBack from "./PartPlayBack";
import {BsFillPlayCircleFill, BsFillPauseCircleFill} from 'react-icons/bs';


const SingleSong = (props) => {
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const {parts} = useSelector((state) => state.song);
  const song = useSelector((state) => state.song);

  const PlayPause = ()=>
  {
    setIsSongPlaying(!isSongPlaying);

  }

  const dispatch = useDispatch();
  useEffect(() => {
    const songId = props.match.params.songId;
    dispatch(fetchSongThunk(songId));
  }, []);

  console.log("parts",parts, "title", song.song.title, "song", song);

  return (
    <div>
      <h1>{song.song.title}</h1>
      <h2>Parts</h2>
      <ul className="loi">
        {parts.length
          ? parts.map((part) => <PartPlayBack part={part} key={part.id} isSongPlaying={isSongPlaying}/>) 
          : null}
        {parts.length ?
          <div className='player_container'>
            <div className="title">
              <p>{song.song.title}</p>
            </div>
            <div className="controls">
              {isSongPlaying ? <BsFillPauseCircleFill className='btn_action pp' onClick={PlayPause}/> : <BsFillPlayCircleFill className='btn_action pp' onClick={PlayPause}/>}     
            </div>
          </div>
         : null}
      </ul>
      
    </div>
  );
};

export default SingleSong;
