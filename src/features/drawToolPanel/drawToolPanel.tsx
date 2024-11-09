import ToolStack from "./components/toolStack/ToolStack";
import Pen from "./tools/pen/Pen";
import Eraser from "./tools/eraser/Eraser";
import Select from "./tools/select/Select";
import styles from "./drawToolPanel.module.css";




const DrawToolPanel = () => {
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

export default DrawToolPanel;
