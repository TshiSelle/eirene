import React, { useReducer, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { validateName, validatePassword, validateEmail, validateGender } from '../../../validators/validators';

const reducer = (state, action) => {
	 // These cases are taken into consideration by the dispatches used in the useCallbacks down below,
	 // This is where the values get set.
    switch (action.type) {
      case 'validation-error': return { ...state, errorMessage: action.message };
      case 'set-first-name': return { ...state, firstName: action.value, errorMessage: null };
      case 'set-last-name': return { ...state, lastName: action.value, errorMessage: null };
      case 'set-email': return { ...state, email: action.value, errorMessage: null };
      case 'set-password': return { ...state, password: action.value, errorMessage: null };
      case 'set-gender': return { ...state, gender: action.value, errorMessage: null };
			// signup states....
      case 'sign-up-start': return { ...state, waiting: true };
      case 'sign-up-success': return { ...state, waiting: false, finished: true };
      case 'sign-up-failure':
        return { ...state, waiting: false, errorMessage: action.message };
      default:
        throw new Error('Unhandled action: ' + action.type);
    }
  };

const SignUpForm = () => {
	const [state, dispatch] = useReducer(reducer, {
			firstName: '',
			lastName: '',	
			password: '',
			email: '',
			gender: '',
			errorMessage: null,
			waiting: false,
			finished: false
		});
		const { email, password, firstName, lastName, gender, errorMessage, finished, waiting } = state;


	const submitUser = useCallback(() => {
	// We should validate the users input THEN call the api to register user here...
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
    const firstNameValidation = validateName(firstName);
    if (!firstNameValidation.success) {
      dispatch({ type: 'validation-error', message: firstNameValidation.message });
      return;
    }
    const lastNameValidation = validateName(lastName);
    if (!lastNameValidation.success) {
      dispatch({ type: 'validation-error', message: lastNameValidation.message });
      return;
    }
    const genderValidation = validateGender(gender);
    if (!genderValidation.success) {
      dispatch({ type: 'validation-error', message: genderValidation.message });
      return;
    }

		// TODO
		// Now we should call the api to register user since all userInput has been validated...
		dispatch({ type: 'sign-up-start' });
		console.log('submitting!');
	}, []);

	// The useCallbacks basically take the values set in the input forms and sends them to their desired destination
	const setFirstName = useCallback(e => dispatch({ type: 'set-first-name', value: e.target.value }), []);
  const setLastName = useCallback(e => dispatch({ type: 'set-last-name', value: e.target.value }), []);
  const setEmail = useCallback(e => dispatch({ type: 'set-email', value: e.target.value }), []);
  const setPassword = useCallback(e => dispatch({ type: 'set-password', value: e.target.value }), []);
  const setGender = useCallback((e) => dispatch({ type: 'set-gender', value: e.target.value }), []);

  return (
		<FormContainer>
			<Box {...{ warning: !!errorMessage }} {...{ loading: waiting }} component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
      	noValidate autoComplete="off" onSubmit={submitUser}>
      <div>
        <TextField label="First Name"
					placeholder="Enter First Name"
					onChange={setFirstName} value={firstName} fullWidth required />

        <TextField label="Last Name"
					placeholder="Enter Last Name" helperText="Incorrect entry."
					value={lastName} onChange={setLastName} fullWidth required />
				<br />

				<TextField label="Email"
					placeholder="Enter email" helperText="Incorrect entry." type="email"
					value={email} onChange={setEmail} fullWidth required />
				<br />
				<TextField label="Password"
					placeholder="Enter Password" type="password"
					value={password} onChange={setPassword} fullWidth required />
					
				<FormControl sx={{ m: 1, minWidth: 200 }}>
					<InputLabel id="demo-simple-select-required-label">Gender</InputLabel>
					<Select
						value={gender}
						label="Gender *"
						onChange={setGender}>
						<MenuItem value=''>None</MenuItem>
						<MenuItem value='male'>Male</MenuItem>
						<MenuItem value='female'>Female</MenuItem>
					</Select>
				</FormControl>
			</div>
			{errorMessage && <h2>{errorMessage}</h2>}
			<button type='submit'>Submit</button>

			<Link to='/SignIn'> Go to Login</Link>
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
