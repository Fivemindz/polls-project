import React from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import "./Banner.css";

const Banner = (props) => {
  const { authedUser, userPic, dispatch } = props;

  const handleSignOut = () => {
    dispatch(setAuthedUser(null));
  };

  return (
    <div className="user-banner">
      <div className="user-info">
        <img src={userPic} alt="avatar" className="avatar" />
        <div className="user-name"> {authedUser}</div>
      </div>
      <div className="banner-spacer"></div>
      <div className="btn-container">
        <button className="sign-out-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  userPic: users[authedUser].avatarURL,
});

export default connect(mapStateToProps)(Banner);
