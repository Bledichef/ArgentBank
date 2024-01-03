import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchExtraLogData = createAsyncThunk(
  "log/fetchExtraLogData",
  async (_, { getState, dispatch }) => {
    try {
      const login = getState().log.login;
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        login
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching extra log data:", error.message);
      throw error;
    }
  }
);

export const setLoginAsync = createAsyncThunk(
  'log/setLoginAsync',
  async (payload, { dispatch }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', payload);
      const { token, ...loginData } = response.data.body;

      // Dispatch de l'action setLogin pour mettre à jour le store
      dispatch(setLogin({ token, ...loginData }));


      return token;
    } catch (error) {
      console.error('Error setting login:', error.message);
      throw error;
    }
  }
);


export const logSlice = createSlice({
  name: 'log',
  initialState: {
    log: false,
    extraLogData: null,
    login: null,
    token: null,
  },
  reducers: {
    setLog: (state, action) => {
      state.log = action.payload;
    },
    setLogin: (state, action) => {
      const { token, ...loginData } = action.payload;
      state.login = loginData;
      state.token = token;
      state.log = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExtraLogData.fulfilled, (state, action) => {
        state.extraLogData = action.payload;
      })
      .addCase(fetchExtraLogData.rejected, (state, action) => {
        console.error('Error fetching extra log data:', action.error.message);
      })
      .addCase(setLoginAsync.fulfilled, (state, action) => {
        
        // Mise à jour du store après une action asynchrone réussie
        // Pour gérer les actions rejetées si nécessaire
      });
  },
});

export const { setLog, setLogin } = logSlice.actions;
export const selectExtraLogData = (state) => state.log.extraLogData;
export const selectToken = (state) => state.log.token;
export default logSlice.reducer;