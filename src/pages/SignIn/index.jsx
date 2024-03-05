import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import Logo from "../../assets/icons/Logo";
import GoogleAuthIcon from "../../assets/icons/GoogleAuthIcon";
import GithubAuthIcon from "../../assets/icons/GithubAuthIcon";
import Input from "../../components/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../utils/validationSchema";
import { useStore } from "../../store/store";
import ButtonFullWidth from "../../components/ButtonsFullWidth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [validateMail, setValidateMail] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const postAuth = useStore((store) => store.postAuth);

  const notify = (res) => {
    if (res.detail) toast.error(res.detail);
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
    setValidateMail(false);
    if (data) setValidateMail(true);
    if (data.password) {
      const authUser = postAuth(data);
      const response = await authUser.then((res) => res);
      if (response) {
        notify(response);
      }
    }
  };
  return (
    <div className={styles.signIn}>
      <div className={styles.signIn__logo}>
        <Logo />
      </div>
      <h1 className={styles.signIn__heading}>Log in to your account</h1>
      <div className={styles.signIn__actions}>
        <button>
          <GoogleAuthIcon /> Google
        </button>
        <button>
          <GithubAuthIcon /> Github
        </button>
      </div>
      <div className={styles.signIn__divider}>
        <hr />
        <span>or</span>
      </div>
      <form
        action=""
        className={`${styles.signIn__form} ${styles.form}`}
        onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={styles.form__fieldset}>
          <Input
            type={"email"}
            placeholder={"Work email"}
            register={register("email", { required: true })}
          />
          {errors.email && <span>{errors?.email?.message}</span>}
        </fieldset>
        {validateMail && (
          <>
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
            <NavLink to={"/reset-password"}>Forgot your password?</NavLink>
          </>
        )}
        <ButtonFullWidth text="Log in to Qencode" type="submit" accept={true} />
        <ToastContainer />
      </form>
      <div className={styles.signIn__registration}>
        Is your company new to Qencode? <NavLink to={"#"}>Sign up</NavLink>
      </div>
    </div>
  );
};

export default SignIn;
