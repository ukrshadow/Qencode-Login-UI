import styles from "./styles.module.scss";
import Logo from "../../assets/icons/Logo";
import Input from "../../components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../utils/validationSchema";
import { useForm } from "react-hook-form";
import ButtonFullWidth from "../../components/ButtonsFullWidth";
import { useStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const resetPassword = useStore((store) => store.resetPassword);
  const navigate = useNavigate();

  const notify = (res) => {
    if (res.error) toast.error(res.detail);
    else toast.success("Success");
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    if (data.email) {
      const resetPswd = resetPassword(data);
      const response = await resetPswd.then((res) => res);
      if (response) {
        notify(response);
        if (!response.error) navigate("/new-password");
      }
    }
  };

  return (
    <div className={styles.reset}>
      <div className={styles.reset__logo}>
        <Logo />
      </div>
      <h1 className={styles.reset__heading}>Forgot Password?</h1>

      <form
        action=""
        className={`${styles.reset__form} ${styles.form}`}
        onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.form__fieldset}>
          <Input
            type={"email"}
            placeholder={"Enter your email"}
            register={register("email", { required: true })}
          />
          {errors.email && <span>{errors?.email?.message}</span>}
        </fieldset>
        <ButtonFullWidth text="Send" type="submit" accept={true} />
        <ButtonFullWidth text="Cancel" type="cancel" />
        <ToastContainer />
      </form>
    </div>
  );
};

export default ResetPassword;
