import { getInitialData, loadUsers } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function handleInitialData() {
  return async (dispatch) => {
    dispatch(showLoading());
    return await getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

export function getUsers() {
  return async (dispatch) => {
    return loadUsers().then(({ users }) => {
      dispatch(receiveUsers(users));
    });
  };
}

export function setUser(user) {
  return async (dispatch, user) => {
    dispatch(setAuthedUser(user));
  };
}
