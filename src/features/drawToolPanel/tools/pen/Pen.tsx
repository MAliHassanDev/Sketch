import { useContext } from "react";
import ToolButton from "../../components/toolButton/ToolButton";
import ColorPreset from "./subTools/colorPreset/ColorPreset";
import { IColorPreset, IPen } from "@/app/tools";
import ToolsContext, { ToolsContextType } from "@/contexts/toolsContext";
import { getToolByName } from "@/utils/canvasToolUtils";
import SubToolPanel from "../../components/subToolPanel/SubToolPanel";
import styles from "./Pen.module.css";

const Pen = () => {
  const { tools, updateSingleToolStatus } = useContext(
    ToolsContext
  ) as ToolsContextType;
  const pen = getToolByName("pen", tools) as IPen;

  function handlePresetChange(preset: IColorPreset) {
    const {
      presetSelectionToolBar: { colorPalette, penSizeSlider },
    } = preset;
    const updatedPenState: IPen = Object.assign({}, pen, {
      strokeStyle: colorPalette.selectedColor,
      lineWidth: penSizeSlider.currPenSize,
      subTool: { colorPreset: preset },
    } as IPen);
    updateSingleToolStatus(updatedPenState);
  }

  function handleToolBtnClick() {
    const updatedPen = Object.assign({}, pen);
    updatedPen.active = true;
    updatedPen.subTool.colorPreset.active =
      !updatedPen.subTool.colorPreset.active;
    updatedPen.subTool.colorPreset.presetSelectionToolBar.colorPalette.active = false;
    updateSingleToolStatus(updatedPen);
  }

  return (
    <div className={styles.pen}>
      <ToolButton
        onClick={handleToolBtnClick}
        icon={pen.icon}
        isActive={pen.active}
      />

      {pen.active && pen.subTool.colorPreset.active && (
        <SubToolPanel>
          <ColorPreset
            colorPreset={pen.subTool.colorPreset}
            onPresetChange={handlePresetChange}
          />
        </SubToolPanel>
      )}
    </div>
  );
};

export default Pen;
