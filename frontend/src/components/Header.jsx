import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from "../assets/argentBankLogo.png"
import { setLog } from "../feature/log.slice"
import { setUser } from '../feature/user.slice';

/**
 * component Header called on router for all pages
 * @returns {JSX} - React component
 */
const Header = () => {
    // Take on log reducer the state of log (true or false)
    const log = useSelector((state) => state?.log?.log)

    // Take on user reducer the firstName of user
    const firstname = useSelector((state) => state?.user?.user?.firstName)

    const dispatch = useDispatch();

    /**
     * function for logout the user on click in icon
     * update state of log in reducer = false
     * update state of user in reducer for delete the data
     */
    const logout = () => {
        dispatch(setLog(false))
        dispatch(setUser({}))
        localStorage.clear()

    }
    return (
        <div className='Header'>
            <NavLink to="/" >
                <img className='logo' src={logo} alt="argent bank logo" />
            </NavLink>

            {
                log ? <div className='signout'>
                    <i className="fas fa-user-circle"></i>
                    <span>{firstname}</span>
                    <NavLink to="/" className='container-icon-signout' onClick={logout} >
                        <i className='fa fa-sign-out'></i>
                        <span>Sign Out</span>
                    </NavLink>
                </div> :
                    <div className='container-icon-signin'>
                        <NavLink to="/sign-in" className="link">
                            <i className="fas fa-user-circle"></i>
                            <span className='signin'>Sign In</span>
                        </NavLink>
                    </div>
            }
        </div >
    );
};

export default Header;