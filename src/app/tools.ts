// Tools
type HandDrawToolName = "pen" | "eraser" | "highlighter";
type SelectToolName = "select";
type Cursor = string;
// type PrimitiveOrArray =
//   | string
//   | number
//   | boolean
//   | Array<string | number | boolean>;
export type ToolIcon = {
  src: string;
  description: string;
};

export interface Tool {
  name: SelectToolName | HandDrawToolName | subToolNames;
  icon?: ToolIcon;
  active: boolean;
  cursor: Cursor;
  subTool?:SubTool
}

export type LineCap = "round" | "butt" | "square";

export interface HandDrawTool extends Tool {
  name: HandDrawToolName;
  category: "handDraw";
  lineCap: LineCap;
  lineWidth: number;
  strokeStyle: string;
}

export interface SelectTool extends Tool {
  category: "select";
  name: SelectToolName;
}

// subTool
type subToolNames = "colorPreset";
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
  colorPalette: IColorPalette,
  penSizeSlider: IPenSizeSlider,
}
export interface IColorPreset extends Tool {
  name: "colorPreset";
  presetSelectionToolBar: IPresetSelectionToolBar 
}
export type SubTool = PenSubTool;

// Pen
type PenSubTool = {
  colorPreset: IColorPreset;
};
export interface IPen extends HandDrawTool {
  subTool: PenSubTool;
}

// eraser
export interface IEraser extends HandDrawTool {
  radius: number;
}

export type CanvasTool = IPen | IEraser | SelectTool;
export type CanvasToolName = HandDrawToolName | SelectToolName;
// tools config
export function createHandDrawTools() {
  const pen: IPen = {
    name: "pen",
    icon: {
      src: "/icons/pencil.svg",
      description: "pen",
    },
    category: "handDraw",
    active: true,
    subTool: {
      colorPreset: {
        name: "colorPreset",
        active: false,
        cursor: "default",
        presetSelectionToolBar: {
          colorPalette: {
            active: false,
            colors: [
              "#1a1a1a",
              "#fac710",
              "#f24726",
              "#e6e6e6",
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
    lineWidth: 5,
    lineCap: "round",
    strokeStyle: "black",
    cursor: "crosshair",
  };

  const eraser: IEraser = {
    name: "eraser",
    icon: {
      src: "/icons/e.svg",
      description: "eraser",
    },
    cursor: `url("/icons/eraserCursor.png"),default`,
    category: "handDraw",
    active: false,
    lineWidth: 20,
    lineCap: "round",
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
    category: "select",
    active: false,
    cursor: "default",
  };
  return [select];
}
export function getTools(): Array<CanvasTool> {
  const handDrawTools = createHandDrawTools();
  const selectTolls = createSelectTools();
  return [...selectTolls, ...handDrawTools];
}
