import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";

const ExploreItems = ({ exploreItems, loading, error }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortBy, setSortBy] = useState("");

  const emptyArray = Array(8).fill(0);

  const handleLoadMore = () => {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + 4, exploreItems.length),
    );
  };

  const sortedItems = [...exploreItems];

  if (sortBy === "price_low_to_high") {
    sortedItems.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "price_high_to_low") {
    sortedItems.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "likes_high_to_low") {
    sortedItems.sort((a, b) => b.likes - a.likes);
  }

  return (
    <>
      <div>
        <select id="filter-items" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        emptyArray.map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Skeleton width="50px" height="50px" borderRadius="50%" />
              </div>
              <div
                className="de_countdown"
                style={{ background: "transparent", border: "none", padding: 0 }}
              >
                <Skeleton width="70px" height="14px" borderRadius="10px" />
              </div>
              <div className="nft__item_wrap">
                <Skeleton width="100%" height="100%" borderRadius="8px" />
              </div>
              <div className="nft__item_info mt-3">
                <Skeleton width="65%" height="18px" borderRadius="4px" />
                <div className="mt-2">
                  <Skeleton width="35%" height="16px" borderRadius="4px" />
                </div>
                <div className="mt-2 d-flex justify-content-end">
                  <Skeleton width="42px" height="14px" borderRadius="4px" />
                </div>
              </div>
            </div>
          </div>
        ))
      ) : error ? (
        <div className="col-md-12 text-center">
          <p>{error}</p>
        </div>
      ) : (
        sortedItems
          .slice(0, visibleCount)
          .map(
            ({
              id,
              authorId,
              authorImage,
              nftImage,
              nftId,
              title,
              price,
              likes,
              expiryDate,
            }) => (
              <div
                key={id}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    >
                      <img className="lazy" src={authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <Countdown expiration={expiryDate} />

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to={`/item-details/${nftId}`}>
                      <img
                        src={nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${nftId}`}>
                      <h4>{title}</h4>
                    </Link>
                    <div className="nft__item_price">{price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )
      )}
      {!loading && !error && visibleCount < exploreItems.length && (
        <div className="col-md-12 text-center">
          <button
            onClick={handleLoadMore}
            id="loadmore"
            className="btn-main lead"
            type="button"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
