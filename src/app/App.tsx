import styles from "./App.module.css";
import { useContext, useEffect, useState } from "react";
import Canvas, { MouseCords, Path } from "@/features/canvas/Canvas";
import ToolsProvider from "@/components/toolsProvider/ToolsProvider";
import ThemeContext, { ThemeContextType } from "@/contexts/themeContext";
import DrawToolPanel from "@/features/drawToolPanel/drawToolPanel";
import UndoRedoPanel from "@/features/undoRedoPanel/UndoRedoPanel";
import { removeLastArrayElement } from "@/utils/utils";
import EraserCursor from "@/features/cursors/eraser/EraserCursor";

const App = () => {
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const [undoStack, setUndoStack] = useState<Path[] | []>([]);
  const [redoStack, setRedoStack] = useState<Path[] | []>([]);
  const [redrawCanvas, setRedrawCanvas] = useState<boolean>(false);

  function addNewPath(path: Path) {
    setUndoStack([...undoStack, path]);
    setRedrawCanvas(false);
  }

  function handleUndo() {
    if (undoStack.length === 0) return;
    const undoPath = undoStack[undoStack.length - 1];
    setUndoStack(removeLastArrayElement(undoStack));
    setRedoStack([...redoStack, undoPath]);
    setRedrawCanvas(true);
  }

  function handleRedo() {
    if (redoStack.length === 0) return;
    const redoPath = redoStack[redoStack.length - 1];
    setRedoStack(removeLastArrayElement(redoStack));
    if (!redoPath) return;
    setUndoStack([...undoStack, redoPath]);
    setRedrawCanvas(true);
  }

  // TODO move both tool panels inside single component
  return (
    <div className={`${styles.app} ${theme}`} data-testid='app'>
      <ToolsProvider>
        <Canvas
          onNewPath={addNewPath}
          paths={undoStack}
          redraw={redrawCanvas}
        />
        <DrawToolPanel />
        <UndoRedoPanel
          onRedoClick={handleRedo}
          onUndoClick={handleUndo}
          isRedoDisabled={redoStack.length === 0}
          isUndoDisabled={undoStack.length === 0}
        />
        <EraserCursor />
      </ToolsProvider>
    </div>
  );
};

export default App;
