// Model of the code shown on the monitor. All horizontal measurements are
// fractions of the screen's content width so the same document renders
// correctly on both the desktop and mobile backgrounds.

export const GAP = 0.022; // gap between token pills
export const INDENT = 0.055; // width of one indent level
export const MAX_FILL = 0.94; // max fraction of content width a line may fill
export const MIN_LINES = 4;
export const MAX_LINES = 10;

export type ColorKey = "yellow" | "pink" | "purple" | "blue" | "green";

export interface Token {
  c: ColorKey;
  w: number;
}

export interface Line {
  indent: number;
  tokens: Token[];
}

export interface Cursor {
  row: number;
  xFrac: number;
}

export interface Snapshot {
  lines: Line[];
  cursor: Cursor;
  rev: number;
}

export const rand = (a: number, b: number) => a + Math.random() * (b - a);
export const randInt = (a: number, b: number) => Math.floor(rand(a, b + 1));
export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

const BODY_COLORS: [ColorKey, number][] = [
  ["green", 0.28],
  ["yellow", 0.28],
  ["pink", 0.16],
  ["purple", 0.14],
  ["blue", 0.14],
];
const HEAD_COLORS: [ColorKey, number][] = [
  ["pink", 0.34],
  ["purple", 0.3],
  ["green", 0.16],
  ["blue", 0.1],
  ["yellow", 0.1],
];

function weighted<T>(pairs: [T, number][]): T {
  let total = 0;
  for (const [, w] of pairs) total += w;
  let r = Math.random() * total;
  for (const [v, w] of pairs) {
    r -= w;
    if (r <= 0) return v;
  }
  return pairs[pairs.length - 1][0];
}

export function pickColor(isFirstToken: boolean): ColorKey {
  return weighted(isFirstToken ? HEAD_COLORS : BODY_COLORS);
}

export function randTokenWidth(): number {
  return rand(0.06, 0.22);
}

export function lineFill(line: Line): number {
  let x = line.indent * INDENT;
  line.tokens.forEach((t, i) => {
    x += t.w + (i > 0 ? GAP : 0);
  });
  return x;
}

export function tokenEndFrac(line: Line, idx: number): number {
  let x = line.indent * INDENT;
  for (let i = 0; i <= idx && i < line.tokens.length; i++) {
    x += (i > 0 ? GAP : 0) + line.tokens[i].w;
  }
  return x;
}

function genInitialLines(): Line[] {
  const lines: Line[] = [];
  let indent = 0;
  const count = randInt(7, 9);
  for (let i = 0; i < count; i++) {
    if (i > 0) {
      const r = Math.random();
      if (r < 0.3) indent += 1;
      else if (r < 0.55) indent -= 1;
      indent = clamp(indent, 0, 3);
    }
    const line: Line = { indent, tokens: [] };
    const n = randInt(1, 4);
    for (let j = 0; j < n; j++) {
      const w = randTokenWidth();
      if (lineFill(line) + (j > 0 ? GAP : 0) + w > MAX_FILL - 0.04) break;
      line.tokens.push({ c: pickColor(j === 0), w });
    }
    if (line.tokens.length === 0) {
      line.tokens.push({ c: pickColor(true), w: randTokenWidth() });
    }
    lines.push(line);
  }
  return lines;
}

export class CodeModel {
  lines: Line[];
  cursor: Cursor;
  private rev = 0;

  constructor() {
    this.lines = genInitialLines();
    this.cursor = { row: 0, xFrac: 0 };
    this.cursorToRow(this.lines.length - 1);
  }

  snapshot(): Snapshot {
    return {
      lines: this.lines.map((l) => ({
        indent: l.indent,
        tokens: l.tokens.map((t) => ({ ...t })),
      })),
      cursor: { ...this.cursor },
      rev: ++this.rev,
    };
  }

  cursorToRow(row: number) {
    row = clamp(row, 0, this.lines.length - 1);
    this.cursor = { row, xFrac: lineFill(this.lines[row]) + 0.008 };
  }

  cursorToTokenEnd(row: number, idx: number) {
    row = clamp(row, 0, this.lines.length - 1);
    this.cursor = { row, xFrac: tokenEndFrac(this.lines[row], idx) + 0.004 };
  }

  /** Shrink the last token of the given row (a backspace burst). Returns false
   *  once the row has no tokens left. */
  backspaceChunk(row: number, chunk: number): boolean {
    const line = this.lines[row];
    if (!line || line.tokens.length === 0) return false;
    const tok = line.tokens[line.tokens.length - 1];
    tok.w -= chunk;
    if (tok.w <= 0.012) line.tokens.pop();
    this.cursorToRow(row);
    return line.tokens.length > 0;
  }

  removeLine(row: number) {
    this.lines.splice(row, 1);
    this.cursorToRow(Math.min(row, this.lines.length - 1));
  }

  insertLine(row: number, indent: number) {
    this.lines.splice(row, 0, { indent, tokens: [] });
    this.cursorToRow(row);
  }

  startToken(row: number, c: ColorKey) {
    this.lines[row].tokens.push({ c, w: 0.006 });
    this.cursorToTokenEnd(row, this.lines[row].tokens.length - 1);
  }

  growLastToken(row: number, chunk: number, max: number) {
    const line = this.lines[row];
    const tok = line.tokens[line.tokens.length - 1];
    tok.w = Math.min(tok.w + chunk, max);
    this.cursorToTokenEnd(row, line.tokens.length - 1);
  }

  lastTokenWidth(row: number): number {
    const line = this.lines[row];
    return line.tokens.length ? line.tokens[line.tokens.length - 1].w : 0;
  }

  shrinkTokenAt(row: number, idx: number, chunk: number): number {
    const tok = this.lines[row].tokens[idx];
    tok.w = Math.max(0.006, tok.w - chunk);
    this.cursorToTokenEnd(row, idx);
    return tok.w;
  }

  growTokenAt(row: number, idx: number, chunk: number, max: number): number {
    const tok = this.lines[row].tokens[idx];
    tok.w = Math.min(tok.w + chunk, max);
    this.cursorToTokenEnd(row, idx);
    return tok.w;
  }

  recolorToken(row: number, idx: number, c: ColorKey) {
    this.lines[row].tokens[idx].c = c;
  }

  /** Widest a token at `idx` of `row` may grow without overflowing the line. */
  roomFor(row: number, idx: number): number {
    const line = this.lines[row];
    let others = line.indent * INDENT;
    line.tokens.forEach((t, i) => {
      if (i !== idx) others += t.w;
    });
    others += GAP * Math.max(0, line.tokens.length - 1);
    return MAX_FILL - others;
  }
}
