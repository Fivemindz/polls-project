import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/shared";
import { setAuthedUser } from "../actions/authedUser";
import Loading from "./Loading";

const Login = (props) => {
  const selected = useRef("default");
  const [loading, setLoading] = useState(true);
  const { dispatch, users } = props;

  useEffect(() => {
    const loadUsers = async () => {
      await dispatch(getUsers());
    };

    if (loading === true) {
      loadUsers();
      setLoading(false);
    }

    return () => {
      setLoading(false);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(setAuthedUser(selected.current));
    console.log("User logged in, navigating to home.");
  };

  const handleChange = (e) => {
    selected.current = e.target.value;
  };

  return (
    <div className="login-page">
      {users.length === 0 ? (
        <Loading type={"spin"} color={"blue"} />
      ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <h3>Login Page</h3>
          <select
            name="user"
            id="user"
            className="user-select"
            onChange={handleChange}
            data-testid="user-select"
          >
            <option value={selected}>Select User</option>
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
            disabled={selected.current === "selected" ? true : false}
            data-testid="user-login-button"
          >
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
