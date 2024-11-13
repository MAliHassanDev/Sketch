import {MouseCords} from "@/features/canvas/Canvas.tsx";


type CursorState = {
  cords: MouseCords,
  time: number,
}

const eraserState = () => {
  let prevCursorState: CursorState | null = null;

  return {
    calculateEraserMovement: (currentCords: MouseCords) => {
      let movement = 0;
      if (prevCursorState) {
        const distanceX = Math.abs(currentCords.x - prevCursorState.cords.x);
        const distanceY = Math.abs(currentCords.y - prevCursorState.cords.y);
        movement =  distanceY + distanceX;
      }
      prevCursorState = {
        cords: currentCords,
        time: Date.now()
      };
      return movement;
    },
    resetEraserCursorState: () => {
      prevCursorState = null;
    }
  };
};

export const {resetEraserCursorState,calculateEraserMovement} = eraserState();