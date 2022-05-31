import React, {
  useReducer,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useAuthenticator } from "./AuthContext";
import {
  GetUserInfo,
  GetUserPicture,
  DeactivateAccount,
} from "../api/ApiClient";

const UserContext = React.createContext();
const KEY = "user_data";

const reducer = (state, action) => {
  switch (action.type) {
    case "set-user":
      return { ...state, user: action.userInfo };
    case "clear-user":
      return { ...state, user: null };
    case "set-user-image":
      return { ...state, userImage: action.userImage };
    case "clear-user-image":
      return { ...state, userImage: undefined };
    default:
      throw new Error(`Unhandled action ${action.type}!`);
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    userImage: undefined,
  });
  const { user, userImage } = state;
  const { authToken, removeAuthToken, loggedIn } = useAuthenticator();

  useEffect(() => {
    if (!loggedIn) return;
    GetUserPicture(authToken).then((response) => {
      if (response.data.success) {
        dispatch({
          type: "set-user-image",
          userImage: response.data.image_url,
        });
      } else {
        dispatch({ type: "clear-user-image" });
        console.log("Unsuccessful user image fetch...", response.data);
      }
    });
  }, [loggedIn, authToken]);

  const updateUser = useCallback(
    (userInfo) => {
      if (!loggedIn) return;

      try {
        if (userInfo == null) {
          localStorage.removeItem(KEY);
          dispatch({ type: "clear-user" });
        } else {
          localStorage.setItem(KEY, JSON.stringify({ userInfo }));
          dispatch({ type: "set-user", userInfo });
        }
        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      }
    },
    [loggedIn]
  );

  useEffect(() => {
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

  useEffect(() => {
    if (!loggedIn) return;
    const getUser = async () => {
      try {
        const userInfoEncoded = localStorage.getItem(KEY);
        if (userInfoEncoded == null) return;
        const userInform = JSON.parse(userInfoEncoded);
        const { userInfo } = userInform;
        dispatch({ type: "set-user", userInfo });
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [loggedIn]);

  const userLogOut = useCallback(() => {
    if (authToken == null || !loggedIn) return;
    // we log the user out by terminating his authToken that we store...
    dispatch({ type: "clear-user-image" });
    removeAuthToken(authToken);
  }, [authToken, removeAuthToken, loggedIn]);

  const value = useMemo(() => {
    return {
      user,
      userImage,
      userLogOut,
      updateUser,
    };
  }, [user, userImage, userLogOut, updateUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
