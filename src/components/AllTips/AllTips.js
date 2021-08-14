import "./AllTips.css";
import AllTipsCard from "./AllTipsCard";
import { useTip } from "../../contexts/TipContext";
import { useState, useEffect } from "react";
import { BiSad } from "react-icons/bi";
import SkeletonTip from "../../Skeleton/SkeletonTip";

const AllTips = () => {
  const { tips, categories } = useTip();
  const [cat, setCat] = useState("all category");
  const [filterTips, setFilterTips] = useState(null);
  const [searchTips, setSearchTips] = useState(null);
  const [search, setSearch] = useState("");
  const [finalTips, setFinalTips] = useState(null);

  useEffect(() => {
    if (search !== "") {
      setSearchTips(
        tips &&
          tips.filter(
            (tip) =>
              tip.upload === true &&
              tip.title.toLowerCase().includes(search.toLowerCase())
          )
      );
    }
  }, [tips, search]);

  useEffect(() => {
    cat === "all category"
      ? setFilterTips(tips && tips.filter((tip) => tip.upload === true))
      : setFilterTips(
          tips &&
            tips.filter((tip) => tip.upload === true && tip.category === cat)
        );
  }, [tips, cat, search]);

  useEffect(() => {
    if (search !== "") {
      setFinalTips(searchTips);
    } else {
      setFinalTips(filterTips);
      setSearchTips("");
    }
  }, [tips, search, searchTips, filterTips]);

  return (
    <>
      <section id="all-tips">
        <div className="all-tips container">
          <div
            id="searchBar"
            className="row justify-content-start align-items-center"
          >
            <div className="col-7 col-sm-7 col-md-9 col-lg-9">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>

            <div className="col-5 col-sm-5 col-md-3 col-lg-3">
              <select
                id="select-box"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="form-select"
              >
                <option value="all category">All Category</option>
                {categories &&
                  categories.map((cat) => {
                    return (
                      <option key={cat.id} value={cat.category}>
                        {cat.category}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <h6
            className="text-uppercase fw-bold text-grey"
            style={{ paddingBottom: 20, letterSpacing: 1 }}
          >
            {search !== "" ? "Search Result" : cat}
          </h6>

          {tips.length === 0 &&
            [1, 2, 3, 4, 5].map((n) => {
              return <SkeletonTip key={n} />;
            })}

          {finalTips &&
            finalTips.map((tip) => {
              return (
                <AllTipsCard
                  key={tip.id}
                  id={tip.id}
                  img={
                    tip.images.length !== 0
                      ? tip.images[0].url
                      : "https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg"
                  }
                  caption={
                    tip.images.length !== 0
                      ? tip.images[0].name
                      : "placeholder-image"
                  }
                  createdAt={tip.createdAt}
                  category={tip.category}
                  title={tip.title}
                  preview={tip.paragraph}
                />
              );
            })}

          {searchTips && searchTips.length === 0 ? (
            <div className="card">
              <div className="card-body text-grey">
                Sorry, no tip was found. <BiSad />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
      <br />
    </>
  );
};

export default AllTips;
