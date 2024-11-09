import styles from './PresetButton.module.css';
type PresetButtonProps = {
  onClick: () => void;
  bgColor: string;
};
const PresetButton = ({ onClick, bgColor }: PresetButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor }}
      className={styles.presetButton}
    >

    </button>
  );
};
export default PresetButton;