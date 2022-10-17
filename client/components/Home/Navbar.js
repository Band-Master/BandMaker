import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
import Sidebar from "./SideBar";

const Navbar = ({ handleClick, isLoggedIn, id }) => (
  <div id="sidebar">
    <nav id="sidebar">
      <h1>Band-Maker</h1>
      {isLoggedIn ? (
        <div >
          {/* The navbar will show these links after you log in */}
          <Sidebar props={id}/>
          <div className="nav_container">
          <Link to="/home">Home</Link>
          </div>
          <div className="nav_container">
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    id: state.auth.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
