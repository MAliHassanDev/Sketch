import ToolStack from "./components/toolStack/ToolStack";
import Pen from "./tools/pen/Pen";
import Eraser from "./tools/eraser/Eraser";
import styles from "./ToolPanel.module.css";
import Select from "./tools/select/Select";

const ToolPanel = () => {
  return (
    <div className={styles.toolPanel}>
      <ToolStack>
        <Select />
        <Pen />
        <Eraser />
      </ToolStack>
    </div>
  );
};

export default ToolPanel;
