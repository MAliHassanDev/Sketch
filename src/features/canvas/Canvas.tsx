import {
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
  TouchEvent,
} from "react";
import styles from "./Canvas.module.css";
import {
  activateSingleTool,
  deactivateSubTools,
  getActiveTool,
} from "@/utils/canvasToolUtils";
import ToolsContext, { ToolsContextType } from "@/contexts/toolsContext";
import ThemeContext, { ThemeContextType } from "@/contexts/themeContext";
import { getEventCords, isMouseEvent } from "@/utils/utils";
import {
  beginPath,
  createPathObject,
  drawPathAtCurrentMouseCords,
  erasePath,
  Path,
  PathState,
  redrawPaths,
} from "./canvasPath";

export type MouseCords = {
  x: number;
  y: number;
};

type CanvasProps = {
  onNewPath: (path: Path) => void;
  paths: Path[];
  redraw: boolean;
};

const Canvas = ({ onNewPath, paths, redraw }: CanvasProps) => {
  const { tools, updateToolsStatus } = useContext(
    ToolsContext
  ) as ToolsContextType;
  const activeTool = getActiveTool(tools);
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<Path | null>(null);

  function handleMouseMove(e: MouseEvent | TouchEvent) {
    if (isMouseEvent(e)) e.preventDefault();
    if (!isDrawing || activeTool.name == "select") return;
    const currCords = getEventCords(e);

    const ctx = contextRef.current as CanvasRenderingContext2D;

    updateCurrentPathState({
      cords: currCords,
      lineWidth: activeTool.lineWidth,
    });

    switch (activeTool.name) {
      case "pen":
        drawPathAtCurrentMouseCords(ctx, currCords);
        break;
      case "eraser":
        erasePath(ctx, currCords, activeTool);
    }
  }

  function updateCurrentPathState(currentState: PathState) {
    if (!currentPath) return;
    setCurrentPath({
      ...currentPath,
      state: [...currentPath.state, currentState],
    });
  }

  function handleMouseDown(e: MouseEvent | TouchEvent) {
    if (isMouseEvent(e)) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (activeTool.name == "select") return;

    setIsDrawing(true);
    const updatedTool = deactivateSubTools(getActiveTool(tools));
    updateToolsStatus(activateSingleTool(updatedTool, tools));
    const startCords = getEventCords(e);
    const currentPathState = {
      cords: startCords,
      lineWidth: activeTool.lineWidth,
    };
    beginPath(
      activeTool,
      startCords,
      contextRef.current as CanvasRenderingContext2D
    );
    setCurrentPath(
      createPathObject(startCords, [currentPathState], activeTool)
    );
  }

  function handleMouseUp(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDrawing(false);
    if (activeTool.name == "select") return;
    if (currentPath) onNewPath(currentPath);
  }

  useEffect(() => {
    if (!canvasRef.current) {
      throw new Error("Html canvas is undefined");
    }
    const canvas = canvasRef.current;
    contextRef.current = canvas.getContext("2d");
    if (!redraw) return;
    redrawPaths(paths, contextRef.current as CanvasRenderingContext2D);
  }, [paths, redraw]);

  return (
    <>
      <canvas
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`${styles.canvas} ${theme}`}
        height={window.innerHeight}
        width={window.innerWidth}
        ref={canvasRef}
        id='canvas'
        data-testid='canvas'
        style={{ cursor: activeTool.cursor.type }}
      ></canvas>
    </>
  );
};

export default Canvas;
