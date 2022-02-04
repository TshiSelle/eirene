import React, { useReducer, useCallback } from 'react';
// import { Button } from 'semantic-ui-react';
// import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';	
import { Link } from 'react-router-dom';
import { validatePassword, validateEmail } from '../../../validators/validators';

const reducer = (state, action) => {
	 // These cases are taken into consideration by the dispatches used in the useCallbacks down below,
	 // This is where the values get set.
    switch (action.type) {
      case 'validation-error': return { ...state, errorMessage: action.message };
      case 'set-email': return { ...state, email: action.value, errorMessage: null };
      case 'set-password': return { ...state, password: action.value, errorMessage: null };
			// signin states....
      case 'sign-in-start': return { ...state, waiting: true };
      case 'sign-in-success': return { ...state, waiting: false, finished: true };
      case 'sign-in-failure':
        return { ...state, waiting: false, errorMessage: action.message };
      default:
        throw new Error('Unhandled action: ' + action.type);
    }
  };

const SignUpForm = () => {
	const [state, dispatch] = useReducer(reducer, {
			password: '',
			email: '',
			errorMessage: null,
			waiting: false,
			finished: false
		});
		const { email, password, errorMessage, finished, waiting } = state;


	const loginUser = useCallback(() => {
	// We should validate the users input THEN call the api to login user here...
	if (waiting || finished) return;
	const emailValidation = validateEmail(email);
    if (!emailValidation.success) {
      dispatch({ type: 'validation-error', message: emailValidation.message });
      return;
    }
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.success) {
      dispatch({ type: 'validation-error', message: passwordValidation.message });
      return;
    }

		// TODO
		// Now we should call the api to register user since all userInput has been validated...
		dispatch({ type: 'sign-in-start' });
		console.log('submitting!');
	}, []);

	// The useCallbacks basically take the values set in the input forms and sends them to their desired destination
  const setEmail = useCallback(e => dispatch({ type: 'set-email', value: e.target.value }), []);
  const setPassword = useCallback(e => dispatch({ type: 'set-password', value: e.target.value }), []);

  return (
		<FormContainer>
			<Box {...{ warning: !!errorMessage }}
				component="form"
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
				onSubmit={loginUser}
			>
      <div>

				<TextField label="Email"
					placeholder="Enter email" helperText="Incorrect entry." type="email"
					value={email} onChange={setEmail} fullWidth required />
				<br />
				<TextField label="Password"
					placeholder="Enter Password" type="password"
					value={password} onChange={setPassword} fullWidth required />
			</div>
			{errorMessage && <h2>{errorMessage}</h2>}
			<button type='submit'>Submit</button>

			<Link to='/SignUp'> Go to SignUp</Link>
    </Box>
		</FormContainer>
  );
};

const FormContainer = styled.div`
	padding: 20px;
	width: 80%;
	height: 100%;
`;

export default SignUpForm;
