import ToolsContext, { ToolsContextType } from "@/contexts/toolsContext";
import styles from "./EraserCursor.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { getToolByName } from "@/utils/canvasToolUtils";
import {
  calculateEraserMovement,
  resetEraserCursorState,
} from "@/utils/cursorUtils";
import { MouseCords } from "@/features/canvas/Canvas";
import { IEraserCursor, IEraser } from "@/app/tools";
import { getEventCords } from "@/utils/utils";



const EraserCursor = () => {
  const { tools, updateSingleToolStatus } = useContext(
    ToolsContext
  ) as ToolsContextType;
  const eraser = getToolByName("eraser", tools) as IEraser;
  const eraserCursorRef = useRef<HTMLDivElement | null>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  function handleMouseMove(e: globalThis.MouseEvent | TouchEvent) {
    if (!eraserCursorRef.current || !eraser.active) return;
    const eraserElement = eraserCursorRef.current;
    const eraserCursorRadius = (eraser.cursor.width || 20) / 2;
    const cords = getEventCords(e);
    eraserElement.style.left = `${cords.x - eraserCursorRadius}px`;
    eraserElement.style.top = `${cords.y}px`;
    if (!isMouseDown) return;
    increaseCursorSize(cords, eraserElement);
  }

  function increaseCursorSize(cords: MouseCords, eraserElement: HTMLElement) {
    const { maxSize, minSize } = eraser.cursor;
    const movement = calculateEraserMovement(cords);

    const increasedSize =
      movement > minSize * 2 // movement should be at least twice the size of cursor
        ? Math.min(maxSize, movement)
        : minSize;

    if (!isMouseDown) return;

    eraserElement.style.width = `${increasedSize}px`;
    eraserElement.style.height = `${increasedSize}px`;

    const updatedCursor: IEraserCursor = {
      ...eraser.cursor,
      width: increasedSize,
      height: increasedSize,
    };

    const updatedEraser: IEraser = {
      ...eraser,
      lineWidth: increasedSize,
      cursor: updatedCursor,
    };
    if (updatedEraser.lineWidth !== eraser.lineWidth) {
      updateSingleToolStatus(updatedEraser);
    }
  }

  function handleMouseUp(e: MouseEvent | TouchEvent) {
    resetEraserCursorState();
    setIsMouseDown(false);
  }

  function handleMouseDown(e: MouseEvent | TouchEvent) {
    setIsMouseDown(true);
  }

  useEffect(() => {
    if (!eraser.active) return;
    document.addEventListener("mousemove", handleMouseMove, { capture: true });
    document.addEventListener("mouseup", handleMouseUp, { capture: true });
    document.addEventListener("mousedown", handleMouseDown, {
      capture: true,
    });
    document.addEventListener("touchmove", handleMouseMove, { capture: true, });
    document.addEventListener("touchstart", handleMouseDown, { capture: true, });
    document.addEventListener("touchend", handleMouseUp,{capture: true,});
    return () => {
      document.removeEventListener("mousemove", handleMouseMove, {
        capture: true,
      });
      document.removeEventListener("mouseup", handleMouseUp, { capture: true });
      document.removeEventListener("mousedown", handleMouseDown, {
        capture: true,
      });
      document.removeEventListener("touchmove", handleMouseMove, {
        capture: true,
      });
      document.removeEventListener("touchstart", handleMouseDown, {
        capture: true,
      });
      document.removeEventListener("touchend", handleMouseUp, {
        capture: true,
      });
    };
  }, [eraser, isMouseDown]);

  return (
    <div
      ref={eraserCursorRef}
      className={`${styles.eraserCursor} ${eraser.active ? styles.active : ""}`}
    ></div>
  );
};

export default EraserCursor;
