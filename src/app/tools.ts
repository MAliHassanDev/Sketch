// Tools
type HandDrawToolName = "pen" | "eraser" | "highlighter";
type SelectToolName = "select";
type Cursor = string;
type PrimitiveOrArray =
  | string
  | number
  | boolean
  | Array<string | number | boolean>;
export type ToolIcon = {
  src: string;
  description: string;
};

export interface Tool {
  name: SelectToolName | HandDrawToolName | subToolNames;
  icon?: ToolIcon;
  active: boolean;
  cursor: Cursor;
}

export interface HandDrawTool extends Tool {
  name: HandDrawToolName;
  category: "handDraw";
  lineCap: "round" | "butt" | "square";
  lineWidth: number;
  strokeStyle: string;
}

export interface SelectTool extends Tool {
  category: "select";
  name: SelectToolName;
}

// subTool
type subToolNames = "colorPreset";
export interface IColorPreset extends Tool {
  name: "colorPreset";
  colorPalette: {
    colors: string[];
    selectedColor: string;
    thickness: number;
    active: boolean;
  };
}
export type subTool = IColorPreset;

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
//  util functions
export function getTools(): Array<CanvasTool> {
  const handDrawTools = createHandDrawTools();
  const selectTolls = createSelectTools();
  return [...selectTolls, ...handDrawTools];
}

export function getActiveTool(tools: CanvasTool[]) {
  const activeTools = tools.filter((tool) => tool.active);
  if (activeTools.length > 1) throw new Error("More than one tools are active");
  if (activeTools.length === 0)
    throw new Error("No Canvas tool is currently active");
  return activeTools[0];
}

// tools config
function createHandDrawTools() {
  const pen: IPen = {
    name: "pen",
    icon: {
      src: "/src/assets/icons/pencil.svg",
      description: "pen",
    },
    category: "handDraw",
    active: true,
    subTool: {
      colorPreset: {
        name: "colorPreset",
        active: false,
        cursor: "default",
        colorPalette: {
          active: false,
          colors: ["#1a1a1a","#fac710","#f24726","#e6e6e6","#cee741","#8fd14f","#da0063","#808080","#12cdd4","#0ca789","#9510ac","#2d9bf0"],
          selectedColor: "#1a1a1a",
          thickness: 5,
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
      src: "/src/assets/icons/e.svg",
      description: "eraser",
    },
    cursor: `url("src/assets/icons/eraserCursor.png"),default`,
    category: "handDraw",
    active: false,
    lineWidth: 20,
    lineCap: "round",
    strokeStyle: "#F2F2F2",
    radius: 1,
  };

  return [pen, eraser];
}

function createSelectTools() {
  const select: SelectTool = {
    name: "select",
    icon: {
      src: "/src/assets/icons/cursor.svg",
      description: "select",
    },
    category: "select",
    active: false,
    cursor: "default",
  };
  return [select];
}
