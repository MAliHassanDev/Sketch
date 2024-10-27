import ToolButton from "@/components/toolButton/ToolButton";
import styles from "./ToolStack.module.css";
import { CanvasTool, subTool } from "@/app/tools";

type ToolStackProps = {
  tools: Array<CanvasTool | subTool>;
  onToolBtnClick: (name: string) => void;
};

const ToolStack = ({ tools, onToolBtnClick }: ToolStackProps) => {
    const toolsList = tools.map((tool, index: number) => {
    return (
      <li key={index}>
        <ToolButton onClick={onToolBtnClick} tool={tool} />
      </li>
    );
  });
  return (
    <div className={styles.toolStack}>
      <ul>{toolsList}</ul>
    </div>
  );
};

export default ToolStack;