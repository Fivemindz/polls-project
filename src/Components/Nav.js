import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <ul>
        <Link to={"/"}>
          <li>Dashboard</li>
        </Link>
        <Link to={"/stats"}>
          <li>Stats</li>
        </Link>
        <Link to={"newquestion"}>
          <li>Post Question</li>
        </Link>
      </ul>
    </div>
  );
};

export default Nav;
