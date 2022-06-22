import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { fetchUserThunk } from "../store/singleUser";
import { Link } from "react-router-dom";
import ImgForm from "./ImgForm";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { id } = props;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserThunk(id));
  }, [id, user.imgUrl]);

  return (
    <div className="loi">
      <h2>Welcome, {user.username}</h2>
      {user.imgUrl ? <img src={user.imgUrl}/> : <ImgForm user={user}/>}
      <h1>Your bands</h1>
      <h2>
        {user.member
          ? user.member.map((band) => {
              return (
                <div key={band.id}>
                  <Link to={`/bands/${band.id}`}>{band.name}</Link>
                  <h4>Bio: {band.bio}</h4>
                </div>
              );
            })
          : () => "Create Band"}
      </h2>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    id: state.auth.id,
  };
};

export default connect(mapState)(Home);
