import "./AdminTipCard.css";
import { Link } from "react-router-dom";
import { HiBadgeCheck } from "react-icons/hi";
import { FaTimesCircle } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { useState, useEffect } from "react";
import ConfirmBox from "../ConfirmBox";
import { db } from "../../../../Firebase/Firebase";
import { storage } from "../../../../Firebase/Firebase";

const AdminTipCard = ({
  tip,
  id,
  edit,
  previewImg,
  previewCaption,
  img,
  vid,
  upload,
  category,
  title,
  summary,
  preview,
  createdAt,
}) => {
  const [up, setUp] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUp(upload);
  }, [upload]);

  const deleteFromStorage = (url) => {
    let pictureRef = storage.refFromURL(url);
    pictureRef.delete().catch((e) => {
      console.log(e.message);
    });
  };

  const handleDelete = (index) => {
    if (window.confirm("Delete this tip?")) {
      if (tip.images.length !== 0) {
        img.map((i) => {
          return deleteFromStorage(i.url);
        });
      }
      if (tip.videos.length !== 0) {
        vid.map((i) => {
          return deleteFromStorage(i.url);
        });
      }
      db.collection("tips").doc(index).delete();
    }
  };

  return (
    <div className="tip-card">
      <div className="img-card">
        <img src={previewImg} alt={previewCaption} />
      </div>

      <div className="content-card">
        <div className="header">
          <h5>
            {title} &nbsp;
            {up ? (
              <HiBadgeCheck
                style={{ color: "#38b000", cursor: "pointer" }}
                onClick={() => setOpen(true)}
              />
            ) : (
              <FaTimesCircle
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => setOpen(true)}
              />
            )}
          </h5>
          <small className="text-capitalize d-block text-grey">
            {category}
          </small>
          <small className="text-grey">
            (Edited: {<strong>{edit}</strong>} at
            {createdAt && createdAt.toDate().toDateString().slice(3)} )
          </small>
        </div>

        <hr />

        <div className="brief">
          <h6>Summary</h6>
          <p className="text-muted">
            {summary.length >= 200 ? summary.slice(0, 197) + "..." : summary}
          </p>
        </div>

        <div className="full">
          <h6>Full Article</h6>
          <p className="text-muted">
            {preview.length >= 200 ? preview.slice(0, 197) + "..." : preview}
          </p>
        </div>

        <Link
          className="Btn-primary"
          style={{ marginRight: 20 }}
          to={`/${process.env.REACT_APP_TFN_PASSCODE}/edit-tip/${id}`}
        >
          Edit Tip <HiOutlinePencil />
        </Link>
        <button
          onClick={() => handleDelete(id)}
          className="Btn Btn-danger"
          to="/"
        >
          Delete <AiOutlineDelete />
        </button>
      </div>

      <ConfirmBox
        id={id}
        text={"Please confirm to upload..."}
        up={up}
        setUp={setUp}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default AdminTipCard;
