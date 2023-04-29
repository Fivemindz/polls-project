import React from "react";
import { connect } from "react-redux";
import "./QuestionPage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = (props) => {
  const { question, authorInfo, authedUserInfo } = props;

  const answerIds = Object.keys(authedUserInfo.answers);
  let needanswer = false;
  let answer = "none";

  if (!answerIds.includes(question.id)) {
    needanswer = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(answer);
  };

  const updateOption = (e, option) => {
    Array.from(document.querySelectorAll("input[type=checkbox]")).forEach(
      (el) => (el.checked = false)
    );
    document.getElementById(option).checked = true;
    answer = option;
  };

  return (
    <div className="view-question">
      <h2>View Poll by {question.author} </h2>
      <img
        src={`.${authorInfo.avatarURL}`}
        alt="avatar"
        className="author-avatar"
      />
      <form className="view-question-form" onSubmit={handleSubmit}>
        <h3>Would You Rather?</h3>
        <div className="question-area">
          <label>Answer 1</label>
          <div className="answer-select">
            {needanswer && (
              <input
                id="optionOne"
                type="checkbox"
                onClick={(e) => updateOption(e, "optionOne")}
              />
            )}
            <textarea
              id="optionOneText"
              readOnly={true}
              value={question.optionOne.text}
            />
          </div>
          <label>Answer 2</label>
          <div className="answer-select">
            {needanswer && (
              <input
                id="optionTwo"
                type="checkbox"
                onClick={(e) => updateOption(e, "optionTwo")}
              />
            )}
            <textarea
              id="optionTwoText"
              readOnly={true}
              value={question.optionTwo.text}
            />
          </div>
        </div>
        {needanswer && <button type="submit">Submit Answer</button>}
      </form>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.router.params;
  const author = questions[id].author;

  return {
    question: questions[id],
    authorInfo: users[author],
    authedUserInfo: users[authedUser],
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
