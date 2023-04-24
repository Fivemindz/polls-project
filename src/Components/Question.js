import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";

const Question = ({ question }) => {
  return (
    <div className="question">
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
