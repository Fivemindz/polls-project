import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Home from "./Home";
import LoadingBar from "react-redux-loading-bar";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import { handleInitialData } from "../actions/shared";

const App = (props) => {
  useEffect(() => {
    console.log("Rerender");
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        {props.LoadingBar === true ? null : (
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
