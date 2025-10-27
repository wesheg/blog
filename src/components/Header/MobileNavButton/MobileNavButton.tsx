"use client"

import style from "./mobileNavButton.module.css";

type NavigationButtonProps = {
  open?: boolean;
  handleClick: () => void;
}

export const MobileNavButton = ({ open, handleClick }: NavigationButtonProps) => {
  return (
    <button className={style.navButtonOuter} onClick={handleClick}>
      <div className={`${style.line} ${style.topLine} ${open ? style.topLineOpen : ""}`}/>
      <div className={`${style.line} ${style.middleLine} ${open ? style.middleLineOpen : ""}`}/>
      <div className={`${style.line} ${style.bottomLine} ${open ? style.bottomLineOpen : ""}`}/>
    </button>
  );
}