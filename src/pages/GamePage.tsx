import React, { useState, useEffect } from "react";
import '../styles/GamePage.css';
import Field from "../components/Field";
import Statistic from "../components/Statistic";
import Timer from "../components/Timer";
import { IFieldProps, IStatisticProps, } from "../interfaces";
import SaveGameResult from "../modals/SaveGameResult";
import { useHistory } from "react-router-dom";

export const GamePage: React.FC<IFieldProps> = (props) => {
  const { 
    statistic: initialStatistic,
    cards: initialCards,
    timer: initialTimer,    
  } = JSON.parse(localStorage.getItem('GameState') || '{}');  
  
  const [statistic, setStatistic] = useState<IStatisticProps>(initialStatistic || {    
    wins: 0,
    trials: 0,
    size: props.size,
  });
  const [modalIsOpen, setModalOpen] = useState<boolean>(false);
  const history = useHistory(); 

  useEffect(() => {
    const gameState = JSON.parse(localStorage.getItem('GameState') || '{}');
    localStorage.setItem('GameState', JSON.stringify({
      ...gameState,
      statistic: statistic,
    }));
  }, [statistic]);

  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent): void {    
      if ((e.key === 'Z' || e.key === 'z') && e.ctrlKey) {
        e.preventDefault();
        history.push('/');
      }

      if ((e.key === 'C' || e.key === 'c') && e.ctrlKey) {
        e.preventDefault();
        history.push('/highscore');
      }

      if ((e.key === 'V' || e.key === 'v') && e.ctrlKey) {
        e.preventDefault();
        history.push('/rules');        
      }
    }

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  });

  const changeStatistic = (wins: number, trials: number): void => {
    setStatistic(prev => {
      return {
      ...prev,
      wins: wins,    
      trials: trials,
      }
    });
  }

  const clickHandler = (trials: number) => {
    closeWinModal();  
    props.saveScore!(Number(props.size), trials);  
    history.push('/');
  }

  const showWinModal = (): void => { 
    setModalOpen(prev => true);
  }

  const closeWinModal = (): void => {
    setModalOpen(prev => false);    
  }

  return (
    <>
      <SaveGameResult isOpen={modalIsOpen} onClick={clickHandler} trials={statistic.trials} />
      <div className = "statistic-container">
        <Timer timer={initialTimer} />
        <Statistic {...statistic} size={props.size} />
      </div>
      <Field {...props} cards={initialCards} changeStatistic={changeStatistic} showWinModal={showWinModal} />
    </>    
  );
};
