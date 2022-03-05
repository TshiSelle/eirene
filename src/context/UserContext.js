import React, { useReducer, useMemo, useCallback, useContext, useEffect } from 'react';
// import axios from 'axios';
import { useAuthenticator } from './AuthContext';
import { GetUserInfo } from '../api/ApiClient';

const UserContext = React.createContext();
const KEY = 'user_data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-user': return { ...state, user: action.userInfo };
    case 'clear-user': return { ...state, user: null };
    default: throw new Error(`Unhandled action ${action.type}!`);
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null
  });
  const { user } = state;
  const { authToken, removeAuthToken, loggedIn } = useAuthenticator();

  const updateUser = useCallback((userInfo) => {
    if (!loggedIn) return;

    try {
      if (userInfo == null) {
        localStorage.removeItem(KEY);
        dispatch({ type: 'clear-user' });
      } else {
        localStorage.setItem(KEY, JSON.stringify({ userInfo }));
        dispatch({ type: 'set-user', userInfo });
      }
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }, [loggedIn]);

  useEffect((event) => {
    if (event && event.preventDefault) event.preventDefault();

    if (!loggedIn) return;
    GetUserInfo(authToken)
      .then((response) => {
        if (response.data.success) {
          updateUser(response.data.dbUser);
        }
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }, [loggedIn, updateUser, authToken]);

  useEffect((event) => {
    if (event && event.preventDefault) event.preventDefault();
    if(!loggedIn) return;
    const getUser = async () => {
      try {
        const userInfoEncoded = localStorage.getItem(KEY);
        if (userInfoEncoded == null) return;
        const userInform = JSON.parse(userInfoEncoded);
        const { userInfo } = userInform;
        dispatch({ type: 'set-user', userInfo });
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [loggedIn]);

  const userLogOut = useCallback(() => {
    if (authToken == null || !loggedIn) return;
    // we log the user out by terminating his authToken that we store...
    removeAuthToken(authToken);
  }, [authToken, removeAuthToken, loggedIn]);

  const value = useMemo(() => {
    return {
      user,
      userLogOut,
      updateUser
    };
  }, [user, userLogOut, updateUser]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};
