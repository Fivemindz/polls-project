import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import NewQuestion from "../Components/NewQuestion";
import { handleInitialData } from "../actions/shared";

describe("Test NewQuestion component ", () => {
  beforeAll(async () => {
    await store.dispatch(handleInitialData("tylermcginnis"));
  });

  it("Snapshot: Renders the NewQuesion form", async () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <NewQuestion />
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it("Test question has been added after all expected fields are populated", async () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <NewQuestion />
        </Router>
      </Provider>
    );

    const text1 = component.getByTestId("question-text-1");
    const text2 = component.getByTestId("question-text-2");
    const btn = component.getByTestId("question-submit-btn");
    fireEvent.change(text1, { target: { value: "option 1" } });
    fireEvent.change(text2, { target: { value: "option 2" } });
    fireEvent.click(btn);

    waitFor(async () => {
      await component.getByTestId("dash");
      const dash = component.getByTestId("dash");
      expect(dash).toBeInTheDocument();
    });
  });

  it("Test question will not add if fields are not populated", async () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <NewQuestion />
        </Router>
      </Provider>
    );

    const btn = component.getByTestId("question-submit-btn");
    fireEvent.click(btn);
    waitFor(async () => {
      await component.getByTestId("dash");
      const questionForm = component.getByTestId("new-question-form");
      expect(questionForm).toBeInTheDocument();
    });
  });
});
