import { useState } from "react";
import { Alert } from "react-bootstrap";
import { RiImageAddFill } from "react-icons/ri";
import { storage } from "../../../../Firebase/Firebase";

const ImgSelect = ({ setImg, setVid }) => {
  const [error, setError] = useState();

  const [progress, setProgress] = useState(0);
  const types = ["image/png", "image/jpeg", "video/mp4", "video/m4v"];
  const imgType = ["image/png", "image/jpeg"];
  const vidType = ["video/mp4", "video/m4v"];

  const onChangeHandler = (e) => {
    let selectedfiles = e.target.files;

    for (let i = 0, numFiles = selectedfiles.length; i < numFiles; i++) {
      if (selectedfiles[i] && types.includes(selectedfiles[i].type)) {
        setError("");

        if (imgType.includes(selectedfiles[i].type)) {
          const storageRef = storage.ref(`images/${selectedfiles[i].name}`);
          storageRef.put(selectedfiles[i]).on(
            "state_changed",
            (snap) => {
              let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
              setProgress(percentage);
            },
            (err) => {
              setError(err);
            },
            async () => {
              const url = await storageRef.getDownloadURL();
              const name = selectedfiles[i].name;
              setImg((oldimg) => [...oldimg, { url, name }]);
            }
          );
        } else if (vidType.includes(selectedfiles[i].type)) {
          const storageRef = storage.ref(`videos/${selectedfiles[i].name}`);
          storageRef.put(selectedfiles[i]).on(
            "state_changed",
            (snap) => {
              let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
              setProgress(percentage);
            },
            (err) => {
              setError(err);
            },
            async () => {
              const url = await storageRef.getDownloadURL();
              const name = selectedfiles[i].name;
              setVid((oldVid) => [...oldVid, { url, name }]);
            }
          );
        }
      } else {
        setError("Please select valid image (png/jpg) or video (mp4/m4v)");
      }
    }
  };
  return (
    <>
      <label
        className="mt-4 add-image"
        htmlFor="file"
        style={{ marginBottom: 25 }}
      >
        <RiImageAddFill className="add-icon" />
        <small className="text-grey"> Add Image/ Video </small>
      </label>
      <input type="file" onChange={onChangeHandler} id="file" multiple />
      {error && (
        <Alert style={{ marginBottom: 25 }} variant="danger">
          {error}
        </Alert>
      )}
      {progress !== 0 && (
        <Alert style={{ marginBottom: 25 }} variant="success">
          {progress}% completed.
        </Alert>
      )}
    </>
  );
};

export default ImgSelect;
