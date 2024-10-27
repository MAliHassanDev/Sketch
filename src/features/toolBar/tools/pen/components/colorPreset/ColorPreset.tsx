import { subTool } from "@/features/interfaces/tools";

type PresetButtonProps = {
  onClick: (tool: subTool) => void;
  tool: subTool;
};
const PresetButton = ({ onClick, tool }: PresetButtonProps) => {
  return <button onClick={() => onClick(tool)}></button>;
};



// Color palette ----> child component

type ColorPaletteProps = {
  colors: string[]
  selectedColor: string,
  onClick: (selectedColor: string) => void;
}
const ColorPalette = ({ colors, selectedColor, onClick }: ColorPaletteProps) => {



  return (
    <div>
      
    </div>
  );
};





// Color preset ----> MAIN Component

type ColorPresetProps = {
  onClick: (tool:subTool) => void
}
const ColorPreset = ({onClick}:ColorPresetProps) => {
  const colorPreset = getColorPreset();

  return (
    <div>
      <PresetButton tool={colorPreset} onClick={onClick} />
    </div>
  );
};


export default ColorPreset;



function getColorPreset(): subTool {
  return {
    name: "colorPreset",
    type: "subTool",
    active: true,
    cursor: "default",
    colors: ["red", "blue", "green", "violet"],
    selectedColor: "black",
    thickness: 0.1,
  };
}
