import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBandThunk } from "../store/singleBand";
import { Link } from "react-router-dom";
import { deleteSongThunk } from "../store/singleSong";
import AddSong from "./AddSong";

const SingleBand = (props) => {
  const band = useSelector((state) => state.band);
  const [deleteId, setDeleteId] = useState(null)
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const bandId = props.match.params.bandId;
    dispatch(fetchBandThunk(bandId));
  }, [deleted]);
  useEffect(() => {
    if(deleteId) {
      const bandId = props.match.params.bandId;
      dispatch(deleteSongThunk(deleteId, bandId));
      setDeleted(!deleted);
    }
  }, [deleteId])
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
                <div className="songs_container">
                  <Link to={`/songs/${song.id}`}>{song.title}</Link> <button onClick={() => setDeleteId(song.id)}>X</button>
                </div>
              );
            })
          : null}
          <h2>Create new song</h2>
          <h4>add title and bpm</h4>
          <AddSong bandId={band.id} deleted={deleted} setDeleted={setDeleted}/>
        </div>
      </div>
    </div>
  );
};

export default SingleBand;
