import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Question from "./Question";

const Home = (props) => {
  const [mounted, setMounted] = useState(false);
  const { authedUser, answeredQuestions, unansweredQuestions } = props;

  useEffect(() => {
    if (mounted === false) {
      setMounted(true);
    }

    return () => {
      setMounted(true);
    };
  }, []);

  return (
    <div className="home-body">
      <div className="user-banner"></div>
      <div className="nav-bar"></div>
      <div className="main-app"></div>
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
