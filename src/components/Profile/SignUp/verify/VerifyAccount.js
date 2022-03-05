import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { IsVerificationTokenValid } from "../../../../api/ApiClient";
import { Alert } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import "./verifyacc.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "token-success":
      return { ...state, emailValid: true };
    case "token-failure":
      return { ...state, emailValid: false, errorMessage: action.value };
    case "verify-email-start":
      return { ...state, loading: true };
    case "verify-email-success":
      return { ...state, loading: false, finished: true };
    case "verify-email-failure":
      return {
        ...state,
        loading: false,
        submissionErrorMessage: action.message,
      };
    default:
      throw new Error("Unhandled action: " + action.type);
  }
};

const VerifyAccount = () => {
  const { username, token } = useParams();

  const [state, dispatch] = useReducer(reducer, {
    emailValid: false,
    submissionErrorMessage: null,
    loading: false,
    errorMessage: null,
    waiting: null,
  });

  const { emailValid, submissionErrorMessage, loading } = state;

  useEffect(() => {
    event.preventDefault();
    IsVerificationTokenValid(username, token)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "token-success" });
          console.log("Email verified!");
        } else {
          dispatch({ type: "token-failure" });
        }
      })
      .catch((error) => {
        dispatch({ type: "token-failure", errorMessage: error.response.data });
        return;
      });
  }, [username, token]);

  useEffect(() => {
    if (loading) {
      return (
        <Spinner className="center" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
  }, [loading]);

  return (
    <div>
      {emailValid ? (
        <div>
          <h1>Email Valid!</h1>
          <a href="/">Please Click here to enjoy Eirene!</a>
        </div>
      ) : (
        <div>
          <h2>Email is Invalid</h2>
        </div>
      )}

      {submissionErrorMessage && (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="danger">{error}</Alert>
        </div>
      )}
    </div>
  );
};

export default VerifyAccount;
