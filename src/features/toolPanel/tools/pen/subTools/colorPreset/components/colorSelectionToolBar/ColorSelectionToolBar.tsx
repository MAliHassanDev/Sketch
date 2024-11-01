import { IColorPalette } from "@/app/tools";
import styles from "./ColorSelectionToolBar.module.css";
import ColorPalette from "./components/colorPalette/ColorPalette";

type ColorSelectionToolBar = {
  colorPalette: IColorPalette;
  onColorPaletteChange: (colorPalette: IColorPalette) => void;
};
const ColorSelectionToolBar = ({
  colorPalette,
  onColorPaletteChange,
}: ColorSelectionToolBar) => {
  function handleSelectedColorChange(color: string) {
    const updatedColorPalette: IColorPalette = Object.assign(
      {},
      {
        ...colorPalette,
        selectedColor: color,
      }
    );
    onColorPaletteChange(updatedColorPalette);
  }

  return (
    <div className={styles.colorSelectionToolBar}>
      <ColorPalette
        selectedColor={colorPalette.selectedColor}
        onClick={handleSelectedColorChange}
        colors={colorPalette.colors}
      />
    </div>
  );
};

export default ColorSelectionToolBar;
