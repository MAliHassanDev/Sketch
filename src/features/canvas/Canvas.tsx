import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.css";
import { CanvasTool, HandDrawTool, LineCap } from "@/app/tools";
import { deactivateSubTools, getActiveTool } from "@/utils/canvasToolUtils";
import ToolsContext, { ToolsContextType } from "@/contexts/toolsContext";
import ThemeContext, { ThemeContextType } from "@/contexts/themeContext";

type MouseCords = {
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
  paths: Path[];
  redraw: boolean;
};
const Canvas = ({ onPathDraw, paths, redraw }: CanvasProps) => {
  const { tools, updateAllTools } = useContext(
    ToolsContext
  ) as ToolsContextType;
  const activeTool = getActiveTool(tools);
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<Path | null>(null);
  const [startMouseCords, setStartMouseCords] = useState<MouseCords>({
    x: 0,
    y: 0,
  });

  function setUpSelectTool() {}

  function setUpHandDrawTool(tool: HandDrawTool) {
    const ctx = contextRef.current;
    if (!ctx) throw new Error("Canvas rendering context is undefined");
    ctx.beginPath();
    ctx.moveTo(startMouseCords.x, startMouseCords.y);
    ctx.strokeStyle = tool.strokeStyle;
    ctx.lineCap = tool.lineCap;
    ctx.lineWidth = tool.lineWidth;
  }

  function handleMouseMove(e: MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    const ctx = contextRef.current as CanvasRenderingContext2D;
    const currCords = { x: e.clientX, y: e.clientY };
    switch (activeTool.category) {
      case "handDraw":
        updateCurrentPath(currCords);
        drawPath(ctx, currCords);
        break;
    }
  }

  function drawPath(ctx:CanvasRenderingContext2D,currentCords:MouseCords) {
    const { x, y } = currentCords;
    // if (activeTool.name === "eraser") {
    //   y += activeTool.lineWidth;
    // };
    ctx.lineTo(x,y);
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
    setStartMouseCords({ x: e.clientX, y: e.clientY });
    const updatedTools = deactivateSubTools(tools);
    updateAllTools(updatedTools);
    if (activeTool.category !== "handDraw") return;
    const startCords = { x: e.clientX, y: e.clientY };
    const path = createPath(startCords, [startCords], activeTool);
    setCurrentPath(path);
  }

  function handleMouseUp(e: MouseEvent) {
    e.preventDefault();
    setIsDrawing(false);
    if (activeTool.category !== "handDraw") return;
    if (currentPath) onPathDraw(currentPath);
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
    const ctx = canvas.getContext("2d");
    contextRef.current = ctx;
    if (!redraw) return;
    redrawCanvas(paths);
  }, [paths, redraw]);

  useEffect(() => {
    switch (activeTool.category) {
      case "handDraw":
        setUpHandDrawTool(activeTool);
        break;
      case "select":
        setUpSelectTool();
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
        style={{ cursor: activeTool.cursor }}
      ></canvas>
    </>
  );
};

export default Canvas;


// TODO Change to Eraser Cursor and add Feature to increase size based on mouse movement speed