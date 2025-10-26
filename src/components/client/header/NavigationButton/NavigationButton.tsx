"use client"

import style from "./navigationButton.module.css";

type NavigationButtonProps = {
  open?: boolean;
  handleClick: () => void;
}

export const NavigationButton = ({ open, handleClick }: NavigationButtonProps) => {
  return (
    <button className={style.navButtonOuter} onClick={handleClick}>
      <div className={`${style.line} ${style.topLine} ${open ? style.topLineOpen : ""}`}/>
      <div className={`${style.line} ${style.middleLine} ${open ? style.middleLineOpen : ""}`}/>
      <div className={`${style.line} ${style.bottomLine} ${open ? style.bottomLineOpen : ""}`}/>
    </button>
  );
}