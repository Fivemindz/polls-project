import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import Home from "./Home";
import Login from "./Login";
import { Routes, Route, useNavigate } from "react-router-dom";

const App = (props) => {
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();
  const { authedUser, isLoading } = props;

  useEffect(() => {
    if (!initialized) {
      if (authedUser === undefined) {
        console.log("Navigating to login");
        navigate("/login");
      }
      setInitialized(true);
    }
  });

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        {isLoading ? null : (
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
