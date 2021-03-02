export interface ICard {
  src: string,
  id: number,
  name: string,
  isFlipped: boolean,
  isActive: boolean,
}

export interface IFieldProps {
  size: string,
  category: string,
  isPreShow: boolean,
  isSounds: string,
  isMusic: string,
  cards? : ICard[],
  changeStatistic?: (wins: number, trials: number) => void,
  showWinModal?: () => void,
  saveScore?: (size: number, trials: number) => void,
}

export interface ISettingsProps {
  addSettings: (settings: IFieldProps) => void,
}

export interface IStatisticProps {
  wins: number,
  trials: number,
  size: string,
}

export interface IModalProps {
  isOpen: boolean,
  onClick: (trials: number) => void,
  trials: number,
}

export interface IScore {
  size: number,  
  trials: number,
}

export interface ITimerProps {
  timer: number,
}

