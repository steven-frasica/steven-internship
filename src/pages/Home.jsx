import { useEffect, useState } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import axios from "axios";

const Home = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [hotCollectionsLoading, setHotCollectionsLoading] = useState(true);
  const [newItemsLoading, setNewItemsLoading] = useState(true);
  const [hotCollectionsError, setHotCollectionsError] = useState(null);
  const [newItemsError, setNewItemsError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function getHotCollections() {
    try {
      const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      setHotCollections(data)
    }
    catch (err) {
      setHotCollectionsError(`Failed to load collection`)
    } finally {
      setHotCollectionsLoading(false)
    }
  }

  async function getNewItems() {
    try {
      const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      console.log(data)
      setNewItems(data)
    }
    catch (err) {
      setNewItemsError(`Failed to load new items`)
    } finally {
      setNewItemsLoading(false)
    }
  }


  useEffect(() => {
    getHotCollections()
    getNewItems();
  }, [])

 

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections hotCollections={hotCollections} loading={hotCollectionsLoading} error={hotCollectionsError}/>
        <NewItems newItems={newItems} loading={newItemsLoading} error={newItemsError}/>
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
