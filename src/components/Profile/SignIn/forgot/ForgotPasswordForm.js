import React, { useCallback, useReducer } from "react";
import styled from "styled-components";
import { validateEmail } from "../../../../validators/validators";
import { Form, Button, Alert } from "react-bootstrap";
import { SendEmail } from '../../../../api/ApiClient';

const reducer = (state, action) => {
  switch (action.type) {
    case "change-email":
      return { ...state, email: action.value };
    case "validation-error":
      return {
        ...state,
        errorMessage: action.message,
        errorCounter: state.errorCounter + 1,
      };
    case "start-submit":
      return { ...state, waiting: true };
    case "submit-success":
      return { ...state, waiting: false, finished: true };
    case "submit-failure":
      return {
        ...state,
        waiting: false,
        errorMessage: action.message
      };
    default:
      throw new Error("Unhandled action type: " + action.type);
  }
};

const ForgotPasswordForm = () => {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    finished: false,
    errorMessage: null,
    waiting: false,
  });
  const { email, finished, errorMessage, waiting } = state;

  const submitRequest = useCallback(() => {
    // this prevents auto refresh onsubmit
    event.preventDefault();
    console.log(email, ' email');
    // check base cases then call api, we generally dont need to verify if the user email input
    // is actually a true email, since if its not it just wont send an email...
    if (waiting || finished) return;
    console.log('25');
    const emailValidation = validateEmail(email);
    if (!emailValidation.success) {
      dispatch({
        type: "validation-error",
        errorMessage: emailValidation.message,
      });
      return;
    }
    // now we call the api.
    dispatch({ type: "start-submit" });
    SendEmail(email)
    .then((response) => {
      if (response.data.success) {
        dispatch({ type: "submit-success" });
        console.log('Successful forgotpass!');
      } else {
        dispatch({ type: "submit-failure", errorMessage: response.data.email });
      }
    })
    .catch((error) => {
      dispatch({
        type: "submit-failure",
        errorMessage: error.response.data.email,
      });
      return;
    });
  }, [waiting, finished, email]);

  const setEmail = useCallback(
    (e) => dispatch({ type: "change-email", value: e.target.value }),
    []
  );

  return (
    <FormContainer>
      <h1>Forgot Password?</h1>
      {finished ? (
        <p style={{ textAlign: "center" }}>
          We sent an email to {email}, please check your inbox.
        </p>
      ) : (
        <>
          <h3>Please Provide us with your email.</h3>
          <Form onSubmit={submitRequest}>
            <Form.Group className="mb-3">
              <Form.Control
                className="email-input"
                type="email"
                isInvalid={errorMessage}
                placeholder="Email"
                name="email"
                value={email}
                onChange={setEmail}
              />

              {errorMessage && (
                <div style={{ paddingTop: 20 }}>
                  <Alert variant="danger">{errorMessage}</Alert>
                </div>
              )}

              <Button
                className="submit-button"
                disabled={errorMessage}
                variant={`${errorMessage ? "danger" : "primary"}`}
                value="Forgot Password"
                type="submit"
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </>
      )}
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 95%;
  height: 100%;
  max-width: 480px;
`;

export default ForgotPasswordForm;
