import { getRandomSelection } from "@ui/components/FrontPage/FrontPageAnimation/utils";
import {
  characterWidth,
  convertLineNumberToPixel,
  InvalidSetterMethod,
  lineHeight,
} from "./screenCanvasUtils";

/**
 * A data representation of a code blob appearing on the screen.
 *
 * @property {number} widthInChars - The width of this object in
 *    number of characters.
 * @property {number} widthInPixels - The width of this object in
 *    number of pixels. This property cannot be set directly, change
 *    this width by setting the widthInChars property.
 */
export default class CodeBlob {
  _bezierControlPoints: BezierControlPoints;
  _endX: number;
  _endXPixel: number;
  _endYPixel: number;
  _line: number;
  _startX: number;
  _startXPixel: number;
  _startYPixel: number;
  _widthInChars: number;
  _widthInPixels: number;
  color: string;

  _possibleColors = [
    "#ffe800", // yellow
    "#dc1d88", // pink
    "#b779ff", // purple
    "#1fd7f0", // blue
    "#5FC323", // green
  ];

  curveDepth = characterWidth;
  _bezierXModifier = this.curveDepth / 3;

  constructor(startX: number, line: number, widthInChars: number) {
    this._widthInChars = widthInChars;
    this._widthInPixels = this._widthInChars * characterWidth;

    // x-coordinates in chars and pixels
    this._startX = startX;
    this._startXPixel = this._startX * characterWidth;
    this._endX = this._startX + this._widthInChars;
    this._endXPixel = this._startXPixel + this._widthInPixels;

    // y-coordinates in pixels
    this._line = line;
    this._startYPixel = convertLineNumberToPixel(this._line);
    this._endYPixel = this._startYPixel + lineHeight;

    this.color = getRandomSelection(this._possibleColors);

    // set the curve control points
    this._bezierControlPoints = {
      rightSide: [
        [this._endXPixel + this._bezierXModifier, this._startYPixel],
        [this._endXPixel + this._bezierXModifier, this._endYPixel],
      ],
      leftSide: [
        [this._startXPixel - this._bezierXModifier, this._startYPixel],
        [this._startXPixel - this._bezierXModifier, this._endYPixel],
      ],
    };
  }

  get widthInChars() {
    return this._widthInChars;
  }

  set widthInChars(newWidth: number) {
    this._widthInChars = newWidth;
    this._widthInPixels = this._widthInChars * characterWidth;
    this._endX = this._startX + this._widthInChars;
    this._endXPixel = this._startXPixel + this._widthInPixels;
  }

  get widthInPixels() {
    return this._widthInPixels;
  }

  set widthInPixels(_newWidth: number) {
    throw new InvalidSetterMethod(
      "You cannot set the 'widthInPixels' value directly. Use 'widthInChars' instead.",
    );
  }

  get startX() {
    return this._startX;
  }

  set startX(_newStart: number) {
    throw new InvalidSetterMethod("'startX' cannot be changed once it is set");
  }

  get startXPixel() {
    return this._startXPixel;
  }

  set startXPixel(_newStart: number) {
    throw new InvalidSetterMethod(
      "'startXPixel' cannot be changed once it is set",
    );
  }

  get endX() {
    return this._endX;
  }

  set endX(_newEnd: number) {
    throw new InvalidSetterMethod(
      "You cannot set the 'endX' value directly. Use 'widthInChars' instead.",
    );
  }

  get endXPixel() {
    return this._endXPixel;
  }

  set endXPixel(_newEnd: number) {
    throw new InvalidSetterMethod(
      "You cannot set the 'endXPixel' value directly. Use 'widthInChars' instead.",
    );
  }

  get line() {
    return this._line;
  }

  set line(newLine: number) {
    this._line = newLine;
    this._startYPixel = convertLineNumberToPixel(this._line);
    this._endYPixel = this._startYPixel + lineHeight;
    this._bezierControlPoints = {
      rightSide: [
        [this._endXPixel + this._bezierXModifier, this._startYPixel],
        [this._endXPixel + this._bezierXModifier, this._endYPixel],
      ],
      leftSide: [
        [this._startXPixel - this._bezierXModifier, this._startYPixel],
        [this._startXPixel - this._bezierXModifier, this._endYPixel],
      ],
    };
  }

  get startYPixel() {
    return this._startYPixel;
  }

  set startYPixel(_newStart: number) {
    throw new InvalidSetterMethod(
      "You cannot set the 'startYPixel' value directly. Use 'line' instead.",
    );
  }

  get endYPixel() {
    return this._endYPixel;
  }

  set endYPixel(_newEnd: number) {
    throw new InvalidSetterMethod(
      "You cannot set the 'endYPixel' value directly. Use 'line' instead.",
    );
  }

  get bezierControlPoints() {
    return this._bezierControlPoints;
  }

  set bezierControlPoints(_newPoints: BezierControlPoints) {
    throw new InvalidSetterMethod(
      "You cannot set the 'bezierControlPoints' value directly.",
    );
  }
}

export type BezierControlPoints = {
  rightSide: [[number, number], [number, number]];
  leftSide: [[number, number], [number, number]];
};
