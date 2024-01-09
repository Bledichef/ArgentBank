import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectToken } from '../feature/log.slice';


// axios.post('http://localhost:3001/api/v1/user/login', payload)

// /**
//  * 
//  * @param {Object} login (email, password)
//  * @returns result of call Api login = token
//  */
// export const getTokenThunk = async (login) => {
//   try {
//       console.log("getTokenThunk: Calling API...");
//       const response = await axios.post("http://localhost:3001/api/v1/user/login", login);
//       const token = response.data.body;
//       console.log("getTokenThunk: Token received:", token);
//       return token;
//   } catch (error) {
//       console.error("getTokenThunk: Error:", error);
//       // Rejeter la promesse avec l'erreur
//       return Promise.reject(error);
//   }
// };

// export const setToken = (token) => ({
//     type: 'SET_TOKEN',
//     payload: token,
// });

/**
 * Take in localstorage token of the user for headers of request
 * @returns result of call Api profile = infos of user
 */
// export const logUserThunk = createAsyncThunk('log/logUserThunk', async (_, { getState, dispatch }) => {
//   console.log("logUserThunk: Function called");
//   try {
//     const state = getState();
//     const token = selectToken(state);

//     if (!token) {
//       document.querySelector("#userNotFound").innerHTML = "Authentication failed";
//       console.log("logUserThunk: Token is missing or undefined in the Redux Store");
//       return { status: 401, message: "Token is missing or undefined" };
//     }

//     const userProfile = await axios.post("http://localhost:3001/api/v1/user/profile", null, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     console.log("logUserThunk: UserProfile from API:", userProfile.data);

//     return userProfile.data; // Retournez la réponse de l'API
//   } catch (error) {
//     console.error("logUserThunk: Error:", error);
    
//     return { status: 500, message: "Internal Server Error" }; // Retournez une réponse d'erreur
//   }
// });


  


// /**
//  * 
//  * @param {Object} newData new firstname and lastname of user
//  * @returns result of call Api update user = the new name of the user
//  */

// export const editUserThunk = createAsyncThunk(
//   'user/editUserThunk',
//   async (newData, { getState, rejectWithValue }) => {
//     try {
//       const state = getState();
//       const token = selectToken(state);

//       if (!token) {
//         return rejectWithValue({ status: 401, message: "Token is missing or undefined" });
//       }

//       const updatedUserData = await axios({
//         method: 'put',
//         url: "http://localhost:3001/api/v1/user/profile",
//         headers: { Authorization: `Bearer ${token}` },
//         data: newData
//       });

//       const updatedUser = updatedUserData.data.body;

//       // Assurez-vous que updatedUser est un objet sérialisable
//       if (typeof updatedUser !== 'object' || updatedUser === null) {
//         throw new Error("Invalid user data returned from the API");
//       }

//       return { body: updatedUser };

//     } catch (error) {
//       console.error("editUserThunk: Error:", error);
//       throw error;
//     }
//   }
// );





