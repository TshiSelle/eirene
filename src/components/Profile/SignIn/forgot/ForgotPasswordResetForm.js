import React, { useReducer, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Form, Alert, Button } from "react-bootstrap";
import { validatePassword, validateConfirmPassword } from '../../../../validators/validators';
import { useParams } from "react-router-dom";
import { PasswordResetWithToken, IsEmailTokenValid } from '../../../../api/ApiClient';

const reducer = (state, action) => {
  // These cases are taken into consideration by the dispatches used in the useCallbacks down below,
  // This is where the values get set.
  switch (action.type) {
    // error states
    case "validation-error":
      return { ...state, submissionErrorMessage: action.message };
    case "password-error":
      return {
        ...state,
        passwordError: action.message,
        submissionErrorMessage: action.message,
      };
    // set data
    case "set-password":
      return { ...state, password: action.value, submissionErrorMessage: null };
    case "set-confirm-password":
      return {
        ...state,
        confirmPassword: action.value,
        submissionErrorMessage: null,
      };
    case "token-success":
        return { ...state, emailValid: true };
    case "token-failure":
        return { ...state, emailValid: false };
    case "forgot-password-start":
      return { ...state, waiting: true };
    case "forgot-password-success":
      return { ...state, waiting: false, finished: true };
    case "forgot-password-failure":
      return {
        ...state,
        waiting: false,
        submissionErrorMessage: action.message,
      };
    default:
      throw new Error("Unhandled action: " + action.type);
  }
};

const ForgotPasswordResetForm = () => {
    const { username, token } = useParams();
  const [state, dispatch] = useReducer(reducer, {
    password: "",
    confirmPassword: "",
    emailValid: false,
    submissionErrorMessage: null,
    passwordError: null,
    waiting: false,
    finished: false,
  });

  const {
    password,
    confirmPassword,
    passwordError,
    submissionErrorMessage,
    finished,
    waiting,
    emailValid
  } = state;

  useEffect(() => {
    IsEmailTokenValid(username, token)
    .then((response) => {
      if (response.data.success) {
        dispatch({ type: "token-success" });
        console.log('Successful forgotpass!');
      } else {
        dispatch({ type: "token-failure" });
      }
    })
    .catch(() => {
      dispatch({ type: "token-failure" });
      return;
    });
  }, [username, token]);

  const setPassword = useCallback(
    (e) => dispatch({ type: "set-password", value: e.target.value }),
    []
  );
  const setConfirmPassword = useCallback(
    (e) => dispatch({ type: "set-confirm-password", value: e.target.value }),
    []
  );
  const resetUserPassword = useCallback(() => {
    // this prevents auto refresh onsubmit
    event.preventDefault();
    if (waiting || finished) return;
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.success) {
      dispatch({
        type: "password-error",
        passwordError: passwordValidation.message,
        message: passwordValidation.message,
      });
      return;
    }
    const confirmPasswordValidation = validateConfirmPassword(
      password,
      confirmPassword
    );
    if (!confirmPasswordValidation.success) {
      dispatch({
        type: "password-error",
        passwordError: confirmPasswordValidation.message,
        message: confirmPasswordValidation.message,
      });
      return;
    }
    dispatch({ type: "forgot-password-start" });
    PasswordResetWithToken(username, token, password, confirmPassword)
    .then((response) => {
        if (response.data.success) {
          dispatch({ type: "forgot-password-success" });
          console.log('Successful qwerqwrqwerqerq!');
        } else {
          dispatch({ type: "forgot-password-failure", errorMessage: response.data.message });
        }
      })
      .catch((error) => {
        dispatch({
          type: "forgot-password-failure",
          errorMessage: error.response.data.message,
        });
        return;
      });
  }, [waiting, finished, password, confirmPassword]);

  return (
      <>
    {emailValid
    ?
    <Form className="signup-form" onSubmit={resetUserPassword}>
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
          <Button
          value="Submit"
          type="submit"
          style={{ height: 50, width: 100}}
          disabled={submissionErrorMessage} />
    </Form>
    : <h2>Invalid token!</h2>}
    </>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 10px;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
`;
export default ForgotPasswordResetForm;
