import styles from "./App.module.css";
import { useContext, useState } from "react";
import Canvas from "@/features/canvas/Canvas";
import { Path } from "@/features/canvas/canvasPath";
import ToolsProvider from "@/components/toolsProvider/ToolsProvider";
import ThemeContext, { ThemeContextType } from "@/contexts/themeContext";
import DrawToolPanel from "@/features/drawToolPanel/drawToolPanel";
import UndoRedoPanel from "@/features/undoRedoPanel/UndoRedoPanel";
import EraserCursor from "@/features/cursors/eraser/EraserCursor";
import SwitchTheme from "@/features/switchTheme/switchTheme";
import { getCanvasThemeColors } from "@/utils/canvasToolUtils";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType;
  const [undoStack, setUndoStack] = useState<Path[]>([]);
  const [redoStack, setRedoStack] = useState<Path[]>([]);
  const [redrawCanvas, setRedrawCanvas] = useState<boolean>(false);

  function addNewPath(path: Path) {
    setUndoStack([...limitStack(undoStack), path]);
    setRedrawCanvas(false);
  }

  function limitStack(stack: Path[]) {
    const isStackOver = stack.length > 200;
    return stack.filter((_, index) => {
      return isStackOver ? index !== 0 : true;
    });
  }
  function handleUndo() {
    if (undoStack.length === 0) return;
    const undoPath = undoStack.pop() as Path;
    setUndoStack([...undoStack]);
    setRedoStack([...limitStack(redoStack), undoPath]);
    setRedrawCanvas(true);
  }

  function handleRedo() {
    if (redoStack.length === 0) return;
    const redoPath = redoStack.pop() as Path;
    setRedoStack([...redoStack]);
    setUndoStack([...undoStack, redoPath]);
    setRedrawCanvas(true);
  }

  function handleThemeSwitch() {
    toggleTheme();
    const { dark, light } = getCanvasThemeColors();
    const updatedUndoStack = undoStack.map((path) => {
      if (path.strokeStyle == dark) {
        path.strokeStyle = light;
      } else if (path.strokeStyle === light) {
        path.strokeStyle = dark;
      }
      return path;
    });
    setUndoStack(updatedUndoStack);
    setRedrawCanvas(true);
  }

  return (
    <div className={`${styles.app} ${theme}`} data-testid='app'>
      <SwitchTheme theme={theme} onClick={handleThemeSwitch} />
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
