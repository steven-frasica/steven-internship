import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const [author, setAuthor] = useState(null);
  const [following, setFollowing] = useState(false);
  const loadingCards = Array(8).fill(0);
  // useParams() gets the authorId from the Route in App.jsx
  const { authorId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function getAuthorInfo() {
      setFollowing(false);
      setAuthor(null);
      // use authorId from useParams in the fetch request
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
      );
      setAuthor(data);
    }
    // Call async fn in useEffect
    getAuthorInfo();
  }, [authorId]);

  if (!author) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          <section
            id="profile_banner"
            aria-label="section"
            className="text-light"
            data-bgimage="url(images/author_banner.jpg) top"
            style={{ background: `url(${AuthorBanner}) top` }}
          ></section>

          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton
                              width="220px"
                              height="32px"
                              borderRadius="6px"
                            />
                            <div className="mt-2">
                              <Skeleton
                                width="140px"
                                height="18px"
                                borderRadius="4px"
                              />
                            </div>
                            <div className="mt-2">
                              <Skeleton
                                width="420px"
                                height="18px"
                                borderRadius="4px"
                              />
                            </div>
                            <div className="mt-2">
                              <Skeleton
                                width="72px"
                                height="38px"
                                borderRadius="6px"
                              />
                            </div>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton
                            width="120px"
                            height="18px"
                            borderRadius="4px"
                          />
                        </div>
                        <Skeleton
                          width="120px"
                          height="40px"
                          borderRadius="6px"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <div className="row">
                          {loadingCards.map((_, index) => (
                            <div
                              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                              key={index}
                            >
                              <div className="nft__item">
                                <div className="author_list_pp">
                                  <Skeleton
                                    width="50px"
                                    height="50px"
                                    borderRadius="50%"
                                  />
                                </div>
                                <div className="nft__item_wrap">
                                  <Skeleton
                                    width="100%"
                                    height="260px"
                                    borderRadius="8px"
                                  />
                                </div>
                                <div className="nft__item_info">
                                  <Skeleton
                                    width="70%"
                                    height="24px"
                                    borderRadius="4px"
                                  />
                                  <div className="mt-2">
                                    <Skeleton
                                      width="64px"
                                      height="18px"
                                      borderRadius="4px"
                                    />
                                  </div>
                                  <div className="mt-2">
                                    <Skeleton
                                      width="48px"
                                      height="18px"
                                      borderRadius="4px"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
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

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">
                            @{author.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {following ? author.followers + 1 : author.followers}{" "}
                        followers
                      </div>
                      <button
                        type="button"
                        className="btn-main"
                        onClick={() => setFollowing(!following)}
                      >
                        {following ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    nftCollection={author.nftCollection}
                    authorId={author.authorId}
                    authorImage={author.authorImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
