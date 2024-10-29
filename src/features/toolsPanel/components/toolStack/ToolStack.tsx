import ToolButton from "@/features/toolsPanel/components/toolButton/ToolButton";
import styles from "./ToolStack.module.css";
import { CanvasTool, subTool } from "@/app/tools";

type ToolStackProps = {
  children: React.ReactNode;
};

const ToolStack = ({ children }: ToolStackProps) => {
  return <div className={styles.toolStack}>{children}</div>;
};

export default ToolStack;
