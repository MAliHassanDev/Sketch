import styles from "./App.module.css";
import { useContext } from "react";
import Canvas from "@/features/canvas/Canvas";
import ToolsPanel from "@/features/toolPanel/ToolPanel";
import ToolsProvider from "@/components/toolsProvider/ToolsProvider";
import ThemeContext, { ThemeContextType } from "@/contexts/themeContext";

const App = () => {
  const { theme } = useContext(ThemeContext) as ThemeContextType;

  return (
    <div className={`${styles.app} ${theme}`} data-testid='app'>
      <ToolsProvider>
        <ToolsPanel />
        <Canvas />
      </ToolsProvider>
    </div>
  );
};

export default App;
