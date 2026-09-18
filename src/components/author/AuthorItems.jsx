import React from "react";
import NftItemCard from "../UI/NftItemCard";

const AuthorItems = ({ nftCollection, authorId, authorImage }) => {
  
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.map(({ id, nftImage, nftId, title, price, likes }) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={id}>
              <NftItemCard
                authorId={authorId}
                authorImage={authorImage}
                nftId={nftId}
                nftImage={nftImage}
                title={title}
                price={price}
                likes={likes}
                showCountdown={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
