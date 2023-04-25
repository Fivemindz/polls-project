import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import Banner from "./Banner";
import Nav from "./Nav";
import Dash from "./Dash";
import Stats from "./Stats";
import NewQuestion from "./NewQuestion";

const App = (props) => {
  const { loading } = props;
  useEffect(() => {}, [loading]);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container" data-testid="home-page">
        {loading === true ? (
          <Login />
        ) : (
          <div className="dash-body">
            <Banner />
            <Nav />
            <Routes>
              <Route path="/" exact element={<Dash />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/newquestion" element={<NewQuestion />} />
            </Routes>
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
