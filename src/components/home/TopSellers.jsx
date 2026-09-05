import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = ({ topSellers, loading, error }) => {
  const emptyArray = Array(12).fill(0);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {loading ? (
              <ol className="author_list">
                {emptyArray.map((_, index) => {
                  return (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                      </div>
                      <div className="author_list_info">
                        <Skeleton width="120px" height="18px" borderRadius="4px" />
                        <div className="mt-2">
                          <Skeleton width="72px" height="14px" borderRadius="4px" />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            ) : error ? (
              <div className="text-center">
                <p>{error}</p>
              </div>
            ) : (
              <ol className="author_list">
                {topSellers.map(({ id, authorName, authorImage, authorId, price }) => (
                  <li key={id}>
                    <div className="author_list_pp">
                      <Link to={`/author/${authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${authorId}`}>{authorName}</Link>
                      <span>{price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
