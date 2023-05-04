import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import App from "../Components/App";

describe("Save Question Workflow", () => {
  beforeAll(async () => {
    await store.dispatch(handleInitialData("tylermcginnis"));
  });

  it("Snapshot: Renders QuestionPage after clicking on question from dashboard", () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    const link = component.getAllByText("sarahedo");
    fireEvent.click(link[0]);
    expect(component).toMatchSnapshot();
  });

  it("Loads stats for question after answer is submitted", async () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    const link = component.getAllByText("tylermcginnis");
    fireEvent.click(link[0]);

    const answerCheckbox = component.getByTestId("answer-checkbox");
    const btn = component.getByTestId("answer-btn");
    fireEvent.click(answerCheckbox);
    fireEvent.click(btn);

    expect(component).toMatchSnapshot();
  });

  it("Displays message when user trys to submit without answer", () => {
    const component = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    const link = component.getAllByText("tylermcginnis");
    fireEvent.click(link[0]);

    const btn = component.getByTestId("answer-btn");
    fireEvent.click(btn);

    waitFor(() => {
      const selectOptionMessage = component.getByTestId(
        "select-option-message"
      );
      expect(selectOptionMessage).toBeInTheDocument();
    });
  });
});
