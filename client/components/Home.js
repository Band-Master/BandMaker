import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { fetchUserThunk } from "../store/singleUser";
import { Link } from "react-router-dom";
import ImgForm from "./ImgForm";
import CoverForm from './CoverForm';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { id } = props;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserThunk(id));
  }, []);
  
  return (
    <div className="App">
        {/* <h2 className="App">Home</h2> */}
        <div className="pics_wrapper">
          {user.coverUrl ? 
          <div className="cover">
            <img src={user.coverUrl}/>
          </div> : 
          <div className="cover">
            <h5>upload cover picture</h5>
            <CoverForm user={user} />
          </div>
          }
          {user.imgUrl ? 
            <div className="id-section">
              <div className="circle">
                <img src={user.imgUrl} className="profile"/>
              </div>
              <div className="profile-id">
                <h3>{user.username}</h3>
              </div>
            </div>
            : 
            <div className="id-section">
              <div className="circle">
                <h5>upload profile picture</h5>
                <ImgForm user={user} id="formbar"/>
              </div>
            </div>
            }
        </div>
        <h2 className="user_bands_container">Your Bands</h2>
        {user.member ? user.member.map((band) => {
          return (
            <div key={band.id} className="bands_wrapper">
              <Link to={`/bands/${band.id}`}>{band.name}</Link>
              <h4>Bio: {band.bio}</h4>
            </div>
          );
        })
        : null}
        <div className="user_bands_container">
        <Link to={`/addBand`}>Create Band</Link>
        </div>
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
