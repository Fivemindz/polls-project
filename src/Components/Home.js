import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { handleInitialData } from "../actions/shared";
import Question from "./Question";

const Home = (props) => {
  const [mounted, setMounted] = useState(false);
  const { questions, authedUser } = props;

  const questionsArray = Object.values(questions);

  const answeredQuestions = questionsArray.filter((question) => {
    return question.author === authedUser;
  });

  console.log(answeredQuestions);

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
      {/* {questions && (
        <div>
          <h3 className="center">Your Poll Questions</h3>
          <div className="container">
            <span>{authedUser}</span>
          </div>
          <ul className="dashboard-list">
            {questions.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  questions,
  authedUser,
});

export default connect(mapStateToProps)(Home);
