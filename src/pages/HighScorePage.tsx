import React from "react";
import { IScore } from "../interfaces";
import '../styles/HighScorePage.css'

type HighScoreProps = {
  score: IScore[],
};

export const HighScorePage: React.FC<HighScoreProps> = ({ score }) => {
  return (
    <div className="score-container">
      <h2>Highscore</h2>
      <table className="score-table">
        <tbody>        
          <tr><th>Rank</th><th>Trials</th><th>Size</th></tr>
          {score.map((item, index) => {
            return (
              <tr key={index}><th>{index + 1}</th><th>{item.trials}</th><th>{item.size}</th></tr>
            )
          })}
        </tbody>                         
      </table>
    </div>
  );
};
