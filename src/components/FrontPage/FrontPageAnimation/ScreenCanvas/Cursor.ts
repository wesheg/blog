import {
  characterWidth,
  convertLineNumberToPixel,
  InvalidSetterMethod,
} from "./screenCanvasUtils";

/**
 * The data representation of a cursor on the CodeScreen.
 *
 * @property {number} xChar - The x-position of the cursor in characters.
 * @property {number} xPixel - The x-position of the top-left corner of the
 *    cursor in pixels
 * @property {number} line - The code line CodeScreen on which the cursor appears
 * @property {number} yPixel - The y-position of the top-left corner of the
 *    cursor in pixels
 * @property {number | undefined} blinkInterval - The number returned by the
 *    `window.setInterval` function that controls the blinking cursor.
 *    If the cursor is not currently blinking, this property is undefined.
 */
export default class Cursor {
  _line: number;
  _xChar: number;
  _xPixel: number;
  _yPixel: number;
  blinkInterval: number | undefined;

  color = "#f15a24";

  constructor(xChar: number, line: number) {
    this._line = line;
    this._yPixel = convertLineNumberToPixel(this._line);
    this._xChar = xChar;
    this._xPixel = this._xChar * characterWidth;
  }

  get xChar() {
    return this._xChar;
  }

  set xChar(newChar: number) {
    this._xChar = newChar;
    this._xPixel = this._xChar * characterWidth;
  }

  get xPixel() {
    return this._xPixel;
  }

  set xPixel(_newVal: number) {
    throw new InvalidSetterMethod(
      'The "xPixel" property of Cursor cannot be set directly.\nUse "xChar" instead.',
    );
  }

  get line() {
    return this._line;
  }

  set line(newLine: number) {
    this._line = newLine;
    this._yPixel = convertLineNumberToPixel(this._line);
  }

  get yPixel() {
    return this._yPixel;
  }

  set yPixel(_newVal: number) {
    throw new InvalidSetterMethod(
      'The "yPixel" property of Cursor cannot be set directly.\nUse "line" instead.',
    );
  }
}
