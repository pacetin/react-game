import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="nav-wrapper blue accent-2 px1">
        <a href="/" className="brand-logo center">
          Memory Game
        </a>
        <ul className="left hide-on-med-and-down">
          <li>
            <NavLink to="/">Settings</NavLink>
          </li>
          <li>
            <NavLink to="/rules">Rules</NavLink>
          </li>
          <li>
            <NavLink to="/highscore">Highscore</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
