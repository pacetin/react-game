import React from "react";
import '../styles/RulesPage.css';

export const RulesPage: React.FC = () => {
  return (
    <div className="rules-container">
      <h3>Rules</h3>
      <ul>              
        <li>The objective is to collect all pairs of cards.</li>
        <li>On each turn, a player turns over any two cards and get points if the cards match (for instance, two kings)</li>
        <li>When a player turns over two cards that do not match, those cards are turned face down again.</li>
        <li>The trick is to remember which cards are where.</li>
      </ul>
      <h3>Hotkeys</h3>
      <ul>              
        <li><strong>Ctrl + Z</strong> - go to Settings from Game page</li>
        <li><strong>Ctrl + C</strong> - go to Highscore from Game page</li>
        <li><strong>Ctrl + V</strong> - go to Rules from Game page</li>
        <li><strong>Ctrl + Enter</strong> - start new game</li>                
        <li><strong>Shift + Enter</strong> - fullscreen mode</li>                
      </ul>
    </div>
  );
};
