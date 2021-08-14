import Shimmer from "./shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonTip = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="tip-card">
        <div className="img-card">
          <SkeletonElement type={"thumbnail"} />
        </div>

        <div className="content-card">
          <SkeletonElement type={"title"} />

          <SkeletonElement type={"category"} />

          <SkeletonElement type={"text"} />

          <SkeletonElement type={"text-2"} />
          <SkeletonElement type={"title-2"} />
          <SkeletonElement type={"text-3"} />
        </div>
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonTip;
