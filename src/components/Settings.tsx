import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { IFieldProps, ISettingsProps } from "../interfaces";

const Settings: React.FC<ISettingsProps> = ({ addSettings }) => {
  const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false);
  const [selectSizeValue, setSelectSizeValue] = useState<string>('24');
  const [selectCategoryValue, setSelectCategoryValue] = useState<string>('nations');
  const [rangeSoundValue, setRangeSoundValue] = useState<string>('50');
  const [rangeMusicValue, setRangeMusicValue] = useState<string>('50');
  const history = useHistory();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent): void {
      if ((e.key === 'Enter') && e.ctrlKey) {
        e.preventDefault();
        buttonRef.current!.click();
      }
    }

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  });

  const clickHandler = (event: React.MouseEvent): void => {
    event.preventDefault();
    localStorage.removeItem('GameState');
    history.push('/game');
    const settingsObj: IFieldProps = {
      size: selectSizeValue,
      category: selectCategoryValue,
      isPreShow: checkBoxValue,
      isSounds: rangeSoundValue,
      isMusic: rangeMusicValue,
    }
  
    addSettings(settingsObj);
  };

  const flipChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCheckBoxValue(event.target.checked);
  };

  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    (event.target.id === 'size') ? setSelectSizeValue(event.target.value) : setSelectCategoryValue(event.target.value);    
  };

  const rangeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    (event.target.id === 'sounds') ? setRangeSoundValue(event.target.value) : setRangeMusicValue(event.target.value);
  };

  return (    
    <div className="settings">
      <h3>Settings</h3>
      <form>
        <label>Field size</label>
        <select className="browser-default" id='size' value={selectSizeValue} onChange={selectChangeHandler}>     
          <option value="18">18 cards</option>
          <option value="24">24 cards</option>
          <option value="30">30 cards</option>
        </select>

        <label>Categories</label>
        <select className="browser-default" id="category" value={selectCategoryValue} onChange={selectChangeHandler}>   
          <option value="nations">Nations</option>
          <option value="animals">Animals</option>
          <option value="faces">Faces</option>
        </select>

        <p>
          <label htmlFor="flip" className="active">
            <input id="flip" type="checkbox" checked={checkBoxValue} onChange={flipChangeHandler} />
            <span>Flip cards before playing</span>
          </label>
        </p>
        <p className="range-field">
          <i className="material-icons">music_note</i>
          <label>Sounds</label>        
          <input type="range" id="sounds" min="0" max="100" value={rangeSoundValue} onChange={rangeChangeHandler} />
        </p>
        <p className="range-field">
          <i className="material-icons">volume_up</i>
          <label>Music</label>
          <input type="range" id="music" min="0" max="100" value={rangeMusicValue} onChange={rangeChangeHandler} />
        </p>
        <button ref={buttonRef} className="btn waves-effect waves-light" type="submit" name="action" onClick={clickHandler}>
          Start new game
          <i className="material-icons right">play_circle_outline</i>
        </button>
      </form>   
    </div>
  );
};

export default Settings;
