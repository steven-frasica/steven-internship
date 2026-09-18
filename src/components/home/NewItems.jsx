import React from "react";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";
import NftItemCard from "../UI/NftItemCard";


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
        <div className="row" data-aos="fade">
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
                    <NftItemCard
                      key={id}
                      authorId={authorId}
                      authorImage={authorImage}
                      nftId={nftId}
                      nftImage={nftImage}
                      title={title}
                      price={price}
                      likes={likes}
                      expiryDate={expiryDate}
                      showCountdown={true}
                    />
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
