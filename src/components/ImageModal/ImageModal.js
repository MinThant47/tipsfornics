import "./ImageModal.css";
import { FaRegTimesCircle } from "react-icons/fa";

const ImageModal = ({ imgModal, setImgModal, caption }) => {
  const handlesClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setImgModal(null);
    }
  };

  return (
    <div className="backdrop" onClick={handlesClick}>
      <FaRegTimesCircle
        className="close-imgModal-icon"
        onClick={() => setImgModal(null)}
      />
      <img className="full-img" src={imgModal} alt="" />
      <p>{caption}</p>
    </div>
  );
};

export default ImageModal;
