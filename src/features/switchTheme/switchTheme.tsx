import darkThemeIcon from "@/assets/icons/dark.png";
import lightThemeIcon from "@/assets/icons/light.png";
import styles from './switchTheme.module.css';
import { Theme } from "@/contexts/themeContext";


type SwitchThemeProp = {
  theme: Theme,
  onClick: () => void;
}

const SwitchTheme = ({theme,onClick}:SwitchThemeProp) => {

  const isThemeDark = theme === "dark";

  return (
    <button onClick={onClick} className={styles.switchThemeButton}>
      <span>
        <img
          alt={isThemeDark ? "Sun icon" : "Crescent icon"}
          src={isThemeDark ? lightThemeIcon : darkThemeIcon}
          width={20}
          height={20}
        />
      </span>
    </button>
  );
};

export default SwitchTheme;
