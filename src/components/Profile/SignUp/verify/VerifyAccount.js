import React, { useEffect, useReducer, useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { IsVerificationTokenValid } from "../../../../api/ApiClient";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import "./verifyacc.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "token-success":
      return { ...state, emailValid: true,loading: false };
    case "token-failure":
      return { ...state, emailValid: false, errorMessage: action.message, loading: false };
    case "verify-email-start":
      return { ...state, loading: true };
    case "verify-email-success":
      return { ...state, loading: false, finished: true };
    case "verify-email-failure":
      return {
        ...state,
        loading: false,
        errorMessage: action.message,
      };
    default:
      throw new Error("Unhandled action: " + action.type);
  }
};

const VerifyAccount = () => {
  const { username, token } = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    emailValid: false,
    loading: false,
    errorMessage: null,
    waiting: null,
});

const { emailValid, loading, errorMessage, waiting } = state;

const [result, setResult] = useState(<></>);

  useEffect(
    (event) => {
      if (event && event.preventDefault) event.preventDefault();
      dispatch({ type: "verify-email-start" });
      IsVerificationTokenValid(username, token)
        .then((response) => {
          if (response.data.success) {
            dispatch({ type: "token-success" });
            console.log("Email verified!");
            setResult(
              <div>
                <h1>Email Verified!</h1>
                <h2>Redirecting to homepage...</h2>
              </div>
            );
			setTimeout(() => {
				navigate("/");
			  }, 3000);
          } else {
            dispatch({ type: "token-failure" });
			navigate("/404")
          }
        })
        .catch((error) => {
          dispatch({ type: "token-failure", message: error.response.data.message });
          return;
        });
    },
    [username, token]
  );


  return (
    <div>
      {result}
      <LoadingSpinner display={loading} />
      {errorMessage && (
        <div style={{ paddingTop: 20, flex: 1 }}>
          <Alert variant="danger">{errorMessage}</Alert>
        </div>
      )}
    </div>
  );
};

export default VerifyAccount;
