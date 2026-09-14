import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [itemDetails, setItemDetails] = useState(null);
  const [error, setError] = useState(null);

  const { nftId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getItemDetails() {
      setItemDetails(null);
      setError(null);

      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`,
        );

        setItemDetails(data);
      } catch (error) {
        setError("Failed to load item details");
      }
    }

    getItemDetails();
  }, [nftId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!itemDetails) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="520px" borderRadius="8px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="70%" height="38px" borderRadius="6px" />

                    <div className="item_info_counts mt-3">
                      <div className="item_info_views">
                        <Skeleton
                          width="60px"
                          height="18px"
                          borderRadius="4px"
                        />
                      </div>
                      <div className="item_info_like">
                        <Skeleton
                          width="50px"
                          height="18px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>

                    <div className="mt-3">
                      <Skeleton width="100%" height="16px" borderRadius="4px" />
                    </div>
                    <div className="mt-2">
                      <Skeleton width="95%" height="16px" borderRadius="4px" />
                    </div>
                    <div className="mt-2">
                      <Skeleton width="85%" height="16px" borderRadius="4px" />
                    </div>

                    <div className="d-flex flex-row mt-4">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          </div>
                          <div className="author_list_info">
                            <Skeleton
                              width="120px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="de_tab tab_simple mt-4">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          </div>
                          <div className="author_list_info">
                            <Skeleton
                              width="120px"
                              height="16px"
                              borderRadius="4px"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="spacer-40"></div>

                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <Skeleton
                          width="80px"
                          height="24px"
                          borderRadius="4px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemDetails.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {itemDetails.title} #{itemDetails.tag}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemDetails.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemDetails.likes}
                    </div>
                  </div>
                  <p>{itemDetails.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.ownerId}`}>
                            <img
                              className="lazy"
                              src={itemDetails.ownerImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.ownerId}`}>
                            {itemDetails.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.creatorId}`}>
                            <img
                              className="lazy"
                              src={itemDetails.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.creatorId}`}>
                            {itemDetails.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemDetails.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
