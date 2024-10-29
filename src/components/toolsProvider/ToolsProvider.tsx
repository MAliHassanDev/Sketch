import { CanvasTool, getTools } from "@/app/tools";
import ToolsStateContext from "@/contexts/toolsContext";
import { useState, JSX } from "react";

type ToolsStateProviderProps = {
  children: JSX.Element[] | JSX.Element;
};
const ToolsProvider = ({ children }: ToolsStateProviderProps) => {
  const baseTools = getTools();
  const [tools, setTools] = useState(baseTools);

  function updateTools(updatedTool: CanvasTool) {
    const newToolsState = tools.map((tool) => {
      if (tool.name === updatedTool.name) return updatedTool;
      tool.active = false;
      return tool;
    });
    setTools(newToolsState);
  }

  return (
    <ToolsStateContext.Provider
      value={{
        tools,
        updateTools,
      }}
    >
      {children}
    </ToolsStateContext.Provider>
  );
};

export default ToolsProvider;
