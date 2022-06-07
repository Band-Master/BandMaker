import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FileUpload from "./FileUpload";
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Link to="/upload">New Song</Link>
      <FileUpload />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
