import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="nav-wrapper blue accent-2 px1">
        <a href={process.env.PUBLIC_URL + '/'} className="brand-logo left">
          MEMORY
        </a>
        <ul className="right">
          <li>
            <NavLink to={process.env.PUBLIC_URL + '/'}>Settings</NavLink>
          </li>
          <li>
            <NavLink to={process.env.PUBLIC_URL + '/rules'}>Rules</NavLink>
          </li>
          <li>
            <NavLink to={process.env.PUBLIC_URL + '/highscore'}>Highscore</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
