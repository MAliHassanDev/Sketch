import ToolsContext, { ToolsContextType } from "@/contexts/toolsContext";
import { activateSingleTool, getCanvasThemeColors, getToolByName } from "@/utils/canvasToolUtils";
import { useContext, useEffect } from "react";
import ToolButton from "../../components/toolButton/ToolButton";
import ThemeContext, { ThemeContextType } from "@/contexts/themeContext";
import { IEraser } from "@/app/tools";

const Eraser = () => {
  const { tools, updateToolsStatus } = useContext(
    ToolsContext
  ) as ToolsContextType;
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const eraser = getToolByName("eraser", tools) as IEraser;

  function handleToolBtnClick() {
    const { light, dark } = getCanvasThemeColors();
    const eraserColor = theme == "dark" ? dark : light;
    const updatedEraser = Object.assign({}, eraser);
    updatedEraser.active = true;
    updatedEraser.strokeStyle = eraserColor;
    updateToolsStatus(activateSingleTool(updatedEraser, tools));
  }


  useEffect(() => {
    const updateEraserColor = () => {
      const { light, dark } = getCanvasThemeColors();
      eraser.strokeStyle = theme == "dark" ? dark : light;
    };
    updateEraserColor();
    updateToolsStatus(tools);
  }, [theme]);

  return (
    <ToolButton
      icon={eraser.icon}
      isActive={eraser.active}
      onClick={handleToolBtnClick}
    />
  );
};

export default Eraser;
