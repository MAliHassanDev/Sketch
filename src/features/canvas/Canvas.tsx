import {MouseEvent, useContext, useEffect, useRef, useState} from "react";
import styles from "./Canvas.module.css";
import {CanvasTool, Cursor, HandDrawTool, IEraser, IPen, LineCap} from "@/app/tools";
import {deactivateSubTools, getActiveTool} from "@/utils/canvasToolUtils";
import ToolsContext, {ToolsContextType} from "@/contexts/toolsContext";
import ThemeContext, {ThemeContextType} from "@/contexts/themeContext";
import {calculateEraserMovement, resetEraserCursorState} from "@/utils/cursorUtils.ts";

export type MouseCords = {
  x: number;
  y: number;
};

export type Path = {
  startCords: MouseCords;
  currCords: MouseCords[];
  strokeStyle: string;
  lineWidth: number;
  lineCap: LineCap;
};

type CanvasProps = {
  onPathDraw: (path: Path) => void;
  onMouseMove: (e: MouseEvent, activeTool: CanvasTool) => void;
  paths: Path[];
  redraw: boolean;
};

const Canvas = ({onPathDraw, onMouseMove, paths, redraw}: CanvasProps) => {
  const {tools, updateAllTools, updateSingleTool} = useContext(
     ToolsContext
  ) as ToolsContextType;
  const activeTool = getActiveTool(tools);
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<Path | null>(null);
  const [startMouseCords, setStartMouseCords] = useState<MouseCords>({
    x: 0,
    y: 0,
  });

  function setupHandDrawTool(tool: HandDrawTool) {
    const ctx = contextRef.current;
    if (!ctx) throw new Error("Canvas rendering context is undefined");
    ctx.beginPath();
    ctx.moveTo(startMouseCords.x, startMouseCords.y);
    ctx.strokeStyle = tool.strokeStyle;
    ctx.lineCap = tool.lineCap;
    ctx.lineWidth = tool.lineWidth;
  }

  function handleMouseMove(e: MouseEvent<HTMLCanvasElement>) {
    const currCords = {x: e.clientX, y: e.clientY};
    onMouseMove(e, activeTool);
    if (!isDrawing) return;
    const ctx = contextRef.current as CanvasRenderingContext2D;
    updateCurrentPath(currCords);
    switch (activeTool.name) {
      case "pen":
        drawPath(ctx, currCords);
        break;
      case "eraser":
        increaseEraserSize(calculateEraserMovement(currCords), activeTool);
        erasePath(ctx, currCords,activeTool);
    }
  }

  function increaseEraserSize(movement: number, eraser: IEraser) {
    const initialEraserSize = 20;
    const increasedSize = movement > initialEraserSize + 10 // movement should be at least greater than 30px
       ? initialEraserSize + movement
       : initialEraserSize;

    const updatedCursor: Cursor = {
      ...eraser.cursor,
      width: increasedSize,
      height: increasedSize
    };

    const updatedEraser = {
      ...eraser,
      lineWidth: increasedSize,
      cursor: updatedCursor,
    };

    updateSingleTool(updatedEraser);
  }

  function erasePath(ctx: CanvasRenderingContext2D, currentCords: MouseCords,eraser:IEraser) {
    const x = currentCords.x + eraser.lineWidth / 2; // moves the cursor position center of eraser circle;
    const y = currentCords.y + eraser.lineWidth / 2; // moves the cursor position center of eraser circle;
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function drawPath(ctx: CanvasRenderingContext2D, currentCords: MouseCords) {
    const {x, y} = currentCords;
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function updateCurrentPath(currentCords: MouseCords) {
    if (!currentPath) return;
    setCurrentPath({
      ...currentPath,
      currCords: [...currentPath.currCords, currentCords],
    });
  }

  function handleMouseDown(e: MouseEvent<HTMLCanvasElement>) {
    setIsDrawing(true);
    setStartMouseCords({x: e.clientX, y: e.clientY});
    const updatedTools = deactivateSubTools(tools);
    updateAllTools(updatedTools);
    if (activeTool.name == "select") return;
    const startCords = {x: e.clientX, y: e.clientY};
    const path = createPath(startCords, [startCords], activeTool);
    setCurrentPath(path);
  }

  function handleMouseUp(e: MouseEvent) {
    e.preventDefault();
    setIsDrawing(false);
    if (activeTool.name == "select") return;
    if (currentPath) onPathDraw(currentPath);
    resetEraserCursorState();
  }

  function createPath(
     startCords: MouseCords,
     currCords: MouseCords[],
     tool: HandDrawTool
  ): Path {
    return {
      startCords,
      currCords,
      strokeStyle: tool.strokeStyle,
      lineWidth: tool.lineWidth,
      lineCap: tool.lineCap,
    };
  }

  function redrawCanvas(paths: Path[]) {
    const ctx = contextRef.current as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    paths.forEach((path) => {
      ctx.beginPath();
      ctx.moveTo(path.startCords.x, path.startCords.y);
      ctx.strokeStyle = path.strokeStyle;
      ctx.lineCap = path.lineCap;
      ctx.lineWidth = path.lineWidth;
      path.currCords.forEach((cord) => {
        ctx.lineTo(cord.x, cord.y);
        ctx.stroke();
      });
    });
  }

  useEffect(() => {
    if (!canvasRef.current) {
      throw new Error("Html canvas is undefined");
    }
    const canvas = canvasRef.current;
    contextRef.current = canvas.getContext("2d");
    if (!redraw) return;
    redrawCanvas(paths);
  }, [paths, redraw]);

  useEffect(() => {
    switch (activeTool.name) {
      case "pen":
      case "eraser":
        setupHandDrawTool(activeTool);
        break;
    }
  }, [startMouseCords]);

  return (
     <>
       <canvas
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`${styles.canvas} ${theme}`}
          height={window.innerHeight}
          width={window.innerWidth}
          ref={canvasRef}
          id='canvas'
          data-testid='canvas'
          style={{cursor: activeTool.cursor.type}}
       ></canvas>
     </>
  );
};

export default Canvas;

// TODO Change to Eraser Cursor and add Feature to increase size based on mouse movement speed
