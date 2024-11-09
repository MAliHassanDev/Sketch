import { ToolIcon } from "@/app/tools";
import ToolButton from "@/features/drawToolPanel/components/toolButton/ToolButton";
import undo from "/icons/undo.png";

type UndoProps = {
  onClick: () => void;
  isDisabled: boolean;
}
const Undo = ({onClick,isDisabled}:UndoProps) => {
  const undoIcon: ToolIcon = {
    src: undo,
    description: "Undo Icon",
  };

  return (
    <ToolButton
      isActive={false}
      onClick={onClick}
      icon={undoIcon}
      isDisabled={isDisabled}
    />
  );
};

export default Undo;
