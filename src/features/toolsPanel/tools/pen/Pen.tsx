import { useContext } from "react";
import ToolButton from "../../components/toolButton/ToolButton";
import ToolStack from "../../components/toolStack/ToolStack";
import ColorPreset from "./components/colorPreset/ColorPreset";
import { IColorPreset, IPen } from "@/app/tools";
import ToolsContext, { ToolsContextType } from "@/contexts/toolsContext";
import { getToolByName } from "@/utils/canvasToolUtils";

const Pen = () => {
  const { tools, updateTools } = useContext(ToolsContext) as ToolsContextType;
  const pen = getToolByName("pen", tools) as IPen;

  function handlePresetChange(preset: IColorPreset) {
    updateTools({ ...pen, ...{ subTool: { colorPreset: preset } } });
  }

  function handleToolBtnClick() {
    updateTools({ ...pen, ...{ active: true } });
  }

  return (
    <div>
      <ToolButton
        onClick={handleToolBtnClick}
        icon={pen.icon}
        isActive={pen.active}
      />

      {pen.active && (
        <ToolStack>
          <ColorPreset
            colorPreset={pen.subTool.colorPreset}
            onPresetChange={handlePresetChange}
          />
        </ToolStack>
      )}
    </div>
  );
};

export default Pen;
