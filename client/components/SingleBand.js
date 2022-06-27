import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBandThunk } from "../store/singleBand";
import { Link } from "react-router-dom";

const SingleBand = (props) => {
  const band = useSelector((state) => state.band);
  const dispatch = useDispatch();
  useEffect(() => {
    const bandId = props.match.params.bandId;
    dispatch(fetchBandThunk(bandId));
  }, []);
  console.log("band", band);
  return (
    <div className="App">
      <h1>{band.name}</h1>
      <div className="loi">
        <div className="members_container">
        <h1>Members:</h1>
        {band.users
          ? band.users.map((user) => {
              return (
                <div>
                  <h3>{user.username}</h3>
                </div>
              );
            })
          : null}
          <Link to={`/bands/${band.id}/addMembers`}>Add Members</Link>
          </div>
      <div className="bands_container">
      <h1>Songs</h1>
        {band.songs
          ? band.songs.map((song) => {
              return (
                <div>
                  <Link to={`/songs/${song.id}`}>{song.title}</Link>
                </div>
              );
            })
          : null}
          <Link to={`/bands/${band.id}/addSong`}>Create Song</Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBand;
