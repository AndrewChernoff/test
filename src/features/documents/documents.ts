import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { AxiosError } from "axios";
import { DocumentType } from "./types";
import { ErrorResponse } from "../common-types";
import { DocFrom } from "../../components/ui/add-document-input/add-document-input";

export interface AuthState {
  items: DocumentType[];
  isLoading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  isLoading: false,
  items: [],
  error: null,
};

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getDocsThunk.fulfilled,
      (state, action: PayloadAction<DocumentType[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      }
    ),
      builder.addCase(getDocsThunk.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(
        getDocsThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || "Some Error!";
        }
      ),
      builder.addCase(
        addDocThunk.fulfilled,
        (state, action: PayloadAction<DocumentType>) => {
          state.items.push(action.payload);
        }
      ),
      builder.addCase(addDocThunk.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(
        addDocThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || "Some Error!";
        }
      ),
       builder.addCase(removeDocThunk.fulfilled, (state, action: PayloadAction<{id: string}>) => {
        state.items = state.items.filter((doc) => doc.id !== action.payload.id);
      }),
      builder.addCase(removeDocThunk.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(removeDocThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || "Some Error!";
      });
  },
});

export const getDocsThunk = createAsyncThunk<
  DocumentType[],
  void,
  { rejectValue: string }
>("documents/getDocs", async (__, { rejectWithValue }) => {
  const res = await api.getDocuments();

  try {
    if (res.data.error_code === 0) {
      return res.data.data;
    } else if (res.data.error_code === 2004) {
      return rejectWithValue(res.data.error_text);
    }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data.error_text);
    }
    return rejectWithValue("Unknown error occurred");
  }
});

export const addDocThunk = createAsyncThunk<
  DocumentType,
  DocFrom,
  { rejectValue: string }
>("documents/createDoc", async (data, { rejectWithValue }) => {
  const res = await api.createDocument(data);

  try {
    if (res.data.error_code === 0) {
      return res.data.data;
    } else if (res.data.error_code === 2004) {
      return rejectWithValue(res.data.error_text);
    }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data.error_text);
    }
    return rejectWithValue("Unknown error occurred");
  }
});

export const removeDocThunk = createAsyncThunk<
  {id: string},
  {id: string},
  { rejectValue: string }
>("documents/removeDoc", async (data, { rejectWithValue }) => {

  try {
    const res = await api.deleteDocument(data.id);

    if (res.data.error_code === 0) {
      return {id: data.id};
    } else if (res.data.error_code === 2004) {
      return rejectWithValue(res.data.error_text);
    }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data.error_text);
    }
    return rejectWithValue("Unknown error occurred");
  }
  return rejectWithValue("Unknown error occurred");

});

export default documentsSlice.reducer;
