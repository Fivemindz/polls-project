import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <ul>
        <Link className="nav-link" to={"/"}>
          <li>Dashboard</li>
        </Link>
        <Link className="nav-link" to={"/stats"}>
          <li>Stats</li>
        </Link>
        <Link className="nav-link" to={"newquestion"}>
          <li>New Poll</li>
        </Link>
      </ul>
    </div>
  );
};

export default Nav;
