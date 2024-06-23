import { PayloadAction, createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { AxiosError } from "axios";
import { DocumentType } from "./types";
import { ErrorResponse } from "../common-types";
import { DocForm } from "../../common/types";

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
     /*  builder.addCase(
        getDocsThunk.rejected,
        (state, action: any) => {
          state.isLoading = false;
          state.error = action.error.message || "Some Error!";
        }
      ), */
      builder.addCase(
        addDocThunk.fulfilled,
        (state, action: PayloadAction<DocumentType>) => {
          state.isLoading = false;
          state.items.push(action.payload);
        }
      ),
      builder.addCase(addDocThunk.pending, (state) => {
        state.isLoading = true;
      }),
      /* builder.addCase(addDocThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.error.message || "Some Error!";
      }), */
      builder.addCase(
        removeDocThunk.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.isLoading = false;
          state.items = state.items.filter(
            (doc) => doc.id !== action.payload.id
          );
        }
      ),
      /* builder.addCase(
        removeDocThunk.rejected,
        (state, action: any) => {
          state.isLoading = false;
          state.error = action.error.message || "Some Error!";
        }
      ), */
      builder.addCase(
        updateDocThunk.fulfilled,
        (state, action: PayloadAction<DocumentType>) => {
          state.isLoading = false;
          state.items = state.items.map((el) => {
            if (el.id === action.payload.id) {
              return { ...el, ...action.payload };
            } else {
              return el;
            }
          });
        }
      ),
      /* builder.addCase(
        updateDocThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || "Some Error!";
        }
      ), */
      builder.addMatcher(isAnyOf(getDocsThunk.pending, removeDocThunk.pending, updateDocThunk.pending), state => {
        state.isLoading = true 
      }),
      builder.addMatcher(isAnyOf(getDocsThunk.rejected, removeDocThunk.rejected, updateDocThunk.rejected), (state, action: any) => {
        state.isLoading = false;
        state.error = action.error.message || "Some Error!";
        alert(action.error.message)
      })
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
  DocForm,
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
  { id: string },
  { id: string },
  { rejectValue: string }
>("documents/removeDoc", async (data, { rejectWithValue }) => {
  try {
    const res = await api.deleteDocument(data.id);

    if (res.data.error_code === 0) {
      return { id: data.id };
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

export const updateDocThunk = createAsyncThunk<
  DocumentType,
  DocumentType,
  { rejectValue: string }
>("documents/updateDoc", async (data, { rejectWithValue }) => {
  try {
    
    const res = await api.updateDocument(data);

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
  return rejectWithValue("Unknown error occurred");
});

export default documentsSlice.reducer;
