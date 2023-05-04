import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "../Components/App";
import { getUsers, handleInitialData } from "../actions/shared";

describe("Test App Component", () => {
  it("Snapshot:Renders the login page if user is not logged in", async () => {
    const setupLogin = async () => {
      return await store.dispatch(getUsers());
    };

    setupLogin();

    const component = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    setTimeout(() => {
      const loginForm = component.getByTestId("login-form");
      expect(loginForm).toBeInTheDocument();
    }, 2000);
  });

  it("Snapshot: Renders Dash once user is logged in", async () => {
    const setupData = async () => {
      return await store.dispatch(handleInitialData("tylermcginnis"));
    };

    setupData();

    const component = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    setTimeout(() => {
      const loginForm = component.getByTestId("login-form");
      expect(loginForm).toMatchSnapshot();
    }, 2000);
  });

  it("Dash test component is present once user has logged in", async () => {
    const setupData = async () => {
      return await store.dispatch(handleInitialData("tylermcginnis"));
    };

    setupData();

    const component = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    setTimeout(() => {
      const dash = component.getByTestId("dash");
      expect(dash).toBeInTheDocument();
    }, 2000);
  });
});
