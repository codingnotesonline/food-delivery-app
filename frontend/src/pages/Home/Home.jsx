import { useState } from "react";
// import PropTypes from 'prop-types';
import {
  Header,
  ExploreMenu,
  FoodInventory,
  MobileApp,
} from "../../components/index";
import { HomeContextProvider } from "../../context/HomeContext";
import "./Home.css";

function Home() {
  const [category, setCategory] = useState("All");

  const changeCategory = (category) => {
    setCategory(category);
  };

  return (
    <div id="home">
      <HomeContextProvider value={{ category, changeCategory }}>
        <Header />
        <ExploreMenu />
        <FoodInventory />
        <MobileApp />
      </HomeContextProvider>
    </div>
  );
}

// Home.propTypes = {
//   cartItems: PropTypes.node,
//   setCartItems: PropTypes.node
// }

export default Home;
