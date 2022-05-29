import React, { useCallback, useReducer } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContactSupportExternal } from "../../api/ApiClient";
import {
  validateName,
  validateEmail,
  validateMessage,
} from "../../validators/validators";
import { Alert, Form } from "react-bootstrap";
import "./contactus.css";

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
    case "email-error":
      return {
        ...state,
        emailError: action.message,
        submissionErrorMessage: action.message,
      };
    case "message-error":
      return {
        ...state,
        messageError: action.message,
        submissionErrorMessage: action.message,
      };
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
    case "set-email":
      return {
        ...state,
        email: action.value,
        submissionErrorMessage: null,
      };
    case "set-content":
      return {
        ...state,
        supportMessage: action.value,
        submissionErrorMessage: null,
      };
    case "support-message-start":
      return { ...state, waiting: true };
    case "support-message-success":
      return {
        ...state,
        waiting: false,
        finished: true,
        successMessage: action.message,
      };
    case "support-message-failure":
      return {
        ...state,
        waiting: false,
        submissionErrorMessage: action.message,
      };
    default:
      throw new Error("Unhandled action: " + action.type);
  }
};

const ContactUsExt = () => {
  const [state, dispatch] = useReducer(reducer, {
    firstName: "",
    lastName: "",
    email: "",
    supportMessage: "",
    submissionErrorMessage: "",
    firstNameError: null,
    lastNameError: null,
    emailError: null,
    messageError: null,
    waiting: false,
    finished: false,
    successMessage: "",
  });

  const {
    firstName,
    lastName,
    email,
    supportMessage,
    submissionErrorMessage,
    firstNameError,
    lastNameError,
    emailError,
    messageError,
    waiting,
    finished,
    successMessage,
  } = state;

  const setFirstName = useCallback(
    (e) => dispatch({ type: "set-first-name", value: e.target.value }),
    []
  );
  const setLastName = useCallback(
    (e) => dispatch({ type: "set-last-name", value: e.target.value }),
    []
  );
  const setEmail = useCallback(
    (e) => dispatch({ type: "set-email", value: e.target.value }),
    []
  );
  const setMessage = useCallback(
    (e) => dispatch({ type: "set-content", value: e.target.value }),
    []
  );

  const sendSupportMessage = useCallback(
    (event) => {
      event.preventDefault();
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
      const emailValidation = validateEmail(email);
      if (!emailValidation.success) {
        dispatch({
          type: "email-error",
          emailError: emailValidation.message,
          message: emailValidation.message,
        });
        return;
      }

      dispatch({ type: "support-message-start" });
      // make axios post request
      ContactSupportExternal(firstName, lastName, email, supportMessage)
        .then((response) => {
          if (response.data.success) {
            dispatch({
              type: "support-message-success",
              message: response.data.message,
            });
            console.log("Message Sent!");
          } else {
            dispatch({
              type: "support-message-failure",
              message: response.data.message,
            });
          }
        })
        .catch((error) => {
          if (error.response) {
            dispatch({
              type: "support-message-failure",
              message: error.response.data.message,
            });
          }
          return;
        });
    },
    [waiting, finished, firstName, lastName, email, supportMessage]
  );
  return (
    <>
      <div className="contact-container">
        <Header>Your Health Starts Here</Header>
        {/* <Paragraph>We would love to hear your feedback</Paragraph> */}

        <FormContainer>
          <SizeContainer>
            <Form className="contact-form" onSubmit={sendSupportMessage}>
              <Form.Group className="mb-3">
                <GridContainer>
                  <Form.Control
                    className="textfield"
                    isInvalid={firstNameError}
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    name="firstName"
                    onChange={setFirstName}
                    style={{ width: "100%", boxSizing: "border-box" }}
                  />

                  <Form.Control
                    className="textfield"
                    type="text"
                    value={lastName}
                    isInvalid={lastNameError}
                    placeholder="Last Name"
                    name="lastName"
                    onChange={setLastName}
                  />
                </GridContainer>

                <Form.Control
                  className="textfield"
                  type="email"
                  isInvalid={emailError}
                  placeholder="Email"
                  name="email"
                  onChange={setEmail}
                  style={{
                    marginTop: "15px",
                  }}
                />

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    className="textarea"
                    as="textarea"
                    rows={3}
                    type="text"
                    isInvalid={messageError}
                    placeholder="Message"
                    name="username"
                    value={supportMessage}
                    onChange={setMessage}
                    style={{
                      marginTop: "15px",
                    }}
                  />
                </Form.Group>

                {submissionErrorMessage && (
                  <div style={{ paddingTop: 20 }}>
                    <Alert variant="danger">{submissionErrorMessage}</Alert>
                  </div>
                )}

                {successMessage && (
                  <div style={{ paddingTop: 20 }}>
                    <Alert variant="success">{successMessage}</Alert>
                  </div>
                )}

                <Button
                  value="Submit Message"
                  type="submit"
                  onClick={sendSupportMessage}
                  disabled={submissionErrorMessage}
                  style={{
                    width: "50px",
                    justifySelf: "center",
                    marginTop: "10px",
                  }}
                >
                  Send
                </Button>
              </Form.Group>
            </Form>
          </SizeContainer>
        </FormContainer>
      </div>
    </>
  );
};

export default ContactUsExt;

const FormContainer = styled.div`
  display: grid;
  justify-items: center;
`;

const SizeContainer = styled.div`
  width: 50%;
  margin-top: 50px;

  @media (max-width: 991px) {
    width: 90%;
  }
`;

const Button = styled.button`
  cursor: pointer;
  height: 54px;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #212529;
  font-weight: 100;
  background-color: #f5f5f5;
`;

const Header = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  color: #b3b3b3;
  text-align: center;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 20px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;
