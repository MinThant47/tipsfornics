import { Modal } from "react-bootstrap";

const AlertBox = ({ text, open, setOpen }) => {
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Modal show={open} onHide={closeModal}>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <button onClick={closeModal} className="btn btn-secondary">
          OK!
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertBox;
