import { forwardRef } from "react";
import { canvasWidth, canvasHeight } from "./screenCanvasUtils";

type ScreenCanvasProps = {
	scale: number;
	className?: string;
};

export const ScreenCanvas = forwardRef<HTMLCanvasElement, ScreenCanvasProps>(
	({ scale, className }: ScreenCanvasProps, ref) => {
		return (
			<canvas
				className={className}
				ref={ref}
				id="fpa-canvas-screen"
				width={Math.floor(canvasWidth * scale)}
				height={Math.floor(canvasHeight * scale)}
			></canvas>
		);
	},
);

ScreenCanvas.displayName = "ScreenCanvas";
