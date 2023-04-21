import { configureStore } from "@reduxjs/toolkit";
import { authedUser as authedUserReducer } from "../reducers/authedUser";
import { questions as questionsReducer } from "../reducers/questions";
import { users as usersReducer } from "../reducers/users";
import logger from "../middleware/logger";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    authedUser: authedUserReducer,
    questions: questionsReducer,
    users: usersReducer,
  },
  middleware: [thunk],
});
