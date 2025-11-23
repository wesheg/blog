import CodeBlob, { BezierControlPoints } from "./CodeBlob";
import Cursor from "./Cursor";
import { getRandomSelection } from "@ui/components/FrontPageAnimation/utils";
import {
	canvasHeight,
	canvasWidth,
	characterWidth,
	lineHeight,
	maxCharsPerLine,
} from "./screenCanvasUtils";

/**
 * The data structure for the code animation.
 * This object helps keep track of the CodeBlobs displayed and the cursor's position
 * on the screen. It also provides several methods for animating the screen.
 *
 * @property {CanvasRenderingContext2D} canvasContext - The 2d HTML Canvas Context.
 *    This is used for drawing shapes onto the canvas DOM element.
 * @property {Array<Array>} screen - A 2d array representing the CodeBlobs displayed
 *    on the screen. The first dimension of this array represents the lines of code,
 *    and the second dimension represents code blobs in that line.
 * @property {Cursor} cursor - The data representation of the cursor displayed on the screen.
 */
export default class CodeScreen {
	canvasContext: CanvasRenderingContext2D;
	cursor: Cursor;
	screen: CodeBlob[][];
	numLines = 10;

	_maxEndPosition = maxCharsPerLine - 2;

	constructor(canvasContext: CanvasRenderingContext2D) {
		this.canvasContext = canvasContext;
		this.screen = Array.from({ length: this.numLines }, () => []);
		this._drawInitialState();

		const cursorLine = 0;
		const cursorLineBlobs = this.screen[cursorLine];
		const cursorX = cursorLineBlobs[cursorLineBlobs.length - 1].endX + 1;
		this.cursor = new Cursor(cursorX, cursorLine);
		this.startCursorBlink();
	}

	/**
	 * Insert a pause in the animation for `ms` milliseconds.
	 *
	 * @param {number} ms - The length of the pause in milliseconds
	 * @returns {Promise} - A Promise that resolve in `ms` milliseconds.
	 *    This promise can be awaited to block further animation until it's resolved.
	 */
	addTimeDelay(ms: number) {
		return new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
	}

	/**
	 * Delete the CodeBlob immediately to the left of the current cursor position.
	 * Simulates the repeated pressing of "backspace" to delete the blob from the screen.
	 */
	async backspaceBlob() {
		await this.stopCursorBlink();
		const row = this.screen[this.cursor.line];
		const lastBlob = row.pop();
		if (!lastBlob) return;
		while (this.cursor.xChar > lastBlob.startX) {
			await this._clearCursor();
			this.cursor.xChar--;
			await this._drawCursor();
			// create 2px of space between the cursor and the blob as its being deleted
			this.canvasContext.clearRect(
				this.cursor.xPixel - characterWidth / 2,
				this.cursor.yPixel,
				characterWidth / 2,
				lineHeight,
			);
			await this.addTimeDelay(100);
		}
	}

	/**
	 * Delete an entire line of code. Shift all lines below up one.
	 * Simulates the user pressing `Cmd + Backspace` and then `Backspace` again.
	 *
	 * @param {number} line - The line to be deleted.
	 */
	async deleteLine(line: number) {
		const cleanLine = line % this.screen.length;
		this._validateLineNumber(cleanLine, "deleteLine");

		// determine cursor position after blobs are deleted
		const firstBlob = this.screen[cleanLine].shift();
		const newCursorPosition = firstBlob ? firstBlob.startX : 0;

		// remove the blobs from the data structure
		this.screen[cleanLine] = [];

		// clear the cursor and update its xChar for future re-draw
		await this._clearCursor();
		this.cursor.xChar = newCursorPosition;

		// clear all the pixels for the row
		this.canvasContext.clearRect(
			this.cursor.xPixel,
			this.cursor.yPixel,
			canvasWidth - (this.cursor.xPixel + characterWidth),
			lineHeight,
		);

		await this._drawCursor();

		// if the cursor is not at the beginning of the line, move it one more time
		if (this.cursor.xChar > 0) {
			await this.addTimeDelay(100);
			await this._clearCursor();
			this.cursor.xChar = 0;
			await this._drawCursor();
		}

		// shift the lower rows up one line
		let pointer = cleanLine + 1;
		while (pointer < this.screen.length) {
			this.screen[pointer - 1] = this.screen[pointer];
			this.screen[pointer - 1].forEach((blob) => blob.line--);
			this.screen[pointer++] = [];
		}

		// clear the pixels and re-draw the blobs
		await this.addTimeDelay(500);
		const oneLineUp = Math.max(0, this.cursor.line - 1);
		await this.moveCursor(oneLineUp);
		this.canvasContext.clearRect(
			0,
			this.cursor.yPixel + lineHeight,
			canvasWidth,
			canvasHeight - (this.cursor.yPixel + lineHeight),
		);
		for (let i = cleanLine; i < this.screen.length; i++) {
			const row = this.screen[i];
			row.forEach((blob) => this._drawSingleCodeBlob(blob));
		}

		// if the first line has been deleted, move the cursor back to the end of the line
		if (this.cursor.line === 0) {
			const topRow = this.screen[0];
			const lastBlob = topRow[topRow.length - 1];
			if (lastBlob) {
				await this._clearCursor();
				this.cursor.xChar = lastBlob.endX + 1;
				await this._drawCursor();
			}
		}
	}

	/**
	 * Inserts a line at the cursor's current position.
	 * Simulates the user pressing the `Enter` key.
	 */
	async insertLine() {
		let currentLine = this.cursor.line;
		const lastLine = this.screen.length - 1;
		if (currentLine === lastLine) await this.moveCursor(--currentLine);

		const firstBlob = this.screen[currentLine][0];
		const newCursorXchar = firstBlob ? firstBlob.startX : 0;

		// shift all rows below the cursor down one line
		const newLine = currentLine + 1;
		let pointer1 = lastLine - 1;
		let pointer2 = lastLine;
		while (pointer2 > newLine) {
			this.screen[pointer1].forEach((blob) => blob.line++);
			this.screen[pointer2--] = [...this.screen[pointer1--]];
		}
		this.screen[pointer2] = [];

		await this._clearCursor();
		this.cursor.line = newLine;
		this.cursor.xChar = newCursorXchar;

		this.canvasContext.clearRect(
			0,
			this.cursor.yPixel,
			canvasWidth,
			canvasHeight - this.cursor.yPixel,
		);

		for (let i = newLine + 1; i < this.screen.length; i++) {
			const row = this.screen[i];
			row.forEach((blob) => this._drawSingleCodeBlob(blob));
		}

		this._drawCursor();
	}

	/**
	 * Move the cursor on the screen directly to the given line number.
	 * This function will "jump" the cursor directly to its destination,
	 * instead of moving it one line at a time.
	 *
	 * @param {number} line - The line number to which the cursor should be moved.
	 *    If this line is greater than `this.screen.length`, the destination line
	 *    wraps around to the top of the screen using the mod operator.
	 */
	async jumpCursor(line: number) {
		const cleanLine = line % this.screen.length;
		this._validateLineNumber(cleanLine, "jumpCursor");
		await this.stopCursorBlink();
		await this._clearCursor();

		const blobs = this.screen[cleanLine];
		const emptyRow = blobs.length === 0;
		if (emptyRow) {
			this.cursor.xChar = 0;
		} else {
			const lastBlob = blobs[blobs.length - 1];
			this.cursor.xChar = lastBlob.endX + 1;
		}
		this.cursor.line = cleanLine;
		await this._drawCursor();
	}

	/**
	 * Move the cursor one line at a time until it reaches the given line number.
	 *
	 * @param {number} line - The line number to which the cursor should be moved.
	 *    If this line is greater than `this.screen.length`, the destination line
	 *    wraps around to the top of the screen using the mod operator.
	 */
	async moveCursor(line: number) {
		if (this.cursor.line === line) return;
		await this.addTimeDelay(700); // <-- 700ms is roughly the time it takes for the arm to reach the mouse
		const cleanLine = line % this.screen.length;
		this._validateLineNumber(cleanLine, "moveCursor");
		await this.stopCursorBlink();
		while (this.cursor.line !== cleanLine) {
			await this._clearCursor();
			this.cursor.line < cleanLine ? this.cursor.line++ : this.cursor.line--;
			const nextRow = this.screen[this.cursor.line];
			const lastBlob = nextRow[nextRow.length - 1];
			this.cursor.xChar = lastBlob ? lastBlob.endX + 1 : 0;
			await this._drawCursor();
			await this.addTimeDelay(300);
		}
		await this.startCursorBlink();
	}

	/**
	 * Set the cursor blinking at its current location.
	 */
	async startCursorBlink() {
		const cursorAlreadyBlinking = this.cursor.blinkInterval !== undefined;
		if (cursorAlreadyBlinking) return;

		await this._drawCursor();
		this.canvasContext.clearRect(
			this.cursor._xPixel + 1,
			this.cursor._yPixel,
			characterWidth - 1,
			lineHeight,
		);
		setTimeout(() => this._drawCursor(), 500);

		this.cursor.blinkInterval = window.setInterval(() => {
			this.canvasContext.clearRect(
				this.cursor._xPixel + 1,
				this.cursor._yPixel,
				characterWidth - 1,
				lineHeight,
			);
			setTimeout(() => this._drawCursor(), 500);
		}, 1000);
	}

	/**
	 * Stop the cursor blink and display a rectangle in its place.
	 */
	async stopCursorBlink() {
		if (typeof this.cursor.blinkInterval !== "number") return;
		window.clearInterval(this.cursor.blinkInterval);
		this.cursor.blinkInterval = undefined;
		await this._drawCursor();
	}

	async typeNewBlob() {
		const blob = this._addNewCodeBlob(this.cursor.line);
		if (!blob) return;

		// re-position the cursor to the beginning of the blob
		while (this.cursor.xChar < blob.startX) {
			await this._clearCursor();
			this.cursor.xChar++;
			await this._drawCursor();
			await this.addTimeDelay(150);
		}
		while (this.cursor.xChar > blob.startX) {
			await this._clearCursor();
			this.cursor.xChar--;
			await this._drawCursor();
			await this.addTimeDelay(150);
		}
		await this._clearCursor();

		while (this.cursor.xChar < blob.endX) {
			await this._clearCursor();
			await this._drawNextBlobChar(blob);
			this.cursor.xChar++;
			await this._drawCursor();
			await this.addTimeDelay(150);
		}
		await this._clearCursor();
		this.cursor.xChar++;
		await this._drawCursor();
		return blob;
	}

	async typeNewLine() {
		let blob = await this.typeNewBlob();
		while (blob) {
			blob = await this.typeNewBlob();
		}
	}

	/**
	 * Adds a CodeBlob of random length and color onto the end of the given line.
	 * Does nothing if there is no space left in the line for a new CodeBlob.
	 *
	 * @param {number} line - The line number of `this.screen` where the CodeBlob
	 *    should be added. Must be between `0` and `this.screen.length - 1`.
	 */
	_addNewCodeBlob(line: number) {
		this._validateLineNumber(line, "addNewCodeBlob");
		let blobStart: number;
		let width: number;
		const row = this.screen[line];
		const possibleWidths = [5, 11, 15];

		const emptyRow = row.length === 0;
		if (emptyRow) {
			const maxNestingDepth = line < 6 ? 3 : 2;
			const nestingPosition =
				maxNestingDepth -
				Math.abs(maxNestingDepth - (line % (maxNestingDepth * 2)));
			blobStart = nestingPosition * 3;
			width = Math.min(...possibleWidths);
		} else {
			const lastBlob = row[row.length - 1];
			blobStart = lastBlob.endX + 1;
			const availableWidths = possibleWidths.filter(
				(v) => blobStart + v <= this._maxEndPosition,
			);
			const noRoomForBlob = availableWidths.length === 0;
			if (noRoomForBlob) return;
			width = getRandomSelection(availableWidths);
		}
		const newBlob = new CodeBlob(blobStart, line, width);
		row.push(newBlob);
		return newBlob;
	}

	async _clearCursor() {
		this.canvasContext.clearRect(
			this.cursor.xPixel,
			this.cursor.yPixel,
			characterWidth,
			lineHeight,
		);
	}

	async _drawCursor() {
		this.canvasContext.fillStyle = this.cursor.color;
		this.canvasContext.fillRect(
			this.cursor.xPixel,
			this.cursor.yPixel,
			characterWidth,
			lineHeight,
		);
	}

	/**
	 * Fill the screen with random CodeBlobs.
	 */
	_drawInitialState() {
		// clear the canvas
		this.canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

		// add the initial blobs
		this.screen.forEach((_row, line) => this._populateLine(line));
		this.screen.forEach((line) => {
			line.forEach((blob) => this._drawSingleCodeBlob(blob));
		});
	}

	/**
	 * Draw the next character in the blob.
	 * This function is used in a loop for typing a new code blob.
	 *
	 * @param {CodeBlob} blob - The blob being typed.
	 */
	async _drawNextBlobChar(blob: CodeBlob) {
		let leftX = this.cursor.xPixel;
		let rightX = this.cursor.xPixel + characterWidth;
		// add some spacing between cursor and typing character
		if (this.cursor.xChar > blob.startX + 1) {
			leftX -= characterWidth / 2;
			if (this.cursor.xChar < blob.endX - 1) {
				rightX -= characterWidth / 2;
			}
		}
		const charBezierControlPoints: BezierControlPoints = {
			leftSide: [
				[leftX, this.cursor.yPixel],
				[leftX, this.cursor.yPixel + lineHeight],
			],
			rightSide: [
				[rightX, this.cursor.yPixel],
				[rightX, this.cursor.yPixel + lineHeight],
			],
		};

		if (this.cursor.xChar === blob.startX) {
			charBezierControlPoints.leftSide = blob.bezierControlPoints.leftSide;
			leftX += blob.curveDepth;
		} else if (this.cursor.xChar === blob.endX - 1) {
			charBezierControlPoints.rightSide = blob.bezierControlPoints.rightSide;
			rightX -= blob.curveDepth;
		}

		this.canvasContext.fillStyle = blob.color;
		this.canvasContext.moveTo(this.cursor.xPixel, this.cursor.yPixel);
		this.canvasContext.beginPath();

		this.canvasContext.lineTo(rightX, this.cursor.yPixel);
		this.canvasContext.bezierCurveTo(
			charBezierControlPoints.rightSide[0][0],
			charBezierControlPoints.rightSide[0][1],
			charBezierControlPoints.rightSide[1][0],
			charBezierControlPoints.rightSide[1][1],
			rightX,
			this.cursor.yPixel + lineHeight,
		);
		this.canvasContext.lineTo(leftX, this.cursor.yPixel + lineHeight);
		this.canvasContext.bezierCurveTo(
			charBezierControlPoints.leftSide[1][0],
			charBezierControlPoints.leftSide[1][1],
			charBezierControlPoints.leftSide[0][0],
			charBezierControlPoints.leftSide[0][1],
			leftX,
			this.cursor.yPixel,
		);

		this.canvasContext.closePath();
		this.canvasContext.fill();
	}

	_drawSingleCodeBlob(blob: CodeBlob) {
		this.canvasContext.fillStyle = blob.color;
		this.canvasContext.moveTo(blob.startX, blob._startYPixel);
		this.canvasContext.beginPath();

		this.canvasContext.lineTo(
			blob.endXPixel - blob.curveDepth,
			blob.startYPixel,
		);
		this.canvasContext.bezierCurveTo(
			blob.bezierControlPoints.rightSide[0][0],
			blob.bezierControlPoints.rightSide[0][1],
			blob.bezierControlPoints.rightSide[1][0],
			blob.bezierControlPoints.rightSide[1][1],
			blob.endXPixel - blob.curveDepth,
			blob.endYPixel,
		);
		this.canvasContext.lineTo(
			blob.startXPixel + blob.curveDepth,
			blob.endYPixel,
		);
		this.canvasContext.bezierCurveTo(
			blob.bezierControlPoints.leftSide[1][0],
			blob.bezierControlPoints.leftSide[1][1],
			blob.bezierControlPoints.leftSide[0][0],
			blob.bezierControlPoints.leftSide[0][1],
			blob.startXPixel + blob.curveDepth,
			blob.startYPixel,
		);

		this.canvasContext.closePath();
		this.canvasContext.fill();
	}

	/**
	 * Add new CodeBlobs to an empty line.
	 * If the given `line` number is not empty, this function does nothing.
	 *
	 * @param {number} line - The line number of `this.screen` that needs to be
	 *    filled with CodeBlobs. Must be between `0` and `this.screen.length - 1`.
	 */
	_populateLine(line: number) {
		this._validateLineNumber(line, "populateLine");
		const rowHasBlobs = this.screen[line].length > 0;
		if (rowHasBlobs) return;
		const numberOfBlobs = getRandomSelection([2, 3, 4]);
		for (let i = 0; i < numberOfBlobs; i++) {
			this._addNewCodeBlob(line);
		}
	}

	_validateLineNumber(line: number, funcName: string) {
		if (line < 0 || line > this.screen.length - 1) {
			throw new Error(`Invalid line number "${line}" given to "${funcName}"`);
		}
	}
}
