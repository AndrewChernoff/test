import { Typography, Button } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@mui/material/Alert';
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { authMe, loginThunk, setAuthError } from "../../features/auth/auth";
import { SyntheticEvent, useEffect } from "react";
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
  const {isAuth, error} = useAppSelector(state => state.auth)

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

  const handleClose = (_event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setAuthError(null));
  };


  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
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
          placeholder={"password"}
          className={s.input}
        />
        <br />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={s.signInbtn}
        >
          Confirm
        </Button>
      </form>
    </>
  );
};
