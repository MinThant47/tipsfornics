import { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";

const AdminPWModal = ({ submit }) => {
  const [open, setOpen] = useState(false);
  const [passcode, setPasscode] = useState("");

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    submit(passcode);
    e.preventDefault();
    closeModal();
  };

  useEffect(() => {
    openModal();
  }, []);
  return (
    <Modal show={open} onHide={closeModal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label> Admin Passcode </Form.Label>

            <Form.Control
              type="password"
              required
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={closeModal} className="Btn-primary">
            Submit
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AdminPWModal;
