import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      {/* this Link is temporary */}
      <Link to="/SignUp">Go to Signup</Link>
      <Link to="/Profile">Go to Profile</Link>
    </div>
  );
};

export default HomePage;
