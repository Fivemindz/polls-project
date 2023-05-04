import * as api from "../utils/api";

describe("Test api functionality", () => {
  it("Test _saveQuestion when all fields are populated correctly", async () => {
    const info = {
      optionOneText: "Learn React",
      optionTwoText: "Learn Angular",
      author: "Joe's Mama!",
    };

    let data;
    let error;
    try {
      data = await api.saveQuestion(info);
    } catch (err) {
      error = err;
    }

    expect(data).toBeDefined();
    expect(error).not.toBeDefined();
  });

  it("Test _saveQuestion error when incorrect data is passed ", async () => {
    const info = {
      optionOneText: null,
      optionTwoText: "Learn Angular",
      author: "Joe's Mama!",
    };

    let data;
    let error;
    try {
      data = await api.saveQuestion(info);
    } catch (err) {
      error = err;
    }

    expect(data).not.toBeDefined();
    expect(error).toBeDefined();
  });

  it("Test _saveQuestionAnswer when all fields are populated correctly ", async () => {
    const info = {
      authedUser: "sarahedo",
      qid: "xj352vofupe1dqz9emx13r",
      answer: "optionOne",
    };

    let data;
    let error;
    try {
      data = await api.saveQuestionAnswer(info);
    } catch (err) {
      error = err;
    }

    expect(data).toBeDefined();
    expect(error).not.toBeDefined();
  });

  it("Test _saveQuestionAnswer error when incorrect data is passed ", async () => {
    const info = {
      authedUser: null,
      qid: "xj352vofupe1dqz9emx13r",
      answer: "optionOne",
    };

    let data;
    let error;
    try {
      data = await api.saveQuestion(info);
    } catch (err) {
      error = err;
    }

    expect(data).not.toBeDefined();
    expect(error).toBeDefined();
  });
});
