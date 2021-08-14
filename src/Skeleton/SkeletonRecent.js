import SkeletonElement from "./SkeletonElement";

const SkeletonRecent = () => {
  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-3">
      <div className="recent-tips">
        <div className="img-area">
          <SkeletonElement type={"thumbnail-full"} />
        </div>
        <div className="content">
          <SkeletonElement type={"title"} />
          <SkeletonElement type={"title-2"} />
          <SkeletonElement type={"title"} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonRecent;
