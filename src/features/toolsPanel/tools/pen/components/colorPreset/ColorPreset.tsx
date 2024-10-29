import { IColorPreset } from "@/app/tools";

type PresetButtonProps = {
  onClick: () => void;
  bgColor: string;
};
const PresetButton = ({ onClick, bgColor }: PresetButtonProps) => {
  return (
    <button onClick={onClick} style={{ backgroundColor: bgColor }}></button>
  );
};

// Color palette ----> child component

type ColorPaletteProps = {
  colors: string[];
  selectedColor: string;
  onClick: (selectedColor: string) => void;
};
const ColorPalette = ({
  colors,
  selectedColor,
  onClick,
}: ColorPaletteProps) => {
  const colorList = colors.map((color) => {
    return (
      <li key={color}>
        <button
          style={{ backgroundColor: color }}
          onClick={() => onClick(color)}
        >
          {color === selectedColor && "&#10003;"}
        </button>
      </li>
    );
  });

  return (
    <div>
      <ul>{colorList} </ul>
    </div>
  );
};

// Color preset ----> MAIN Component

type ColorPresetProps = {
  colorPreset: IColorPreset;
  onPresetChange: (preset: IColorPreset) => void;
};
const ColorPreset = ({ onPresetChange, colorPreset }: ColorPresetProps) => {
  function handleToolBtnClick() {
    onPresetChange({ ...colorPreset, ...{ active: !colorPreset.active } });
  }

  function handleSelectedColorChange(color: string) {
    onPresetChange({
      ...colorPreset,
      ...{ colorPreset: { selectedColor: color } },
    });
  }

  return (
    <div>
      <PresetButton
        bgColor={colorPreset.colorPalette.selectedColor}
        onClick={handleToolBtnClick}
      />
      {colorPreset.active && (
        <ColorPalette
          colors={colorPreset.colorPalette.colors}
          selectedColor={colorPreset.colorPalette.selectedColor}
          onClick={handleSelectedColorChange}
        />
      )}
    </div>
  );
};

export default ColorPreset;
