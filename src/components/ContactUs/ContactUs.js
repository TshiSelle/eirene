import React, { useCallback, useReducer } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { ContactSupport } from "../../api/ApiClient";
import { validateMessage } from "../../validators/validators";
import { Alert, Form } from "react-bootstrap";
import "./contactus.css";
import { useAuthenticator } from "../../context/AuthContext";

const reducer = (state, action) => {
  // These cases are taken into consideration by the dispatches used in the useCallbacks down below,
  // This is where the values get set.
  switch (action.type) {
    // error states
    case "validation-error":
      return { ...state, submissionErrorMessage: action.message };
    case "message-error":
      return {
        ...state,
        messageError: action.message,
        submissionErrorMessage: action.message,
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

const ContactUs = () => {
  const [state, dispatch] = useReducer(reducer, {
    supportMessage: "",
    submissionErrorMessage: "",
    messageError: null,
    waiting: false,
    successMessage: "",
    finished: false,
  });
  const { authToken } = useAuthenticator();

  const {
    supportMessage,
    submissionErrorMessage,
    messageError,
    waiting,
    finished,
    successMessage,
  } = state;

  const setMessage = useCallback(
    (e) => dispatch({ type: "set-content", value: e.target.value }),
    []
  );

  const sendSupportMessage = useCallback(
    (event) => {
      event.preventDefault();
      if (waiting || finished) return;
      const { success, message } = validateMessage(supportMessage);
      if (!success) {
        dispatch({ type: "support-message-failure", message });
        return;
      }
      dispatch({ type: "support-message-start" });
      // make axios post request
      ContactSupport(authToken, supportMessage)
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
    [waiting, finished, supportMessage]
  );
  return (
    <>
      <Header>Your Health Starts Here</Header>
      {/* <Paragraph>We would love to hear your feedback</Paragraph> */}

      <FormContainer>
        <SizeContainer>
          <Form className="contact-form" onSubmit={sendSupportMessage}>
            <Form.Group className="mb-3">
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
                  backgroundColor: "#f5f5f5",
                }}
              >
                Send
              </Button>
            </Form.Group>
          </Form>
        </SizeContainer>
      </FormContainer>
    </>
  );
};

export default ContactUs;

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
`;
