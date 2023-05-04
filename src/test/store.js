import thunk from "redux-thunk";
import combineReducers from "../reducers";
import { configureStore } from "@reduxjs/toolkit";
import logger from "../middleware/logger";

export const store = configureStore({
  reducer: combineReducers,
  middleware: [thunk],
});
