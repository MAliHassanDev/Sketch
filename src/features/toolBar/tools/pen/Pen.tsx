import { HandDrawTool } from "@/app/tools";
import ToolButton from "../../components/toolButton/ToolButton";
import ToolStack from "../../components/toolstack/ToolStack";

type PenProps = {
  onToolClick: () => void;
};
const pen = ({ onToolClick }: PenProps) => {
  const pen = getPen();

  return (
    <div>
      <ToolButton tool={pen} onClick={onToolClick} />
      <ToolStack>

      </ToolStack>
    </div>
  );
};


export default pen;


function getPen(): HandDrawTool {
  return {
    name: "pen",
    image: {
      src: "/src/assets/icons/pencil.svg",
      alt: "pen",
    },
    type: "tool",
    category: "handDraw",
    active: true,
    subTools: [
      {
        name: "colorPicker",
        active: true,
        type: "subTool",
        colors: ["black"],
        selectedColor: "black",
        cursor: "default",
        thickness: 5,
      },
    ],
    lineWidth: 5,
    lineCap: "round",
    strokeStyle: "black",
    cursor: "crosshair",
  };
}
