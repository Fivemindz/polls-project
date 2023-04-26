import React from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

const Banner = (props) => {
  const { dispatch } = props;

  const handleSignOut = () => {
    dispatch(setAuthedUser(null));
  };

  return (
    <div className="user-banner">
      <div className="user-info"></div>
      <div className="banner-spacer"></div>
      <div className="btn-container">
        <button className="sign-out-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default connect()(Banner);
