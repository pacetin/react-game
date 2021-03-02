import React, { useEffect, useState }  from "react";
import Card from "./Card";
import categories from "../data/categories";
import { ICard, IFieldProps } from "../interfaces";

const imagePath = process.env.PUBLIC_URL + '/assets/images/';
const soundPath = process.env.PUBLIC_URL + '/assets/sounds/';

let wins = 0;
let trials = 0;

const shuffleArray = (array:any[]): any[] => array.sort(() => .5 - Math.random());

const generateCards = (size:string, category:string):ICard[] => {
  const array = categories[category].slice(0, (Number(size) / 2));
  const doubledArray = array.concat(array);
  const shuffledArray = shuffleArray(doubledArray);  
  return shuffledArray.map((elem, index) => {
    return {
      src: `${imagePath}${elem}.jpg`,
      name: elem,
      id: index,
      isFlipped: false,
      isActive: true,
    }
  });  
};

const Field: React.FC<IFieldProps> = (props) => {
  const { size, category, isPreShow, isSounds, isMusic, changeStatistic, showWinModal } = props
  const [cards, setCards] = useState<ICard[]>(() => { return props.cards || generateCards(size, category)});  
  const [firstCard, setFirstCard] = useState<ICard | null>(null);
  const [secondCard, setSecondCard] = useState<ICard | null>(null);  
  
  useEffect(() => {
    if (!firstCard || !secondCard) return;

    (firstCard.name === secondCard.name) ? onSuccess() : onFailure();
    // eslint-disable-next-line
  }, [firstCard, secondCard])

  useEffect(() => {
    if (isMusic === '0') return;

    let audio = new Audio();
    audio.src = `${soundPath}background.mp3`;
    audio.load();
    audio.play();
    audio.volume = Number(isMusic) / 100;
    audio.loop = true;

    return () => {
      audio.pause();
    }
  }, [isMusic])

  useEffect(() => {
    if (!isPreShow) return;

    const flipCards = (): void => setCards(prev => prev.map(card => {      
      return {
        ...card,
        isFlipped: !card.isFlipped
      }; 
    }))

    flipCards();
    const timerId = setTimeout(flipCards, 5000);    

    return () => {
      clearTimeout(timerId);
    }

  }, [isPreShow]);

  useEffect(() => {
    const gameState = JSON.parse(localStorage.getItem('GameState') || '{}');
    localStorage.setItem('GameState', JSON.stringify({
      ...gameState,
      cards: cards,
    }));
  }, [cards]);

  const playAudio = (url: string):void => {
    const audio = new Audio();
    audio.src = `${soundPath}${url}`;
    audio.volume = Number(isSounds) / 100;
    audio.load();
    audio.play();
  };

  const onSuccess = (): void => {    
    if (isSounds !== '0') {
      setTimeout(() => playAudio('correct.mp3'), 300);
    }
    wins += 1;
    trials += 1;
    setTimeout(() => { 
      changeStatistic!(wins, trials);
    }, 300)

    setTimeout(inactivateCards, 600);

    if (wins === Number(size) / 2) {
      onWin();  
    }
  };

  const onFailure = (): void => {
    if (isSounds !== '0') {
      setTimeout(() => playAudio('error.mp3'), 300);
    }
    trials += 1;
    setTimeout(() => {      
      changeStatistic!(wins, trials);
    }, 300)
        
    setTimeout(flipCards, 600);
  };

  const onWin = ():void => {
    if (isSounds !== '0') {
      setTimeout(() => playAudio('success.mp3'), 600);
    }
    setTimeout(() => {
      showWinModal!();
      wins = 0;
      trials = 0;
    }, 600);
  }

  const inactivateCards = (): void => {
    setCards(prev => prev.map(card => {
      if (card.id === firstCard!.id || card.id === secondCard!.id) {
        return {
          ...card,
          isActive: !card.isActive
        }
      }
      return card;
    }))
    resetCards();
  }

  const flipCards = (): void => {
    setCards(prev => prev.map(card => {
      if (card.id === firstCard!.id || card.id === secondCard!.id) {
        return {
          ...card,
          isFlipped: !card.isFlipped
        }
      }
      return card;
    }))
    resetCards();
  }

  const resetCards = (): void => {
    setFirstCard(null);
    setSecondCard(null);
  }
  
  const clickHandler = (card: ICard): void => {
    if (firstCard && secondCard) return;
    firstCard ? setSecondCard(card) : setFirstCard(card);
    setCards(prev => prev.map(item => {
      if (item.id === card.id) {
        return {
          ...item,
          isFlipped: !item.isFlipped
        }
      }
      return item;
    }))
  }

  return (
    <div className="cards-container">
      {cards.map (card => {
        return (
          <Card card={card} key={card.id} onClick={clickHandler} />
        );  
      })}
    </div>
  );    
};

export default Field;
