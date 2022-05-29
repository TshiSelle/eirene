import { useState } from "react";
import { Toast } from "react-bootstrap";
import "./VerificationPopUp.css";

const VerificationPopUp = () => {
  const [show, setShow] = useState(true);
  return (
    <Toast className="d-inline-block m-1 vpopup" bg="light" autohide show={show} onClose={() => setShow(false)}>
      <Toast.Header>
        <img
          src="https://res.cloudinary.com/cloudloom/image/upload/v1653671627/logo/eireneFace_co9szd.png"
          className="rounded me-2"
          alt="eirene logo"
          width="13"
        />
        <strong className="me-auto">Eirene</strong>
      </Toast.Header>
      <Toast.Body className="Light">Hey, we sent you a verification link. Check your email!</Toast.Body>
    </Toast>
  );
};

export default VerificationPopUp;
