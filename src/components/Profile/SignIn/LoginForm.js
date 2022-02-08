import React, { useReducer, useCallback } from 'react';
import styled from 'styled-components';	
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap'
import { validatePassword, validateEmail } from '../../../validators/validators';

const reducer = (state, action) => {
	 // These cases are taken into consideration by the dispatches used in the useCallbacks down below,
	 // This is where the values get set.
    switch (action.type) {
      case 'validation-error': return { ...state, submissionErrorMessage: action.message };
			case 'email-error': return { ...state, emailError: action.message, submissionErrorMessage: action.message };
			case 'password-error': return { ...state, passwordError: action.message, submissionErrorMessage: action.message };
			// set states...
      case 'set-email': return { ...state, email: action.value, submissionErrorMessage: null };
      case 'set-password': return { ...state, password: action.value, submissionErrorMessage: null };
			// signin states....
      case 'sign-in-start': return { ...state, waiting: true };
      case 'sign-in-success': return { ...state, waiting: false, finished: true };
      case 'sign-in-failure':
        return { ...state, waiting: false, submissionErrorMessage: action.message };
      default:
        throw new Error('Unhandled action: ' + action.type);
    }
  };

const SignUpForm = () => {
	const [state, dispatch] = useReducer(reducer, {
			password: '',
			email: '',
			submissionErrorMessage: null,
			emailError: null,
			passwordError: null,
			waiting: false,
			finished: false
		});
		const { email, password, submissionErrorMessage, passwordError, emailError, finished, waiting } = state;


	const loginUser = useCallback(() => {
	// this prevents auto refresh onsubmit
		event.preventDefault();
	// We should validate the users input THEN call the api to login user here...
	if (waiting || finished) return;
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

		// TODO
		// Now we should call the api to register user since all userInput has been validated...
		dispatch({ type: 'sign-in-start' });
		console.log('submitting!');
	}, [email, password, waiting, finished]);

	// The useCallbacks basically take the values set in the input forms and sends them to their desired destination
  const setEmail = useCallback(e => dispatch({ type: 'set-email', value: e.target.value }), []);
  const setPassword = useCallback(e => dispatch({ type: 'set-password', value: e.target.value }), []);

  return (
		<>
		<FormContainer>
			<Form className="login-form" onSubmit={loginUser} >
				<Form.Group className="mb-3">
					<Form.Control className="email-input" type="email" isInvalid={emailError}
						placeholder="Email" name="email" value={email} onChange={setEmail} />
					<Form.Control className="password-i	nput" type="password" isInvalid={passwordError}
						placeholder="Password" name="password" value={password} onChange={setPassword} />

					{submissionErrorMessage &&<div style={{paddingTop:20}}><Alert variant="danger">{submissionErrorMessage}</Alert></div>}

					<Button className="submit-button" disabled={submissionErrorMessage}
						variant={`${submissionErrorMessage ? 'danger' : 'primary'}`} value="Sign Up" type="submit">
						Login
					</Button>
				</Form.Group>
			</Form>
			
		</FormContainer>
		<Link to='/SignUp'> Go to Signup</Link>
	</>
  );
};

const FormContainer = styled.div`
	padding: 20px;
	width: 80%;
	height: 100%;
`;

export default SignUpForm;
