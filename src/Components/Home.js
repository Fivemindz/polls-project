import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Question from "./Question";

const Home = (props) => {
  const [mounted, setMounted] = useState(false);
  const { authedUser, answeredQuestions, unansweredQuestions } = props;

  useEffect(() => {
    const loadHomePage = async () => {
      setMounted(true);
    };

    if (mounted === false) {
      loadHomePage();
    }

    return () => {
      setMounted(true);
    };
  }, []);

  return (
    <div>
      {answeredQuestions && (
        <div>
          <h3 className="center">Your Poll Questions</h3>
          <div className="container">
            <span>{authedUser}</span>
          </div>
          <div className="container">
            <h3 className="center">Answered Questions</h3>
            <ul className="dashboard-list">
              {answeredQuestions.map((question) => (
                <li key={question.id}>
                  <Question question={question} />
                </li>
              ))}
            </ul>
          </div>
          <div className="container">
            <h3 className="center">Unanswered Questions</h3>
            <ul className="dashboard-list">
              {unansweredQuestions.map((question) => (
                <li key={question.id}>
                  <Question question={question} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
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

export default connect(mapStateToProps)(Home);
