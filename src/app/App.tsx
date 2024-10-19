import styles from "./App.module.css";
import { useContext, useState } from "react";
import { ThemeContext, ThemeContextType } from "@/components/ThemeProvider/ThemeProvider";
import Canvas from "@/components/canvas/Canvas";
import ToolStack from "@/components/toolStack/ToolStack";
import tools  from "./tools.json";

export type Image = {
  src: string,
  alt: string,
}

export interface Tool{
  name: string,
  image: Image,
  active: boolean
}



const App = () => {
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const [activeTool,setActiveTool] = useState<Tool[]>(tools);

  function handleToolBtnClick(toolName:string){
    const newActiveTool = activeTool.map(tool => {
      tool.active = tool.name === toolName;
      return tool;
    });
    setActiveTool(newActiveTool);
  }
  return (
    <div className={`${styles.app} ${theme}`} data-testid="app">
      <ToolStack
        tools={tools}
        onToolBtnClick={handleToolBtnClick}
      />
      <Canvas />
    </div>
  );
};


export default App;
