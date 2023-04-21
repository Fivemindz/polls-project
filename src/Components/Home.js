import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
// import Question from "./Question";

const Home = (props) => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const { authedUser, dispatch } = props;

  useEffect(() => {
    const navigateToLogin = async () => {
      navigate("/login");
    };

    const loadHomePage = async () => {
      setMounted(true);
      dispatch(handleInitialData());
    };

    if (authedUser === null) {
      navigateToLogin();
    } else {
      if (mounted === false) {
        loadHomePage();
      }
    }

    return () => {
      setMounted(true);
    };
  }, []);

  return (
    <div>
      <h3 className="center">Your Poll Questions</h3>
      {/* <span>{authedUser}</span> */}
      <ul className="dashboard-list">
        {/* {initialData &&
          questionIds.map((id) => (
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
