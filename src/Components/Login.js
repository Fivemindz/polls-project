import { Fragment, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/shared";
import { setAuthedUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const selected = useRef("");
  const navigate = useNavigate();

  useEffect(() => {
    props.dispatch(getUsers());
  }, []);

  const { users } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    props.dispatch(setAuthedUser(selected.current));
    navigate("/");
  };

  const handleChange = (e) => {
    selected.current = e.target.value;
  };

  return (
    <div className="login-page">
      <h3>Login Page</h3>
      <form onSubmit={handleSubmit}>
        <select name="user" id="user" onChange={handleChange}>
          <option value={selected}>Select User</option>
          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
        <br />
        <button className="btn" type="submit">
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
