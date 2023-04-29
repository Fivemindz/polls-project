import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Question from "./Question";
import "./Dash.css";

const Dash = (props) => {
  const [data, setData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const { answered, unanswered, loadingBar } = props;

  useEffect(() => {
    const handleLoadData = () => {
      setData(unanswered);
      setDataLoaded(true);
    };

    if (dataLoaded === false && data === undefined) {
      handleLoadData();
    }

    return () => {
      setDataLoaded(true);
    };
  });

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
        {loadingBar ? null : (
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
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions }) => {
  const answered = Object.values(questions)
    .filter((question) => {
      return question.optionOne.votes.includes(authedUser);
    })
    .sort((a, b) => {
      return b.timestamp - a.timestamp;
    });
  const unanswered = Object.values(questions)
    .filter((question) => {
      return !question.optionOne.votes.includes(authedUser);
    })
    .sort((a, b) => {
      return b.timestamp - a.timestamp;
    });

  return {
    authedUser,
    answered,
    unanswered,
  };
};

export default connect(mapStateToProps)(Dash);
