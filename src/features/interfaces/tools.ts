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
  name: subToolNames
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
