import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const setLoginAsync = createAsyncThunk(
  'log/setLoginAsync',
  async (payload, thunkApi) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', payload);
      const { token } = response.data.body;
      return token;
    } catch (error) {
  //    console.log (thunkApi.rejectWithValue({ error: error.message }))
  //    console.error('Error setting login:', error.message);
      throw error;
    }
  }
);


export const logSlice = createSlice({
  name: 'log',
  initialState: {
    log: false,
    token: null,
  },
  reducers: {
    setLog: (state, action) => {
      state.log = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(setLoginAsync.fulfilled, (state, action) => {
        console.log('Extra log data:', action.payload);
        state.token = action.payload;
        state.log = true;
      })
      .addCase(setLoginAsync.rejected, (state, action) => {
        console.error('Error fetching extra log data:', action.error.message);
      })
  },
});

export const { setLog, setLogin } = logSlice.actions;
export const selectExtraLogData = (state) => state.log.extraLogData;
export const selectToken = (state) => state.log.token;
export default logSlice.reducer;