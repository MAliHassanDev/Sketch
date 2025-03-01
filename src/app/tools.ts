// Tools
type ToolName = "pen" | "eraser" | "highlighter" | "select";
export type Cursor = {
  type: "crosshair" | "default" | "pointer" | "none";
};
// type PrimitiveOrArray =
//   | string
//   | number
//   | boolean
//   | Array<string | number | boolean>;
export type ToolIcon = {
  src: string;
  description: string;
};

export type SubTool = PenSubTool;

export interface Tool {
  name: ToolName;
  icon?: ToolIcon;
  active: boolean;
  cursor: Cursor;
  subTool?: SubTool;
}

interface HandDraw extends Tool{
  lineCap: CanvasLineCap;
  lineWidth: number;
  strokeStyle: string;
  lineJoin: CanvasLineJoin
}
//  --------------- Tools ------------------ >

// Select
export interface SelectTool extends Tool {
  name: "select";
}

// Pen
export interface IPen extends HandDraw {
  name: "pen";
  subTool: PenSubTool;
}
type PenSubTool = {
  colorPreset: IColorPreset;
};
export type LineCap = "round" | "butt" | "square";

export interface IColorPalette {
  colors: string[];
  selectedColor: string;
  active: boolean;
}

export interface IPenSizeSlider {
  currPenSize: number;
  maxPenSize: number;
}

export interface IPresetSelectionToolBar {
  colorPalette: IColorPalette;
  penSizeSlider: IPenSizeSlider;
}
export interface IColorPreset extends Omit<Tool, "name"> {
  presetSelectionToolBar: IPresetSelectionToolBar;
}

// eraser
export interface IEraserCursor extends Cursor {
  width: number;
  height: number;
  minSize: number;
  maxSize: number;
}
export interface IEraser extends HandDraw {
  name: "eraser";
  cursor: IEraserCursor;
  radius: number;
}

export type CanvasTool = IPen | IEraser | SelectTool;
export type HandDrawTool = IPen | IEraser;
export type CanvasToolName = ToolName;

// --------------------- Tools Config ----------------------->
export function createHandDrawTools() {
  const pen: IPen = {
    name: "pen",
    icon: {
      src: "/icons/pencil.svg",
      description: "pen",
    },
    active: true,
    lineWidth: 5,
    lineCap: "round",
    lineJoin: "round",
    strokeStyle: "black",
    cursor: {
      type: "pointer",
    },
    subTool: {
      colorPreset: {
        active: false,
        cursor: {
          type: "default",
        },
        presetSelectionToolBar: {
          colorPalette: {
            active: false,
            colors: [
              "#121212",
              "#fac710",
              "#f24726",
              "#F2F2F2",
              "#cee741",
              "#8fd14f",
              "#da0063",
              "#808080",
              "#12cdd4",
              "#0ca789",
              "#9510ac",
              "#2d9bf0",
            ],
            selectedColor: "#1a1a1a",
          },
          penSizeSlider: {
            currPenSize: 5,
            maxPenSize: 30,
          },
        },
      },
    },
  };

  const eraser: IEraser = {
    name: "eraser",
    icon: {
      src: "/icons/e.svg",
      description: "eraser",
    },
    cursor: {
      type: "none",
      width: 20,
      height: 20,
      minSize: 20,
      maxSize: 100,
    },
    active: false,
    lineWidth: 20,
    lineCap: "round",
    lineJoin: "round",
    strokeStyle: "#F2F2F2",
    radius: 1,
  };

  return [pen, eraser];
}

export function createSelectTools() {
  const select: SelectTool = {
    name: "select",
    icon: {
      src: "/icons/cursor.svg",
      description: "select",
    },
    active: false,
    cursor: {
      type: "default",
    },
  };
  return [select];
}
export function getTools(): Array<CanvasTool> {
  const handDrawTools = createHandDrawTools();
  const selectTolls = createSelectTools();
  return [...selectTolls, ...handDrawTools];
}
