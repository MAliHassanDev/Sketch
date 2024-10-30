import styles from "./ColorPallete.module.css";
import check from "@/assets/icons/check.svg";

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
    return (
      <li key={index}>
        <button
          style={{ backgroundColor: color }}
          onClick={() => onClick(color)}
          className={styles.colorButton}
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
      <ul>{colorList} </ul>
    </div>
  );
};

export default ColorPalette;
