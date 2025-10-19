import styles from "./navigation.module.css";
// import Image from "next/image";
import Link from "next/link";

export const Navigation = () => {
  return (
    <nav>
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
        {/* <Image src="/social/linkedin.png" height={50} width={50} alt="LinkedIn Profile" />
        <Image src="/social/bluesky.png" height={50} width={50} alt="LinkedIn Profile" /> */}
      </ul>
    </nav>
  );
}
