import styles from "./aboutMe.module.css";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@ui/components";

export default function AboutMe() {
  return (
    <>
      <Header />
      <main className={styles.aboutMeMain}>
        <h1 className={styles.aboutMeHeading}>About Me</h1>
        <div className={styles.imgContainer}>
          <Image
            alt="Headshot"
            src="/aboutMe/portrait.jpg"
            width={950}
            height={1192}
            className={styles.portraitImg}
          />
        </div>
        <h2 style={{ margin: 0 }}>Hi, I&apos;m Wes</h2>
        <p>
          I&apos;m a developer, CFA Charterholder, and former investment analyst
          who&apos;s been writing code for over a decade now. In my time working
          in asset management and corporate finance, I built tools to support
          and guide investment decisions. Back then, writing software was a
          means to an end, but it gradually led to a career shift into full-time
          engineering.
        </p>
        <p>
          Since 2020, I&apos;ve been with Bloomberg working on projects
          including{" "}
          <Link
            href="https://www.bloomberg.com/professional/products/bloomberg-terminal/research/bquant"
            target="_blank"
          >
            BQuant
          </Link>
          , data pipelines for{" "}
          <Link
            href="https://www.bloomberg.com/professional/products/indices/fixed-income/"
            target="_blank"
          >
            bond market indices
          </Link>
          , and the{" "}
          <Link
            href="https://apps.apple.com/us/app/bloomberg-professional/id407761767"
            target="_blank"
          >
            Bloomberg Professional Mobile App.
          </Link>
        </p>
        <div className={styles.imgContainer}>
          <figure style={{ float: "right", marginLeft: "1em" }}>
            <Image
              alt="Presenting at the Bloomberg Tech Expo in London, 2025"
              src="/aboutMe/TechExpo.jpg"
              width={950}
              height={1192}
              className={styles.conferenceImg}
            />
            <figcaption className="img-caption">
              Bloomberg Tech Expo, London 2025
            </figcaption>
          </figure>
        </div>
        <p>
          This blog is where I write about financial markets, software
          engineering, and the things I&apos;ve learned building complex
          systems. Every post here represents something that meaningfully shaped
          how I work.
        </p>

        <section style={{ clear: "right" }}>
          <h2>Skills</h2>
        </section>
        <h2>Career History</h2>
      </main>
    </>
  );
}
