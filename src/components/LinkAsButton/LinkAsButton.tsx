import Link from "next/link";
import styles from "./linkAsButton.module.css";

type LinkAsButtonProps = {
  href: string;
  label: string;
};

export const LinkAsButton = ({ href, label }: LinkAsButtonProps) => {
  return (
    <Link
      onMouseDown={(e) => {
        (e.target as Element).classList.add(styles.pressed);
      }}
      onMouseUp={(e) => (e.target as Element).classList.remove(styles.pressed)}
      href={href}
      className={styles.linkButton}
    >
      {label}
    </Link>
  );
};
