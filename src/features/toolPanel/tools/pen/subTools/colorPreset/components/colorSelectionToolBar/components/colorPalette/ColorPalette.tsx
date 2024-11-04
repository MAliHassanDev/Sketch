import check from "@/assets/icons/check.svg";
import styles from "./ColorPalette.module.css";
import { IColorPalette } from "@/app/tools";
type ColorPaletteProps = {
  colorPalette: IColorPalette,
  onPaletteChange: (updatedPalette: IColorPalette) => void;
};
const ColorPalette = ({
  colorPalette,
  onPaletteChange,
}: ColorPaletteProps) => {


  function handleClick(color: string) {
    onPaletteChange({ ...colorPalette, selectedColor: color });
  }

  const colorList = colorPalette.colors.map((color, index) => {
    const isSelected = colorPalette.selectedColor === color;
    return (
      <li key={index}>
        <button
          style={{ backgroundColor: color }}
          onClick={()=> handleClick(color)}
          className={`${styles.colorButton} ${isSelected && styles.active}`}
        >
          {
            colorPalette.selectedColor === color && (
              <span>
                <img src={check} alt="check mark" width={16} height={16} />
              </span>
            )

          }
        </button>
      </li>
    );
  });

  return (
    <div className={styles.colorPalette}>
      <ul className={styles.colorsList}>{colorList} </ul>
    </div>
  );
};

export default ColorPalette;
