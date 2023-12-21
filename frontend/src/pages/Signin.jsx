import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { setLog, setUser } from "../feature/user.slice";
import { setLoginAsync, fetchExtraLogData } from '../feature/log.slice';
import { logUserThunk } from '../utils/services'; 


const SignIn = () => {
    const dispatch = useDispatch();
    const log = useSelector((state) => state?.log?.token);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = {
        email,
        password
    }

    useEffect(() => {
      console.log("log:", log);
    
      if (log) {
        console.log("Redirecting to /user");
        navigate("/user");
      }
    }, [log, navigate]);
    
  

    const submitLogin = async (e) => {
      e.preventDefault();
    
      try {
        const token = await dispatch(setLoginAsync(login));
     
      //  if (token) {
      //     localStorage.setItem("token", JSON.stringify({ token }));
    
      //     // Dispatch de l'action fetchExtraLogData en tant que fonction
      //     //await dispatch(fetchExtraLogData());
    

      //     const userResponse = await logUserThunk();
    
      //     if (userResponse && userResponse.status === 200) {
      //       if ('body' in userResponse && userResponse.body) {
      //         dispatch(setLog(true));
      //         dispatch(setUser(userResponse.body));
      //       } else {
      //         console.error("Invalid response from logUserThunk:", userResponse);
      //       }
      //     } else {
      //       console.error("Invalid response from logUserThunk:", userResponse);
      //     }
      //   } else {
      //     console.error("Token is undefined or missing in the response");
      //     document.querySelector("#userNotFound").innerHTML = "Authentication failed";
      //   }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    

    // if (log === true) {
    //     return <Navigate to="/user" />
    // }

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
