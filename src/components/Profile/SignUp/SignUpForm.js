import React, { useReducer, useCallback, useState } from "react";
import styled from "styled-components";
import { SignUpApiCall } from "../../../api/ApiClient";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Alert } from "react-bootstrap";
import { validateName, validatePassword, validateEmail, validateGender, validateConfirmPassword } from "../../../validators/validators";
import "./signupStyle.css";
import { useAuthenticator } from "../../../context/AuthContext";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const reducer = (state, action) => {
  // These cases are taken into consideration by the dispatches used in the useCallbacks down below,
  // This is where the values get set.
  switch (action.type) {
    // error states
    case "validation-error":
      return { ...state, submissionErrorMessage: action.message };
    case "first-name-error":
      return {
        ...state,
        firstNameError: action.message,
        submissionErrorMessage: action.message,
      };
    case "last-name-error":
      return {
        ...state,
        lastNameError: action.message,
        submissionErrorMessage: action.message,
      };
    case "username-error":
      return {
        ...state,
        usernameError: action.message,
        submissionErrorMessage: action.message,
      };
    case "email-error":
      return {
        ...state,
        emailError: action.message,
        submissionErrorMessage: action.message,
      };
    case "password-error":
      return {
        ...state,
        passwordError: action.message,
        submissionErrorMessage: action.message,
      };
    case "gender-error":
      return {
        ...state,
        genderError: action.message,
        submissionErrorMessage: action.message,
      };

    // set data
    case "set-first-name":
      return {
        ...state,
        firstName: action.value,
        submissionErrorMessage: null,
        firstNameError: null,
      };
    case "set-last-name":
      return {
        ...state,
        lastName: action.value,
        submissionErrorMessage: null,
        lastNameError: null,
      };
    case "set-username":
      return { ...state, username: action.value, submissionErrorMessage: null };
    case "set-email":
      return { ...state, email: action.value, submissionErrorMessage: null };
    case "set-password":
      return { ...state, password: action.value, submissionErrorMessage: null };
    case "set-confirm-password":
      return {
        ...state,
        confirmPassword: action.value,
        submissionErrorMessage: null,
      };
    case "set-gender":
      return { ...state, gender: action.value, submissionErrorMessage: null };
    // signup states....
    case "sign-up-start":
      return { ...state, waiting: true };
    case "sign-up-success":
      return { ...state, waiting: false, finished: true };
    case "sign-up-failure":
      return {
        ...state,
        waiting: false,
        submissionErrorMessage: action.message,
      };
    default:
      throw new Error("Unhandled action: " + action.type);
  }
};

const SignUpForm = ({ handleModal }) => {
  const [state, dispatch] = useReducer(reducer, {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    gender: "",
    submissionErrorMessage: null,
    firstNameError: null,
    lastNameError: null,
    usernameError: null,
    emailError: null,
    passwordError: null,
    genderError: null,
    waiting: false,
    finished: false,
  });
  const {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    gender,
    firstNameError,
    lastNameError,
    usernameError,
    emailError,
    passwordError,
    genderError,
    submissionErrorMessage,
    finished,
    waiting,
    username,
  } = state;

  const [isLoading, setLoading] = useState(false);
  const { updateAuthToken } = useAuthenticator();
  // The useCallbacks basically take the values set in the input forms and sends them to their desired destination
  const setFirstName = useCallback((e) => dispatch({ type: "set-first-name", value: e.target.value }), []);
  const setLastName = useCallback((e) => dispatch({ type: "set-last-name", value: e.target.value }), []);
  const setUsername = useCallback((e) => dispatch({ type: "set-username", value: e.target.value }), []);
  const setEmail = useCallback((e) => dispatch({ type: "set-email", value: e.target.value }), []);
  const setPassword = useCallback((e) => dispatch({ type: "set-password", value: e.target.value }), []);
  const setConfirmPassword = useCallback((e) => dispatch({ type: "set-confirm-password", value: e.target.value }), []);
  const setGender = useCallback((e) => dispatch({ type: "set-gender", value: e.target.value }), []);

  const submitUser = useCallback(() => {
    // this prevents auto refresh onsubmit
    event.preventDefault();
    // We should validate the users input THEN call the api to register user here...
    if (waiting || finished) return;
    const firstNameValidation = validateName(firstName, "First name");
    if (!firstNameValidation.success) {
      dispatch({
        type: "first-name-error",
        firstNameError: firstNameValidation.message,
        message: firstNameValidation.message,
      });
      return;
    }
    const lastNameValidation = validateName(lastName, "Last name");
    if (!lastNameValidation.success) {
      dispatch({
        type: "last-name-error",
        lastNameError: lastNameValidation.message,
        message: lastNameValidation.message,
      });
      return;
    }
    const usernameValidation = validateName(username, "Username");
    if (!usernameValidation.success) {
      dispatch({
        type: "username-error",
        usernameError: usernameValidation.message,
        message: usernameValidation.message,
      });
      return;
    }
    const emailValidation = validateEmail(email);
    if (!emailValidation.success) {
      dispatch({
        type: "email-error",
        emailError: emailValidation.message,
        message: emailValidation.message,
      });
      return;
    }
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.success) {
      dispatch({
        type: "password-error",
        passwordError: passwordValidation.message,
        message: passwordValidation.message,
      });
      return;
    }
    const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);
    if (!confirmPasswordValidation.success) {
      dispatch({
        type: "password-error",
        passwordError: confirmPasswordValidation.message,
        message: confirmPasswordValidation.message,
      });
      return;
    }
    const genderValidation = validateGender(gender);
    if (!genderValidation.success) {
      dispatch({
        type: "gender-error",
        genderError: genderValidation.message,
        message: genderValidation.message,
      });
      return;
    }

    // TODO
    // Now we should call the api to register user since all userInput has been validated...
    dispatch({ type: "sign-up-start" });
    // make axios post request
	setLoading(true);
    SignUpApiCall(username, email, firstName, lastName, password, confirmPassword, gender)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "sign-up-success" });
          console.log("Successful signup!");
		  setLoading(false);
          updateAuthToken(response.data.token);
        } else {
          dispatch({ type: "sign-up-failure", message: response.data.message });
		  setLoading(false);
        }
      })
      .catch((error) => {
        const { fname, lname, name, gender, email, username, password, confirmPassword } = error.response.data;
        const probableErrors = [fname, lname, name, gender, email, username, password, confirmPassword];
        const specificErrors = probableErrors.filter((element) => !!element);
        dispatch({
          type: "sign-up-failure",
          message: error.response.data.message || specificErrors[0],
        });
		setLoading(false);
        return;
      });
  }, [waiting, finished, firstName, lastName, username, email, password, confirmPassword, gender]);

  return (
    <>
      <Header>
        Sign up to <strong>Eirene</strong>
      </Header>
      <Paragraph>Enter your registration details and start your journey with Eirene.</Paragraph>

      <FormContainer>
        <Form className="signup-form" onSubmit={submitUser}>
          <Form.Group className="mb-3">
            <GridContainer>
              <Label>First Name</Label>
              <Label>Last Name</Label>

              <Form.Control
                className="textField"
                isInvalid={firstNameError}
                type="text"
                placeholder=""
                value={firstName}
                name="firstName"
                onChange={setFirstName}
                style={{ width: "100%", boxSizing: "border-box" }}
              />

              <Form.Control
                className="textField"
                type="text"
                value={lastName}
                isInvalid={lastNameError}
                placeholder=""
                name="lastName"
                onChange={setLastName}
              />
            </GridContainer>

            <Label>Email</Label>
            <Form.Control className="textField" type="email" isInvalid={emailError} placeholder="" name="email" onChange={setEmail} />

            <Label>Username</Label>
            <Form.Control
              className="textField"
              type="text"
              isInvalid={usernameError}
              placeholder=""
              name="username"
              value={username}
              onChange={setUsername}
            />

            <GridContainer>
              <Label>Password</Label>
              <Label>Confirm Password</Label>

              <Form.Control
                className="textField"
                type="password"
                isInvalid={passwordError}
                placeholder=""
                name="password"
                value={password}
                onChange={setPassword}
              />

              <Form.Control
                className="textField"
                type="password"
                isInvalid={passwordError}
                placeholder=""
                name="confirmPassword"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
            </GridContainer>

            {
              <Form.Group>
                <Form.Label htmlFor="genderSelect">Gender</Form.Label>
                <Form.Select
                  id="genderSelect"
                  as="select"
                  value={gender}
                  onChange={setGender}
                  isInvalid={genderError}
                  style={{
                    height: "54px",
                    border: "none",
                    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 10%)",
                  }}
                >
                  <option value="">Select an option</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
            }
            {submissionErrorMessage && (
              <div style={{ paddingTop: 20 }}>
                <Alert variant="danger">{submissionErrorMessage}</Alert>
              </div>
            )}
            <Button
              className="signUpButton"
              value="Sign Up"
              type="submit"
              disabled={submissionErrorMessage}
              style={{
                width: "100%",
                margin: "2rem 0 0",
                backgroundColor: "#edbec4",
                color: "#ffffff",
              }}
            >
              Sign up
            </Button>
          </Form.Group>
        </Form>
      </FormContainer>
	  <LoadingSpinner display={isLoading} />
    </>
  );
};

const FormContainer = styled.div``;

const Button = styled.button`
  cursor: pointer;
  height: 54px;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
`;

const Header = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  color: #b3b3b3;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 10px;
`;

export default SignUpForm;
