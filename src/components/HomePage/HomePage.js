import React from "react";
import { useAuthenticator } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
const HomePage = () => {
  const { loggedIn } = useAuthenticator();
  const { userLogOut } = useUser();

  console.log(loggedIn);
  return (
    <div>
      <h1>{loggedIn}</h1>
      {/* this Link is temporary */}
      <button onClick={userLogOut}> LOG OUt!</button>
      <Link to="/SignUp">Go to Signup</Link>
    </div>
  );
};

export default HomePage;
