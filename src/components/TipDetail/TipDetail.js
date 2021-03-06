import "./TipDetail.css";
import ImageModal from "../ImageModal/ImageModal";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useTip } from "../../contexts/TipContext";
import SkeletonDetail from "../../Skeleton/SkeletonDetail";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsArrowBarRight } from "react-icons/bs";

const TipDetail = () => {
  const { id } = useParams();
  const [imgModal, setImgModal] = useState(null);
  const [caption, setCaption] = useState("");

  const { tips } = useTip();

  const [title, setTitle] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [category, setCategory] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [firstImg, setFirstImg] = useState("");
  const [otherImg, setotherImg] = useState([]);
  const [video, setVideo] = useState([]);

  const history = useHistory();

  useEffect(() => {
    imgModal !== null
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  });

  useEffect(() => {
    if (tips.length !== 0) {
      const filteratedTip = tips.filter((tip) => tip.id === id);
      setTitle(filteratedTip[0].title);
      setParagraph(filteratedTip[0].paragraph);
      setCreatedAt(filteratedTip[0].createdAt);
      setCategory(filteratedTip[0].category);
      setFirstImg(filteratedTip[0].images[0]);

      if (filteratedTip[0].videos.length >= 1) {
        let doc = [];
        filteratedTip[0].videos.forEach((vid) => {
          doc.push(vid);
        });
        setVideo(doc);
      }

      if (filteratedTip[0].images.length > 1) {
        let doc = [];
        filteratedTip[0].images.slice(1).forEach((img) => {
          doc.push(img);
        });
        setotherImg(doc);
      }
    }
  }, [tips, id]);

  const handleClick = (img, img_caption) => {
    setImgModal(img);
    setCaption(img_caption);
  };
  return (
    <>
      {tips.length === 0 && <SkeletonDetail />}
      <section className="tip-detail" key={firstImg.name}>
        <div className="container">
          <div className="img-detail">
            <img
              src={firstImg.url}
              onClick={() => handleClick(firstImg.url, firstImg.name)}
              alt={firstImg.name}
            />
          </div>
          <div className="header">
            <h5>{title}</h5>
            <small className="text-capitalize d-block text-grey">
              {category}
            </small>
            <small className="text-capitalize text-grey">
              <AiOutlineCalendar /> &nbsp;
              {createdAt && createdAt.toDate().toDateString().slice(3)}
            </small>
          </div>
          <hr />

          <p className="text-muted">{paragraph}</p>

          <div className="mt-5 row align-items-sm-center justify-content-sm-center align-items-lg-center justify-content-lg-start">
            {otherImg &&
              otherImg.map((i, index) => {
                return (
                  <div
                    key={index}
                    className="other-img mb-4 col-12 col-sm-12 col-md-6 col-lg-4"
                  >
                    <div className="img-details mb-4">
                      <img
                        src={i.url}
                        onClick={() => handleClick(i.url, i.name)}
                        alt={i.name}
                      />
                    </div>
                  </div>
                );
              })}
            {video &&
              video.map((vid, index) => {
                return (
                  <div
                    key={index}
                    className="other-img mb-4 col-12 col-sm-12 col-md-6"
                  >
                    <div className="video-container">
                      <video
                        key={index}
                        webkit-playsinline="true"
                        controls
                        className="videoLandscape"
                        src={vid.url}
                      ></video>
                    </div>
                  </div>
                );
              })}
          </div>
          <button
            className="Btn-primary"
            // style={{ float: "right" }}
            onClick={() => {
              history.goBack();
            }}
          >
            Back to the tips <BsArrowBarRight />
          </button>
        </div>
        {imgModal && (
          <ImageModal
            imgModal={imgModal}
            setImgModal={setImgModal}
            caption={caption}
          />
        )}
      </section>

      <br />
      <br />
    </>
  );
};

export default TipDetail;
