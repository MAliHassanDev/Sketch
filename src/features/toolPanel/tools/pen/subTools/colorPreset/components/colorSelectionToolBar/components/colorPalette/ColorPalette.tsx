import check from "@/assets/icons/check.svg";
import styles from "./ColorPalette.module.css";
type ColorPaletteProps = {
  colors: string[];
  selectedColor: string;
  onClick: (selectedColor: string) => void;
};
const ColorPalette = ({
  colors,
  selectedColor,
  onClick,
}: ColorPaletteProps) => {
  const colorList = colors.map((color, index) => {
    const isSelected = selectedColor === color;
    return (
      <li key={index}>
        <button
          style={{ backgroundColor: color }}
          onClick={() => onClick(color)}
          className={`${styles.colorButton} ${isSelected && styles.active}`}
        >
          {
            selectedColor === color && (
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
