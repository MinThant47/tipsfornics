import { Modal } from "react-bootstrap";
import { db } from "../../../Firebase/Firebase";
import { timestamp } from "../../../Firebase/Firebase";
import { useAuth } from "../../../contexts/AuthContext";

const ConfirmBox = ({ id, text, up, setUp, open, setOpen }) => {
  const { username } = useAuth();
  const closeModal = () => {
    setOpen(false);
  };

  const upload = () => {
    setUp(!up);
    setOpen(false);
    const time = timestamp();
    db.collection("tips").doc(id).update({
      upload: !up,
      lastedit: username,
      createdAt: time,
    });
  };

  return (
    <Modal show={open} onHide={closeModal}>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <button
          onClick={upload}
          className="Btn-primary"
          style={{ fontSize: 18 }}
        >
          Enter
        </button>
        <button onClick={closeModal} className="btn btn-secondary">
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmBox;
