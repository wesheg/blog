"use client";

/* eslint-disable @next/next/no-img-element -- Sprite dimensions and layering are controlled by the animation CSS. */

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

import chair from "./static/chair.png";
import coffeeMug from "./static/coffee_mug.png";
import desktopScene from "./static/static-layer-desktop.png";
import head from "./static/head.png";
import hood from "./static/hood.png";
import leftShoe from "./static/left_shoe.png";
import lowerLeftLeg from "./static/lower_left_leg.png";
import lowerRightArm from "./static/lower_right_arm.png";
import lowerRightLeg from "./static/lower_right_leg.png";
import mobileScene from "./static/static-layer-mobile.png";
import mouse from "./static/mouse.png";
import rightFist from "./static/right_fist.png";
import rightHandGrip from "./static/right_hand_grip.png";
import rightHandRelaxedTwo from "./static/right_hand_relaxed_2.png";
import rightShoe from "./static/right_shoe.png";
import upperLeftArm from "./static/upper-left-arm.png";
import upperRightArm from "./static/upper_right_arm.png";

import styles from "./CodeDeskAnimation.module.css";

type CodeColor = "green" | "yellow" | "pink" | "purple" | "blue";
type Segment = "coffee" | "mouse" | "delete" | "add" | "edit";
type BodyPose =
  | "idle"
  | "typing"
  | "mouse"
  | "coffee-reach"
  | "coffee-lift"
  | "coffee-sip";
type MugStage = "desk" | "gripped" | "sip";

type Token = {
  id: number;
  color: CodeColor;
  width: number;
};

type CodeLine = {
  id: number;
  indent: number;
  tokens: Token[];
};

type CursorState = {
  line: number;
  column: number;
  mode: "caret" | "mouse";
  moving: boolean;
};

type SceneStyle = CSSProperties & {
  "--mouse-rig-shift": string;
};

const COLORS: CodeColor[] = ["green", "yellow", "pink", "purple", "blue"];
const VISIBLE_LINE_COUNT = 10;
const MIN_LINE_COUNT = 5;
const MAX_LINE_COUNT = 15;

let nextLineId = 1;
let nextTokenId = 1;

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(items: readonly T[]) {
  return items[randomInteger(0, items.length - 1)];
}

function makeToken(previousColor?: CodeColor): Token {
  const availableColors = previousColor
    ? COLORS.filter((color) => color !== previousColor)
    : COLORS;

  return {
    id: nextTokenId++,
    color: randomItem(availableColors),
    width: randomInteger(8, 22),
  };
}

function makeLine(): CodeLine {
  const tokens: Token[] = [];
  const tokenCount = randomInteger(2, 4);

  for (let index = 0; index < tokenCount; index += 1) {
    tokens.push(makeToken(tokens.at(-1)?.color));
  }

  return {
    id: nextLineId++,
    indent: randomItem([0, 0, 5, 9, 13]),
    tokens,
  };
}

function makeInitialLines() {
  return Array.from({ length: 11 }, makeLine);
}

function lineEnd(line: CodeLine) {
  const tokenWidth = line.tokens.reduce((total, token) => total + token.width, 0);
  const gaps = Math.max(0, line.tokens.length - 1) * 2.2;
  return Math.min(96, line.indent + tokenWidth + gaps);
}

function tokenStart(line: CodeLine, tokenIndex: number) {
  const precedingWidth = line.tokens
    .slice(0, tokenIndex)
    .reduce((total, token) => total + token.width + 2.2, 0);
  return Math.min(95, line.indent + precedingWidth);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

const actionLabels: Record<Segment, string> = {
  coffee: "Taking a coffee break",
  mouse: "Moving the mouse",
  delete: "Deleting code",
  add: "Writing new code",
  edit: "Editing code",
};

export type CodeDeskSceneProps = {
  /**
   * Uses the mobile scene composition even when the viewport is 1,000px or wider.
   * The scene targets 400px wide in this mode and scales down with containers
   * narrower than that.
   */
  forceSmallScreen?: boolean;
};

export default function CodeDeskScene({
  forceSmallScreen = false,
}: CodeDeskSceneProps) {
  const [lines, setLines] = useState<CodeLine[]>(makeInitialLines);
  const linesRef = useRef(lines);
  const [cursor, setCursor] = useState<CursorState>({
    line: 5,
    column: 62,
    mode: "caret",
    moving: false,
  });
  const cursorRef = useRef(cursor);
  const [pose, setPose] = useState<BodyPose>("idle");
  const [mugStage, setMugStage] = useState<MugStage>("desk");
  const [mouseProgress, setMouseProgress] = useState(0);
  const [typingBeat, setTypingBeat] = useState(0);
  const [editingTokenId, setEditingTokenId] = useState<number | null>(null);
  const [deletingLineId, setDeletingLineId] = useState<number | null>(null);
  const [status, setStatus] = useState("Thinking about the code");
  const runIdRef = useRef(0);

  useEffect(() => {
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    const timers = new Set<number>();
    let lastSegment: Segment | null = null;

    const isCurrent = () => runIdRef.current === runId;

    const pause = (milliseconds: number) =>
      new Promise<void>((resolve) => {
        const timer = window.setTimeout(() => {
          timers.delete(timer);
          resolve();
        }, milliseconds);
        timers.add(timer);
      });

    const commitLines = (next: CodeLine[]) => {
      if (!isCurrent()) return;
      linesRef.current = next;
      setLines(next);
    };

    const commitCursor = (next: CursorState) => {
      if (!isCurrent()) return;
      cursorRef.current = next;
      setCursor(next);
    };

    const tapKey = async (minimum = 140, maximum = 260) => {
      if (!isCurrent()) return;
      setTypingBeat((beat) => (beat + 1) % 2);
      await pause(randomInteger(minimum, maximum));
    };

    const moveCursor = async (
      targetLine: number,
      targetColumn: number,
      duration = 420,
      mode: CursorState["mode"] = "caret",
    ) => {
      const from = cursorRef.current;
      const boundedLine = clamp(targetLine, 0, Math.max(0, linesRef.current.length - 1));
      const boundedColumn = clamp(targetColumn, 1, 97);
      const steps = Math.max(3, Math.round(duration / 70));

      for (let step = 1; step <= steps && isCurrent(); step += 1) {
        const progress = step / steps;
        const eased = 1 - (1 - progress) ** 3;
        commitCursor({
          line: Math.round(from.line + (boundedLine - from.line) * eased),
          column: from.column + (boundedColumn - from.column) * eased,
          mode,
          moving: true,
        });
        await pause(duration / steps);
      }

      commitCursor({
        line: boundedLine,
        column: boundedColumn,
        mode,
        moving: false,
      });
    };

    const finishAtRest = async () => {
      if (!isCurrent()) return;
      setTypingBeat(0);
      setPose("idle");
      setStatus("Thinking about the code");
      await pause(randomInteger(780, 1150));
    };

    const drinkCoffee = async () => {
      setStatus(actionLabels.coffee);
      setPose("coffee-reach");
      await pause(820);
      setMugStage("gripped");
      await pause(260);
      setPose("coffee-lift");
      setMugStage("sip");
      await pause(1050);
      setPose("coffee-sip");
      await pause(randomInteger(760, 1250));
      setPose("coffee-lift");
      await pause(700);
      setPose("coffee-reach");
      setMugStage("gripped");
      await pause(760);
      setMugStage("desk");
      await pause(240);
      await finishAtRest();
    };

    const moveMouse = async () => {
      setStatus(actionLabels.mouse);
      setPose("mouse");
      commitCursor({ ...cursorRef.current, mode: "mouse", moving: true });
      await pause(480);

      let currentProgress = 0;
      let currentLine = cursorRef.current.line;
      const passes = randomInteger(2, 4);

      for (let pass = 0; pass < passes && isCurrent(); pass += 1) {
        const direction = pass % 2 === 0 ? randomItem([-1, 1]) : -Math.sign(currentProgress || 1);
        const targetProgress = direction * (0.55 + Math.random() * 0.45);
        const targetLine = clamp(
          currentLine + Math.round(targetProgress * randomInteger(2, 4)),
          0,
          linesRef.current.length - 1,
        );
        const targetColumn = clamp(
          cursorRef.current.column + randomInteger(-13, 13),
          8,
          92,
        );
        const startColumn = cursorRef.current.column;
        const steps = randomInteger(5, 8);

        for (let step = 1; step <= steps && isCurrent(); step += 1) {
          const progress = step / steps;
          const eased = 0.5 - Math.cos(progress * Math.PI) / 2;
          const physicalPosition =
            currentProgress + (targetProgress - currentProgress) * eased;
          setMouseProgress(physicalPosition);
          commitCursor({
            line: Math.round(currentLine + (targetLine - currentLine) * eased),
            column: startColumn + (targetColumn - startColumn) * eased,
            mode: "mouse",
            moving: true,
          });
          await pause(randomInteger(52, 86));
        }

        currentProgress = targetProgress;
        currentLine = targetLine;
        commitCursor({
          line: targetLine,
          column: targetColumn,
          mode: "mouse",
          moving: false,
        });
        await pause(randomInteger(180, 360));
      }

      const returnSteps = 6;
      for (let step = 1; step <= returnSteps && isCurrent(); step += 1) {
        const progress = step / returnSteps;
        setMouseProgress(currentProgress * (1 - progress));
        await pause(58);
      }

      setMouseProgress(0);
      commitCursor({ ...cursorRef.current, mode: "caret", moving: false });
      await finishAtRest();
    };

    const deleteCode = async () => {
      setStatus(actionLabels.delete);
      setPose("typing");
      await pause(420);

      const available = Math.max(1, linesRef.current.length - MIN_LINE_COUNT);
      const count = randomInteger(1, Math.min(5, available));
      const start = randomInteger(
        Math.max(0, linesRef.current.length - count - 5),
        linesRef.current.length - count,
      );
      const target = linesRef.current[start];
      await moveCursor(start, lineEnd(target), 560);

      for (let removed = 0; removed < count && isCurrent(); removed += 1) {
        const line = linesRef.current[start];
        if (!line) break;

        while (linesRef.current[start]?.tokens.length > 0 && isCurrent()) {
          const currentToken = linesRef.current[start].tokens.at(-1);
          if (!currentToken) break;

          let visibleWidth = currentToken.width;
          while (visibleWidth > 0 && isCurrent()) {
            visibleWidth = Math.max(0, visibleWidth - randomInteger(1, 2));
            const next = [...linesRef.current];
            const current = next[start];
            const shortened = {
              ...current,
              tokens: current.tokens.map((token) =>
                token.id === currentToken.id ? { ...token, width: visibleWidth } : token,
              ),
            };
            next[start] = shortened;
            commitLines(next);
            commitCursor({
              line: start,
              column: lineEnd(shortened),
              mode: "caret",
              moving: false,
            });
            await tapKey(70, 125);
          }

          const withoutToken = [...linesRef.current];
          const current = withoutToken[start];
          withoutToken[start] = {
            ...current,
            tokens: current.tokens.filter((token) => token.id !== currentToken.id),
          };
          commitLines(withoutToken);
          commitCursor({
            line: start,
            column: lineEnd(withoutToken[start]),
            mode: "caret",
            moving: false,
          });
          await tapKey(90, 150);
        }

        setDeletingLineId(line.id);
        await pause(160);
        const next = linesRef.current.filter((candidate) => candidate.id !== line.id);
        commitLines(next);
        setDeletingLineId(null);
        const nextLineIndex = clamp(start, 0, next.length - 1);
        const nextLine = next[nextLineIndex];
        commitCursor({
          line: nextLineIndex,
          column: nextLine ? lineEnd(nextLine) : 5,
          mode: "caret",
          moving: false,
        });
        await tapKey(240, 380);
      }

      await pause(260);
      await finishAtRest();
    };

    const addCode = async () => {
      setStatus(actionLabels.add);
      setPose("typing");
      await pause(400);

      const capacity = Math.max(1, MAX_LINE_COUNT - linesRef.current.length);
      const count = randomInteger(1, Math.min(5, capacity));
      let insertionIndex = clamp(
        cursorRef.current.line + randomInteger(0, 2),
        0,
        linesRef.current.length,
      );
      const nearby = linesRef.current[Math.min(insertionIndex, linesRef.current.length - 1)];
      await moveCursor(
        Math.min(insertionIndex, linesRef.current.length - 1),
        nearby ? lineEnd(nearby) : 4,
        480,
      );

      for (let added = 0; added < count && isCurrent(); added += 1) {
        const planned = makeLine();
        const blank: CodeLine = { ...planned, tokens: [] };
        const next = [...linesRef.current];
        next.splice(insertionIndex, 0, blank);
        commitLines(next);
        commitCursor({
          line: insertionIndex,
          column: blank.indent,
          mode: "caret",
          moving: false,
        });
        await tapKey(260, 420);

        for (const token of planned.tokens) {
          if (!isCurrent()) break;
          const withToken = [...linesRef.current];
          const current = withToken[insertionIndex];
          withToken[insertionIndex] = {
            ...current,
            tokens: [...current.tokens, { ...token, width: 0 }],
          };
          commitLines(withToken);

          let visibleWidth = 0;
          while (visibleWidth < token.width && isCurrent()) {
            visibleWidth = Math.min(token.width, visibleWidth + randomInteger(1, 2));
            const growingLines = [...linesRef.current];
            const growingLine = growingLines[insertionIndex];
            growingLines[insertionIndex] = {
              ...growingLine,
              tokens: growingLine.tokens.map((candidate) =>
                candidate.id === token.id
                  ? { ...candidate, width: visibleWidth }
                  : candidate,
              ),
            };
            commitLines(growingLines);
            commitCursor({
              line: insertionIndex,
              column: lineEnd(growingLines[insertionIndex]),
              mode: "caret",
              moving: false,
            });
            await tapKey(75, 135);
          }

          await tapKey(100, 180);
        }

        insertionIndex += 1;
      }

      await pause(300);
      await finishAtRest();
    };

    const editCode = async () => {
      setStatus(actionLabels.edit);
      setPose("typing");
      await pause(400);

      const lineIndex = randomInteger(0, linesRef.current.length - 1);
      const line = linesRef.current[lineIndex];
      const tokenIndex = randomInteger(0, line.tokens.length - 1);
      const selected = line.tokens[tokenIndex];
      await moveCursor(
        lineIndex,
        tokenStart(line, tokenIndex) + selected.width,
        540,
      );
      setEditingTokenId(selected.id);

      const retainedWidth = Math.max(
        2,
        Math.round(selected.width * (0.35 + Math.random() * 0.25)),
      );
      let editedWidth = selected.width;

      while (editedWidth > retainedWidth && isCurrent()) {
        editedWidth = Math.max(retainedWidth, editedWidth - randomInteger(1, 2));
        const currentLine = linesRef.current[lineIndex];
        const currentToken = currentLine.tokens[tokenIndex];
        const replacement: Token = {
          ...currentToken,
          width: editedWidth,
        };
        const nextLine = {
          ...currentLine,
          tokens: currentLine.tokens.map((token, index) =>
            index === tokenIndex ? replacement : token,
          ),
        };
        const next = [...linesRef.current];
        next[lineIndex] = nextLine;
        commitLines(next);
        commitCursor({
          line: lineIndex,
          column: tokenStart(nextLine, tokenIndex) + replacement.width,
          mode: "caret",
          moving: false,
        });
        await tapKey(75, 135);
      }

      const replacementColor = randomItem(
        COLORS.filter((color) => color !== selected.color),
      );
      const targetWidth = clamp(retainedWidth + randomInteger(4, 11), 8, 24);

      while (editedWidth < targetWidth && isCurrent()) {
        editedWidth = Math.min(targetWidth, editedWidth + randomInteger(1, 2));
        const currentLine = linesRef.current[lineIndex];
        const currentToken = currentLine.tokens[tokenIndex];
        const replacement: Token = {
          ...currentToken,
          color: replacementColor,
          width: editedWidth,
        };
        const nextLine = {
          ...currentLine,
          tokens: currentLine.tokens.map((token, index) =>
            index === tokenIndex ? replacement : token,
          ),
        };
        const next = [...linesRef.current];
        next[lineIndex] = nextLine;
        commitLines(next);
        commitCursor({
          line: lineIndex,
          column: tokenStart(nextLine, tokenIndex) + replacement.width,
          mode: "caret",
          moving: false,
        });
        await tapKey(80, 145);
      }

      setEditingTokenId(null);
      await pause(360);
      await finishAtRest();
    };

    const chooseSegment = () => {
      const available: Segment[] = ["coffee", "mouse", "edit"];

      if (linesRef.current.length > MIN_LINE_COUNT) available.push("delete");
      if (linesRef.current.length < MAX_LINE_COUNT) available.push("add");

      const withoutRepeat = available.filter((segment) => segment !== lastSegment);
      return randomItem(withoutRepeat.length > 0 ? withoutRepeat : available);
    };

    const run = async () => {
      await pause(850);

      while (isCurrent()) {
        const segment = chooseSegment();
        lastSegment = segment;

        if (segment === "coffee") await drinkCoffee();
        if (segment === "mouse") await moveMouse();
        if (segment === "delete") await deleteCode();
        if (segment === "add") await addCode();
        if (segment === "edit") await editCode();
      }
    };

    void run();

    return () => {
      runIdRef.current += 1;
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const viewStart = clamp(
    cursor.line - (VISIBLE_LINE_COUNT - 2),
    0,
    Math.max(0, lines.length - VISIBLE_LINE_COUNT),
  );
  const cursorRow = clamp(cursor.line - viewStart, 0, VISIBLE_LINE_COUNT - 1);
  const sceneStyle: SceneStyle = {
    "--mouse-rig-shift": `${mouseProgress * 2.4}%`,
  };

  return (
    <section
      className={`${styles.componentRoot} ${forceSmallScreen ? styles.forcedRoot : ""}`}
      aria-label="An animated developer writing code at a desk"
      role="img"
    >
      <div
        className={`${styles.scene} ${forceSmallScreen ? styles.forceSmallScreen : ""}`}
        style={sceneStyle}
      >
        <img
          className={`${styles.officeLayer} ${styles.desktopOffice}`}
          src={desktopScene.src}
          alt=""
          draggable={false}
        />
        <img
          className={`${styles.officeLayer} ${styles.mobileOffice}`}
          src={mobileScene.src}
          alt=""
          draggable={false}
        />

        <div className={styles.monitorScreen} aria-hidden="true">
          <div
            className={styles.codeRows}
            style={{ transform: `translateY(${-viewStart * 10}%)` }}
          >
            {lines.map((line) => (
              <div
                className={`${styles.codeLine} ${
                  deletingLineId === line.id ? styles.deletingLine : ""
                }`}
                key={line.id}
              >
                <div className={styles.tokenTrack} style={{ paddingLeft: `${line.indent}%` }}>
                  {line.tokens.map((token) => (
                    <span
                      className={`${styles.codeToken} ${styles[token.color]} ${
                        editingTokenId === token.id ? styles.editingToken : ""
                      }`}
                      key={token.id}
                      style={{ width: `${token.width}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <span
            className={`${styles.screenCursor} ${
              cursor.moving ? styles.cursorMoving : ""
            } ${cursor.mode === "mouse" ? styles.mouseCursor : ""}`}
            style={{
              left: `${16 + cursor.column * 0.82}%`,
              top: `${cursorRow * 10 + 1.25}%`,
            }}
          />
          <span className={styles.screenShine} />
        </div>

        <div
          className={styles.characterLayer}
          data-pose={pose}
          data-mug={mugStage}
          data-beat={typingBeat}
          aria-hidden="true"
        >
          <img className={`${styles.sprite} ${styles.leftLeg}`} src={lowerLeftLeg.src} alt="" />
          <img
            className={`${styles.sprite} ${styles.rightLeg}`}
            src={lowerRightLeg.src}
            alt=""
          />
          <img className={`${styles.sprite} ${styles.leftShoe}`} src={leftShoe.src} alt="" />
          <img className={`${styles.sprite} ${styles.rightShoe}`} src={rightShoe.src} alt="" />

          <img className={`${styles.sprite} ${styles.hood}`} src={hood.src} alt="" />
          <img className={`${styles.sprite} ${styles.head}`} src={head.src} alt="" />

          <img
            className={`${styles.sprite} ${styles.leftUpperArm}`}
            src={upperLeftArm.src}
            alt=""
          />
          <div className={styles.rightArmMotion}>
            <div className={styles.rightArmRig}>
              <img
                className={`${styles.sprite} ${styles.rightUpperArm}`}
                src={upperRightArm.src}
                alt=""
              />

              <div className={styles.rightForearmRig}>
                <img
                  className={`${styles.sprite} ${styles.rightLowerArm}`}
                  src={lowerRightArm.src}
                  alt=""
                />

                <div className={styles.rightWristJoint}>
                  <img
                    className={`${styles.sprite} ${styles.rightHand}`}
                    src={rightHandRelaxedTwo.src}
                    alt=""
                  />
                  <img
                    className={`${styles.sprite} ${styles.gripHand}`}
                    src={rightHandGrip.src}
                    alt=""
                  />
                  <img
                    className={`${styles.sprite} ${styles.mouseHand}`}
                    src={rightFist.src}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mouseMotion}>
            <div className={styles.mouseWrap}>
              <img className={styles.propImage} src={mouse.src} alt="" />
            </div>
          </div>

          <div className={styles.mugWrap}>
            <span className={styles.steam} />
            <img className={styles.propImage} src={coffeeMug.src} alt="" />
          </div>

          <img className={`${styles.sprite} ${styles.chair}`} src={chair.src} alt="" />
        </div>

        <p className={styles.srOnly} aria-live="polite">
          {status}
        </p>
        <span className={styles.ambientGlow} aria-hidden="true" />
      </div>
    </section>
  );
}
