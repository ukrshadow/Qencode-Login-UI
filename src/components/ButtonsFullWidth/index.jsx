import styles from "./styles.module.scss";
const ButtonFullWidth = ({ type, text, accept = false }) => {
  return (
    <button
      type={type}
      className={
        accept
          ? `${styles.buttons} ${styles["buttons--accept"]}`
          : styles.buttons
      }
      onClick={type === "cancel" ? () => window.history.back() : null}>
      {text}
    </button>
  );
};

export default ButtonFullWidth;
