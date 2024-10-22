import ToolStack from "@/components/toolStack/ToolStack";
import styles from "./ToolBar.module.css";
import { CanvasTool } from "@/app/tools";
import { getActiveTool } from "@/utils/canvasUtils";

type ToolBarProps = {
  tools: CanvasTool[];
  onToolBtnClick: (name: string) => void;
  onSubToolBtnClick: (name: string) => void;
};

const ToolBar = ({
  tools,
  onToolBtnClick,
  onSubToolBtnClick,
}: ToolBarProps) => {
  
  const activeTool = getActiveTool(tools);

  return (
    <div className={styles.toolBar}>
      <div className={styles.toolBarInnerWrapper}>
        <ToolStack
          tools={tools}
          onToolBtnClick={onToolBtnClick}
        />
        {
          activeTool.subTools && (
            <div
              className={styles.subToolsContainer}
              style={{top: `${tools.indexOf(activeTool) * 40}px`}}
            >
              <ToolStack
                onToolBtnClick={onSubToolBtnClick}
                tools={activeTool.subTools}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ToolBar;
