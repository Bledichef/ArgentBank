import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logUserThunk, editUserThunk } from "../utils/services";
import { setUser } from '../feature/user.slice';
import { setExtraLogData, fetchExtraLogData, selectExtraLogData, selectToken } from '../feature/log.slice';
import { useNavigate } from 'react-router-dom';
import Account from '../components/Account';
import dataAccount from '../data';

const UserProfileComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const extraLogData = useSelector(selectExtraLogData);
  const isAuthenticated = useSelector((state) => state?.log?.log);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  // State pour stocker les données éditées localement
  const [editedFirstName, setEditedFirstName] = useState(user?.firstName || "");
  const [editedLastName, setEditedLastName] = useState(user?.lastName || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
        if (isAuthenticated === false) {
          navigate('/sign-in');
        } else {
          // Si l'utilisateur est authentifié, récupérez les données
          const result = await dispatch(logUserThunk());
          dispatch(setUser(result.payload));
          dispatch(fetchExtraLogData(result.payload));
          // Mettre à jour les données éditées localement
          setEditedFirstName(result.payload?.firstName || "");
          setEditedLastName(result.payload?.lastName || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [dispatch, isAuthenticated, navigate]);

  // Take firstname and lastname in reducer user
  const firstname = useSelector((state) => state?.user?.user?.firstName)
  const lastname = useSelector((state) => state?.user?.user?.lastName)

  /**
   * Define state firstName and lastName -> default firstname and lastname in reducer user
   */
  const [firstName, setOriginFirstname] = useState(firstname)
  const [lastName, setOriginLastname] = useState(lastname)

  /**
   * Define state show : true
   */
  const [show, setShow] = useState(true)
  const showEditUser = () => {
      show === true ? setShow(false) : setShow(true)
  }

  /**
   * Object with new firstName and Lastname (value of input edit user)
   */
  const newData = {
      firstName,
      lastName
  }

  const submitEdit = async (e) => {
      try {
          // call function in services with params new object
          const newUser = await editUserThunk(newData);
  
          // add in reducer user the new infos (firstName and lastName) of the user
          dispatch(setUser(newUser));
      } catch (error) {
          console.error("An error occurred in submitEdit:", error);
          // Handle errors appropriately, e.g., display an error message to the user
      }
  };

  return (
      <div className='User'>
          <div className='header'>
              <h1>Welcome back</h1>
              <div className={show ? 'no-edit' : 'edit'}>
                  <h2>{firstname + " " + lastname + "!"}</h2>
                  <button onClick={showEditUser} className='button'>Edit Name</button>
              </div>
              <div className={show ? 'edit' : 'no-edit'}>
                  <div className='container-input'>
                      <input onChange={(e) => setOriginFirstname(e.target.value)} className='edit-firstname' type="text" placeholder={firstname} />
                      <input onChange={(e) => setOriginLastname(e.target.value)} className='edit-lastname' type="text" placeholder={lastname} />
                  </div>
                  <div className='container-button'>
                      <button onClick={() => [submitEdit(), showEditUser()]} className='button'>Save</button>
                      <button onClick={showEditUser} className='button'>Cancel</button>
                  </div>
              </div>
          </div>
          {
              dataAccount?.map((account, index) => (
                  <Account key={index} accountTitle={account['account-title']} accountAmount={account['account-amount']} accountDescription={account['account-description']} />
              ))
          }

      </div>
  );
};


export default UserProfileComponent;
