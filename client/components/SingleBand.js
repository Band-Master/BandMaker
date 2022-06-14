import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBandThunk } from "../store/singleBand";
import { Link } from "react-router-dom";

const SingleBand = (props) => {
  const band = useSelector((state) => state.band);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(props);
    const bandId = props.match.params.bandId;
    dispatch(fetchBandThunk(bandId));
  }, []);
  return (
    <div>
      <h1>{band.name}</h1>
      <h3>
        Members... need to make api route and thunk. use magic method for
        through table?
      </h3>
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
    </div>
  );
};

export default SingleBand;
