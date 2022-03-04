import React from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      {/* this Link is temporary */}
      <Link to="/SignUp">Go to Signup</Link>
    </div>
  );
};

export default HomePage;
