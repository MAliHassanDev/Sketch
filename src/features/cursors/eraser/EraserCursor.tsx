import ToolsContext, { ToolsContextType } from "@/contexts/toolsContext";
import styles from "./EraserCursor.module.css";
import { useContext } from 'react';
import { getActiveTool, getToolByName } from "@/utils/canvasToolUtils";
import { MouseCords } from "@/features/canvas/Canvas";


type EraserCursorProps = {
  cursorCords: MouseCords
}

const EraserCursor = ({cursorCords}:EraserCursorProps) => {
  const {tools } = useContext(ToolsContext) as ToolsContextType;
  const eraser = getToolByName("eraser",tools);
  return <div
    className={`${styles.eraserCursor} ${eraser.active ? styles.active : ""}`}
    style={
      {
        left: cursorCords.x,
        top: cursorCords.y,
        width: `${eraser.cursor.width}px`,
        height: `${eraser.cursor.height}px`
      }
    
    }
  ></div>;
};

export default EraserCursor;
