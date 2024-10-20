

type HandDrawToolName = "pen" | "eraser" | "highlighter";
type SelectToolName = "select";
type Image = {
  src: string;
  alt: string;
};
export type CanvasTool = HandDrawTool | SelectTool;

export interface Tool {
  name: SelectToolName|HandDrawToolName
  image: Image;
  active: boolean;
}

export interface HandDrawTool extends Tool {
  name: HandDrawToolName;
  category: "handDraw"
  lineCap: "round" | "butt" | "square";
  lineWidth: number;
  strokeStyle: string;
}

export interface SelectTool extends Tool {
  category: "select"
  name: SelectToolName;
}

export function getTools(): Array<HandDrawTool | SelectTool> {
  const handDrawTools = createHandDrawTools();
  const selectTolls = createSelectTools();
  return [...selectTolls,...handDrawTools, ];
}

function createHandDrawTools() {
  const pen: HandDrawTool = {
    name: "pen",
    image: {
      src: "/src/assets/icons/pencil.svg",
      alt: "Black pen icon",
    },
    category: "handDraw",
    active: true,
    lineWidth: 5,
    lineCap: "round",
    strokeStyle: "black",
  };

  const eraser: HandDrawTool = {
    name: "eraser",
    image: {
      src: "/src/assets/icons/eraser.svg",
      alt: "Black eraser icon"
    },
    category: "handDraw",
    active: false,
    lineWidth: 10,
    lineCap: "round",
    strokeStyle: "#F2F2F2",
  };

  return [pen,eraser];
}

function createSelectTools() {
  const select: SelectTool = {
    name: "select",
    image: {
      src: "/src/assets/icons/cursor.svg",
      alt: "Black cursor icon",
    },
    category: "select",
    active: false,
  };

  return [select];
}
