import Link from "next/link";
import styles from "./linkAsButton.module.css";
import type { MouseEvent, TouchEvent } from "react";

type LinkAsButtonProps = {
  href: string;
  label: string;
};

export const LinkAsButton = ({ href, label }: LinkAsButtonProps) => {
  const pressDown = (e: MouseEvent | TouchEvent) => {
    (e.target as Element).classList.add(styles.pressed);
  };

  const popUp = (e: MouseEvent | TouchEvent) => {
    (e.target as Element).classList.remove(styles.pressed);
  };

  return (
    <Link
      onMouseDown={pressDown}
      onMouseUp={popUp}
      onMouseLeave={popUp}
      onTouchStart={pressDown}
      onTouchEnd={popUp}
      onTouchCancel={popUp}
      href={href}
      className={styles.linkButton}
    >
      {label}
    </Link>
  );
};
