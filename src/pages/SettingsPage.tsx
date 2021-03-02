import React from "react";
import "../styles/SettingsPage.css";
import Settings from "../components/Settings";
import { ISettingsProps } from "../interfaces";

export const SettingsPage: React.FC<ISettingsProps> = ({ addSettings }) => {  
  return (    
    <Settings addSettings={addSettings}/>
  );
};
