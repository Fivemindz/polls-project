import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";
import "./Question.css";
import { Link } from "react-router-dom";

const Question = ({ question }) => {
  return (
    <Link to={`/question/${question.id}`} className="question-link">
      <div className="question-info">
        <div className="question-author">{question.author}</div>
        <div className="question-date">{formatDate(question.timestamp)}</div>
      </div>
    </Link>
  );
};

const mapStateToProps = ({ authedUser }, { question }) => ({
  authedUser,
  question,
});

export default connect(mapStateToProps)(Question);
