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
  const { question, authorPic } = props;
  console.log(authorPic);

  return (
    <div className="view-question">
      <h2>View Poll by {question.author} </h2>
      <img src={`.${authorPic}`} alt="avatar" className="author-avatar" />
      <span></span>
      <form className="view-question-form">
        <h3>Would You Rather?</h3>
        <div className="question-area">
          <label>Answer 1</label>
          <textarea id="optionOneText" readOnly="true">
            {question.optionOne.text}
          </textarea>
          <label>Answer 2</label>
          <textarea id="optionTwoText" readOnly="true">
            {question.optionTwo.text}
          </textarea>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ questions, users }, props) => {
  const { id } = props.router.params;
  const author = questions[id].author;

  return {
    question: questions[id],
    authorPic: users[author].avatarURL,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
