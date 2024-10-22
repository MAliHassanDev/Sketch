import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.css";
import {
  ThemeContext,
  ThemeContextType,
} from "@/components/ThemeProvider/ThemeProvider";
import { CanvasTool, HandDrawTool } from "@/app/tools";

type CanvasProps = {
  activeTool: CanvasTool;
};
type MouseCords = [number, number];

const Canvas = ({ activeTool }: CanvasProps) => {
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const currMouseCordsRef = useRef<MouseCords>([0, 0]);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [startMouseCords, setStartMouseCords] = useState<MouseCords>([0, 0]);

  useEffect(() => {
    if (!canvasRef.current) {
      throw new Error("Html canvas is undefined");
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    contextRef.current = ctx;
  }, []);

  useEffect(() => {
    switch (activeTool.category) {
      case "handDraw":
        setUpHandDrawTool(activeTool);
        break;
      case "select":
        setUpSelectTool();
    }
  }, [startMouseCords]);

  function setUpSelectTool() {}

  function setUpHandDrawTool(tool: HandDrawTool) {
    const ctx = contextRef.current;
    if (!ctx) throw new Error("Canvas rendering context is undefined");
    ctx.beginPath();
    ctx.moveTo(...startMouseCords);
    ctx.strokeStyle = tool.strokeStyle;
    ctx.lineCap = tool.lineCap;
    ctx.lineWidth = tool.lineWidth;
  }

  // TODO Move the logic os assigning rendering based on category in function Or switch
  function handleMouseMove(e: MouseEvent<HTMLCanvasElement>) {
    if (!isMouseDown) return;
    currMouseCordsRef.current = [e.clientX, e.clientY];
    const ctx = contextRef.current;
    if (activeTool.category == "handDraw") {
      if(activeTool.name === "eraser") e.clientY+= activeTool.lineWidth;
      ctx?.lineTo(e.clientX, e.clientY);
      ctx?.stroke();
    }
  }

  function handleMouseDown(e: MouseEvent<HTMLCanvasElement>) {
    setIsMouseDown(true);
    setStartMouseCords([e.clientX, e.clientY]);
  }

  function handleMouseUp(e:MouseEvent) {
    e.preventDefault();
    setIsMouseDown(false);
  }

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
