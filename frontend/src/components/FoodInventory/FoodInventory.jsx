// import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from "react";
import { assets } from "../../assets/assets";
import { useHomeContext } from "../../context/HomeContext";
import { useAppContext } from "../../context/AppContext";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import "./FoodInventory.css";

function FoodInventory() {
  const [listFoodLoading, setListFoodLoading] = useState(true);
  const { category } = useHomeContext();
  const {
    foodList,
    cartItems,
    searchContent,
    addFoodInList,
    removeAllFoodListItems,
    addCartItems,
    removeCartItems,
    changeCartItems,
  } = useAppContext();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_FOOD_LIST_URL,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data.data;

      removeAllFoodListItems();
      responseData.map((value) => addFoodInList(value));

      setTimeout(() => {
        setListFoodLoading(false);
      }, 1000);
    } catch (error) {
      // notifyError("Data was not fetched, Try Again");
    }
  }, [setListFoodLoading, addFoodInList, removeAllFoodListItems]);

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

  const fetchItem = (item, index) => {
    return (
      <div key={index} className="food-inventory-item">
        <div className="item-image">
          <img src={item.image} alt="Food Inventory Item Image" />
        </div>
        <div className="item-title">
          <h2>{item.name}</h2>
        </div>
        <div className="item-description">
          <p>{item.description}</p>
        </div>
        <div className="item-price">
          <h2>${item.price}</h2>
        </div>
        {cartItems[item.name] ? (
          <div className="counter">
            <img
              src={assets.remove_icon_red}
              alt="Cart Remove Item Image"
              onClick={() => {
                removeCartItems(item, 1);
              }}
            />
            <b className="count">{cartItems[item.name]}</b>
            <img
              src={assets.add_icon_green}
              alt="Cart Add Item Image"
              onClick={() => {
                addCartItems(item, 1);
              }}
            />
          </div>
        ) : (
          <div className="counter-default">
            <img
              src={assets.add_icon_white}
              alt="Cart Pre Add Item Image"
              onClick={() => {
                changeCartItems(item, 1);
              }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="food-inventory">
      <div className="food-inventory-title">
        <h1>Top dishes near you</h1>
      </div>
      <div className="food-inventory-content">
        {searchContent == ""
          ? foodList.map((item, index) => {
              return category == item.category
                ? fetchItem(item, index)
                : category == "All"
                ? fetchItem(item, index)
                : "";
            })
          : foodList
              .filter((item) => item.name.includes(searchContent))
              .map((item, index) => fetchItem(item, index))}
      </div>
    </div>
  );
}

// FoodInventory.propTypes = {
//     category: PropTypes.node,
//     cartItems: PropTypes.node,
//     setCartItems: PropTypes.node
// }

export default FoodInventory;
