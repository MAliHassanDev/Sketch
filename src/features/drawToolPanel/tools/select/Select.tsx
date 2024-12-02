import ToolsContext, { ToolsContextType } from "@/contexts/toolsContext";
import { activateSingleTool, getToolByName } from "@/utils/canvasToolUtils";
import { useContext } from "react";
import ToolButton from "../../components/toolButton/ToolButton";

const Select = () => {
  const { tools, updateToolsStatus } = useContext(
    ToolsContext
  ) as ToolsContextType;

  const select = getToolByName("select", tools);

  function handleToolBtnClick() {
    updateToolsStatus(activateSingleTool(select,tools));
  }
  return (
    <ToolButton
      isActive={select.active}
      icon={select.icon}
      onClick={handleToolBtnClick}
    />
  );
};

export default Select;
