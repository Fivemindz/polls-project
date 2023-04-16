import { connect } from "react-redux";
import { formatDate } from "../utils/helpers";

const Question = (props) => {
    
    if (props.question === null) {
        return <p>This question doesn't exist</p>;
    }

    const {
        author,
        id,
        optionOne,
        optionTwo,
        timestamp,
    } = props.question;

    return (

        <div className="question" >
            <div className="question-info" >
                <div>
                    <span>{author}</span>
                    <div>{formatDate(timestamp)}</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
    const question = questions[id];
    
    return {
        authedUser,
        question,
    }
}

export default connect(mapStateToProps)(Question);