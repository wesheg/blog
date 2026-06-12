import type { MouseEvent, TouchEvent } from "react";

/**
 * Apply a CSS class to an event target.
 * Use this to style buttons on events like `mousedown` and `touchstart`
 *
 * @param {React.MouseEvent | React.TouchEvent} event - MouseEvent or TouchEvent on a DOM element
 * @param {string} className - CSS class to apply to the event target
 */
export function pressDown(event: MouseEvent | TouchEvent, className: string) {
  (event.target as Element).classList.add(className);
}

/**
 * Remove a CSS class from an event target.
 * Use this to style buttons on events like `mouseup`, `mouseleave`,
 * `touchend` and `touchcancel`
 *
 * @param {React.MouseEvent | React.TouchEvent} event - MouseEvent or TouchEvent on a DOM element
 * @param {string} className - CSS class to remove from the event target
 */
export function popUp(event: MouseEvent | TouchEvent, className: string) {
  (event.target as Element).classList.remove(className);
}
