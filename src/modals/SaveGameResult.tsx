import React from "react";
import "../styles/SaveGameResult.css";
import { IModalProps } from "../interfaces";

const SaveGameResult: React.FC<IModalProps> = ({ isOpen, onClick, trials }) => {
  return (
    <React.Fragment>
      {isOpen && (
        <div className="modal-window">
          <div className="modal-body">
            <h1>Congratulations!!!</h1>
            <p>You could solve this complicated puzzle on<strong>{` ${trials} `}</strong>downs!</p>
            <button className="waves-effect waves-light btn" onClick={() => onClick(trials)}>Save</button>     
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SaveGameResult;