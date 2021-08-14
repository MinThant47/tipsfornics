import SkeletonElement from "./SkeletonElement";

const SkeletonDetail = () => {
  return (
    <section className="tip-detail">
      <div className="container">
        <SkeletonElement type={"thumbnail"} />
        <div className="header">
          <SkeletonElement type={"title-2"} />
          <SkeletonElement type={"title"} />
        </div>
        <hr />

        <SkeletonElement type={"text-2"} />
        <SkeletonElement type={"text-1"} />
        <SkeletonElement type={"text-3"} />

        <SkeletonElement type={"text-2"} />
        <SkeletonElement type={"text-1"} />
        <SkeletonElement type={"text-3"} />
      </div>
    </section>
  );
};

export default SkeletonDetail;
