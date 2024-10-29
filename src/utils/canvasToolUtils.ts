import { CanvasTool, CanvasToolName, subTool, Tool } from "@/app/tools";


export function getActiveTool<T extends Tool>(tools:T[]) {
  const activeTool = tools.find(tool => tool.active);
  if (!activeTool) throw new Error("All canvas tool are inactive");
  return activeTool;
}


export function getToolByName(name: CanvasToolName, tools: CanvasTool[],) {
  const targetTool = tools.find(tool => tool.name === name);
  if (!targetTool) throw new Error(`Tool with name ${name} not found in tools list`);
  return targetTool;
}