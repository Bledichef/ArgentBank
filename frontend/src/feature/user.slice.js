import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectToken } from '../feature/log.slice';

export const userSlice = createSlice({
  name: "user",
  initialState: {

        email: "",
        firstName: "",
        lastName: "",
        password: "",
        role: "",
        username: "",

   
  },
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(logUserThunk.fulfilled, (state, action) => {
        console.log('action.payload:', action.payload);
        // Extraire les données du payload et les stocker dans la même structure que l'initialState
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      })
      .addCase(editUserThunk.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      });
  },
});

export const logUserThunk = createAsyncThunk('log/logUserThunk', async (_, { getState }) => {
  console.log("logUserThunk: Function called");
  try {
    const state = getState();
    const token = selectToken(state);

    if (!token) {
      document.querySelector("#userNotFound").innerHTML = "Authentication failed";
      console.log("logUserThunk: Token is missing or undefined in the Redux Store");
      return { status: 401, message: "Token is missing or undefined" };
    }

    const userProfile = await axios.post("http://localhost:3001/api/v1/user/profile", null, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("logUserThunk: UserProfile from API:", userProfile.data.body);

    return userProfile.data.body; 
  } catch (error) {
    console.error("logUserThunk: Error:", error);
    
    return { status: 500, message: "Internal Server Error" };
  }
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


/**
 * 
 * @param {Object} newData new firstname and lastname of user
 * @returns result of call Api update user = the new name of the user
 */

export const editUserThunk = createAsyncThunk(
  'user/editUserThunk',
  async (newData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = selectToken(state);

      if (!token) {
        return rejectWithValue({ status: 401, message: "Token is missing or undefined" });
      }

      const updatedUserData = await axios({
        method: 'put',
        url: "http://localhost:3001/api/v1/user/profile",
        headers: { Authorization: `Bearer ${token}` },
        data: newData
      });

      const updatedUser = updatedUserData.data.body;

      // Assurez-vous que updatedUser est un objet sérialisable
      if (typeof updatedUser !== 'object' || updatedUser === null) {
        throw new Error("Invalid user data returned from the API");
      }

      return { body: updatedUser };

    } catch (error) {
      console.error("editUserThunk: Error:", error);
      throw error;
    }
  }
);


export const { setUser, setLog } = userSlice.actions;
export default userSlice.reducer;
