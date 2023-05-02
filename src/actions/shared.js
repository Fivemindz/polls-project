import { getInitialData, loadUsers } from "../utils/api";
import { addAnswer, receiveUsers } from "./users";
import { addQuestionAnswer, receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveQuestionAnswer } from "../utils/api";

export function handleInitialData(user) {
  return async (dispatch) => {
    dispatch(showLoading());
    return await getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(user));
      dispatch(hideLoading());
    });
  };
}

export function getUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    return loadUsers().then(({ users }) => {
      dispatch(receiveUsers(users));
      dispatch(hideLoading());
    });
  };
}

export function handleAddQuestionAnswer(info) {
  return async (dispatch) => {
    dispatch(showLoading());
    return saveQuestionAnswer(info).then(async () => {
      await dispatch(addQuestionAnswer(info));
      await dispatch(addAnswer(info));
      dispatch(hideLoading());
    });
  };
}
