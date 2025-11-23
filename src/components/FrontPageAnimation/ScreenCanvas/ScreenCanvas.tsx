import { forwardRef } from "react";
import { canvasWidth, canvasHeight } from "./screenCanvasUtils";

type ScreenCanvasProps = {
	scale: number;
	/** If true, the animation will resize for mobile screens */
	mobile?: boolean;
};

export const ScreenCanvas = forwardRef<HTMLCanvasElement, ScreenCanvasProps>(
	({ scale, mobile = false }: ScreenCanvasProps, ref) => {
		return (
			<canvas
				style={{
					position: "absolute",
					left: mobile ? "28%" : "17%",
					bottom: mobile ? "58%" : "38%",
					height: mobile ? "30%" : "25%",
					width: mobile ? "50%" : "29%",
				}}
				ref={ref}
				id="fpa-canvas-screen"
				width={Math.floor(canvasWidth * scale)}
				height={Math.floor(canvasHeight * scale)}
			></canvas>
		);
	},
);
