import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import Stats from "../Components/Stats";
import { handleInitialData } from "../actions/shared";

describe("Test Stats Component", () => {
  beforeAll(async () => {
    await store.dispatch(handleInitialData("tylermcginnis"));
  });

  it("Snapshot: Renders the Stats component", async () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <Stats />
        </Router>
      </Provider>
    );
    waitFor(() => {
      const statsTable = component.getByTestId("stats-table");
      expect(statsTable).toBeInTheDocument();
      expect(component).toMatchSnapshot();
    });
  });
});
