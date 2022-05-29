import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { DeactivateAccount } from '../../../api/ApiClient';

const DeactivationModal = ({ showModal, closeModal, authToken, setActivationMessage }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const handleDeactivation = () => {
    DeactivateAccount(authToken).then((response) => {
      if (response.data.success) {
        setActivationMessage(response.data.message);
        closeModal();
      } else {
        setErrorMessage(response.data.message);
      }
    })
    .catch(err => setErrorMessage(err.response.data.message));
  };
  return (
    <Modal
      onHide={closeModal}
      show={showModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure you want to proceed with deactivating your account?
        </Modal.Title>
      </Modal.Header>
        <div style={{ padding: '16px' }}>
        <p>
          Deactivation process will take 10 days, You will be able to reactivate
          your account whenever you want.
        </p>
        {<h2 style={{ color: 'red'}}>{errorMessage}</h2>}
        </div>
      <Modal.Footer>
        <Button onClick={handleDeactivation}>Deactivate Account</Button>
      </Modal.Footer>
    </Modal>
  );
};

const Wrapper = styled.div`
  // align-items: center;
  background: #ccc
  display: flex;
  height: 40vh;
  // justify-content: center;
  width: 90vw;
`;

const Assurance = styled.h1`
  padding-left: 16px;
  padding-right: 16px;
`;

const Button = styled.button`
  background-color: #008e26;
  color: #fff;
  margin-bottom: 8px;
  padding: 8px;

  + button {
    margin-left: 15px;
  }
`;

export default DeactivationModal;
