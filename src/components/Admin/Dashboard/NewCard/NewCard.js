import { useState, useRef, useEffect } from "react";
import { timestamp } from "../../../../Firebase/Firebase";
import { useHistory } from "react-router-dom";
import { db } from "../../../../Firebase/Firebase";
import { storage } from "../../../../Firebase/Firebase";
import { useAuth } from "../../../../contexts/AuthContext";
import { useTip } from "../../../../contexts/TipContext";
import ImgSelect from "./ImgSelect";
import { AiOutlineMinusCircle } from "react-icons/ai";
import useWarning from "../../../../hooks/useWarning";

const NewCard = () => {
  const [Prompt, setDirty, setClean] = useWarning();
  const { username } = useAuth();
  const { categories } = useTip();
  const [cat, setCat] = useState("");

  const [loading, setLoading] = useState(false);
  const [othercat, setOthercat] = useState("");
  const [finalCat, setFinalCat] = useState("");
  const [defaultCat, setDefaultCat] = useState("");

  const [img, setImg] = useState([]);
  const [vid, setVid] = useState([]);

  const titleRef = useRef();
  const summaryRef = useRef();
  const fullRef = useRef();

  const history = useHistory();

  useEffect(() => {
    if (categories.length !== 0) {
      setDefaultCat(categories[0].category);
    }
  }, [categories]);

  useEffect(() => {
    if (cat === "other") {
      setFinalCat(othercat);
    } else {
      cat === "" ? setFinalCat(defaultCat) : setFinalCat(cat);
    }
  }, [cat, othercat, defaultCat]);

  const handleSubmit = (e) => {
    setClean();
    setLoading(true);
    e.preventDefault();
    const time = timestamp();

    if (cat === "other" && othercat !== "") {
      db.collection("categories")
        .add({
          createdAt: time,
          category: othercat.toLowerCase(),
        })
        .catch((e) => {
          console.log(e.message);
        });
    }

    db.collection("tips")
      .add({
        title: titleRef.current.value,
        summary: summaryRef.current.value,
        createdAt: time,
        paragraph: fullRef.current.value,
        lastedit: username,
        upload: false,
        images: img,
        category: finalCat.toLowerCase(),
        videos: vid,
      })
      .then(() => {
        setLoading(false);
        history.push(`/${process.env.REACT_APP_TFN_PASSCODE}/dashboard`);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const deleteFromStorage = (url) => {
    let pictureRef = storage.refFromURL(url);
    pictureRef
      .delete()
      .then(() => {
        setImg(img.filter((i) => i.url !== url));
        setVid(vid.filter((i) => i.url !== url));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          {img &&
            img.map((t, index) => {
              return (
                <div key={index} className="col-6 col-sm-6 col-md-4 col-lg-3">
                  <div className="img-wrap">
                    <div className="overlay">
                      <AiOutlineMinusCircle
                        className="icon"
                        onClick={() => {
                          deleteFromStorage(t.url);
                        }}
                      />
                    </div>
                    <img src={t.url} alt="" />
                  </div>
                </div>
              );
            })}
          {vid &&
            vid.map((t, index) => {
              return (
                <div key={index} className="col-6 col-sm-6 col-md-4 col-lg-3">
                  <div className="img-wrap">
                    <div className="overlay">
                      <AiOutlineMinusCircle
                        className="icon"
                        onClick={() => {
                          deleteFromStorage(t.url);
                        }}
                      />
                    </div>
                    <video key={index} src={t.url}></video>
                  </div>
                </div>
              );
            })}
        </div>

        <ImgSelect setDirty={setDirty} setImg={setImg} setVid={setVid} />

        <div className="row">
          <form>
            <div className="form-group">
              <input
                disabled={loading}
                required
                ref={titleRef}
                type="text"
                className="form-control"
                placeholder="Article Title"
                onChange={() => {
                  setDirty();
                }}
              />
            </div>
            {cat !== "other" ? (
              <div className="my-4 form-group">
                <select
                  id="select-box"
                  className="form-select"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                >
                  {categories &&
                    categories.map((category, index) => {
                      return (
                        <option key={index} value={category.category}>
                          {category.category}
                        </option>
                      );
                    })}
                  <option value="other">other</option>
                </select>
              </div>
            ) : (
              <>
                <div className="my-4 form-group">
                  <input
                    disabled={loading}
                    required
                    onChange={(e) => {
                      setOthercat(e.target.value);
                      setDirty();
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Enter new category"
                  />
                </div>
                {
                  <button
                    onClick={() => {
                      setOthercat("");
                      setCat(defaultCat);
                    }}
                    className="Btn-primary"
                  >
                    X
                  </button>
                }
              </>
            )}
            <div className="my-4 form-group">
              <textarea
                required
                disabled={loading}
                ref={summaryRef}
                className="form-control"
                rows="3"
                onChange={() => {
                  setDirty();
                }}
                placeholder="Summary"
              ></textarea>
            </div>
            <div className="my-4 form-group">
              <textarea
                disabled={loading}
                ref={fullRef}
                className="form-control"
                rows="10"
                onChange={() => {
                  setDirty();
                }}
                placeholder="Full Article"
              ></textarea>
            </div>
            <div className="button-row d-flex justify-content-start">
              <button
                disabled={loading}
                onClick={(e) => {
                  handleSubmit(e);
                }}
                type="submit"
                className="Btn-primary"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  history.goBack();
                }}
                disabled={loading}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {Prompt}
    </section>
  );
};

export default NewCard;
