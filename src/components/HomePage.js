import React from "react";
// import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";

const HomePage = () => {
	// const navigate = useNavigate();

  return (
		<div>
			<h1>HomePage</h1>
			{/* this button is temporary */}
			{/* <Button onClick={() => navigate('/SignUp')}>Go To Sign Up</Button> */}
			<Link to='/SignUp'>Go to Signup</Link>
		</div>
  );
};

export default HomePage;
