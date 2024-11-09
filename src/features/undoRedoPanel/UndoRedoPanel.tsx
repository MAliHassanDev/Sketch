import ToolStack from "../drawToolPanel/components/toolStack/ToolStack";
import Redo from "./components/redo/Redo";
import Undo from "./components/undo/Undo";
import styles from "./UndoRedoPanel.module.css";

type UndoRedoPanel = {
  onUndoClick: () => void;
  onRedoClick: () => void;
  isRedoDisabled: boolean;
  isUndoDisabled: boolean;
};
const UndoRedoPanel = ({
  onUndoClick,
  onRedoClick,
  isRedoDisabled,
  isUndoDisabled,
}: UndoRedoPanel) => {
  return (
    <div className={styles.undoRedoPanel}>
      <ToolStack>
        <Undo onClick={onUndoClick} isDisabled={isUndoDisabled} />
        <Redo onClick={onRedoClick} isDisabled={isRedoDisabled} />
      </ToolStack>
    </div>
  );
};

export default UndoRedoPanel;
