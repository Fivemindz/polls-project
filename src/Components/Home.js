import { connect } from "react-redux";
import Question from "./Question";


const Home = (props) => {

    const user = props.authedUser

    return (
        <div>
            <h3 className="center">Your Poll Questions</h3>
            <span>{user}</span>
            <ul className="dashboard-list">
                {props.questionIds.map((id) => (
                    <li key={id}>
                        <Question id={id} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions }) => ({
    authedUser,
    questionIds: Object.keys(questions).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
});

export default connect(mapStateToProps)(Home);
