import { ToolIcon } from "@/app/tools";
import ToolButton from "@/features/drawToolPanel/components/toolButton/ToolButton";
import redo from "/icons/redo.png";

type RedoProps = {
  onClick: () => void;
  isDisabled: boolean;
};

const Redo = ({ onClick, isDisabled }: RedoProps) => {
  const redoIcon: ToolIcon = {
    src: redo,
    description: "redo Icon",
  };

  return (
    <ToolButton
      isActive={false}
      isDisabled={isDisabled}
      onClick={onClick}
      icon={redoIcon}
    />
  );
};

export default Redo;
