import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Question from "./Question";
import "./Dash.css";

const Dash = (props) => {
  const { answered, unanswered, loadingBar } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    const updateData = () => {
      setData(unanswered);
    };

    if (!data || loadingBar.default) {
      updateData();
    }
  });

  const updateQuestions = (e, dataset) => {
    document.getElementsByClassName("btn-selector-active")[0].className =
      "btn-selector";
    e.target.className = "btn-selector-active";
    setData(dataset);
  };

  return (
    <div className="dashboard">
      <div>
        <div className="poll-selector">
          <button
            className="btn-selector-active"
            onClick={(e) => updateQuestions(e, unanswered)}
          >
            Unanswered
          </button>
          <div className="poll-seperator">|</div>
          <button
            className="btn-selector"
            onClick={(e) => updateQuestions(e, answered)}
          >
            Answered
          </button>
        </div>
        <div>
          <ul className="polls-table">
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
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser, loadingBar }) => {
  const questionIds = Object.keys(questions);
  const answeredQuestionIds = Object.keys(users[authedUser].answers);

  const answered = questionIds
    .filter((question) => {
      return answeredQuestionIds.includes(question);
    })
    .map((question) => {
      return questions[question];
    })
    .sort((a, b) => {
      return b.timestamp - a.timestamp;
    });

  const unanswered = questionIds
    .filter((question) => {
      return !answeredQuestionIds.includes(question);
    })
    .map((question) => {
      return questions[question];
    })
    .sort((a, b) => {
      return b.timestamp - a.timestamp;
    });

  return {
    answered,
    unanswered,
    authedUser,
    loadingBar,
  };
};

export default connect(mapStateToProps)(Dash);
