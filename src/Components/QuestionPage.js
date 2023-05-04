import { connect } from "react-redux";
import "./QuestionPage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAddQuestionAnswer } from "../actions/shared";
import Redirector from "./Redirector";
import { useState } from "react";

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
  const { question, authorInfo, authedUserInfo, dispatch } = props;
  const [selectOption, setSelectOption] = useState(false);

  if (!authorInfo) {
    return <Redirector />;
  }

  const answerIds = Object.keys(authedUserInfo.answers);
  let needanswer = false;
  let showStats = true;
  let answer = null;

  let answer1Count = question.optionOne.votes.length;
  let answer2Count = question.optionTwo.votes.length;
  let answeredCount = answer1Count + answer2Count;
  let answer1 = false;
  let answer2 = false;

  if (!answerIds.includes(question.id)) {
    needanswer = true;
    showStats = false;
  }

  if (answerIds.includes(question.id)) {
    if (question.optionOne.votes.includes(authedUserInfo.id)) {
      answer1 = true;
    } else {
      answer2 = true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer === null) {
      return setSelectOption(true);
    }
    dispatch(
      handleAddQuestionAnswer({
        authedUser: authedUserInfo.id,
        qid: question.id,
        answer,
      })
    );
    console.log(answer);
    showStats = true;
    setSelectOption(false);
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
        {selectOption && (
          <h4 className="select-option" data-testid="select-option-message">
            MUST SELECT AT LEAST ONE OPTION!
          </h4>
        )}
        <div className="question-area">
          <label>Answer 1</label>
          {answer1 && <div className="answer">Your Answer</div>}
          <div className="answer-select">
            {needanswer && (
              <input
                id="optionOne"
                type="checkbox"
                onClick={(e) => updateOption(e, "optionOne")}
                data-testid="answer-checkbox"
              />
            )}

            <textarea
              id="optionOneText"
              readOnly={true}
              value={question.optionOne.text}
            />
            {showStats && (
              <div className="stats">
                <div>{(answer1Count / answeredCount).toFixed(2) * 100}%</div>
                <div>
                  {" "}
                  {answer1Count === 1
                    ? `${answer1Count} vote`
                    : `${answer1Count} votes`}
                </div>
              </div>
            )}
          </div>
          <label>Answer 2</label>
          {answer2 && <div className="answer">Your Answer</div>}
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
            {showStats && (
              <div className="stats">
                <div>{(answer2Count / answeredCount).toFixed(2) * 100}%</div>
                <div>
                  {" "}
                  {answer2Count === 1
                    ? `${answer2Count} vote`
                    : `${answer2Count} votes`}
                </div>
              </div>
            )}
          </div>
        </div>
        {needanswer && (
          <button type="submit" data-testid="answer-btn">
            Submit Answer
          </button>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.router.params;
  const author = !questions[id] ? null : questions[id].author;

  return {
    question: questions[id],
    authorInfo: users[author],
    authedUserInfo: users[authedUser],
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
