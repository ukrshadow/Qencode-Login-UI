import { useForm } from "react-hook-form";
import Logo from "../../assets/icons/Logo";
import Input from "../../components/input";
import styles from "./styles.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonFullWidth from "../../components/ButtonsFullWidth";
import { useState } from "react";
import { useStore } from "../../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewPassword = () => {
  const setNewPassword = useStore((store) => store.setNewPassword);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        password: yup.string().min(5),
        confirm_password: yup.string().min(5),
      })
    ),
  });
  const [visiblePassword, setVisiblePassword] = useState(false);

  const notify = (res) => {
    if (res.error && Array.isArray(res.detail)) {
      toast.error(res.detail[0].error);
    } else if (res.error && !Array.isArray(res.detail)) {
      toast.error(res.detail);
    } else toast.success("Success");
  };

  const onSubmit = async (data) => {
    if (data.password === data.confirm_password) {
      const NewPassword = setNewPassword({
        token: "asdsadasdasdas",
        secret: "asdasdasdasas",
        password: data.password,
        password_confirm: data.confirm_password,
      });
      const response = await NewPassword.then((res) => res);
      if (response) {
        notify(response);
      }
    }
  };

  return (
    <div className={styles["new-password"]}>
      <div className={styles["new-password__logo"]}>
        <Logo />
      </div>
      <h1 className={styles["new-password__heading"]}>Create new Password?</h1>

      <form
        action=""
        className={`${styles["new-password__form"]} ${styles.form}`}
        onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={`${styles.form__fieldset}`}>
          <Input
            type={visiblePassword ? "text" : "password"}
            placeholder={"Password"}
            register={register("password", { required: true })}
            isPassword={true}
            handleVisiblePassword={setVisiblePassword}
            visiblePassword={visiblePassword}
          />
          {errors.password && <span>{errors?.password?.message}</span>}
        </fieldset>
        <fieldset className={`${styles.form__fieldset}`}>
          <Input
            type={visiblePassword ? "text" : "password"}
            placeholder={"Password"}
            register={register("confirm_password", { required: true })}
            isPassword={true}
            handleVisiblePassword={setVisiblePassword}
            visiblePassword={visiblePassword}
          />
          {errors.confirm_password && (
            <span>{errors?.confirm_password?.message}</span>
          )}
        </fieldset>

        <ButtonFullWidth text="Reset Password" type="submit" accept={true} />
        <ToastContainer />
      </form>
    </div>
  );
};

export default NewPassword;
