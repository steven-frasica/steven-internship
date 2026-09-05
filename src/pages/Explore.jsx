import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";
import axios from "axios";


const Explore = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [exploreItemsLoading, setExploreItemsLoading] = useState(true);
  const [exploreItemsError, setExploreItemsError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Does this work?
  }, []);

  async function getExploreItems() {
    try {
      const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")
      setExploreItems(data)
    }
    catch (error) {
      setExploreItemsError(`Failed to load explore items`)
    } finally {
      setExploreItemsLoading(false)
    }
  }

  useEffect(() => {
    getExploreItems()
  }, [])

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <ExploreItems exploreItems={exploreItems} loading={exploreItemsLoading} error={exploreItemsError}/>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
