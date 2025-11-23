import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CodeScreen from "@ui/components/FrontPageAnimation/ScreenCanvas/CodeScreen";
import { getRandomSelection } from "@ui/components/FrontPageAnimation/utils";
import { LottieRef } from "lottie-react";

/** Arbitrary names given to segments of the full Lottie animation */
type PersonAnimationName =
  | "DrinkCoffeeMouseUp"
  | "DrinkCoffeeMouseDown"
  | "MoveMouseUp"
  | "MoveMouseDown"
  | "Typing3sMouseUp"
  | "Typing3sMouseDown"
  | "Typing5sMouseUp"
  | "Typing5sMouseDown";

/** Start and end frames of the lottie file animation */
type AnimationSegment = [number, number];

/**
 * Hook for synchronizing animations between code blobs on the screen
 * and the character sitting at the desk.
 *
 * @param codeScreenCanvasRef - Ref object holding a reference to a ScreenCanvas component.
 * @param lottieRef - Ref object holding a reference to a PersonCanvas component.
 */
export const usePuppetMaster = (
  codeScreenCanvasRef: React.RefObject<HTMLCanvasElement | null>,
  lottieRef: LottieRef,
) => {
  const [codeScreen, setCodeScreen] = useState<CodeScreen>();
  const mousePosition = useRef<"up" | "down">("up");
  const firstRender = useRef(true);
  const scale = window.devicePixelRatio;

  /** First Render Setup */
  useEffect(() => {
    if (!firstRender.current) return;
    const canvasContext = codeScreenCanvasRef.current?.getContext("2d");
    if (!canvasContext) return;
    if (!lottieRef) return;
    canvasContext.scale(scale, scale);
    setCodeScreen(new CodeScreen(canvasContext));
    firstRender.current = false;
  }, [scale, codeScreenCanvasRef, lottieRef]);

  /**
   * Play a segment of the lottie file to animate the character.
   *
   * @param {PersonAnimationName} animation - Name of the animation to be played
   * @returns {Promise} - Returns a Promise that will pause the Lottiefile and
   *  resolve when the animation is finished
   */
  const playAnimation = useCallback(
    (animation: PersonAnimationName) => {
      if (!lottieRef.current) {
        throw new Error(
          `Failed to play animation "${animation}"; LottieRef is null`,
        );
      }
      const personAnimations: Record<PersonAnimationName, AnimationSegment> = {
        DrinkCoffeeMouseUp: [0, 149],
        DrinkCoffeeMouseDown: [150, 299],
        MoveMouseUp: [300, 390],
        MoveMouseDown: [391, 480],
        Typing3sMouseUp: [481, 571],
        Typing3sMouseDown: [572, 662],
        Typing5sMouseUp: [663, 813],
        Typing5sMouseDown: [814, 964],
      };
      const segment = personAnimations[animation];
      // number of milliseconds at 30 frames-per-second
      const animationLength = ((segment[1] - segment[0]) / 30) * 1000;
      lottieRef.current.playSegments(segment, true);
      return new Promise((res) => {
        setTimeout(() => {
          lottieRef.current?.pause();
          res(true);
        }, animationLength);
      });
    },
    [lottieRef],
  );

  const drinkCoffee = useCallback(async () => {
    const animation: PersonAnimationName =
      mousePosition.current === "up"
        ? "DrinkCoffeeMouseUp"
        : "DrinkCoffeeMouseDown";
    await playAnimation(animation);
  }, [playAnimation]);

  const moveMouse = useCallback(
    async (lines: number) => {
      if (!codeScreen) return;
      const animation: PersonAnimationName =
        mousePosition.current === "up" ? "MoveMouseDown" : "MoveMouseUp";
      const nextMousePosition = mousePosition.current === "up" ? "down" : "up";
      const currentLine = codeScreen.cursor.line;
      let targetLine = (currentLine + lines) % codeScreen.numLines;

      // prevent the cursor from moving to the same line (i.e. no movement)
      if (currentLine === targetLine) {
        switch (nextMousePosition) {
          case "up":
            targetLine = currentLine - 1;
            break;
          default:
            targetLine = currentLine + 1;
            break;
        }
      }

      // correct for mismatched mouse position & cursor destinations
      if (targetLine > currentLine && nextMousePosition === "up") {
        const preTarget = Math.min(targetLine + 1, codeScreen.numLines - 1);
        await codeScreen.moveCursor(preTarget);
      } else if (targetLine < currentLine && nextMousePosition === "down") {
        const preTarget = Math.max(0, targetLine - 1);
        await codeScreen.moveCursor(preTarget);
      }

      codeScreen.moveCursor(targetLine);
      await playAnimation(animation);
      mousePosition.current = nextMousePosition;
    },
    [playAnimation, codeScreen],
  );

  /**
   * Add new lines of code blobs on the screen.
   * Loop the typing animation until all the blobs have been added.
   *
   * @param {number} lines - Number of new lines to be added. If this number
   *    exceeds the current available lines, all other lines will be pushed up.
   */
  const addNewLines = useCallback(
    async (lines: number) => {
      if (!codeScreen) return;
      const animation: PersonAnimationName =
        mousePosition.current === "up"
          ? "Typing5sMouseUp"
          : "Typing5sMouseDown";

      for (let i = 0; i < lines; i++) {
        const animationPromise = playAnimation(animation);
        await codeScreen.addTimeDelay(100);
        await codeScreen.stopCursorBlink();
        await codeScreen.insertLine();
        await codeScreen.typeNewLine();
        await codeScreen.startCursorBlink();
        await animationPromise;
      }
    },
    [codeScreen, playAnimation],
  );

  /**
   * At the end of the current line, backspace the last blob and type a new one.
   * Repeat this once, and loop the typing animation until the second blob has
   * been types.
   */
  const changeLastBlob = useCallback(async () => {
    if (!codeScreen) return;
    const animation: PersonAnimationName =
      mousePosition.current === "up" ? "Typing5sMouseUp" : "Typing5sMouseDown";
    const animationPromise = playAnimation(animation);

    for (let i = 0; i < 2; i++) {
      await codeScreen.addTimeDelay(150);
      await codeScreen.stopCursorBlink();
      await codeScreen.backspaceBlob();
      await codeScreen.startCursorBlink();
      await codeScreen.addTimeDelay(150);
      await codeScreen.stopCursorBlink();
      await codeScreen.typeNewBlob();
      await codeScreen.startCursorBlink();
    }

    await animationPromise;
  }, [codeScreen, playAnimation]);

  /**
   * Delete the current line, and the previous "n - 1" lines of code blobs
   * from the screen. Loop the typing animation until all lines have been removed.
   *
   * @param {number} lines - Number of lines to be deleted, inclusive of the current line.
   */
  const deleteLines = useCallback(
    async (numLines: number) => {
      if (!codeScreen) return;
      const animation: PersonAnimationName =
        mousePosition.current === "up"
          ? "Typing3sMouseUp"
          : "Typing3sMouseDown";
      const animationPromise = playAnimation(animation);

      await codeScreen.addTimeDelay(150);
      await codeScreen.stopCursorBlink();
      for (let i = 0; i < numLines; i++) {
        await codeScreen.deleteLine(codeScreen.cursor.line);
      }
      await codeScreen.startCursorBlink();
      await animationPromise;
    },
    [codeScreen, playAnimation],
  );

  /**
   * Get a random positive or negative integer in the range of:
   *    0 < x < | codeScreen.numLines |
   *
   * @param {boolean} randomizeSign - If true, randomly assigns a positive or negative
   *    value to the result. Defaults to false.
   * @param {number} max - Optional; If set, the function will not return a number whose
   *    absolute value exceeds this number.
   * @returns {number}
   */
  const getRandomInteger = useCallback(
    (randomizeSign: boolean = false, max?: number) => {
      if (!codeScreen) return 0;
      let exclusiveMax = codeScreen.numLines + 1;
      if (max) {
        exclusiveMax = Math.min(max, exclusiveMax);
      }
      const randomValue = Math.floor(Math.random() * exclusiveMax);
      if (randomizeSign) {
        const randomSign = getRandomSelection([1, -1]);
        return randomSign * randomValue;
      }
      return randomValue;
    },
    [codeScreen],
  );

  /** Cache a reference to the animations callbacks between renders */
  const movements = useMemo(() => {
    return {
      addNewLines,
      changeLastBlob,
      deleteLines,
      drinkCoffee,
      moveMouse,
    };
  }, [addNewLines, changeLastBlob, deleteLines, drinkCoffee, moveMouse]);

  /**
   * Select a random animation callback function to play.
   *
   * @param {string} lastMovement - The name of the animation callback that last ran.
   *    This prevents the randomizer from playing the same animation twice in a row.
   * @param {Promise<string>} - Returns a Promise containing the name of the next animation
   *    callback that should be played. The Promise is resolved after this new animation is played.
   *    The name of the animation is used as the "lastMovement" argument for the next randomized function.
   */
  const randomizer = useCallback(
    (lastMovement: keyof typeof movements): Promise<keyof typeof movements> => {
      if (!codeScreen)
        throw new Error(
          "Cannot select a new randomized animation. codeScreen is undefined",
        );

      const validMovements = Object.keys(movements).filter(
        (m) => m != lastMovement,
      );
      const randomMovement = getRandomSelection(
        validMovements,
      ) as keyof typeof movements;

      return new Promise((res) => {
        if (randomMovement === "addNewLines") {
          const randomLines = getRandomInteger(false, 5);
          movements[randomMovement](randomLines).then(() =>
            res(randomMovement),
          );
        } else if (randomMovement === "deleteLines") {
          const randomLines = getRandomInteger(false, 2);
          movements[randomMovement](randomLines).then(() =>
            res(randomMovement),
          );
        } else if (randomMovement === "moveMouse") {
          const randomLines = getRandomInteger(false);
          movements[randomMovement](Math.max(1, randomLines)).then(() =>
            res(randomMovement),
          );
        } else {
          movements[randomMovement]().then(() => res(randomMovement));
        }
      });
    },
    [getRandomInteger, movements, codeScreen],
  );

  /**
   * Start a chain of animation Promises, playing one random animation after another.
   */
  const start = useCallback(async () => {
    if (!codeScreen) return;

    /** recursive function to chain random animations together, playing one after another */
    const loopAnimation = async (lastMovement: keyof typeof movements) => {
      const nextMovement = await randomizer(lastMovement);
      await loopAnimation(nextMovement);
    };

    await drinkCoffee();
    await loopAnimation("drinkCoffee");
  }, [drinkCoffee, codeScreen, randomizer]);

  /** Hook values */
  return {
    start,
  };
};
