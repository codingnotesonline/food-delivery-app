// import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from "react";
import { Bars } from "react-loader-spinner";
import { useHomeContext } from "../../context/HomeContext";
import axios from "axios";
import "./ExploreMenu.css";

function ExploreMenu() {
  const { category, changeCategory } = useHomeContext();
  const [foodMenuList, setFoodMenuList] = useState([]);
  const [listFoodLoading, setListFoodLoading] = useState(true);

  const addFoodMenuInList = useCallback((item) => {
    setFoodMenuList((prevList) => [...prevList, item]);
  }, []);

  const removeAllFoodMenuListItems = useCallback(() => {
    setFoodMenuList([]);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_FOOD_MENU_LIST_URL,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data.data;

      removeAllFoodMenuListItems();
      responseData.map((value) => addFoodMenuInList(value));

      setTimeout(() => {
        setListFoodLoading(false);
      }, 1000);
    } catch (error) {
      // notifyError("Data was not fetched, Try Again");
    }
  }, [setListFoodLoading, addFoodMenuInList, removeAllFoodMenuListItems]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (listFoodLoading) {
    return (
      <div
        id="spinner-container"
        className="w-full h-full flex items-center justify-center"
      >
        <Bars color="black" width="100" height="100" />
      </div>
    );
  }

  return (
    <div id="explore-menu">
      <div className="explore-menu-title">
        <h1>Explore our menu</h1>
      </div>
      <div className="explore-menu-description">
        <p>
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
      </div>
      <div className="explore-menu-content">
        {foodMenuList.map((item, index) => {
          return (
            <div
              key={index}
              className="explore-menu-item"
              onClick={() => {
                category == item.name
                  ? changeCategory("All")
                  : changeCategory(item.name);
              }}
            >
              <img
                className={category == item.name ? "active" : ""}
                src={item.image}
                alt="Explore Menu Items Images"
              />
              <b>{item.name}</b>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ExploreMenu.propTypes = {
//     category: PropTypes.node,
//     setCategory: PropTypes.node
// }

export default ExploreMenu;
