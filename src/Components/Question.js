import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import "./Question.css";

const Question = ({ question }) => {
  return (
    <div>
      <div className="question-info">
        <div>{question.author}</div>
        <div>{formatDate(question.timestamp)}</div>
      </div>
      <div></div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }, { question }) => ({
  authedUser,
  question,
});

export default connect(mapStateToProps)(Question);
