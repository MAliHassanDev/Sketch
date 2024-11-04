import {
  IColorPalette,
  IPenSizeSlider,
  IPresetSelectionToolBar,
} from "@/app/tools";
import styles from "./ColorSelectionToolBar.module.css";
import ColorPalette from "./components/colorPalette/ColorPalette";
import PenSizeSlider from "./components/penSizeSlider/PenSizeSlider";
import { useEffect, useRef } from "react";

type PresetSelectionToolBar = {
  presetSelectionToolBar: IPresetSelectionToolBar;
  onPresetSelectionChange: (
    presetSelectionToolBar: IPresetSelectionToolBar
  ) => void;
};
const PresetSelectionToolBar = ({
  presetSelectionToolBar,
  onPresetSelectionChange,
}: PresetSelectionToolBar) => {
  const { colorPalette, penSizeSlider } = presetSelectionToolBar;

  function handleColorPaletteChange(updatedColorPalette: IColorPalette) {
    onPresetSelectionChange({
      penSizeSlider,
      colorPalette: updatedColorPalette
    });
  }


  function handlePenSizeSliderChange(updatedSlider: IPenSizeSlider) {
    onPresetSelectionChange({
      penSizeSlider: updatedSlider,
      colorPalette,
    });
  }

  return (
    <div className={styles.colorSelectionToolBar}>
      <PenSizeSlider
        penSizeSlider={penSizeSlider}
        onSliderChange={handlePenSizeSliderChange}
      />
      <ColorPalette
        onPaletteChange={handleColorPaletteChange}
        colorPalette={colorPalette}
      />
    </div>
  );
};

export default PresetSelectionToolBar;
