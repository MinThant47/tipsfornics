import "./RecentTips.css";
import moreTipsSvg from "../../../img/reading tips.svg";
import { Link } from "react-router-dom";
import { BsArrowBarRight } from "react-icons/bs";
import RecentTipCard from "./RecentTipCard";
import { useTip } from "../../../contexts/TipContext";
import SkeletonRecent from "../../../Skeleton/SkeletonRecent";

const RecentTips = () => {
  const { tips } = useTip();
  const uploadTips = tips.filter((tip) => tip.upload === true);
  const recent = uploadTips.slice(0, 3);

  return (
    <>
      <section id="recent-tips">
        <h3 className="fw-bold text-grey text-center title-text">
          Recent Tips
        </h3>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            {tips.length === 0 &&
              [1, 2, 3].map((n) => {
                return <SkeletonRecent key={n} />;
              })}
            {recent &&
              recent.map((r) => {
                return (
                  <RecentTipCard
                    key={r.id}
                    id={r.id}
                    img={
                      r.images.length !== 0
                        ? r.images[0].url
                        : "https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg"
                    }
                    title={r.title}
                    category={r.category}
                    caption={
                      r.images.length !== 0
                        ? r.images[0].name
                        : "placeholder-image"
                    }
                  />
                );
              })}

            <div className="col-12 col-sm-12 col-md-6 col-lg-3">
              <div className="recent-tips">
                <div className="text-center more-tips">
                  <Link className="text-grey" to="/all-tips">
                    <img src={moreTipsSvg} alt="" />
                    <p>
                      To More Tips &nbsp;
                      <BsArrowBarRight />
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
    </>
  );
};

export default RecentTips;
