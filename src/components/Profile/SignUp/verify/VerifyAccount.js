import React, { useEffect, useReducer } from "react";
import { useParams, Navigate} from "react-router-dom";
import { IsVerificationTokenValid } from "../../../../api/ApiClient";
import isEmpty from "is-empty";
import { Spinner } from "react-bootstrap";
import './verifyacc.css'

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
        emailValid: null,
        submissionErrorMessage: null,
        waiting: null,
        finished: null,
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
    });
},[]);

const checkEmpty = () => {
    if (isEmpty(emailValid)) {
        return (<Spinner className="center" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>);
    } else {
        return (emailValid ? <Navigate to="/valid"/> : <Navigate to="/invvalid"/>);
    }
}

//return (<h1>hello</h1>);
        return (
            <>
            {checkEmpty()}
            {console.log("🚀 ~ file: VerifyAccount.js ~ line 73 ~ VerifyAccount ~ emailValid", emailValid)}
            </>
        );
};



export default VerifyAccount;