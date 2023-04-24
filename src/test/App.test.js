import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
import App from "../Components/App";

const store = createStore(reducer, middleware);

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
  // it("Snapshot: Renders HomePage once user is logged in", async () => {
  //   const component = render(
  //     <Provider store={store}>
  //       <Router>
  //         <App />
  //       </Router>
  //     </Provider>
  //   );
  //   setTimeout(() => {
  //     const select = component.getAllByTestId("user-select");
  //     fireEvent.change(select, { target: { value: "tylermcginnis" } });
  //     var submitButton = component.getByTestId("user-login-button");
  //     fireEvent.click(submitButton);
  //     expect(component).toMatchSnapshot();
  //   }, "3000");
  // });
});
