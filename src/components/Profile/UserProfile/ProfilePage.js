import React from "react";
import { useAuthenticator } from "../../../context/AuthContext";
import { useUser } from "../../../context/UserContext";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, userLogOut } = useUser();
  const { loggedIn } = useAuthenticator();

  return (
    <>
      {loggedIn
        ? <div>
          <h2>{user?.fname} {user?.lname}</h2>
          <h2>{user?.email}</h2>
          <button onClick={userLogOut}>LOG OUt!</button>
        </div>
        : <div>
          <h3>You are not logged in!</h3>
          <p> Please login to access profile.</p>
          <Link to="/SignUp">Go to Signup</Link>
          <h2>OR</h2>
          <Link to="/SignIn">Go to Login</Link>
          </div>}
    </>
    );
}

export default ProfilePage;