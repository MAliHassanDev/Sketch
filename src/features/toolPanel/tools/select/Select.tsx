import ToolsContext, { ToolsContextType } from "@/contexts/toolsContext";
import { getToolByName } from "@/utils/canvasToolUtils";
import { useContext } from "react";
import ToolButton from "../../components/toolButton/ToolButton";

const Select = () => {
  const { tools, updateSingleTool: updateTools } = useContext(
    ToolsContext
  ) as ToolsContextType;

  const select = getToolByName("select", tools);

  function handleToolBtnClick() {
    updateTools({ ...select, ...{ active: true } });
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
