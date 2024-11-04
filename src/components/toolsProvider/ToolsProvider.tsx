import { CanvasTool } from "@/app/tools";
import { getTools } from "@/app/tools";
import ToolsStateContext from "@/contexts/toolsContext";
import { useState, JSX } from "react";

type ToolsStateProviderProps = {
  children: JSX.Element[] | JSX.Element;
};
const ToolsProvider = ({ children }: ToolsStateProviderProps) => {
  const baseTools = getTools();
  const [tools, setTools] = useState(baseTools);

  function updateSingleTool(updatedTool: CanvasTool) {
    const newToolsState = tools.map((tool) => {
      if (tool.name === updatedTool.name) return updatedTool;
      tool.active = false;
      return tool;
    });
    setTools(newToolsState);
  }

  function updateAllTools(updatedTools: CanvasTool[]){
    setTools(updatedTools);
  }
  return (
    <ToolsStateContext.Provider
      value={{
        tools,
        updateSingleTool,
        updateAllTools
      }}
    >
      {children}
    </ToolsStateContext.Provider>
  );
};

export default ToolsProvider;
