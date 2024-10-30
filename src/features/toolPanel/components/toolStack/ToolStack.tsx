import styles from "./ToolStack.module.css";


type ToolStackProps = {
  children: React.ReactNode;
};

const ToolStack = ({ children }: ToolStackProps) => {
  return <div className={styles.toolStack}>{children}</div>;
};



export default ToolStack;
