import { CanvasTool, subTool, Tool } from "@/app/tools";


export function getActiveTool<T extends Tool>(tools:T[]) {
  const activeTool = tools.find(tool => tool.active);
  if (!activeTool) throw new Error("All canvas tool are inactive");
  return activeTool;
}