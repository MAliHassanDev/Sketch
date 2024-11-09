import { IPenSizeSlider } from "@/app/tools";
import styles from "./PenSizeSlider.module.css";

type PenSizeSliderProps = {
  onSliderChange: (updatedSlider: IPenSizeSlider) => void;
  penSizeSlider: IPenSizeSlider
};

const PenSizeSlider = ({ onSliderChange,penSizeSlider }: PenSizeSliderProps) => {
  const {currPenSize,maxPenSize } = penSizeSlider;
  const progress = (currPenSize / maxPenSize) * 100;
  
  
  function handleChange(e: React.ChangeEvent) {
    const target = e.target as HTMLInputElement;
    const value = parseInt(target.value);
    onSliderChange({ ...penSizeSlider, currPenSize: value });
  }

  

  return (
    <div className={styles.sliderContainer}>
      <input
        type='range'
        name='penSizeSlider'
        id='penSizeSlider'
        min={1}
        max={maxPenSize}
        defaultValue={currPenSize}
        onChange={handleChange}
        className={styles.slider}
        style={{background: `linear-gradient(to right,#49494b ${progress}%, #ccc ${progress}%)`}}
      />
      <label htmlFor='penSizeSlider' className={styles.sliderLabel}>Thickness</label>
    </div>
  );
};

export default PenSizeSlider;
