import styles from "./navigation.module.css";
import Image from "next/image";
import Link from "next/link";

type NavigationProps = {
  mobileButton?: React.ReactNode;
};

export const Navigation = ({ mobileButton }: NavigationProps) => {
  return (
    <nav className={styles.navigationContainer}>
      <div className={styles.serverContainer}>
        <ul className={styles.navigationList}>
          <li className={styles.navigationOption}>
            <Link href="/">about me</Link>
          </li>
          <li className={styles.navigationOption}>
            <Link href="/">blog</Link>
          </li>
          <li className={styles.navigationOption}>
            <Link href="/">projects</Link>
          </li>
        </ul>
        <div>
          <Link
            href="https://www.linkedin.com/in/wes-heginbotham-cfa"
            className={styles.navigationSocial}
            target="_blank"
          >
            <Image
              src="/social/linkedin.png"
              height={50}
              width={50}
              alt="LinkedIn Profile"
            />
          </Link>
          <Link
            href="https://bsky.app/profile/wesheg.bsky.social"
            className={styles.navigationSocial}
            target="_blank"
          >
            <Image
              className={styles.navigationOption}
              src="/social/bluesky.png"
              height={50}
              width={50}
              alt="LinkedIn Profile"
            />
          </Link>
        </div>
      </div>
      <div className={styles.mobileButtonContainer}>{mobileButton}</div>
    </nav>
  );
};
