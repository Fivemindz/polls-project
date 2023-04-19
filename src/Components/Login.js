import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getUsers, handleInitialData } from "../actions/shared";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { setAuthedUser } from "../actions/authedUser";

const Login = (props) => {
  const selected = useRef("default");
  const [loadedUsers, setLoadedUsers] = useState(false);
  const navigate = useNavigate();
  const { dispatch, users, isLoading } = props;

  useEffect(() => {
    const loadUsers = async () => {
      dispatch(showLoading());
      try {
        await dispatch(getUsers());
      } finally {
        console.log("Finished loading users", users);
        dispatch(hideLoading());
      }
    };

    if (!loadedUsers) {
      if (users.length === 0) {
        loadUsers();
      }
      setLoadedUsers(true);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(selected.current));
    console.log("User logged in, navigating to home.");
    navigate("/");
  };

  const handleChange = (e) => {
    selected.current = e.target.value;
  };

  return (
    <div className="login-page">
      <h3>Login Page</h3>
      {isLoading ? null : (
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
      )}
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.keys(users).sort((a, b) => users[b].id - users[a].id),
});

export default connect(mapStateToProps)(Login);
