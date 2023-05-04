import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "../Components/App";
import { handleInitialData } from "../actions/shared";

describe("Test App Component", () => {
  it("Snapshot:Renders the login page if user is not logged in", () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
  it("Snapshot: Renders Dash once user is logged in", async () => {
    const setupData = async () => {
      return store.dispatch(handleInitialData("tylermcginnis"));
    };

    await setupData();

    const component = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
