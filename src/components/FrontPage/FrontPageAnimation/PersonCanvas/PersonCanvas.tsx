import { forwardRef } from "react";
import Lottie, { LottieRef } from "lottie-react";
import animationData from "./lottie.json";

export const PersonCanvas = forwardRef<LottieRef | undefined>((_, ref) => {
  return (
    <Lottie
      autoplay={false}
      loop={false}
      lottieRef={ref as LottieRef}
      animationData={animationData}
      style={{ height: "100%", width: "100%" }}
    />
  );
});

PersonCanvas.displayName = "PersonCanvas";
