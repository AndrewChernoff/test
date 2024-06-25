import { Typography, Button } from "@material-ui/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { authMe, loginThunk } from "../../features/auth/auth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Input } from "../../components/conrolled/input";
import s from "./signin.module.scss";

interface IFormInputs {
  username: string;
  password: string;
}

export const SigninSchema: ZodType<IFormInputs> = z.object({
  username: z.string().min(5, { message: "Username is too short" }),
  password: z.string().min(8, { message: "Password is too short" }),
});

export const Signin = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.auth.isAuth)

  useEffect(() => {
    dispatch(authMe())
  }, [dispatch, isAuth])

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    dispatch(loginThunk(data))
    reset();
  };


  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5">Sign in</Typography>
        <Input
          error={errors && errors.username?.message}
          control={control}
          name={"username"}
          variant="outlined"
          placeholder={"user name"}
          className={s.input}
        />
        <br />
        <br />

        <Input
          error={errors && errors.password?.message}
          control={control}
          name={"password"}
          type="password"
          variant="outlined"
          placeholder={"user name"}
          className={s.input}
        />
        <br />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "300px", margin: "5px" }}
        >
          save
        </Button>
      </form>
    </>
  );
};
