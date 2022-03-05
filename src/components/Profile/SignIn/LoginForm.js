import React, { useReducer, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import {
  validatePassword,
  validateEmail,
} from "../../../validators/validators";
import "./loginStyle.css";

const reducer = (state, action) => {
  // These cases are taken into consideration by the dispatches used in the useCallbacks down below,
  // This is where the values get set.
  switch (action.type) {
    case "validation-error":
      return { ...state, submissionErrorMessage: action.message };
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
    // set states...
    case "set-email":
      return { ...state, email: action.value, submissionErrorMessage: null };
    case "set-password":
      return { ...state, password: action.value, submissionErrorMessage: null };
    // signin states....
    case "sign-in-start":
      return { ...state, waiting: true };
    case "sign-in-success":
      return { ...state, waiting: false, finished: true };
    case "sign-in-failure":
      return {
        ...state,
        waiting: false,
        submissionErrorMessage: action.message,
      };
    default:
      throw new Error("Unhandled action: " + action.type);
  }
};

const SignUpForm = () => {
  const [state, dispatch] = useReducer(reducer, {
    password: "",
    email: "",
    submissionErrorMessage: null,
    emailError: null,
    passwordError: null,
    waiting: false,
    finished: false,
  });
  const {
    email,
    password,
    submissionErrorMessage,
    passwordError,
    emailError,
    finished,
    waiting,
  } = state;

  const loginUser = useCallback(() => {
    // this prevents auto refresh onsubmit
    event.preventDefault();
    // We should validate the users input THEN call the api to login user here...
    if (waiting || finished) return;
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

    // TODO
    // Now we should call the api to register user since all userInput has been validated...
    dispatch({ type: "sign-in-start" });
    console.log("submitting!");
  }, [email, password, waiting, finished]);

  // The useCallbacks basically take the values set in the input forms and sends them to their desired destination
  const setEmail = useCallback(
    (e) => dispatch({ type: "set-email", value: e.target.value }),
    []
  );
  const setPassword = useCallback(
    (e) => dispatch({ type: "set-password", value: e.target.value }),
    []
  );

  return (
    <>
      <Header>
        Login to <strong>Eirene</strong>
      </Header>
      <Paragraph>
        To keep connected with Eirene, please login with your personal info.
      </Paragraph>

      <FormContainer>
        <Form className="login-form" onSubmit={loginUser}>
          <Form.Group className="mb-3">
            <Label>Username</Label>

            <Form.Control
              className="textField"
              type="email"
              isInvalid={emailError}
              placeholder=""
              name="email"
              value={email}
              onChange={setEmail}
            />

            <Label>Password</Label>
            <Form.Control
              className="textField"
              type="password"
              isInvalid={passwordError}
              placeholder=""
              name="password"
              value={password}
              onChange={setPassword}
            />

            <RememberMeTab>
              <label className="remember-me">
                <span>Remember me</span>
                <input type="checkbox" />
                <div></div>
              </label>

              <ForgotPassword href={"/forgot-password"} className="link">
                Forgot Password
              </ForgotPassword>
            </RememberMeTab>

            {submissionErrorMessage && (
              <div style={{ paddingTop: 20 }}>
                <Alert variant="danger">{submissionErrorMessage}</Alert>
              </div>
            )}

            <Button
              disabled={submissionErrorMessage}
              value="Sign Up"
              type="submit"
              style={{
                width: "100%",
                margin: "3rem 0 0",
                backgroundColor: "#edbec4",
                color: "#ffffff",
              }}
            >
              Login
            </Button>
          </Form.Group>
        </Form>
      </FormContainer>
    </>
  );
};

const FormContainer = styled.div``;

const Button = styled.button`
  cursor: pointer;
  height: 54px;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;s
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

const RememberMeTab = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ForgotPassword = styled.a`
  position: relative;
  top: 2px;
  font-size: 14px;
  color: #888888;
`;

export default SignUpForm;
