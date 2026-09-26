import React from "react";
import { Link } from "react-router-dom";
import Countdown from "./Countdown";

const NftItemCard = ({
  authorId,
  authorImage,
  nftId,
  nftImage,
  title,
  price,
  likes,
  expiryDate,
  showCountdown = false,
}) => {
  const itemPath = `/item-details/${nftId}`;
  const itemUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${itemPath}`
      : itemPath;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(itemUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(itemUrl)}&text=${encodeURIComponent(title)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(itemUrl)}`;

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link to={`/author/${authorId}`}>
          <img src={authorImage} alt="" className="lazy" />
          <i className="fa fa-check"></i>
        </Link>
      </div>

      {showCountdown && <Countdown expiration={expiryDate} />}

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a href={facebookShareUrl} target="_blank" rel="noreferrer">
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a href={twitterShareUrl} target="_blank" rel="noreferrer">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href={emailShareUrl}>
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <Link to={itemPath}>
          <img src={nftImage} alt="" className="lazy nft__item_preview" />
        </Link>
      </div>

      <div className="nft__item_info">
        <Link to={itemPath}>
          <h4>{title}</h4>
        </Link>
        <div className="nft__item_price">{price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NftItemCard;
