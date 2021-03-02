import React from "react";
import { IStatisticProps } from "../interfaces";

export const Statistic: React.FC<IStatisticProps> = ({ wins, trials, size}) => {
  return (
    <>      
      <div className="wins">
        <i className="material-icons small  teal-text text-lighten-1">emoji_events</i>
        <span>{`${wins}/${Number(size) / 2}`}</span>
      </div>
      <div className="trials">
        <i className="material-icons small  teal-text text-lighten-1">cached</i>
        <span>{trials}</span>
      </div>    
    </>    
  );
};

export default Statistic;