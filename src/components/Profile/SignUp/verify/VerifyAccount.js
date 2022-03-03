import React, { useEffect, useReducer } from "react";
import { useParams, Navigate} from "react-router-dom";
import { Route } from "react-router";
import { IsVerificationTokenValid } from "../../../../api/ApiClient";

const reducer = (state, action) => {
    switch (action.type) {
        case "token-success":
            return { ...state, emailValid: true };
        case "token-failure":
            return { ...state, emailValid: false };
        case "verify-email-start":
            return { ...state, waiting: true };
        case "verify-email-success":
            return { ...state, waiting: false, finished: true };
        case "verify-email-failure":
            return {
                ...state,
                waiting: false,
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
        waiting: false,
        finished: false,
    });

    const {
        emailValid,
        submissionErrorMessage,
        waiting,
        finished
    } = state;
    
    useEffect(() => {
        IsVerificationTokenValid(username, token)
        .then((response) => {
            if (response.data.success) {
                dispatch({ type: "token-success" });
                console.log('Email verified!');
            } else {
                dispatch({ type: "token-failure" });
            }
        })
        .catch((error) => {
            dispatch({ type: "token-failure" });
            return;
        })
    }, [username, token]);

    return (<>{emailValid ? <Navigate to="/validtoken" /> : <Navigate to="/nonvalidtoken" />}</>);
};


export default VerifyAccount;