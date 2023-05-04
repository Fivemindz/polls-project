import { getInitialData, loadUsers } from "../utils/api";
import { receiveUsers } from "./users";
import { addQuestion, addQuestionAnswer, receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";

export function handleInitialData(user) {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
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

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => {
        dispatch(addQuestion(question));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAddQuestionAnswer(info) {
  return async (dispatch) => {
    dispatch(showLoading());
    return saveQuestionAnswer(info).then(async () => {
      await dispatch(addQuestionAnswer(info));
      dispatch(hideLoading());
    });
  };
}
