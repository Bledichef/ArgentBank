import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { setLog } from "../feature/log.slice"
import { setUser } from "../feature/user.slice"
import { getToken, logUser } from '../utils/services';

/**
 * 
 * @returns {JSX} - React Page
 */
const SignIn = () => {
    const dispatch = useDispatch();

    // Define state email and password
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Take in log reducer the state of log
    const log = useSelector((state) => state?.log?.log)

    /**
     * Object with email and password (value of input in form : onChange)
     */
    const login = {
        email,
        password
    }

    //Function called onClick in button submit
    const submitLogin = async (e) => {
        console.log("submitLogin components is called");
        e.preventDefault()

        //call function getToken in services and add result in constante token
        const token = await getToken(login)
        console.log("Token before storage:", token);
        //add token in LS
        localStorage.setItem("token", JSON.stringify(token))
        console.log("Token after storage:", JSON.parse(localStorage.getItem("token")));
        //call function logUser in services and add result in constante user
        const user = await logUser(token)

        //if user log ok => change in reducer log the statut : true
        if (user.status === 200) {
            dispatch(setLog(true))
        }

        //add in reducer user => all infos of user (firstname, lastname etc)
        dispatch(setUser(user.body))
    }

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
                        <button onClick={submitLogin} className='button-signin' type="sumbit">Sign In</button>
                    </div>

                </form>
            </section>
        </div>
    );

};

export default SignIn;