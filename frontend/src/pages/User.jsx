import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logUserThunk, editUserThunk } from "../utils/services";
import { setUser } from '../feature/user.slice';
import { useNavigate } from 'react-router-dom';
import Account from '../components/Account';
import dataAccount from '../data';

const UserProfileComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const isAuthenticated = useSelector((state) => state?.log?.log);

  const navigate = useNavigate();

  // Take firstname and lastname in reducer user
  const firstname = useSelector((state) => state?.user?.user?.body?.firstName);
  const lastname = useSelector((state) => state?.user?.user?.body?.lastName);

  // State pour stocker les données éditées localement
  const [editedFirstName, setEditedFirstName] = useState(user?.firstName || "");
  const [editedLastName, setEditedLastName] = useState(user?.lastName || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated === false) {
          navigate('/sign-in');
        } else {
          const result = await dispatch(logUserThunk());
          dispatch(setUser(result.payload));
          setEditedFirstName(result.payload?.body?.firstName || "");
          setEditedLastName(result.payload?.body?.lastName || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [dispatch, isAuthenticated, navigate]);

  /**
   * Define state firstName and lastName -> default firstname and lastname in reducer user
   */
  const [firstName, setOriginFirstname] = useState(firstname);
  const [lastName, setOriginLastname] = useState(lastname);

  /**
   * Define state show : true
   */
  const [show, setShow] = useState(true);
  const showEditUser = () => {
    setShow(!show);
  };

  /**
   * Object with new firstName and Lastname (value of input edit user)
   */
  const newData = {
    firstName,
    lastName
  };
console.log("newData:", newData);
const submitEdit = async () => {
  try {
    console.log("submitEdit: Calling editUserThunk");

    const newUser = await dispatch(editUserThunk(newData));

    console.log("submitEdit: editUserThunk completed");
    console.log("submitEdit: newUser", newUser);

    if (newUser) {
      const serializedUser = JSON.parse(JSON.stringify(newUser));
      console.log("submitEdit: serializedUser", serializedUser);

      // Mettez à jour le store avec les nouvelles données éditées
      dispatch(setUser(serializedUser));

      // Relancez l'action asynchrone pour récupérer les données du profil
      const updatedProfile = await dispatch(logUserThunk());
      dispatch(setUser(updatedProfile.payload));
    } else {
      console.error("submitEdit: editUserThunk returned undefined user");
    }
  } catch (error) {
    console.error("submitEdit: An error occurred in editUserThunk:", error);
  }
};
  


  return (
    <div className='User'>
      {user && user.body && (
        <div className='header'>
          <h1>Welcome back</h1>
          <div className={show ? 'no-edit' : 'edit'}>
            {user.body.firstName && user.body.lastName && (
              <h2>{user.body.firstName + " " + user.body.lastName + "!"}</h2>
            )}
            <button onClick={showEditUser} className='button'>Edit Name</button>
          </div>
          <div className={show ? 'edit' : 'no-edit'}>
            <div className='container-input'>
              <input onChange={(e) => setOriginFirstname(e.target.value)} className='edit-firstname' type="text" placeholder={user.body.firstName || ""} />
              <input onChange={(e) => setOriginLastname(e.target.value)} className='edit-lastname' type="text" placeholder={user.body.lastName || ""} />
            </div>
            <div className='container-button'>
              <button onClick={() => [submitEdit(), showEditUser()]} className='button'>Save</button>
              <button onClick={showEditUser} className='button'>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {dataAccount?.map((account, index) => (
        <Account key={index} accountTitle={account['account-title']} accountAmount={account['account-amount']} accountDescription={account['account-description']} />
      ))}
    </div>
  );
};

export default UserProfileComponent;
