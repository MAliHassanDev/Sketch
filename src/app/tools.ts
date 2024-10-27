type HandDrawToolName = "pen" | "eraser" | "highlighter";
type subToolNames = "colorPreset"
type SelectToolName = "select";
type Cursor = string;
type PrimitiveOrArray =
  | string
  | number
  | boolean
  | Array<string | number | boolean>;
type Image = {
  src: string;
  alt: string;
};

type ColorPreset  = {
  colors: string[];
  selectedColor: string
  thickness: number;
};

type subToolExtra = ColorPreset;

export interface Tool {
  name: SelectToolName | HandDrawToolName | subToolNames;
  image?: Image;
  active: boolean;
  cursor: Cursor;
  subTools?: subTool[];
}

export interface subTool
  extends Omit<Tool,"subTools">,subToolExtra {
  type: "subTool";
} 

export interface HandDrawTool extends Tool {
  name: HandDrawToolName;
  category: "handDraw";
  lineCap: "round" | "butt" | "square";
  lineWidth: number;
  strokeStyle: string;
  type: "tool"
}

export interface SelectTool extends Tool {
  category: "select";
  type: "tool"
  name: SelectToolName;
}

export type CanvasTool = HandDrawTool | SelectTool;

export function getTools(): Array<HandDrawTool | SelectTool> {
  const handDrawTools = createHandDrawTools();
  const selectTolls = createSelectTools();
  return [...selectTolls, ...handDrawTools];
}

function createHandDrawTools() {
  const pen: HandDrawTool = {
    name: "pen",
    image: {
      src: "/src/assets/icons/pencil.svg",
      alt: "pen",
    },
    type: "tool",
    category: "handDraw",
    active: true,
    subTools: [
      {
        name: "colorPicker",
        active: true,
        type: "subTool",
        colors: ["black"],
        selectedColor: "black",
        cursor: "default",
        thickness: 5,
      },
    ],
    lineWidth: 5,
    lineCap: "round",
    strokeStyle: "black",
    cursor: "crosshair",
  };

  const eraser: HandDrawTool = {
    name: "eraser",
    image: {
      src: "/src/assets/icons/e.svg",
      alt: "eraser",
    },
    cursor: `url("src/assets/icons/eraserCursor.png"),default`,
    category: "handDraw",
    active: false,
    type: "tool",
    lineWidth: 20,
    lineCap: "round",
    strokeStyle: "#F2F2F2",
  };

  return [pen, eraser];
}

function createSelectTools() {
  const select: SelectTool = {
    name: "select",
    image: {
      src: "/src/assets/icons/cursor.svg",
      alt: "select",
    },
    category: "select",
    type: "tool",
    active: false,
    cursor: "default",
  };

  return [select];
}

