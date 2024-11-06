import { ToolIcon } from "@/app/tools";
import ToolButton from "@/features/toolPanel/components/toolButton/ToolButton";
import undo from "public/undo.png";

const Undo = () => {
  function handleUndoBtnClick() {}

  const undoIcon: ToolIcon = {
    src: undo,
    description: "Undo Icon",
  };

  return (
    <ToolButton isActive={false} onClick={handleUndoBtnClick} icon={undoIcon} />
  );
};


export default Undo;
