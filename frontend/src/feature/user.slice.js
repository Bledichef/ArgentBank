import { createSlice } from "@reduxjs/toolkit";
import { logUserThunk, editUserThunk } from "../utils/services";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    log: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLog: (state, action) => {
      state.log = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logUserThunk.fulfilled, (state, action) => {
        // Extraire les données du payload et les stocker dans la même structure que l'initialState
        state.user = action.payload;
      })
      .addCase(editUserThunk.fulfilled, (state, action) => {
        state.user.body = action.body;
      });
  },
});


// Action créateur utilisant Redux Thunk
export const fetchUserProfile = () => async (dispatch) => {
    try {
        const userProfile = await logUserThunk();
        dispatch(setUser(userProfile));
    } catch (error) {
        console.error(error);
       
    }
};

export const updateUser = (newData) => async (dispatch) => {
    try {
        const updatedUser = await editUserThunk(newData);
        // Dispatch une action avec les données mises à jour si nécessaire
    } catch (error) {
        console.error(error);
       
    }
};

export const { setUser, setLog } = userSlice.actions;
export default userSlice.reducer;
