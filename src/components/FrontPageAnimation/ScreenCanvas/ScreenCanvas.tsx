"use client"

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
				ref={ref}
				className={className}
				width={Math.floor(canvasWidth * scale)}
				height={Math.floor(canvasHeight * scale)}
			></canvas>
		);
	},
);

ScreenCanvas.displayName = "ScreenCanvas";
