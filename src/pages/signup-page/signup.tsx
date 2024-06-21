import { Typography, TextField, Button } from "@material-ui/core";
import { SubmitHandler, Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { DevTool } from "@hookform/devtools";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { authMe, loginThunk } from "../../features/auth/auth";
import s from "./signup.module.scss";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

interface IFormInputs {
  username: string;
  password: string;
}

export const SignupSchema: ZodType<IFormInputs> = z.object({
  username: z.string().min(5, { message: "Username is too short" }),
  password: z.string().min(8, { message: "Password is too short" }),
});

export const Signup = () => {
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
    resolver: zodResolver(SignupSchema),
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
        <Typography variant="h5">Sign up</Typography>
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              style={{ width: "300px", margin: "5px" }}
              type="text"
              label="username"
              variant="outlined"
              {...field}
            />
          )}
        />
        {errors && <div>{errors.username?.message}</div>}
        <br />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              style={{ width: "300px", margin: "5px" }}
              type="password"
              label="password"
              variant="outlined"
              {...field}
            />
          )}
        />
        {errors && <div>{errors.password?.message}</div>}
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
      <DevTool control={control} />
    </>
  );
};
