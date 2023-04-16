import { connect } from "react-redux";

const Login = (props) => {

  const { users } = props

  return (
    <div className="center" >
      <h3>Login Page</h3>
      <select >
        <option value="default" >Select User</option>
        {users.map((user) => (
          <option key={user} value={user}>{user}</option>
        ))}
      </select>
    </div>
  )
}

const mapStateToProps = ({ users }) => ({
  users: Object.keys(users).sort(
    (a, b) => users[b].id - users[a].id
  ),
});

export default connect(mapStateToProps)(Login)