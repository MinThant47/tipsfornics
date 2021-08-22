import "./Dashboard.css";
import { useState, useEffect } from "react";
import AdminTipCard from "./AdminTipCard/AdminTipCard";
import { Link } from "react-router-dom";
import { useTip } from "../../../contexts/TipContext";
import { BiSad } from "react-icons/bi";
import SkeletonTip from "../../../Skeleton/SkeletonTip";

const Dashboard = () => {
  const { tips, categories } = useTip();
  const [cat, setCat] = useState("all category");
  const [filterTips, setFilterTips] = useState(null);

  const [search, setSearch] = useState("");
  const [searchTips, setSearchTips] = useState(null);
  const [finalTips, setFinalTips] = useState(null);

  useEffect(() => {
    if (search !== "") {
      setSearchTips(
        tips &&
          tips.filter((tip) =>
            tip.title.toLowerCase().includes(search.toLowerCase())
          )
      );
    } else {
      setSearchTips(null);
    }
  }, [tips, search]);

  useEffect(() => {
    cat === "all category"
      ? setFilterTips(tips)
      : setFilterTips(tips && tips.filter((tip) => tip.category === cat));
  }, [tips, cat]);

  useEffect(() => {
    search !== "" ? setFinalTips(searchTips) : setFinalTips(filterTips);
  }, [tips, search, searchTips, filterTips]);

  return (
    <section id="dashboard">
      <div className="container">
        <div
          id="category"
          className="row justify-content-start align-items-center"
        >
          <div className="col-6">
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
          <div className="col-3">
            <Link
              to={`/${process.env.REACT_APP_TFN_PASSCODE}/add-new-tip`}
              className="fw-bold Btn-outline"
            >
              +
            </Link>
          </div>

          <div className="col-3">
            <Link to={`/${process.env.REACT_APP_TFN_PASSCODE}/profile`}>
              Profile Page
            </Link>
          </div>
        </div>
        <div
          id="searchBar"
          className="row justify-content-start align-items-center"
        >
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Search"
            />
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
              <AdminTipCard
                tip={tip}
                key={tip.id}
                id={tip.id}
                previewImg={
                  tip.images.length !== 0
                    ? tip.images[0].url
                    : "https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg"
                }
                img={tip.images.length !== 0 ? tip.images : null}
                vid={tip.videos.length !== 0 ? tip.videos : null}
                edit={tip.lastedit}
                upload={tip.upload}
                title={tip.title}
                category={tip.category}
                summary={tip.summary}
                preview={tip.paragraph}
                createdAt={tip.createdAt}
              />
            );
          })}
        {searchTips && searchTips.length === 0 ? (
          <div className="card mb-5">
            <div className="card-body text-grey">
              Sorry, no tip was found. <BiSad />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
