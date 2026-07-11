/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useRef } from "react";
import chair from "@public/frontPage/chair.png";
import staticLayerDesktop from "@public/frontPage/static-layer-desktop.png";
import staticLayerMobile from "@public/frontPage/static-layer-mobile.png";
import { PersonCanvas } from "./PersonCanvas/PersonCanvas";
import { LottieRef } from "lottie-react";
import { ScreenCanvas } from "./ScreenCanvas";
import { usePuppetMaster } from "./usePuppetMaster";
import styles from "./frontPageAnimation.module.css";

type FrontPageAnimationProps = {
  articleEmbed?: boolean;
};

export const FrontPageAnimation = ({
  articleEmbed = false,
}: FrontPageAnimationProps) => {
  const lottieRef = useRef<LottieRef>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const staticRef = useRef<HTMLImageElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const imageBreakPoint = 1000;
  const scale = window.devicePixelRatio;
  const widthRef = useRef(window.innerWidth);
  const puppetMaster = usePuppetMaster(
    scale,
    canvasRef,
    lottieRef as LottieRef,
  );

  useEffect(() => {
    puppetMaster.start();
    return () => {
      puppetMaster.stop();
    };
  }, [puppetMaster]);

  const resizeApp = useCallback(() => {
    if (!staticRef.current) return;
    if (articleEmbed) return;
    const newWidth = window.innerWidth;
    const oldWidth = widthRef.current;
    const desktopToMobile =
      oldWidth > imageBreakPoint && newWidth <= imageBreakPoint;
    const mobileToDesktop =
      oldWidth < imageBreakPoint && newWidth >= imageBreakPoint;
    widthRef.current = newWidth;
    if (desktopToMobile) {
      staticRef.current.src = staticLayerMobile.src;
    }
    if (mobileToDesktop) {
      staticRef.current.src = staticLayerDesktop.src;
    }
  }, [articleEmbed]);

  useEffect(() => {
    window.addEventListener("resize", resizeApp);
    return () => {
      window.removeEventListener("resize", resizeApp);
    };
  }, [resizeApp]);

  return (
    <div
      className={`${styles.frontPageOuter} ${articleEmbed ? styles.embedded : ""}`}
    >
      <div
        className={`${styles.frontPageInner} ${articleEmbed ? styles.embedded : ""}`}
      >
        <img
          alt=""
          ref={staticRef}
          className={styles.frontPageBackground}
          src={
            articleEmbed
              ? staticLayerMobile.src
              : window.innerWidth <= imageBreakPoint
                ? staticLayerMobile.src
                : staticLayerDesktop.src
          }
        />
        <ScreenCanvas
          ref={canvasRef}
          scale={scale}
          className={`${styles.screenCanvas} ${articleEmbed ? styles.embedded : ""}`}
        />
        <div
          ref={lottieContainerRef}
          className={`${styles.lottieContainer} ${articleEmbed ? styles.embedded : ""}`}
        >
          <PersonCanvas ref={lottieRef} />
          <div className={styles.chairContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 350 450"
              width="350"
              height="450"
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <image href={chair.src} height="67%" x="14%" y="36%" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
