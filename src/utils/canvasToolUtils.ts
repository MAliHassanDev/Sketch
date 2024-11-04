import {
  CanvasTool,
  CanvasToolName,
  createHandDrawTools,
  createSelectTools,
} from "@/app/tools";

export function getToolByName(name: CanvasToolName, tools: CanvasTool[]):CanvasTool|never {
  const targetTool = tools.find((tool) => tool.name === name);
  if (!targetTool)
    throw new Error(`Tool with name ${name} not found in tools list`);
  return targetTool;
}

export function getTools(): Array<CanvasTool> {
  const handDrawTools = createHandDrawTools();
  const selectTolls = createSelectTools();
  return [...selectTolls, ...handDrawTools];
}

export function getActiveTool(tools: CanvasTool[]): CanvasTool|never {
  const activeTools = tools.filter((tool) => tool.active);
  if (activeTools.length > 1) throw new Error("More than one tools are active");
  if (activeTools.length === 0)
    throw new Error("No Canvas tool is currently active");
  return activeTools[0];
}
 
// TODO: Update this function on new subTool addition
export function deactivateSubTools(tools: CanvasTool[]) {
  return tools.map(tool => {
    
    if (tool.name === "pen" && tool.subTool) {
      const { colorPreset } = tool.subTool;
      colorPreset.active = false;
      colorPreset.presetSelectionToolBar.colorPalette.active = false;
    }

    return tool;
  });
  
}