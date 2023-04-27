import React, { useState } from "react";
import { connect } from "react-redux";
import "./NewQuestion.css";

const NewQuestion = (props) => {
  const { authedUser, userPic } = props;

  const [answer1, setAnswer1] = useState();
  const [answer2, setAnswer2] = useState();

  const handleSubmit = (e) => {};

  const handleChange = (e) => {
    console.log(e.target.id);
  };

  return (
    <div className="new-question">
      <h2>New Poll by {authedUser} </h2>
      <img src={userPic} alt="avatar" className="avatar" />
      <span></span>
      <form className="new-question-form" onSubmit={handleSubmit}>
        <h3>Would You Rather?</h3>
        <textarea
          id="answer1"
          value={answer1}
          onChange={handleChange}
        ></textarea>
        <textarea
          id="answer2"
          value={answer2}
          onChange={handleChange}
        ></textarea>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  userPic: users[authedUser].avatarURL,
});

export default connect(mapStateToProps)(NewQuestion);
