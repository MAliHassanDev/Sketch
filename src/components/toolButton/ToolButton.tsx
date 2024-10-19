import styles from "./ToolButton.module.css";
import { Tool } from "@/app/App";

interface ToolButtonProps{
  onClick: (name:string) => void;
  tool: Tool
}

const ToolButton = ({
  tool,
  onClick,
  
}: ToolButtonProps) => {
  return (
    <button
      className={`${styles.toolButton} ${tool.active ? styles.active: ""}`}
      onClick={()=> onClick(tool.name)} >
      <span>
        <img src={tool.image.src} alt={tool.image.alt} />
      </span>
    </button>
  );
};

export default ToolButton;
