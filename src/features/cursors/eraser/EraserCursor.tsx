import ToolsContext, { ToolsContextType } from "@/contexts/toolsContext";
import styles from "./EraserCursor.module.css";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { activateSingleTool, getToolByName } from "@/utils/canvasToolUtils";
import {
  calculateEraserMovement,
  resetEraserCursorState,
} from "@/utils/cursorUtils";
import { MouseCords } from "@/features/canvas/Canvas";
import { IEraserCursor, IEraser } from "@/app/tools";
import { getEventCords } from "@/utils/utils";

const EraserCursor = () => {
  const { tools, updateToolsStatus } = useContext(
    ToolsContext
  ) as ToolsContextType;
  const eraser = getToolByName("eraser", tools) as IEraser;
  const eraserCursorRef = useRef<HTMLDivElement | null>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent | TouchEvent) => {
      if (!eraserCursorRef.current || !eraser.active) return;
      const eraserElement = eraserCursorRef.current;
      const eraserCursorRadius = (eraser.cursor.width || 20) / 2;
      const cords = getEventCords(e);
      eraserElement.style.left = `${cords.x - eraserCursorRadius}px`;
      eraserElement.style.top = `${cords.y}px`;
      if (!isMouseDown) return;
      const updatedCursor = increaseCursorSize(
        eraser.cursor,
        cords,
        eraserElement
      );
      // update eraser tool to match this size of eraser cursor
      if (updatedCursor.width !== eraser.lineWidth) {
        const updatedEraser: IEraser = {
          ...eraser,
          lineWidth: updatedCursor.width,
          cursor: updatedCursor,
        };
        updateToolsStatus(activateSingleTool(updatedEraser, tools));
      }
    },
    [eraser, isMouseDown, tools, updateToolsStatus]
  );

  const handleMouseUp = useCallback(() => {
    resetEraserCursorState();
    setIsMouseDown(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsMouseDown(true);
  }, []);

  const addEventListeners = useCallback(() => {
    document.addEventListener("mousemove", handleMouseMove, { capture: true });
    document.addEventListener("mouseup", handleMouseUp, { capture: true });
    document.addEventListener("mousedown", handleMouseDown, {
      capture: true,
    });
    document.addEventListener("touchmove", handleMouseMove, { capture: true });
    document.addEventListener("touchstart", handleMouseDown, { capture: true });
    document.addEventListener("touchend", handleMouseUp, { capture: true });
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  const removeEventListeners = useCallback(() => {
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
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (!eraser.active) return;
    addEventListeners();
    return removeEventListeners;
  }, [eraser, addEventListeners, removeEventListeners]);

  return (
    <div
      ref={eraserCursorRef}
      className={`${styles.eraserCursor} ${eraser.active ? styles.active : ""}`}
    ></div>
  );
};

function increaseCursorSize(
  cursor: IEraserCursor,
  cords: MouseCords,
  eraserElement: HTMLElement
) {
  const { maxSize, minSize } = cursor;
  const movement = calculateEraserMovement(cords);

  const increasedSize =
    movement > minSize * 2 // movement should be at least twice the size of cursor
      ? Math.min(maxSize, movement)
      : minSize;

  eraserElement.style.width = `${increasedSize}px`;
  eraserElement.style.height = `${increasedSize}px`;

  const updatedCursor: IEraserCursor = {
    ...cursor,
    width: increasedSize,
    height: increasedSize,
  };

  return updatedCursor;
}

export default EraserCursor;
