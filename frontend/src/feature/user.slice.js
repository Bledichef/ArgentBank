import { createSlice } from "@reduxjs/toolkit"

// Initialization of reducer user
export const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})


export const { setUser } = userSlice.actions
export default userSlice.reducer;