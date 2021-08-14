import SkeletonElement from "./SkeletonElement";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Shimmer from "./shimmer";

const SkeletonQuestions = () => {
  return (
    <div className="question-card skeleton-wrapper">
      <small>
        <AiOutlineUser />
      </small>
      <SkeletonElement type={"title"} />
      <small>
        <AiOutlineMail />
      </small>
      <SkeletonElement type={"title-2"} />
      <small>
        Question <AiOutlineQuestionCircle />
      </small>
      <SkeletonElement type={"text"} />
      <Shimmer />
    </div>
  );
};

export default SkeletonQuestions;
