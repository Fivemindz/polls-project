import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import Banner from "./Banner";
import Nav from "./Nav";
import Dash from "./Dash";
import Stats from "./Stats";
import NewQuestion from "./NewQuestion";
import "./App.css";
import { getUsers } from "../actions/shared";
import QuestionPage from "./QuestionPage";
import Loading from "./Loading";
import PageNotFound from "./PageNotFound";

const App = (props) => {
  const { loading, dispatch, loadingBar } = props;
  const [usersLoaded, setUsersLoaded] = useState(false);

  useEffect(() => {
    const handleLoadUsers = async () => {
      await dispatch(getUsers());
      setUsersLoaded(true);
    };

    if (usersLoaded === false) {
      handleLoadUsers();
    }

    return () => {
      setUsersLoaded(true);
    };
  });

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
            {loadingBar ? (
              <div className="dash-loading">
                <Loading />
              </div>
            ) : (
              <Routes>
                <Route path="/" exact element={<Dash />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/newquestion" element={<NewQuestion />} />
                <Route path="/question/:id" element={<QuestionPage />} />
                <Route path="/notfound" element={<PageNotFound />} />
              </Routes>
            )}
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
