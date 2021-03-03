import React, { useState, useEffect }  from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar } from "./components/Header";
import { Footer } from "./components/Footer";
import { RulesPage } from "./pages/RulesPage";
import { HighScorePage } from "./pages/HighScorePage";
import { SettingsPage } from './pages/SettingsPage';
import { GamePage } from './pages/GamePage';
import { IFieldProps, IScore } from './interfaces';

function App() {
  const { settings: initialSettings } = JSON.parse(localStorage.getItem('GameState') || '{}');

  const [score, setScore] = useState<IScore[]>([]);  
 
  const [settings, setSettings] = useState<IFieldProps>(initialSettings || {
    size: '24',
    category: 'nations',
    isPreShow: false,
    isSounds: '50',
    isMusic: '50',
  });
   
  useEffect(() => {
    const savedScore = JSON.parse(localStorage.getItem('Score') || '[]') as IScore[];
    setScore(savedScore);
  }, [])

  useEffect(() => {
    localStorage.setItem('Score', JSON.stringify(score));
  }, [score]);
  
  useEffect(() => {
    const gameState = JSON.parse(localStorage.getItem('GameState') || '{}');
    localStorage.setItem('GameState', JSON.stringify({
      ...gameState,
      settings: settings,
    }));
  }, [settings]);

  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent): void {
      if ((e.key === 'Enter') && e.shiftKey) {
        e.preventDefault();
        document.documentElement.requestFullscreen();
      }
    }

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  });

  const addSettings = (obj: IFieldProps): void => {
    setSettings(obj);
  };

  const saveScore = (size: number, trials: number): void => {
    const score = JSON.parse(localStorage.getItem('Score') || '[]') as IScore[];

    if (score.length < 10) {              
      score.push({size, trials});
      score.sort( (a: IScore, b: IScore) => a.trials-b.trials);
    } else if (score.length >= 10 && trials < score[score.length-1].trials) {
      score.pop();            
      score.push({size, trials});
      score.sort( (a: IScore, b: IScore) => a.trials-b.trials);
    }        

    setScore(score);
  }

  return (
    <BrowserRouter>
      <Navbar />      
      <main>
        <Switch>       
          <Route path="/"  component={() => <SettingsPage addSettings={addSettings} />} exact />
          <Route component={RulesPage} path="/rules" exact />          
          <Route path="/game" exact component={() => <GamePage {...settings} saveScore={saveScore} />} />          
          <Route  path="/highscore" component={() => <HighScorePage score={score} /> } exact />
        </Switch>
      </main>       
      <Footer />      
    </BrowserRouter>
  );
}

export default App;
