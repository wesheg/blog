import Link from "next/link";
import styles from "./linkAsButton.module.css";
import { popUp, pressDown } from "@ui/utils";

type LinkAsButtonProps = {
  href: string;
  label: string;
};

export const LinkAsButton = ({ href, label }: LinkAsButtonProps) => {
  return (
    <Link
      onMouseDown={(e) => pressDown(e, styles.pressed)}
      onMouseUp={(e) => popUp(e, styles.pressed)}
      onMouseLeave={(e) => popUp(e, styles.pressed)}
      onTouchStart={(e) => pressDown(e, styles.pressed)}
      onTouchEnd={(e) => popUp(e, styles.pressed)}
      onTouchCancel={(e) => popUp(e, styles.pressed)}
      href={href}
      className={styles.linkButton}
    >
      {label}
    </Link>
  );
};
