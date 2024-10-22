import styles from "./App.module.css";
import {  useContext, useState } from "react";
import { ThemeContext, ThemeContextType } from "@/components/ThemeProvider/ThemeProvider";
import Canvas from "@/components/canvas/Canvas";
import { getTools, Tool } from "./tools";
import { getActiveTool } from "@/utils/canvasUtils";
import ToolBar from '../components/toolBar/ToolBar';



const App = () => {
  const tools = getTools();
  const {theme} = useContext(ThemeContext) as ThemeContextType;
  const [toolsStatus,setToolsStatus] = useState(tools);

  function handleToolBtnClick(toolName:string){
    function updateTargetToolStatus() {
      return toolsStatus.map(tool => {
        tool.active = tool.name === toolName;
        return tool;
      });
    }
    setToolsStatus(updateTargetToolStatus());
  }

  function handleSubToolBtnClick(toolName: string) {
    
  }


  return (
    <div className={`${styles.app} ${theme}`} data-testid="app">
      <ToolBar 
        tools={toolsStatus}
        onToolBtnClick={handleToolBtnClick}
        onSubToolBtnClick={handleSubToolBtnClick}
      />
      <Canvas activeTool={getActiveTool(toolsStatus)} />
    </div> 
  );
};


export default App;
