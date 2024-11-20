import ToolsContext, { ToolsContextType } from "@/contexts/toolsContext";
import { getToolByName } from "@/utils/canvasToolUtils";
import { useContext } from "react";
import ToolButton from "../../components/toolButton/ToolButton";

const Select = () => {
  const { tools, updateSingleToolStatus } = useContext(
    ToolsContext
  ) as ToolsContextType;

  const select = getToolByName("select", tools);

  function handleToolBtnClick() {
    updateSingleToolStatus({ ...select, ...{ active: true } });
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
