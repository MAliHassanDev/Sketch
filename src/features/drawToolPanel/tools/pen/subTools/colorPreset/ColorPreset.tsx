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
  function handleToolBtnClick() {
    onPresetChange({ ...colorPreset, ...{ active: !colorPreset.active } });
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
        bgColor={colorPreset.presetSelectionToolBar.colorPalette.selectedColor}
        onClick={handleToolBtnClick}
      />
      {colorPreset.active && (
        <PresetSelectionToolBar
          onPresetSelectionChange={handlePresetSelectionChange}
          presetSelectionToolBar={colorPreset.presetSelectionToolBar}
        />
      )}
    </div>
  );
};

export default ColorPreset;
