import { connect } from "react-redux";
import "./Stats.css";

const Stats = (props) => {
  const { mappedUsersList } = props;

  return (
    <div className="dashboard">
      <div className="stats-table">
        <h2>Stats Table</h2>
        <table>
          <tbody>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Answered</th>
              <th>Asked</th>
              <th>Score</th>
            </tr>
            {mappedUsersList &&
              mappedUsersList.map((user) => {
                return (
                  <tr key={user.id}>
                    <th>
                      <img src={user.avatarURL} alt="Avatar" />
                    </th>
                    <th>{user.id}</th>
                    <th>{Object.keys(user.answers).length} </th>
                    <th>{user.questions.length} </th>
                    <th>
                      {Object.keys(user.answers).length + user.questions.length}{" "}
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  const usersList = Object.values(users);
  const mappedUsersList = usersList
    .map((user) => {
      const answered = Object.keys(user.answers).length;
      const asked = user.questions.length;
      const score = answered + asked;
      return {
        ...user,
        answered,
        asked,
        score,
      };
    })
    .sort((a, b) => {
      return b.score - a.score;
    });

  return {
    mappedUsersList,
  };
};

export default connect(mapStateToProps)(Stats);
