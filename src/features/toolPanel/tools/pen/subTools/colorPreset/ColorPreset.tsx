import { IColorPreset } from "@/app/tools";
import PresetButton from "./components/presetButton/PresetButton";
import ColorPalette from "./components/colorPalette/ColorPalette";
import styles from "./ColorPreset.module.css";

type ColorPresetProps = {
  colorPreset: IColorPreset;
  onPresetChange: (preset: IColorPreset) => void;
};
const ColorPreset = ({ onPresetChange, colorPreset }: ColorPresetProps) => {
  function handleToolBtnClick() {
    onPresetChange({ ...colorPreset, ...{ active: !colorPreset.active } });
  }

  function handleSelectedColorChange(color: string) {
    const { colorPalette } = colorPreset;
    const updatedColorPreset:IColorPreset = Object.assign({}, colorPreset, {
      colorPalette: { ...colorPalette, selectedColor: color },
    });
    onPresetChange(updatedColorPreset);
  }
  return (
    <div className={styles.colorPreset}>
      <PresetButton
        bgColor={colorPreset.colorPalette.selectedColor}
        onClick={handleToolBtnClick}
      />
      {colorPreset.active && (
        <ColorPalette
          colors={colorPreset.colorPalette.colors}
          selectedColor={colorPreset.colorPalette.selectedColor}
          onClick={handleSelectedColorChange}
        />
      )}
    </div>
  );
};

export default ColorPreset;
