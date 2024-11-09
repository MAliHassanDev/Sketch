import styles from "./ToolStack.module.css";


type ToolStackProps = {
  children: React.ReactNode;
  extraProperties?: React.CSSProperties;
};

const ToolStack = ({extraProperties, children }: ToolStackProps) => {
  return <div
    className={styles.toolStack}
    style={extraProperties}
  >
    {children}
  </div>;
};



export default ToolStack;
