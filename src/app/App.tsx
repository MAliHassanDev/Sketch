import Button from "@/components/Button/Button";
import styles from "./App.module.css";
import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "@/components/ThemeProvider/ThemeProvider";

const App = () => {
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  return (
    <div className={`${styles.app} ${theme}`}>
      <h1>Hello World</h1>
      <Button />
    </div>
  );
};


export default App;
