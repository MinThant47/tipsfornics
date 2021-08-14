import "./AllTipsCard.css";
import { Link } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";

const AllTipsCard = ({
  id,
  img,
  caption,
  category,
  createdAt,
  title,
  preview,
}) => {
  return (
    <div className="tip-card" key={id}>
      <div className="img-card">
        <img src={img} alt={caption} />
      </div>

      <div className="content-card">
        <div className="header">
          <h5>{title}</h5>
          <small className="text-capitalize text-grey d-block">
            {category}
          </small>
          <small className="text-capitalize text-grey">
            <AiOutlineCalendar /> &nbsp;
            {createdAt && createdAt.toDate().toDateString().slice(3)}
          </small>
        </div>

        <hr />

        <p className="text-muted">
          {preview.length >= 200 ? preview.slice(0, 197) + "..." : preview}
        </p>
        <Link className="Btn-primary" to={`/tip-detail/${id}`}>
          Read Tip
        </Link>
      </div>
    </div>
  );
};

export default AllTipsCard;
