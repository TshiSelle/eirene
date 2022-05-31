import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { DeactivateAccount, ReactivateAccount } from "../../../api/ApiClient";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useUser } from "../../../context/UserContext";

const DeactivationModal = ({
  showModal,
  closeModal,
  authToken,
  setDate,
  setMessage,
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { user } = useUser();
  const [isLoading, setLoading] = useState(false);
  const handleDeactivation = () => {
    setLoading(true);
    DeactivateAccount(authToken)
      .then((response) => {
        if (response.data.success) {
          setLoading(false);
          setDate(true);
          setMessage("Account entered deactivation process");
          closeModal();
        } else {
          setLoading(false);
          setErrorMessage(response.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
      <div style={{ padding: "16px" }}>
        <p>
          Deactivation process will take 10 days, You will be able to reactivate
          your account whenever you want.
        </p>
        {<h2 style={{ color: "red" }}>{errorMessage}</h2>}
      </div>
      <Modal.Footer>
        <Button onClick={handleDeactivation} className="confirm-deactivate">
          Deactivate Account
        </Button>
      </Modal.Footer>
      <LoadingSpinner display={isLoading} />
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
  background-color: #cc0000;
  color: #fff;
  margin-bottom: 8px;
  padding: 8px;

  + button {
    margin-left: 15px;
  }
`;

export default DeactivationModal;
