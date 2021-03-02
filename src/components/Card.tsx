import React from "react";
import { ICard } from "../interfaces";



type CardProps = {
  card: ICard;
  onClick(card:ICard): void;
  // onToggle(id:number): void;
  // onRemove: (id:number) => void;
};

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  const classes = ['playing-card'];
  if (card.isFlipped) {
    classes.push('flipped');
  }
  if (!card.isActive) {
    classes.push('inactive');
  }
  return (    
    <li className={classes.join(' ')}>
      <div className={'back'} onClick={onClick.bind(null, card)}></div>
      <div className={'front'}>        
        <img src={card.src} alt={card.id.toString()} />          
      </div>
    </li>
  );
};

export default Card;
