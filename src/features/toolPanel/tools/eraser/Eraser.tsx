import ToolsContext, { ToolsContextType } from "@/contexts/toolsContext";
import { getToolByName } from "@/utils/canvasToolUtils";
import { useContext } from "react";
import ToolButton from "../../components/toolButton/ToolButton";

const Eraser = () => {
  const { tools, updateTools } = useContext(ToolsContext) as ToolsContextType;
  const eraser = getToolByName("eraser", tools);

  function handleToolBtnClick() {
    updateTools({ ...eraser, ...{ active: true } });
  }

  return (
    <ToolButton
      icon={eraser.icon}
      isActive={eraser.active}
      onClick={handleToolBtnClick}
    />
  );
};

export default Eraser;
