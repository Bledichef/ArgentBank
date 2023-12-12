import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { setLog } from "../feature/log.slice";
import { setUser } from "../feature/user.slice";
import { getTokenThunk, logUserThunk } from '../utils/services';

const SignIn = () => {
    const dispatch = useDispatch();
    const log = useSelector((state) => state?.log?.log);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = {
        email,
        password
    }

    const submitLogin = async (e) => {
        e.preventDefault();
      
        try {
          const token = await getTokenThunk(login);
      
          if (token) {
            localStorage.setItem("token", JSON.stringify(token));
      

  const userResponse = await logUserThunk(); 

      
            // Adjust the logic based on the actual structure of userResponse
            if (userResponse && userResponse.status === 200) {
                // Check if 'status' property exists in userResponse.body
                if ('body' in userResponse && userResponse.body) {
                  dispatch(setLog(true));
                  dispatch(setUser(userResponse.body));
                } else {
                  console.error("Invalid response from logUserThunk:", userResponse);
                  // Handle the response appropriately, e.g., display an error message
                }
              } else {
                console.error("Invalid response from logUserThunk:", userResponse);
                // Handle the response appropriately, e.g., display an error message
              }
          } else {
            console.error("Token is undefined or missing in the response");
            document.querySelector("#userNotFound").innerHTML = "Authentication failed";
          }
        } catch (error) {
          console.error("An error occurred:", error);
          // Handle errors appropriately (e.g., display an error message to the user)
        }
      };

    if (log === true) {
        return <Navigate to="/user" />
    }

    return (
        <div className='SignIn'>
            <section className='container-signin'>
                <i className="fas fa-user-circle"></i>
                <h1>Sign In</h1>
                <form action="" className='form'>
                    <div className='input'>
                        <label className='label-input' htmlFor="username">Username</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id='username' required />
                    </div>
                    <div className='input'>
                        <label className='label-input' htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id='password' required />
                    </div>
                    <div className='input-remember'>
                        <input type="checkbox" id='remember-me' />
                        <label className='label-remember-me' htmlFor="remember-me">Remember me</label>
                    </div>
                    <p id='userNotFound'></p>

                    <div className='container-button-signin'>
                        <button onClick={submitLogin} className='button-signin' type="submit">Sign In</button>
                    </div>

                </form>
            </section>
        </div>
    );
};

export default SignIn;
