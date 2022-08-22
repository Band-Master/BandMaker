import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { fetchUserThunk } from "../store/singleUser";
import { Link } from "react-router-dom";
// import ImgForm from "./ImgForm";
// import CoverForm from './CoverForm';
import AddBand from "./AddBand";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { id } = props;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [newBand, setNewBand] = useState(false);

  useEffect(() => {
    dispatch(fetchUserThunk(id));
  }, [newBand]);
  
  return (
      <div id="main" className="App">
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
            <h2>Create Band</h2>
            <AddBand user={user} setNewBand={setNewBand} newBand={newBand}/>
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
