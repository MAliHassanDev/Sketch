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


  function updateToolsStatus(updatedTools: CanvasTool[]) {
    setTools(updatedTools);
  }
  return (
    <ToolsStateContext.Provider
      value={{
        tools,
        updateToolsStatus,
      }}
    >
      {children}
    </ToolsStateContext.Provider>
  );
};

export default ToolsProvider;
