import { Link } from "react-router-dom";
import "./RecentTips.css";

const RecentTipCard = ({ id, img, title, category, caption }) => {
  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-3">
      <div className="recent-tips">
        <div className="img-area">
          <img src={img} alt={caption} />
        </div>
        <div className="content">
          <h5 className="text-grey">{title}</h5>
          <p className="text-capitalize text-grey">{category}</p>
          <Link to={`/tip-detail/${id}`} className="Btn-primary">
            Read Tip
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentTipCard;
