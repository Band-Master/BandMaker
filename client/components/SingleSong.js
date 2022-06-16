import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongThunk, SetCurrent } from "../store/singleSong";
import Controls from "./playBack/Controls";


const SingleSong = (props) => {
  const song = useSelector((state) => state.song);
  const { currentPart, parts } = song
  const dispatch = useDispatch();
  useEffect(() => {
    const songId = props.match.params.songId;
    dispatch(fetchSongThunk(songId));
  }, [currentPart]);
  console.log(song);
  return (
    <div>
      <h1>{song.title}</h1>
      <h2>Parts</h2>
      <ul className="loi">
        {parts
          ? parts.map((part, i) => (
              <li
                className={
                  "songContainer " + (currentPart === i ? "selected" : "")
                }
                key={i}
                onClick={() => {
                  dispatch(SetCurrent(i));
                }}
              >
                <div className="tmbn_song">
                  <i className="fas fa-play"></i>
                </div>
                <div className="songmeta_playlist">
                  <span className="songname">{part.name}</span>
                  <span className="songauthors">Artist:{part.userId}</span>
                </div>
                <div className="playlist_btns_group">
                  <button className="fav_song playlist_btn">
                    <i className="far fa-heart fa-lg"></i>
                  </button>
                  <button className="options_song playlist_btn">
                    <i className="fas fa-ellipsis-v fa-lg"></i>
                  </button>
                </div>
              </li>
            ))
            : null}
            {parts ? <Controls props={song} /> : null}
      </ul>
    </div>
  );
};

export default SingleSong;
