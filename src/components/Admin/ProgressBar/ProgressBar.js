import "./ProgressBar.css";
import { TiTimes } from "react-icons/ti";
import { useState } from "react";
import ConfirmBox from "../Dashboard/ConfirmBox";

const ProgressBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="backdrop">
        <div className="loading-card">
          <TiTimes className="cross-icon" onClick={() => setOpen(true)} />
          <h4>Uploading...</h4>
          <div className="progress">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
      <ConfirmBox text={"Cancel uploading?"} open={open} setOpen={setOpen} />
    </>
  );
};

export default ProgressBar;
