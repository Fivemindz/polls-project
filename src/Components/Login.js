import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUsers, handleInitialData } from "../actions/shared";
import { setAuthedUser } from "../actions/authedUser";
import Loading from "./Loading";

const Login = (props) => {
  const [selected, setSelected] = useState("default");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(handleInitialData());
    await dispatch(setAuthedUser(selected));
    console.log("User logged in, navigating to home.");
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
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
      )}
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.keys(users).sort((a, b) => users[b].id - users[a].id),
});

export default connect(mapStateToProps)(Login);
