import styles from "./App.module.css";
import { useContext, useEffect, useState } from "react";
import Canvas, { MouseCords, Path } from "@/features/canvas/Canvas";
import ToolsProvider from "@/components/toolsProvider/ToolsProvider";
import ThemeContext, { ThemeContextType } from "@/contexts/themeContext";
import DrawToolPanel from "@/features/drawToolPanel/drawToolPanel";
import UndoRedoPanel from "@/features/undoRedoPanel/UndoRedoPanel";
import { removeLastArrayElement } from "@/utils/utils";
import EraserCursor from "@/features/cursors/eraser/EraserCursor";
import { CanvasTool } from "./tools";


type CursorPropteries = {
  cords: MouseCords;
  speed: number,
}

const App = () => {
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  
  const [undoStack, setUndoStack] = useState<Path[] | []>([]);
  const [redoStack, setRedoStack] = useState<Path[] | []>([]);
  const [redrawCanvas, setRedrawCanvas] = useState<boolean>(false);
  const [cursorCords, setCursorCords] = useState<MouseCords>({ x: 0, y: 0 });
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

  function handleMouseMove(e: React.MouseEvent,activeTool: CanvasTool) {
    if (activeTool.name !== "eraser") return;
    setCursorCords({ x: e.clientX, y: e.clientY });
  }

  // TODO move both tool panels inside single component
  return (
    <div className={`${styles.app} ${theme}`} data-testid='app'>
      <ToolsProvider>
        <Canvas
          onPathDraw={addNewPath}
          paths={undoStack}
          redraw={redrawCanvas}
          onMouseMove={handleMouseMove}
        />
        <DrawToolPanel />
        <UndoRedoPanel
          onRedoClick={handleRedo}
          onUndoClick={handleUndo}
          isRedoDisabled={redoStack.length === 0}
          isUndoDisabled={undoStack.length === 0}
        />
        <EraserCursor
        cursorCords={cursorCords}/>
      </ToolsProvider>
    </div>
  );
};

export default App;
