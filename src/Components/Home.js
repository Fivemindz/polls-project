import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import Question from "./Question";

const Home = (props) => {
  const [initialData, setInitialData] = useState(false);
  const { authedUser, dispatch, questionIds } = props;

  useEffect(() => {
    const getInitialData = () => {
      dispatch(handleInitialData());
      setInitialData(true);
    };
    if (initialData === false) {
      if (authedUser !== null) {
        getInitialData();
      }
    }
  });

  return (
    <div>
      <h3 className="center">Your Poll Questions</h3>
      <span>{initialData && authedUser}</span>
      <ul className="dashboard-list">
        {initialData &&
          questionIds.map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
      </ul>
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
