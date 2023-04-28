import React, { useRef } from "react";
import { connect } from "react-redux";
import "./NewQuestion.css";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const NewQuestion = (props) => {
  const { authedUser, userPic, dispatch } = props;

  const navigate = useNavigate();

  const optionOneText = useRef("");
  const optionTwoText = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      handleAddQuestion(optionOneText.current, optionTwoText.current)
    );
    optionOneText.current = "";
    optionTwoText.current = "";

    navigate("/");
  };

  return (
    <div className="new-question">
      <h2>New Poll by {authedUser} </h2>
      <img src={userPic} alt="avatar" className="avatar" />
      <span></span>
      <form className="new-question-form" onSubmit={handleSubmit}>
        <h3>Would You Rather?</h3>
        <div className="question-area">
          <label>Answer 1</label>
          <textarea
            id="optionOneText"
            onChange={(e) => (optionOneText.current = e.target.value)}
          />
          <label>Answer 2</label>
          <textarea
            id="optionTwoText"
            onChange={(e) => (optionTwoText.current = e.target.value)}
          />
        </div>
        <button
          className="question-submit-btn"
          type="submit"
          disabled={
            optionOneText.current.length !== 0 ||
            optionTwoText.current.length !== 0
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  userPic: users[authedUser].avatarURL,
});

export default connect(mapStateToProps)(NewQuestion);
