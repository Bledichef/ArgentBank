
import { createSlice } from "@reduxjs/toolkit";
import { getTokenThunk } from "../utils/services"; 

export const logSlice = createSlice({
    name: "log",
    initialState: {
        log: false
    },
    reducers: {
        setLog: (state, action) => {
            state.log = action.payload
        }
    }
});

// Action créateur utilisant Redux Thunk
export const login = (loginData) => async (dispatch) => {
    try {
        const token = await getTokenThunk(loginData);
        dispatch(setLog(true));
        console.log("Token before storage:", token);
        localStorage.setItem("token", JSON.stringify(token));
        console.log("Token after storage:", JSON.parse(localStorage.getItem("token")));
    } catch (error) {
        console.error(error);
       
    }
};

export const { setLog } = logSlice.actions;
export default logSlice.reducer;
