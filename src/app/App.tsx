import styles from "./App.module.css";
import { act, useContext, useState } from "react";
import { ThemeContext, ThemeContextType } from "@/components/ThemeProvider/ThemeProvider";
import Canvas from "@/components/canvas/Canvas";
import ToolStack from "@/components/toolStack/ToolStack";
import { getTools, Tool } from "./tools";



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

  function getActiveTool() {
    const activeTool = toolsStatus.find(tool => tool.active);
    if (!activeTool) throw new Error("All canvas tool are inactive");
    return activeTool;
  }
  // TODO Only send Basic Tool properties to ToolStack prop
  return (
    <div className={`${styles.app} ${theme}`} data-testid="app">
      <ToolStack
        tools={toolsStatus}
        onToolBtnClick={handleToolBtnClick}
      />
      <Canvas activeTool={getActiveTool()} />
    </div>
  );
};


export default App;
