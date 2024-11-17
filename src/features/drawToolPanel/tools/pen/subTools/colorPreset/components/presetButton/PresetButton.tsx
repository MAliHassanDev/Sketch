import styles from './PresetButton.module.css';

type PresetButtonProps = {
  onClick: () => void;
  bgColor: string;
  penSizePercentage: number
};
const PresetButton = ({onClick, bgColor, penSizePercentage}: PresetButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={styles.presetButton}
    >
      <span
        style={
          {
            backgroundColor: bgColor,
            scale: `${(penSizePercentage/100)}`
          }
        }
        className={styles.presetButtonScale}
      >
      </span>

    </button>
  );
};
export default PresetButton;