import styles from "./aboutMe.module.css";
import Image from "next/image";
import Link from "next/link";
import { CareerHistory } from "./CareerHistory";
import { Header } from "@ui/components";
import { Skills } from "./Skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Wes Heginbotham, CFA",
  description: "Skills and Career Description",
};

export default function AboutMe() {
  return (
    <>
      <Header />
      <main className={styles.aboutMeMain}>
        <h1 className={styles.aboutMeHeading}>About Me</h1>
        <div className={styles.introContainer}>
          <div className={styles.imgContainer}>
            <figure className={styles.aboutMeFigure}>
              <Image
                preload
                alt="Headshot"
                src="/aboutMe/portrait.jpg"
                width={950}
                height={1192}
                className={styles.portraitImg}
              />
            </figure>
          </div>
          <div>
            <h2 style={{ margin: 0 }}>Hi, I&apos;m Wes</h2>
            <p>
              I&apos;m a developer,{" "}
              <Link
                href="https://www.cfainstitute.org/programs/cfa-program"
                target="_blank"
              >
                CFA Charterholder
              </Link>
              , and former investment analyst who&apos;s been writing code for
              over a decade. In my time working in asset management and
              corporate finance, I built tools to support and guide investment
              decisions. Back then, writing software was a means to an end, but
              it gradually led to a career shift into full-time engineering.
            </p>
          </div>
        </div>
        <div className={styles.conferenceContainer}>
          <p className={styles.conferenceParagraph}>
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
            <figure
              className={`${styles.aboutMeFigure} ${styles.conferenceFigure}`}
            >
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
        </div>
        <Skills />
        <CareerHistory />
      </main>
    </>
  );
}
