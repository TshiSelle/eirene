import React from "react";
import { Modal, Button } from 'react-bootstrap';

const CheckEmailModal = ({ showModal, handleHomeRedirect, ...props }) => {
  return (
    <Modal show={showModal} aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
            Verify your email!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
            We sent you an email, please go to your email and verify it!
        </p>
      </Modal.Body>
      <p style={{ fontWeight: 500, color: 'red', paddingLeft: 20, fontSize: '17px' }}>
        If you dont want to verify your email then press the button down below
      </p>
      <Modal.Footer>
        <Button variant="danger" onClick={handleHomeRedirect}>
          Go to Home page!  
        </Button>
      </Modal.Footer>
  </Modal>
    );
};

export default CheckEmailModal;