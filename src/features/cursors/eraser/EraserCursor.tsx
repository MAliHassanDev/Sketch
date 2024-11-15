import ToolsContext, { ToolsContextType } from "@/contexts/toolsContext";
import styles from "./EraserCursor.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import {getToolByName } from "@/utils/canvasToolUtils";
import {
  calculateEraserMovement,
  resetEraserCursorState,
} from "@/utils/cursorUtils";
import { MouseCords } from "@/features/canvas/Canvas";
import { IEraserCursor, IEraser } from "@/app/tools";

const EraserCursor = () => {
  const { tools, updateSingleTool } = useContext(
    ToolsContext
  ) as ToolsContextType;
  const eraser = getToolByName("eraser", tools) as IEraser;
  const eraserCursorRef = useRef<HTMLDivElement | null>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  function handleMouseMove(e: globalThis.MouseEvent) {
    if (!eraserCursorRef.current || !eraser.active) return;
    const eraserElement = eraserCursorRef.current;
    console.log(isMouseDown);
    const eraserCursorRadius = (eraser.cursor.width || 20) / 2;
    eraserElement.style.left = `${e.clientX - eraserCursorRadius}px`;
    eraserElement.style.top = `${e.clientY}px`;
    if (!isMouseDown) return;
    const mouseCords = { x: e.clientX, y: e.clientY };
    increaseCursorSize(mouseCords, eraserElement);
  }

  function increaseCursorSize(cords: MouseCords, eraserElement: HTMLElement) {
    const {maxSize,minSize} = eraser.cursor;
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
      updateSingleTool(updatedEraser);
    }
  }

  function handleMouseUp(e: MouseEvent) {
    resetEraserCursorState();
    setIsMouseDown(false);
  }

  function handleMouseDown(e: MouseEvent) {
    setIsMouseDown(true);
  }

  useEffect(() => {
    if (!eraser.active) return;
    document.addEventListener("mousemove", handleMouseMove, { capture: true });
    document.addEventListener("mouseup", handleMouseUp, { capture: true });
    document.addEventListener("mousedown", handleMouseDown, {
      capture: true,
    });
    return () => {
      console.log("Use affect being Cleaned");
      document.removeEventListener("mousemove", handleMouseMove, {
        capture: true,
      });
      document.removeEventListener("mouseup", handleMouseUp, { capture: true });
      document.removeEventListener("mousedown", handleMouseDown, {
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
