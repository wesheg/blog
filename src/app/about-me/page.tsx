import styles from "./aboutMe.module.css";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@ui/components";

export default function AboutMe() {
  return (
    <>
      <Header />
      <main className={styles.aboutMeMain}>
        <h1>About Me</h1>
        <div className={styles.gallery}>
          <div
            style={{
              gridArea: "portrait",
            }}
          >
            <Image
              alt=""
              src="/aboutMe/portrait.jpg"
              width={950}
              height={1192}
              className={styles.portrait}
            />
          </div>
          <div
            style={{
              gridArea: "wide",
            }}
          >
            <Image
              alt=""
              src="/aboutMe/alamoSquare.jpg"
              width={6671}
              height={4447}
            />
          </div>
          <div
            style={{
              gridArea: "single1",
            }}
          >
            <Image
              alt=""
              src="/aboutMe/giraffe.jpg"
              width={3024}
              height={4032}
              className={styles.wide}
            />
          </div>
          <div
            style={{
              gridArea: "single2",
            }}
          >
            <Image
              alt=""
              src="/aboutMe/hawaii.jpg"
              width={3024}
              height={4032}
              className={styles.wide}
            />
          </div>
        </div>
        <h2>Hi, I&apos;m Wes</h2>
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
        <p>
          This blog is where I write about financial markets, software
          engineering, and the things I&apos;ve learned building complex
          systems. Every post here represents something that meaningfully shaped
          how I work.
        </p>

        <h2>Skills</h2>
        <h2>Career History</h2>
      </main>
    </>
  );
}
