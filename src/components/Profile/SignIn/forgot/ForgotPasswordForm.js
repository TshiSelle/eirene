import React, { useCallback, useEffect, useReducer } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { SendEmail } from "../../../../api/ApiClient";
import { useAuthenticator } from "../../../../context/AuthContext";
import { validateEmail } from "../../../../validators/validators";
import "./forgotPassStyle.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "change-email":
      return { ...state, email: action.value, errorMessage: "" };
    case "validation-error":
      return {
        ...state,
        errorMessage: action.message,
      };
    case "start-submit":
      return { ...state, waiting: true };
    case "submit-success":
      return { ...state, waiting: false, finished: true };
    case "submit-failure":
      console.log("submit-failure");
      console.log(action.message);
      return {
        ...state,
        waiting: false,
        errorMessage: action.message,
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

  const navigate = useNavigate();
  const { loggedIn } = useAuthenticator();

  useEffect(() => {
    if (loggedIn) return navigate("/");
  }, [loggedIn]);

  const submitRequest = useCallback(
    (event) => {
      // this prevents auto refresh onsubmit
      if (event && event.preventDefault) event.preventDefault();
      console.log(email, " email");
      // check base cases then call api, we generally dont need to verify if the user email input
      // is actually a true email, since if its not it just wont send an email...
      if (waiting || finished) return;
      const emailValidation = validateEmail(email);
      if (!emailValidation.success) {
        dispatch({
          type: "validation-error",
          message: emailValidation.message,
        });
        return;
      }
      // now we call the api.
      dispatch({ type: "start-submit" });
      SendEmail(email)
        .then((response) => {
          if (response.data.success) {
            dispatch({ type: "submit-success" });
            console.log("Successful forgotpass!");
          } else {
            dispatch({
              type: "submit-failure",
              message: response.data.message,
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: "submit-failure",
            message: error.response.data.message,
          });
          return;
        });
    },
    [waiting, finished, email]
  );

  const setEmail = useCallback(
    (e) => dispatch({ type: "change-email", value: e.target.value }),
    []
  );

  return (
    <MainContainer>
      <MainSection>
        <FormContainer>
          <ResponsiveContainer>
            <Header>Forgot Password</Header>
            {finished ? (
              <p style={{ textAlign: "center", fontFamily: "FuturaLight" }}>
                We sent an email to {email}, please check your inbox.
              </p>
            ) : (
              <>
                <Subheader>
                  Enter your email address to receive a verification code.
                </Subheader>

                <Form onSubmit={submitRequest}>
                  <Form.Group className="mb-3">
                    <Label>Email</Label>

                    <Form.Control
                      className="input email-input"
                      type="email"
                      isInvalid={errorMessage}
                      placeholder=""
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
                      className="input submit-button"
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
          </ResponsiveContainer>
        </FormContainer>
      </MainSection>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  background: linear-gradient(
      0deg,
      rgba(33, 37, 41, 0.3),
      rgba(33, 37, 41, 0.3)
    ),
    url("https://res.cloudinary.com/cloudloom/image/upload/f_auto/v1650233581/samples/Profile/login-image.jpg");
  background-size: cover;
  height: 100vh;
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
  color: #212529;

  @media (max-width: 1007px) {
    background-position: right;
  }
`;

const MainSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const FormContainer = styled.div`
  padding: 30px;
  border-radius: 0.25rem;
  background-color: #f6f7fc;

  @media (max-width: 1007px) {
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    border-radius: 25px 25px 0 0;
    padding: 50px 0;
  }
`;

const Header = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
`;

const Subheader = styled.p`
  margin-bottom: 1.5rem;
  color: #b3b3b3;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
`;

const ResponsiveContainer = styled.div`
  @media (max-width: 1007px) {
    padding: 20px;
  }
`;

export default ForgotPasswordForm;
