/* eslint-disable @next/next/no-img-element */
"use client"

import { useCallback, useEffect, useRef } from "react";
import chair from "@public/frontPage/chair.png";
import staticLayerDesktop from "@public/frontPage/static-layer-transparent.png";
import staticLayerMobile from "@public/frontPage/static-layer-mobile.png";
import { PersonCanvas } from "./PersonCanvas/PersonCanvas";
import { LottieRef } from "lottie-react";
import { ScreenCanvas } from "./ScreenCanvas";
import { usePuppetMaster } from "./usePuppetMaster";
import styles from "./frontPageAnimation.module.css";

export const FrontPageAnimation = () => {
  const lottieRef = useRef<LottieRef>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const staticRef = useRef<HTMLImageElement>(null);
  const chairRef = useRef<HTMLImageElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const imageBreakPoint = 820;
  const scale = typeof window !== "undefined" ? window.devicePixelRatio : 2;
  const widthRef = useRef((typeof window !== "undefined") ? window.innerWidth : 0);
  const puppetMaster = usePuppetMaster(scale, canvasRef, lottieRef as LottieRef);

  useEffect(() => {
    puppetMaster.start();
  }, [puppetMaster]);

  const resizeApp = useCallback(() => {
    if (!staticRef.current) return;
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
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeApp);
    return () => {
      window.removeEventListener("resize", resizeApp);
    };
  }, [resizeApp]);

  return (
    <div className={styles.frontPageOuter}>
      <div className={styles.frontPageInner}>
        <img
          alt=""
          ref={staticRef}
          className={styles.frontPageBackground}
          src={
            typeof window !== "undefined" && window.innerWidth <= imageBreakPoint
              ? staticLayerMobile.src
              : staticLayerDesktop.src
         }
        />
        <ScreenCanvas
          ref={canvasRef}
          scale={scale}
          className={styles.screenCanvas}
        />
        <div
          ref={lottieContainerRef}
          className={styles.lottieContainer}
        >
          <PersonCanvas ref={lottieRef} />
        </div>
        <img
          alt=""
          className={styles.frontPageChair}
          src={chair.src}
          ref={chairRef}
        />
      </div>
    </div>
  );
};
