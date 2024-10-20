import ToolButton from '@/components/toolButton/ToolButton';
import styles from "./ToolStack.module.css";
import { Tool } from '@/app/tools';


type ToolStackProps = {
  tools: Tool[],
  onToolBtnClick: (name: string) => void;
}

const ToolStack = ({
  tools,
  onToolBtnClick,
}: ToolStackProps) => {
  

  const iconsList = tools.map((tool: Tool, index: number) => {
    return <li key={index}>
      <ToolButton
        onClick={onToolBtnClick}
        tool={tool}
      />
    </li>;
  });



  return (
    <div className={styles.toolStack}>
      <ul>
        {iconsList}
      </ul>
    </div>
  );
};


export default ToolStack;