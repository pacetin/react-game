import React, { useState, useEffect } from 'react';
import { ITimerProps } from "../interfaces";

const addZero = (n: number): string => {
  return (n < 10 ? '0' : '') + n.toString();
}

const getMin = (timeInterval: number): number => {  
  return Math.floor(timeInterval / 60);
}

const getSec = (timeInterval: number): number => {
  return timeInterval % 60;
}

const Timer: React.FC<ITimerProps> = ({ timer }) => {
  const [seconds, setSeconds] = useState(timer || 0);  

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  
    return () => clearInterval(interval);
  }, [seconds]);
  
  useEffect(() => {
    const gameState = JSON.parse(localStorage.getItem('GameState') || '{}');
    localStorage.setItem('GameState', JSON.stringify({
      ...gameState,
      timer: seconds,
    }));
  }, [seconds]);

  return ( 
    <div className="timer">
      <i className="material-icons small  teal-text text-lighten-1">timer</i>
      <span>{addZero(getMin(seconds))} : {addZero(getSec(seconds))}</span>
    </div>
  );
};

export default Timer;