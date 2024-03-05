import EyeLined from "../../assets/icons/EyeLined";
import EyeWithoutLine from "../../assets/icons/EyeWithoutLine";
import styles from "./styles.module.scss";

const Input = ({
  type,
  placeholder,
  register,
  isPassword,
  handleVisiblePassword,
  visiblePassword,
}) => {
  return (
    <div className={styles.fieldset}>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={
          isPassword ? `${styles.input} ${styles.isPassword}` : styles.input
        }
      />
      {isPassword ? (
        <div
          onClick={() => handleVisiblePassword(!visiblePassword)}
          className={styles.visiblePassword}>
          {visiblePassword ? <EyeWithoutLine /> : <EyeLined />}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
