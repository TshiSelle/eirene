import React, { useReducer, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Form, Alert, Button } from "react-bootstrap";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../../../validators/validators";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  PasswordResetWithToken,
  IsEmailTokenValid,
} from "../../../../api/ApiClient";
import "./forgotPassStyle.css";

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
  const navigate = useNavigate();
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
    emailValid,
  } = state;

  useEffect(() => {
    IsEmailTokenValid(username, token)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "token-success" });
          console.log("Successful forgotpass!");
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
          setTimeout(() => navigate("/SignIn"), 2000);
        } else {
          dispatch({
            type: "forgot-password-failure",
            message: response.data.message,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: "forgot-password-failure",
          message: error.response.data.message,
        });
        return;
      });
  }, [waiting, finished, password, confirmPassword]);

  return (
    <>
      {emailValid ? (
        <MainContainer>
          <MainSection>
            <FormContainer>
              <ResponsiveContainer>
                <Header>Reset Password</Header>
                <Subheader>
                  Choose your new password and traverse Eirene again.
                </Subheader>

                <Form className="signup-form" onSubmit={resetUserPassword}>
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

                  <Label>Confirm Password</Label>
                  <Form.Control
                    className="input textField"
                    type="password"
                    isInvalid={passwordError}
                    placeholder=""
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                  />

                  {submissionErrorMessage && (
                    <div style={{ paddingTop: 20 }}>
                      <Alert variant="danger">{submissionErrorMessage}</Alert>
                    </div>
                  )}

                  <Button
                    className="input submit-button"
                    value="Submit"
                    type="submit"
                    disabled={submissionErrorMessage}
                  >
                    Reset Password
                  </Button>
                  {finished && (
                    <Alert variant="success">
                      Password reset successfully!
                    </Alert>
                  )}
                </Form>
              </ResponsiveContainer>
            </FormContainer>
          </MainSection>
        </MainContainer>
      ) : (
        <PageContainer>
          <PageBanner>
            <BannerHeader>Invalid Token</BannerHeader>
            <BannerPara>
              Oops! It looks like you're lost. Try heading back to the
              <Link to="/" style={{ color: "#6eb950" }}>
                {" "}
                homepage
              </Link>
              .
            </BannerPara>
          </PageBanner>
        </PageContainer>
      )}
    </>
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

const ResponsiveContainer = styled.div`
  @media (max-width: 1007px) {
    padding: 20px;
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

const PageBanner = styled.div`
  height: 200px;
  text-align: center;
  display: grid;
  align-content: center;
  justify-content: center;

  @media (max-width: 991px) {
    height: unset;
    padding: 20px;
  }
`;

const BannerHeader = styled.h1`
  font-size: 30px;
  font-weight: bold;

  @media (max-width: 991px) {
    font-size: 20px;
  }
`;

const BannerPara = styled.p`
  max-width: 600px;
  margin-top: 10px;
`;

const PageContainer = styled.div`
  font-family: FuturaLight;
  line-height: 1.5;
  color: #212529;
  height: 65vh;
`;

export default ForgotPasswordResetForm;
