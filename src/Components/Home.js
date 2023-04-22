import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { handleInitialData } from "../actions/shared";
import Question from "./Question";

const Home = (props) => {
  const [mounted, setMounted] = useState(false);
  const { authedUser, dispatch, questionIds } = props;

  useEffect(() => {
    const loadHomePage = async () => {
      dispatch(handleInitialData());
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
      {questionIds && (
        <div>
          <h3 className="center">Your Poll Questions</h3>
          <div className="container">
            <span>{authedUser}</span>
          </div>
          <ul className="dashboard-list">
            {questionIds.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions }) => ({
  authedUser,
  questionIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  ),
});

export default connect(mapStateToProps)(Home);
