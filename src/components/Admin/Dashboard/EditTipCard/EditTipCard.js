import "./EditTipCard.css";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTip } from "../../../../contexts/TipContext";
import { useAuth } from "../../../../contexts/AuthContext";
import ImgSelect from "../NewCard/ImgSelect";
import { db } from "../../../../Firebase/Firebase";
import { storage } from "../../../../Firebase/Firebase";
import { timestamp } from "../../../../Firebase/Firebase";
import { useHistory } from "react-router-dom";

const EditTipCard = () => {
  const [cat, setCat] = useState("");

  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [paragraph, setParagraph] = useState();

  const [loading, setLoading] = useState(false);

  const [img, setImg] = useState([]);
  const [vid, setVid] = useState([]);

  const [othercat, setOthercat] = useState("");
  const [finalCat, setFinalCat] = useState("");
  const [defaultCat, setDefault] = useState("");

  const { id } = useParams();
  const { username } = useAuth();
  const { tips, categories } = useTip();

  const history = useHistory();

  useEffect(() => {
    if (cat === "other") {
      setFinalCat(othercat);
    } else {
      cat === "" ? setFinalCat(defaultCat) : setFinalCat(cat);
    }
  }, [cat, othercat, defaultCat]);

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

  const handleSubmit = (e) => {
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
      .doc(id)
      .update({
        title: title,
        summary: summary,
        createdAt: time,
        paragraph: paragraph,
        lastedit: username,
        images: img,
        videos: vid,
        category: finalCat.toLowerCase(),
      })
      .then(() => {
        setLoading(false);
        history.push(`/${process.env.REACT_APP_TFN_PASSCODE}/dashboard`);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    if (tips) {
      const filteratedTip = tips.filter((tip) => tip.id === id);

      setTitle(filteratedTip[0].title);
      setSummary(filteratedTip[0].summary);
      setParagraph(filteratedTip[0].paragraph);
      setImg([...filteratedTip[0].images]);
      setVid([...filteratedTip[0].videos]);
      setCat(filteratedTip[0].category);
      setDefault(filteratedTip[0].category);
    }
  }, [tips, id]);

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          {img.length !== 0 ? (
            img.map((i, index) => {
              return (
                <div className="col-6 col-sm-6 col-md-4 col-lg-3" key={index}>
                  <div className="img-wrap">
                    <div className="overlay">
                      <AiOutlineMinusCircle
                        className="icon"
                        onClick={() => {
                          deleteFromStorage(i.url);
                        }}
                      />
                    </div>
                    <img src={i.url} alt="" />
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
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

        <ImgSelect setImg={setImg} setVid={setVid} />

        <div className="row">
          <form>
            <div className="form-group">
              <input
                type="text"
                disabled={loading}
                className="form-control"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article Title"
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
                    required
                    onChange={(e) => {
                      setOthercat(e.target.value);
                    }}
                    type="text"
                    disabled={loading}
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
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="form-control"
                rows="3"
                placeholder="Summary"
              ></textarea>
            </div>
            <div className="my-4 form-group">
              <textarea
                required
                disabled={loading}
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                className="form-control"
                rows="10"
                placeholder="Full Article"
              ></textarea>
            </div>
            <div className="button-row d-flex justify-content-start">
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="Btn-primary"
              >
                Submit
              </button>
              <button
                disabled={loading}
                onClick={() => {
                  history.push(
                    `/${process.env.REACT_APP_TFN_PASSCODE}/dashboard`
                  );
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditTipCard;
