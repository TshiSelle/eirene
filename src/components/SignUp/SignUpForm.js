import React, { useReducer, useCallback } from 'react';
import { Form, Button } from 'semantic-ui-react';
import styled from 'styled-components';

const reducer = (state, action) => {
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
	// TODO
	// We should validate the users input THEN call the api to register user here...
		console.log('submitting!');
	}, []);

	const setFirstName = useCallback(e => dispatch({ type: 'set-first-name', value: e.target.value }), []);
  const setLastName = useCallback(e => dispatch({ type: 'set-last-name', value: e.target.value }), []);
  const setEmail = useCallback(e => dispatch({ type: 'set-email', value: e.target.value }), []);
  const setPassword = useCallback(e => dispatch({ type: 'set-password', value: e.target.value }), []);
  const setGender = useCallback((_, { value }) => dispatch({ type: 'set-gender', value: value }), []);
	
	const genderOptions = [
		{ key: 'male', text: 'Male', value: 'male' },
    { key: 'female', text: 'Female', value: 'female' }
	];

  return (
		<FormContainer>
			<Form {...{ warning: !!errorMessage }} {...{ loading: waiting }} unstackable onSubmit={submitUser} size='large'>
				<Form.Group widths='equal'>
					<Form.Input fluid control='input' placeholder='First name' name='firstName' onChange={setFirstName} value={firstName} required />
					<Form.Input value={lastName} control='input' fluid placeholder='Last name' name='lastName' onChange={setLastName} required />
				</Form.Group>
				<Form.Input name='email' fluid type='email' onChange={setEmail} placeholder='Email address'
					autoComplete='username' value={email} required />
				<Form.Input name='password' fluid className='password-input'
					onChange={setPassword} placeholder='Enter Password' autoComplete='new-password' value={password}
					type={'password'} required />

				<Form.Select fluid options={genderOptions} value={gender} placeholder='Gender' onChange={setGender} />

				<Button type='submit'>Sign Up</Button>
			</Form>
		</FormContainer>
  );
};

const FormContainer = styled.div`
	padding: 20px;
	width: 80%;
	height: 100%;
`;

export default SignUpForm;
