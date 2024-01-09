import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { logUserThunk, setLog, setUser } from "../feature/user.slice";
import { setLoginAsync} from '../feature/log.slice';




const SignIn = () => {
    const dispatch = useDispatch();
    const log = useSelector((state) => state?.log?.log);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const login = {
        email,
        password
    }
console.log("log:", log);
    // useEffect(() => {
    //   console.log("log:", log);
  
    //   if (log) {
    //     console.log("Redirecting to /user");
  
    //     // Utilisez navigate en dehors de toute fonction asynchrone
    //   // return redirect("/user");
    //   // return <Redirect to="/user" />
    //   return <Navigate to="/user" />
    //   }
    // }, [log, navigate]);
    
  

    const submitLogin = async (e) => {
      e.preventDefault();
    
      try {
        const token = await dispatch(setLoginAsync(login));
    
        if (token) {
          const userResponse = await dispatch(logUserThunk());
    
          
          if (userResponse && userResponse.payload && userResponse.payload.status === 200) {
            if ('body' in userResponse.payload ) {
//              dispatch(setLog(true));
              dispatch((userResponse.payload));
              
            } else {
              console.error("Invalid response from logUserThunk:", userResponse.payload);
            }
          } else {
            console.error("Invalid response from logUserThunk:", userResponse.payload);
          }
        } else {
          console.error("Token is undefined or missing in the response");
        //  document.querySelector("#userNotFound").innerHTML = "Authentication failed";
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    

    if (log === true) {
      console.log("Log = true");
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
                    <p id='userNotFound'className='userNotFound'></p>

                    <div className='container-button-signin'>
                        <button onClick={submitLogin} className='button-signin' type="submit">Sign In</button>
                    </div>

                </form>
            </section>
        </div>
    );
};

export default SignIn;
