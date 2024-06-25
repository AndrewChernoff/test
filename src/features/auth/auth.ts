import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { AxiosError } from "axios";
import { AuthUserType } from "./types";
import { ErrorResponse } from "../common-types";

export interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  isLoading: false,
  isAuth: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authMe: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuth = true;
    }),
      builder.addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(loginThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.error.message || "Some Error!";
        alert(action.error.message)

      });
  },
});

export const loginThunk = createAsyncThunk<
  void,
  AuthUserType,
  { rejectValue: string }
>("auth/authUser", async (data, { rejectWithValue }) => {
  const res = await api.auth(data);

  try {
    if (res.data.error_code === 0) {
      const token = res.data.data.token;
      localStorage.setItem("token", token);
    } if (res.data.error_code === 2004) {
      rejectWithValue(res.data.error_text)
  }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data.error_text);
    }
    return rejectWithValue("Unknown error occurred");
  }
});

export const { authMe } = authSlice.actions;

export default authSlice.reducer;
