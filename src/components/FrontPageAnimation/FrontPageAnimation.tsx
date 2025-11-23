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
  const widthRef = useRef((typeof window !== "undefined") ? window.innerWidth : 0);
  const mobileWidth = window.innerWidth < imageBreakPoint;
  const puppetMaster = usePuppetMaster(canvasRef, lottieRef as LottieRef);

  useEffect(() => {
    puppetMaster.start();
  }, [puppetMaster]);

  const resizeApp = useCallback(() => {
    if (!staticRef.current) return;
    if (!chairRef.current) return;
    if (!canvasRef.current) return;
    if (!lottieRef.current) return;
    if (!lottieContainerRef.current) return;
    const newWidth = window.innerWidth;
    const oldWidth = widthRef.current;
    const desktopToMobile =
      oldWidth > imageBreakPoint && newWidth <= imageBreakPoint;
    const mobileToDesktop =
      oldWidth < imageBreakPoint && newWidth >= imageBreakPoint;
    widthRef.current = newWidth;
    if (desktopToMobile) {
      console.log("resizing down")
      staticRef.current.src = staticLayerMobile.src;
      console.log(staticLayerMobile.src)
      chairRef.current.style.bottom = "2%";
      chairRef.current.style.left = "29%";
      chairRef.current.style.height = "60%";
      canvasRef.current.style.left = "28%";
      canvasRef.current.style.bottom = "58%";
      canvasRef.current.style.height = "30%";
      canvasRef.current.style.width = "50%";
      lottieContainerRef.current.style.height = "95%";
      lottieContainerRef.current.style.width = "75%";
      lottieContainerRef.current.style.left = "18%";
    }
    if (mobileToDesktop) {
      staticRef.current.src = staticLayerDesktop.src;
      console.log(staticLayerDesktop.src)
      chairRef.current.style.bottom = "0%";
      chairRef.current.style.left = "17%";
      chairRef.current.style.height = "40%";
      canvasRef.current.style.left = "17%";
      canvasRef.current.style.bottom = "38%";
      canvasRef.current.style.height = "25%";
      canvasRef.current.style.width = "29%";
      lottieContainerRef.current.style.height = "60%";
      lottieContainerRef.current.style.width = "35%";
      lottieContainerRef.current.style.left = "12%";
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
          className={styles.frontPageImg}
          src={
            window.innerWidth <= imageBreakPoint
              ? staticLayerMobile.src
              : staticLayerDesktop.src
         }
        />
        <ScreenCanvas
          mobile={mobileWidth}
          scale={window.devicePixelRatio}
          ref={canvasRef}
        />
        <div
          ref={lottieContainerRef}
          style={{
            position: "absolute",
            bottom: "4%",
            height: mobileWidth ? "95%" : "60%",
            width: mobileWidth ? "75%" : "35%",
            left: mobileWidth ? "18%" : "12%",
          }}
        >
          <PersonCanvas ref={lottieRef} />
        </div>
        <img
          alt=""
          style={{
            position: "absolute",
            bottom: mobileWidth ? "2%" : "0",
            left: mobileWidth ? "29%" : "17%",
            width: "auto",
            height: mobileWidth ? "60%" : "40%",
          }}
          src={chair.src}
          ref={chairRef}
        />
      </div>
    </div>
  );
};
