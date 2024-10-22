import styles from "./ToolButton.module.css";
import { CanvasTool, subTool, Tool } from "@/app/tools";

interface ToolButtonProps {
  onClick: (name: string) => void;
  tool: CanvasTool | subTool;
}

const ToolButton = ({ tool, onClick }: ToolButtonProps) => {
  return (
    <button
      className={`${styles[tool.type + "Button"]} ${
        tool.active && styles.active
      }`}
      onClick={() => onClick(tool.name)}
    >
      {tool.image ? (
        <span className={styles.imageContainer}>
          <img src={tool.image.src} alt={tool.image.alt} />
        </span>
      ) : (
        <span
          className={`${styles[tool.name]} ${tool.active && styles.active}`}
          style={{
            backgroundColor: tool.type === "subTool" &&
            tool.name === "colorPicker"
            ? tool.selectedColor
              : "black",
          }}
        ></span>
      )}
    </button>
  );
};

export default ToolButton;
