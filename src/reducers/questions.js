import {
  RECEIVE_QUESTIONS,
  SAVE_QUESTION,
  SAVE_QUESTION_ANSWER,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_QUESTION:
      const { question } = action;

      return {
        ...state,
        [action.OptionOneText]: action.OptionOneText,
        [action.OptionTwoText]: action.OptionTwoText,
      };
    default:
      return state;
  }
}
