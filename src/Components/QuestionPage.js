import React from "react";
import { connect } from "react-redux";
import "./QuestionPage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = (props) => {
  const { question, authorPic, authedUser } = props;

  console.log(question.optionOne.votes.includes(authedUser));
  console.log(question.optionTwo.votes.includes(authedUser));

  if (
    !question.optionOne.votes.includes(authedUser) &&
    !question.optionTwo.votes.includes(authedUser)
  ) {
    console.log("question not answered by authed user");
  }

  return (
    <div className="view-question">
      <h2>View Poll by {question.author} </h2>
      <img src={`.${authorPic}`} alt="avatar" className="author-avatar" />
      <form className="view-question-form">
        <h3>Would You Rather?</h3>
        <div className="question-area">
          <label>Answer 1</label>
          <textarea
            id="optionOneText"
            readOnly={true}
            value={question.optionOne.text}
          />
          <label>Answer 2</label>
          <textarea
            id="optionTwoText"
            readOnly={true}
            value={question.optionTwo.text}
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.router.params;
  const author = questions[id].author;

  return {
    question: questions[id],
    authorPic: users[author].avatarURL,
    authedUser,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
