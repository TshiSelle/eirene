import React, { useReducer, useMemo, useCallback, useContext, useEffect } from 'react';
import { IsUserTokenValid } from '../api/ApiClient';

const AuthContext = React.createContext();

const KEY = 'authentication_token';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-auth-token': return { ...state, authToken: action.token };
    case 'clear-auth-token': return { ...state, authToken: null };
    default: throw new Error(`Unhandled action ${action.type}!`);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    authToken: null
  });
  const { authToken } = state;

  const updateAuthToken = useCallback((token) => {
    try {
      if (token == null) {
        localStorage.removeItem(KEY);
        dispatch({ type: 'clear-auth-token' });
      } else {
        localStorage.setItem(KEY, JSON.stringify({ token }));
        dispatch({ type: 'set-auth-token', token });
      }
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }, []);

  const removeAuthToken = useCallback(() => {
    try {
        localStorage.removeItem(KEY);
        dispatch({ type: 'clear-auth-token' });
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }, []);

  useEffect((event) => {
    if (event && event.preventDefault) event.preventDefault();
    if (authToken === null) return;
    IsUserTokenValid(authToken)
        .then((response) => {
          if (response.data.success) {
            if (response.data.isLoggedIn) {
              updateAuthToken(authToken);
            }else {
              removeAuthToken();
            }
          } else {
            removeAuthToken();
          }
        })
        .catch((error) => {
          removeAuthToken();
          return;
        });
  }, [authToken, updateAuthToken, removeAuthToken]);

  useEffect((event) => {
    if (event && event.preventDefault) event.preventDefault();

    const getAuthToken = async () => {
      try {
        const authTokenInfoEncoded = localStorage.getItem(KEY);
        if (authTokenInfoEncoded == null) return;
        const authTokenInfo = JSON.parse(authTokenInfoEncoded);
        const { token } = authTokenInfo;
        dispatch({ type: 'set-auth-token', token });
      } catch (error) {
        console.log(error.message);
      }
    };
    getAuthToken();
  }, []);

  const loggedIn = authToken != null;

//   console.log('Auth token: ', authToken, ' LoggedIn: ', loggedIn);
  const value = useMemo(() => {
    return {
      loggedIn,
      removeAuthToken,
      authToken,
      updateAuthToken,
    };
  }, [loggedIn, authToken, updateAuthToken, removeAuthToken]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthenticator = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within a AuthProvider');
  return context;
};
