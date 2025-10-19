import styles from "./header.module.css";
import Image from "next/image";

export const Header = () => {
  const imgWidth = 65;
  const imgHeight = imgWidth * 1.5;
  return (
    <header className={styles.blogHeader} style={{ marginBottom: imgHeight / 2}}>
      <div className={styles.headerTitle}>
        <div style={{ width: imgWidth }}>
          <Image className={styles.headerAvatar} src="/avatars/header.svg" width={imgWidth} height={imgWidth * 1.5} alt="site logo"/>
        </div>
        <h1><span style={{fontWeight: 200}}>wesheg&apos;s</span> blog</h1>
      </div>
      <nav className={styles.headerNav}>
        <ul>
          <li>home</li>
          <li>about me</li>
          <li>blog</li>
          <Image src="/social/linkedin.png" height={50} width={50} alt="LinkedIn Profile" />
          <Image src="/social/bluesky.png" height={50} width={50} alt="LinkedIn Profile" />
        </ul>
      </nav>
    </header>
  );
}