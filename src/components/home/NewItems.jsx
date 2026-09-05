import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const NewItemCountdown = ({ expiration }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    if (!expiration) {
      return undefined;
    }

    let cancelId;
    let lastSecond = Math.floor(Date.now() / 1000);

    const updateCountdown = () => {
      const now = Date.now();
      const currentSecond = Math.floor(now / 1000);

      if (lastSecond !== currentSecond) {
        lastSecond = currentSecond;
        setCurrentTime(now);
      }

      cancelId = requestAnimationFrame(updateCountdown);
    };

    cancelId = requestAnimationFrame(updateCountdown);

    return () => cancelAnimationFrame(cancelId);
  }, [expiration]);

  if (!expiration) {
    return <div className="de_countdown">Expired</div>;
  }

  const millisecondsLeft = expiration - currentTime;

  if (millisecondsLeft <= 0) {
    return <div className="de_countdown">Expired</div>;
  }

  const totalWholeSeconds = Math.floor(millisecondsLeft / 1000);
  const seconds = totalWholeSeconds % 60;
  const minutes = Math.floor((totalWholeSeconds % 3600) / 60);
  const hours = Math.floor(totalWholeSeconds / 3600);
  const secondsText = seconds.toString().padStart(2, "0");
  const minutesText = minutes.toString().padStart(2, "0");

  return <div className="de_countdown">{`${hours}h ${minutesText}m ${secondsText}s`}</div>;
};

const NewItems = ({ newItems, loading, error }) => {

  const responsive = {
    0: { items: 1 },
    576: { items: 2 },
    768: { items: 3 },
    1200: { items: 4 },
  };

  const emptyArray = Array(4).fill(0);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <OwlCarousel
              className="new-items_carousel"
              items={4}
              loop
              margin={10}
              nav
              responsive={responsive}
              key="loading"
            >
              {emptyArray.map((_, index) => {
                return (
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="mb-3 ms-2">
                      <Skeleton
                        width="90px"
                        height="18px"
                        borderRadius="10px"
                      />
                    </div>
                    <div className="nft__item_wrap">
                      <Skeleton width="100%" height="100%" borderRadius="8px" />
                    </div>
                    <div className="nft__item_info mt-3">
                      <Skeleton width="65%" height="18px" borderRadius="4px" />
                      <div className="mt-2">
                        <Skeleton
                          width="35%"
                          height="16px"
                          borderRadius="4px"
                        />
                      </div>
                      <div className="mt-2 d-flex justify-content-end">
                        <Skeleton
                          width="42px"
                          height="14px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </OwlCarousel>
          ) : error ? (
            <div className="col-lg-12">
              <div className="text-center">
                <p>{error}</p>
              </div>
            </div>
          ) : (
            newItems.length > 0 && (
              <OwlCarousel
                className="new-items_carousel"
                items={4}
                loop
                margin={10}
                nav
                responsive={responsive}
              >
                {newItems.map(
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
                    <div className="nft__item" key={id}>
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <NewItemCountdown expiration={expiryDate} />

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
                        <Link to="/item-details">
                          <h4>{title}</h4>
                        </Link>
                        <div className="nft__item_price">{price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{likes}</span>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </OwlCarousel>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
