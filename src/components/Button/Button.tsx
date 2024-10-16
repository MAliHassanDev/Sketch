import { useContext } from "react";
import styles from "./Button.module.css";
import { ThemeContext, ThemeContextType } from "@/components/ThemeProvider/ThemeProvider";

const Button = () => {
  const {theme,toggleTheme} = useContext(ThemeContext) as ThemeContextType;
  return <button
    className={styles.button}
    onClick={toggleTheme}
  >  
    Switch to {theme == "dark" ? "light" : "dark"} mode
  </button>;
};

export default Button;
