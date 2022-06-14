import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongThunk } from "../store/singleSong";

const SingleSong = (props) => {
  const song = useSelector((state) => state.song);
  const dispatch = useDispatch();
  useEffect(() => {
    const songId = props.match.params.songId;
    dispatch(fetchSongThunk(songId));
  }, []);
  return (
    <div>
      <h1>{song.title}</h1>
      <h2>Parts</h2>
      {song.parts
        ? song.parts.map((part) => {
            return (
              <div>
                <h3>{part.name}</h3>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default SingleSong;
