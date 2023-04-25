import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Question from "./Question";

const Dash = (props) => {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState(null);
  const { authedUser, answeredQuestions, unansweredQuestions } = props;

  useEffect(() => {
    if (mounted === false) {
      setMounted(true);
      updateQuestions(answeredQuestions);
    }

    return () => {
      setMounted(true);
    };
  }, []);

  const updateQuestions = (dataset) => {
    setData(dataset);
  };

  return (
    <div className="dashboard">
      <div className="poll-selector">
        <button
          className="btn-selector"
          onClick={() => updateQuestions(answeredQuestions)}
        >
          Answered
        </button>
        <button
          className="btn-selector"
          onClick={() => updateQuestions(unansweredQuestions)}
        >
          Unanswered
        </button>
      </div>
      <div className="center">
        <ul>
          {data &&
            data.map((question) => {
              return (
                <li className="question" key={question.id}>
                  {" "}
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
