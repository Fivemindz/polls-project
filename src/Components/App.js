import { Fragment } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import Home from "./Home";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";

const App = (props) => {
  const { isLoading } = props;

  return (
    <Fragment>
      <LoadingBar />
      <div className="container" data-testid="home-page">
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
