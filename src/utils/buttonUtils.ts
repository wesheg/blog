import type { MouseEvent, TouchEvent } from "react";

export function pressDown(event: MouseEvent | TouchEvent, className: string) {
  (event.target as Element).classList.add(className);
}

export function popUp(event: MouseEvent | TouchEvent, className: string) {
  (event.target as Element).classList.remove(className);
}
