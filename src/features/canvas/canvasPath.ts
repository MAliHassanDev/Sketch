import { HandDrawTool, IEraser, LineCap } from "@/app/tools";
import { MouseCords } from "./Canvas";

export type PathState = {
  cords: MouseCords;
  lineWidth: number;
};

export type Path = {
  startCords: MouseCords;
  state: PathState[];
  strokeStyle: string;
  lineWidth: number;
  lineCap: LineCap;
};

export function redrawPaths(paths: Path[], ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  paths.forEach((path) => {
    ctx.beginPath();
    ctx.moveTo(path.startCords.x, path.startCords.y);
    ctx.strokeStyle = path.strokeStyle;
    ctx.lineCap = path.lineCap;
    ctx.lineWidth = path.lineWidth;
    path.state.forEach(({ cords, lineWidth }) => {
      ctx.lineWidth = lineWidth;
      ctx.lineTo(cords.x, cords.y);
      ctx.stroke();
    });
  });
}

export function drawPathAtCurrentMouseCords(
  ctx: CanvasRenderingContext2D,
  currentCords: MouseCords
) {
  const { x, y } = currentCords;
  ctx.lineTo(x, y);
  ctx.stroke();
}

export function createPathObject(
  startCords: MouseCords,
  state: PathState[],
  tool: HandDrawTool
): Path {
  return {
    startCords,
    state,
    strokeStyle: tool.strokeStyle,
    lineWidth: tool.lineWidth,
    lineCap: tool.lineCap,
  };
}

export function erasePath(
  ctx: CanvasRenderingContext2D,
  currentCords: MouseCords,
  eraser: IEraser
) {
  const x = currentCords.x;
  const y = currentCords.y;
  ctx.lineWidth = eraser.lineWidth;
  ctx.lineTo(x, y);
  ctx.stroke();
}

export function beginPath(
  tool: HandDrawTool,
  cords: MouseCords,
  ctx: CanvasRenderingContext2D
) {
  if (!ctx) throw new Error("Canvas rendering context is undefined");
  ctx.beginPath();
  ctx.moveTo(cords.x, cords.y);
  ctx.strokeStyle = tool.strokeStyle;
  ctx.lineCap = tool.lineCap;
  ctx.lineJoin = tool.lineJoin;
  ctx.lineWidth = tool.lineWidth;
}


