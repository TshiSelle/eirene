import React, { useReducer, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button, Alert } from 'react-bootstrap'
import { validateName, validatePassword, validateEmail, validateGender } from '../../../validators/validators';

const reducer = (state, action) => {
	 // These cases are taken into consideration by the dispatches used in the useCallbacks down below,
	 // This is where the values get set.
	switch (action.type) {
		// error states
		case 'validation-error': return { ...state, submissionErrorMessage: action.message };
		case 'first-name-error': return { ...state, firstNameError: action.message, submissionErrorMessage: action.message };
		case 'last-name-error': return { ...state, lastNameError: action.message, submissionErrorMessage: action.message };
		case 'username-error': return { ...state, usernameError: action.message, submissionErrorMessage: action.message };
		case 'email-error': return { ...state, emailError: action.message, submissionErrorMessage: action.message };
		case 'password-error': return { ...state, passwordError: action.message, submissionErrorMessage: action.message };
		case 'gender-error': return { ...state, genderError: action.message, submissionErrorMessage: action.message };

		// set data
		case 'set-first-name': return { ...state, firstName: action.value, submissionErrorMessage: null, firstNameError: null };
		case 'set-last-name': return { ...state, lastName: action.value, submissionErrorMessage: null, lastNameErorr: null };
		case 'set-username': return { ...state, username: action.value, submissionErrorMessage: null };
		case 'set-email': return { ...state, email: action.value, submissionErrorMessage: null };
		case 'set-password': return { ...state, password: action.value, submissionErrorMessage: null };
		case 'set-gender': return { ...state, gender: action.value, submissionErrorMessage: null };
		// signup states....
		case 'sign-up-start': return { ...state, waiting: true };
		case 'sign-up-success': return { ...state, waiting: false, finished: true };
		case 'sign-up-failure':
			return { ...state, waiting: false, submissionErrorMessage: action.message };
		default:
			throw new Error('Unhandled action: ' + action.type);
	}
};

const SignUpForm = () => {
	const [state, dispatch] = useReducer(reducer, {
			firstName: '',
			lastName: '',
			username: '',
			password: '',
			email: '',
			gender: '',
			submissionErrorMessage: null,
			firstNameError: null,
			lastNameError: null,
			usernameError: null,
			emailError: null,
			passwordError: null,
			genderError: null,
			waiting: false,
			finished: false
		});
	const { email, password, firstName, lastName, gender, firstNameError, lastNameError, usernameError,
					emailError,passwordError, genderError, submissionErrorMessage, finished, waiting, username } = state;

	// The useCallbacks basically take the values set in the input forms and sends them to their desired destination
	const setFirstName = useCallback(e => dispatch({ type: 'set-first-name', value: e.target.value }), []);
	const setLastName = useCallback(e => dispatch({ type: 'set-last-name', value: e.target.value }), []);
	const setUsername = useCallback(e => dispatch({ type: 'set-username', value: e.target.value }), []);
	const setEmail = useCallback(e => dispatch({ type: 'set-email', value: e.target.value }), []);
	const setPassword = useCallback(e => dispatch({ type: 'set-password', value: e.target.value }), []);
	const setGender = useCallback(e => dispatch({ type: 'set-gender', value: e.target.value }), []);


	const submitUser = useCallback(() => {
		// this prevents auto refresh onsubmit
		event.preventDefault();
		// We should validate the users input THEN call the api to register user here...
		if (waiting || finished) return;
		const firstNameValidation = validateName(firstName, 'First name');
		if (!firstNameValidation.success) {
      dispatch({ type: 'first-name-error', firstNameError: firstNameValidation.message,  message: firstNameValidation.message});
      return;
    }
    const lastNameValidation = validateName(lastName, 'Last name');
    if (!lastNameValidation.success) {
      dispatch({ type: 'last-name-error', lastNameError: lastNameValidation.message, message: lastNameValidation.message });
      return;
    }
		const usernameValidation = validateName(username, 'Username');
		if (!usernameValidation.success) {
      dispatch({ type: 'username-error', usernameError: usernameValidation.message, message: usernameValidation.message });
      return;
    }
    const emailValidation = validateEmail(email);
    if (!emailValidation.success) {
      dispatch({ type: 'email-error', emailError: emailValidation.message, message: emailValidation.message });
      return;
    }
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.success) {
      dispatch({ type: 'password-error', passwordError: passwordValidation.message, message: passwordValidation.message });
      return;
    }
		console.log('gender ', gender);
    const genderValidation = validateGender(gender);
    if (!genderValidation.success) {
      dispatch({ type: 'gender-error', genderError: genderValidation.message, message: genderValidation.message });
      return;
    }

		// TODO
		// Now we should call the api to register user since all userInput has been validated...
		dispatch({ type: 'sign-up-start' });
		console.log('submitting!');
	}, [waiting, finished, firstName, lastName, username, email, password, gender]);

  return (
	<>
		<FormContainer>
			<Form className="signup-form" onSubmit={submitUser} >
				<Form.Group className="mb-3">
					<Form.Control className="name-input" isInvalid={firstNameError}
					type="text" placeholder="Enter First Name" value={firstName} onChange={setFirstName} />
					
					<Form.Control className="name-input" type="text" value={lastName} isInvalid={lastNameError}
						placeholder="Enter Last Name" name="email" onChange={setLastName} />

					<Form.Control className="name-input" type="text" isInvalid={usernameError}
						placeholder="Enter Username" name="username" value={username} onChange={setUsername} />
					
					<Form.Control className="email-input" type="email" isInvalid={emailError}
						placeholder="Email" name="email" onChange={setEmail} />
					<Form.Control className="password-i	nput" type="password" isInvalid={passwordError}
						placeholder="Password" name="password" value={password} onChange={setPassword} />
					<Form.Group className="mb-5">
					<Form.Label htmlFor="genderSelect">Gender</Form.Label>
						<Form.Select id="genderSelect" as="select" value={gender} onChange={setGender} isInvalid={genderError}>
							<option value=''>Select an option</option>
							<option value='Male'>Male</option>
							<option value='Female'>Female</option>
						</Form.Select>
					</Form.Group>
					{submissionErrorMessage && <div style={{paddingTop:20}}><Alert variant="danger">{submissionErrorMessage}</Alert></div>}
					<Button className="submit-button" value="Sign Up" type="submit" disabled={submissionErrorMessage}
						variant={`${submissionErrorMessage ? 'danger' : 'primary'}`}>
						Sign up
					</Button>
				</Form.Group>
			</Form>
			
		</FormContainer>
		<Link to='/SignIn'> Go to Login</Link>
	</>
  );
};

const FormContainer = styled.div`
	padding: 20px;
	width: 80%;
	height: 100%;
`;

export default SignUpForm;
