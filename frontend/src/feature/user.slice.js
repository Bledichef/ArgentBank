import { createSlice } from "@reduxjs/toolkit";
import { logUserThunk, editUserThunk } from "../utils/services"; 

export const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLog: (state, action) => {
            state.log = action.payload;
          },
    },
    extraReducers: {
        //  extraReducers 
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
