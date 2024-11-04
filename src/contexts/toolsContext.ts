import { CanvasTool } from "@/app/tools";
import { createContext } from "react";

export type ToolsContextType = {
  tools: Array<CanvasTool>;
  updateSingleTool: (tool: CanvasTool) => void;
  updateAllTools: (tools: CanvasTool[]) => void;
};

const ToolsContext = createContext<ToolsContextType | null>(null);

export default ToolsContext;
