import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';

/**
 * 
 * @param {Object} login (email, password)
 * @returns result of call Api login = token
 */
export const getTokenThunk = async (login) => {
    try {
        console.log("getTokenThunk: Calling API...");
        const response = await axios.post("http://localhost:3001/api/v1/user/login", login);
        const token = response.data.body; // Assurez-vous que la propriété du token est correcte dans la réponse

        console.log("getTokenThunk: Token received:", token);
        return token; // Retournez le token directement, pas une fonction
    } catch (error) {
        console.error("getTokenThunk: Error:", error);
        document.querySelector("#userNotFound").innerHTML = "Username et/ou Password erroné";
        return null; // Retournez null en cas d'erreur
    }
};

export const setToken = (token) => ({
    type: 'SET_TOKEN',
    payload: token,
});

/**
 * Take in localstorage token of the user for headers of request
 * @returns result of call Api profile = infos of user
 */
export const logUserThunk = async () => {
    console.log("logUserThunk: Function called");
    try {
      const tokenLSRaw = localStorage.getItem("token");
      console.log("logUserThunk: Token from localStorage (raw):", tokenLSRaw);
  
      const tokenLS = JSON.parse(tokenLSRaw) || {};
      const token = tokenLS.token;
      console.log("logUserThunk: Token from localStorage (parsed):", token);
  
      if (!token) {
        console.log("logUserThunk: Token is missing or undefined in localStorage");
        return { status: 401, message: "Token is missing or undefined" };
      }
  
      const userProfile = await axios({
        method: 'post',
        url: "http://localhost:3001/api/v1/user/profile",
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.data);
  
      console.log("logUserThunk: UserProfile from API:", userProfile);
  
      return userProfile; // Retournez la réponse de l'API
    } catch (error) {
      console.error("logUserThunk: Error:", error);
      return { status: 500, message: "Internal Server Error" }; // Retournez une réponse d'erreur
    }
  };

export const setUser = (userProfile) => ({
    type: 'SET_USER',
    payload: userProfile,
});

/**
 * 
 * @param {Object} newData new firstname and lastname of user
 * @returns result of call Api update user = the new name of the user
 */
export const editUserThunk = async (newData) => {
    try {
        const tokenLS = JSON.parse(localStorage.getItem("token"));
        console.log("Token from localStorage in editUserThunk:", tokenLS);
        const token = tokenLS.token;

        const updatedUser = await axios({
            method: 'put',
            url: "http://localhost:3001/api/v1/user/profile",
            headers: { Authorization: `Bearer ${token}` },
            data: newData
        });

        // Retournez directement les données mises à jour
        return updatedUser.data.body;
    } catch (error) {
        console.log(error);
        throw error; // Lancez l'erreur pour qu'elle puisse être gérée dans le composant
    }
};

