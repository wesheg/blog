// CSS pixel width of a single "character" on the CodeScreen
export const characterWidth = 8;

// CSS pixel height of a single line of code on the CodeScreen
export const lineHeight = 13;

// number of CSS pixels above & below each line on the CodeScreen
export const lineSpacing = 3;

// maximum horizontal width of lines in characters
export const maxCharsPerLine = 36;

// CSS pixel width of HTML canvas element
export const canvasWidth = maxCharsPerLine * characterWidth;

// CSS pixel height of HTML canvas element
export const canvasHeight = (lineHeight + lineSpacing * 2) * 10;

/**
 * Given a line number from the CodeScreen, return the y-pixel coordinate for the top of the line.
 *
 * @param {number} line - The code line number on the CodeScreen
 * @returns {number} y-pixel coordinate for the top of the given line.
 */
export function convertLineNumberToPixel(line: number) {
  return line * (lineHeight + lineSpacing * 2);
}

// custom error for invalid setters
export class InvalidSetterMethod extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
