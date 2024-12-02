import {
  CanvasTool,
  CanvasToolName,
  createHandDrawTools,
  createSelectTools,
  IPen,
} from "@/app/tools";
import { Theme } from "@/contexts/themeContext";

type CanvasColor = {
  dark: "#121212";
  light: "#F2F2F2";
};

export function getToolByName(
  name: CanvasToolName,
  tools: CanvasTool[]
): CanvasTool | never {
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

export function getCanvasThemeColors(): CanvasColor {
  return {
    dark: "#121212",
    light: "#F2F2F2",
  };
}

export function getCanvasColorInverse(theme: Theme) {
  const { dark, light } = getCanvasThemeColors();
  return theme === "dark" ? light : dark;
}

export function getActiveTool(tools: CanvasTool[]): CanvasTool | never {
  const activeTools = tools.filter((tool) => tool.active);
  if (activeTools.length > 1) throw new Error("More than one tools are active");
  if (activeTools.length === 0)
    throw new Error("No Canvas tool is currently active");
  return activeTools[0];
}

export function activateSingleTool(
  targetTool: CanvasTool,
  tools: CanvasTool[]
) {
  return tools.map((tool) => {
    if (tool.name === targetTool.name) {
      targetTool.active = true;
      return targetTool;
    }
    tool.active = false;
    return tool;
  });
}

export function deactivateSubTools(tool: CanvasTool) {
  const updatedTool = Object.assign({}, tool);
  if (updatedTool.name == "pen" && updatedTool.subTool) {
    updatedTool.subTool.colorPreset.active = false;
    updatedTool.subTool.colorPreset.presetSelectionToolBar.colorPalette.active =
      false;
  }
  return updatedTool;
}

export function inversePenColor(theme: Theme, pen: IPen): IPen {
  const penColor = getCanvasColorInverse(theme);
  const updatedPen = Object.assign({}, pen);
  updatedPen.strokeStyle = penColor;
  updatedPen.subTool.colorPreset.presetSelectionToolBar.colorPalette.selectedColor =
    penColor;
  return updatedPen;
}
