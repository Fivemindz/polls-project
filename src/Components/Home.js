import { connect } from "react-redux";
import Question from "./Question";
import { handleInitialData } from "../actions/shared";
import { useEffect } from "react";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
    console.log("Rerender");
  });

  return (
    <div>
      <h3 className="center">Your Poll Questions</h3>
      {/* <span>{props.authedUser}</span> */}
      <ul className="dashboard-list">
        {/* {props.questionIds &&
          props.questionIds.map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))} */}
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
