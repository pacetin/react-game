import React from "react";

const logoPath = process.env.PUBLIC_URL + '/assets/icons/rs_school_logo.svg';

export const Footer: React.FC = () => {
  return (
    <footer className="page-footer blue accent-2">      
      <div className="logo">
        <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
          <img src={logoPath} alt="logo" />
        </a>
      </div>
      <div className="author">
        <span>Created by:</span>
        <a href="https://github.com/rolling-scopes-school/pacetin-JS2020Q3" target="_blank" rel="noreferrer">
          Palina Cetin
        </a>
        <span>, 2020</span>
      </div>            
    </footer>
  );
};