import { useState } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import "./Login.css";

const Login = (props) => {
  const [selected, setSelected] = useState("default");
  const { users, dispatch } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(handleInitialData(selected));
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Login Page</h3>
        <select
          name="user"
          id="user"
          className="user-select"
          onChange={handleChange}
          data-testid="user-select"
        >
          <option value="default">Select User</option>
          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
        <br />
        <button
          className="btn"
          type="submit"
          disabled={selected === "default" ? true : false}
          data-testid="user-login-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.keys(users).sort((a, b) => users[b].id - users[a].id),
});

export default connect(mapStateToProps)(Login);
