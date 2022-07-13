import entryService from './entryService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  entries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getEntries = createAsyncThunk(
  'entries/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await entryService.fetchEntries(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addEntry = createAsyncThunk(
  'entries/createEntry',
  async (entryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await entryService.createEntry(entryData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(getEntries.pending, state => {
        state.isLoading = true;
      })
      .addCase(getEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.entries = action.payload;
      })
      .addCase(getEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(addEntry.pending, state => {
        state.isLoading = true;
      })
      .addCase(addEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.entries.push(action.payload);
      })
      .addCase(addEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = entrySlice.actions;
export default entrySlice.reducer;
