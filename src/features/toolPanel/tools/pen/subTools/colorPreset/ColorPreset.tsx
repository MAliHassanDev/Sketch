import { IColorPalette, IColorPreset } from "@/app/tools";
import PresetButton from "./components/presetButton/PresetButton";
import styles from "./ColorPreset.module.css";
import ColorSelectionToolBar from "./components/colorSelectionToolBar/ColorSelectionToolBar";

type ColorPresetProps = {
  colorPreset: IColorPreset;
  onPresetChange: (preset: IColorPreset) => void;
};
const ColorPreset = ({ onPresetChange, colorPreset }: ColorPresetProps) => {
  function handleToolBtnClick() {
    onPresetChange({ ...colorPreset, ...{ active: !colorPreset.active } });
  }

  function handleColorPaletteChange(updatedPalette: IColorPalette) {
    onPresetChange({ ...colorPreset, ...{ colorPalette: updatedPalette } } as IColorPreset);
  }
  
  return (
    <div className={styles.colorPreset}>
      <PresetButton
        bgColor={colorPreset.colorPalette.selectedColor}
        onClick={handleToolBtnClick}
      />
      {colorPreset.active && (
        <ColorSelectionToolBar
          onColorPaletteChange={handleColorPaletteChange}
          colorPalette={colorPreset.colorPalette}
        />
      )}
    </div>
  );
};

export default ColorPreset;
