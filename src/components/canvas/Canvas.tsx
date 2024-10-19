import {MouseEvent, useContext, useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.css";
import {
  ThemeContext,
  ThemeContextType,
} from "@/components/ThemeProvider/ThemeProvider";


const Canvas = () => {
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  type MouseCords = [number,number]
  const [startMouseCords, setStartMouseCords] = useState<MouseCords>([
    0, 0,
  ]);


  useEffect(() => {
    if (!canvasRef.current) {
      throw new Error("Html canvas is undefined");
    } 
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    contextRef.current = ctx;
  }, []);


  useEffect(() => {
    initCanvas();
  },[startMouseCords]);

  
  function initCanvas() {
    const ctx = contextRef.current;
    if (!ctx) throw new Error("Canvas rendering context is undefined");
    ctx.beginPath();
    ctx.moveTo(...startMouseCords);
    ctx.strokeStyle = theme == "dark" ? "white": "black";
    ctx.lineWidth = 10;
  }


  function handleMouseMove(e: MouseEvent<HTMLCanvasElement>) {
    if (!isMouseDown) return;
    const ctx = contextRef.current;
    ctx?.lineTo(e.clientX, e.clientY);
    ctx?.stroke();
  }

  function handleMouseDown(e:MouseEvent<HTMLCanvasElement>) {
    setIsMouseDown(true);
    setStartMouseCords([e.clientX, e.clientY],);
    
  }

  function handleMouseUp() {
    setIsMouseDown(false);
  }

  
  return (
    <canvas
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={`${styles.canvas} ${theme}`}
      height={window.innerHeight}
      width={window.innerWidth}
      ref={canvasRef}
      id='canvas'
      data-testid="canvas"
    ></canvas>
  );
};

export default Canvas;
