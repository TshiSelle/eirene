import React, { useReducer, useMemo, useCallback, useContext, useEffect } from 'react';
// import axios from 'axios';
import { useAuthenticator } from './AuthContext';

const UserContext = React.createContext();
const KEY = 'user_data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'clear-in-memory':
      return {
        ...state,
        user: null
      };
    case 'set-from-store':
      return {
        ...state,
        user: null
      };
    default: throw new Error(`Unhandled action ${action.type}!`);
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null
  });
  const { user } = state;
  const { authToken } = useAuthenticator();

  const userLogOut = useCallback(() => {
    if (authToken == null) return;
    // (TODO): if token isnt null, terminate the token..
  }, [authToken]);

  const value = useMemo(() => {
    return {
      user,
      userLogOut
    };
  }, [user, userLogOut]);

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
