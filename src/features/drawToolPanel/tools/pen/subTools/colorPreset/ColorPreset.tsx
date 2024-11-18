import {
  IColorPreset,
  IPresetSelectionToolBar,
} from "@/app/tools";
import PresetButton from "./components/presetButton/PresetButton";
import styles from "./ColorPreset.module.css";
import PresetSelectionToolBar from "./components/colorSelectionToolBar/ColorSelectionToolBar";

type ColorPresetProps = {
  colorPreset: IColorPreset;
  onPresetChange: (preset: IColorPreset) => void;
};
const ColorPreset = ({ onPresetChange, colorPreset }: ColorPresetProps) => {

  const {currPenSize,maxPenSize} = colorPreset.presetSelectionToolBar.penSizeSlider;
  const penSizePercentage = Math.floor((currPenSize/maxPenSize) * 100);

  function handleToolBtnClick() {
    const updatedPreset = Object.assign({}, colorPreset);
    updatedPreset.presetSelectionToolBar.colorPalette.active = !updatedPreset.presetSelectionToolBar.colorPalette.active;
    onPresetChange(updatedPreset);
  }

  function handlePresetSelectionChange(
    updatedSelectionToolBar: IPresetSelectionToolBar
  ) {
    onPresetChange({
      ...colorPreset,
      presetSelectionToolBar: updatedSelectionToolBar,
    });
  }

  return (
    <div className={styles.colorPreset}>
      <PresetButton
        penSizePercentage={penSizePercentage}
        bgColor={colorPreset.presetSelectionToolBar.colorPalette.selectedColor}
        onClick={handleToolBtnClick}
      />
      {colorPreset.presetSelectionToolBar.colorPalette.active && (
        <PresetSelectionToolBar
          onPresetSelectionChange={handlePresetSelectionChange}
          presetSelectionToolBar={colorPreset.presetSelectionToolBar}
        />
      )}
    </div>
  );
};

export default ColorPreset;
