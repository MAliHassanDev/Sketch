import { CanvasTool } from "@/app/tools";
import { getTools } from "@/app/tools";
import ToolsStateContext from "@/contexts/toolsContext";
import { useState, JSX } from "react";

// TODO move the update tools logic in single function
type ToolsStateProviderProps = {
  children: JSX.Element[] | JSX.Element;
};
const ToolsProvider = ({ children }: ToolsStateProviderProps) => {
  const baseTools = getTools();
  const [tools, setTools] = useState(baseTools);

  function updateSingleToolStatus(updatedTool: CanvasTool) {
    const newToolsState = tools.map((tool) => {
      if (tool.name === updatedTool.name) return updatedTool;
      tool.active = false;
      return tool;
    });
    setTools(newToolsState);
  }

  function updateAllToolsStatus(updatedTools: CanvasTool[]) {
    setTools(updatedTools);
  }
  return (
    <ToolsStateContext.Provider
      value={{
        tools,
        updateSingleToolStatus,
        updateAllToolsStatus,
      }}
    >
      {children}
    </ToolsStateContext.Provider>
  );
};

export default ToolsProvider;
