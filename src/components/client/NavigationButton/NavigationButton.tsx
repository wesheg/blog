"use client"

import { useState } from "react";

import style from "./navigationButton.module.css";

export const NavigationButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <button className={style.navButtonOuter} onClick={() => setOpen((prev) => !prev)}>
      <div className={`${style.line} ${style.topLine} ${open ? style.topLineOpen : ""}`}/>
      <div className={`${style.line} ${style.middleLine} ${open ? style.middleLineOpen : ""}`}/>
      <div className={`${style.line} ${style.bottomLine} ${open ? style.bottomLineOpen : ""}`}/>
    </button>
  );
}