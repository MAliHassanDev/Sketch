import { useContext, useEffect } from "react";
import ToolButton from "../../components/toolButton/ToolButton";
import ColorPreset from "./subTools/colorPreset/ColorPreset";
import { IColorPreset, IPen } from "@/app/tools";
import ToolsContext, { ToolsContextType } from "@/contexts/toolsContext";
import { activateSingleTool, getCanvasColorInverse, getToolByName } from "@/utils/canvasToolUtils";
import SubToolPanel from "../../components/subToolPanel/SubToolPanel";
import styles from "./Pen.module.css";
import ThemeContext, { Theme, ThemeContextType } from "@/contexts/themeContext";

const Pen = () => {
  const {
    tools,
    updateToolsStatus,
  } = useContext(ToolsContext) as ToolsContextType;
  const { theme } = useContext(ThemeContext) as ThemeContextType;

  const pen = getToolByName("pen", tools) as IPen;

  function handlePresetChange(preset: IColorPreset) {
    const {
      presetSelectionToolBar: { colorPalette, penSizeSlider },
    } = preset;
    const updatedPen: IPen = Object.assign({}, pen, {
      strokeStyle: colorPalette.selectedColor,
      lineWidth: penSizeSlider.currPenSize,
      subTool: { colorPreset: preset },
    } as IPen);
    updateToolsStatus(activateSingleTool(updatedPen,tools));
  }

  function handleToolBtnClick() {
    const updatedPen = Object.assign({}, pen);
    updatedPen.active = true;
    updatedPen.subTool.colorPreset.active =
      !updatedPen.subTool.colorPreset.active;
    updatedPen.subTool.colorPreset.presetSelectionToolBar.colorPalette.active =
      false;
    updateToolsStatus(activateSingleTool(updatedPen,tools));
  }

  useEffect(() => {
    const updatePenProperties = (theme: Theme) => {
      const color = getCanvasColorInverse(theme);
      pen.strokeStyle = color;
      pen.subTool.colorPreset.presetSelectionToolBar.colorPalette.selectedColor =
        color;
      updateToolsStatus(tools);
    };
    updatePenProperties(theme);
  }, [theme]);

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
