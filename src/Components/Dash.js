import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Question from "./Question";
import "./Dash.css";

const Dash = (props) => {
  const [data, setData] = useState(null);
  const { answeredQuestions, unansweredQuestions } = props;

  useEffect(() => {
    if (data === null) {
      setData(answeredQuestions);
    }
  }, [data, answeredQuestions]);

  const updateQuestions = (e, dataset) => {
    document.getElementsByClassName("btn-selector-active")[0].className =
      "btn-selector";
    e.target.className = "btn-selector-active";
    setData(dataset);
  };

  return (
    <div className="dashboard">
      <div className="poll-selector">
        <button
          className="btn-selector-active"
          onClick={(e) => updateQuestions(e, answeredQuestions)}
        >
          Answered
        </button>
        <div className="poll-seperator">|</div>
        <button
          className="btn-selector"
          onClick={(e) => updateQuestions(e, unansweredQuestions)}
        >
          Unanswered
        </button>
      </div>
      <div className="polls-table">
        <ul>
          {data &&
            data.map((question) => {
              return (
                <li className="question" key={question.id}>
                  <Question question={question} />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions }) => ({
  authedUser,
  answeredQuestions: Object.values(questions).filter((question) => {
    return question.optionOne.votes.includes(authedUser);
  }),
  unansweredQuestions: Object.values(questions).filter((question) => {
    return !question.optionOne.votes.includes(authedUser);
  }),
});

export default connect(mapStateToProps)(Dash);
