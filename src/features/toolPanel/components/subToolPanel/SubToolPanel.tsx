import ToolStack from "@/features/toolPanel/components/toolStack/ToolStack";
import { ReactNode } from 'react';
import styles from "./SubToolPanel.module.css";

type subToolPanelProps = {
  children: ReactNode;
};

const SubToolPanel = ({ children }: subToolPanelProps) => {
  return (
    <div className={styles.subToolPanel} >
      <ToolStack>{children}</ToolStack>
    </div>
  );
};


export default SubToolPanel;