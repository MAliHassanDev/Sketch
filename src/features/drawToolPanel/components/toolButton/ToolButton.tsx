import {  ToolIcon } from "@/app/tools";
import styles from "./ToolButton.module.css";
import React from "react";

interface ToolButtonProps {
  onClick: () => void;
  icon: ToolIcon | undefined;
  isActive: boolean;
  isDisabled?: boolean;
  extraStyles?: React.CSSProperties;
}

function ToolButton({ icon,isDisabled, onClick, isActive,extraStyles }: ToolButtonProps) {
  return (
    <button
      className={`${styles.toolButton} ${isActive && styles.active}`}
      onClick={onClick}
      style={extraStyles}
      disabled={!!isDisabled}
    >
      {icon && (
        <span className={styles.imageContainer}>
          <img src={icon.src} alt={icon.description} />
        </span>
      )}
    </button>
  );
}

export default ToolButton;

