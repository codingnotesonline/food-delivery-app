import { NestedLayout } from "./index";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ListItemsContextProvider } from "../context/ListItemsContext";

function ListItems() {
  const location = useLocation();
  const [listFoodActive, setListFoodActive] = useState(false);
  const [editFoodItemActive, setEditFoodItemActive] = useState(false);
  const [listFoodMenuActive, setListFoodMenuActive] = useState(false);
  const [editFoodMenuItemActive, setEditFoodMenuItemActive] = useState(false);
  const [listFoodData, setListFoodData] = useState([]);

  useEffect(() => {
    const pagePath = location.pathname;
    if (pagePath == "/listitems/listfood") {
      setListFoodActive(true);
    } else if (pagePath == "/listitems/listfoodmenu") {
      setListFoodMenuActive(true);
    } else if (pagePath.includes("/listitems/editfood/")) {
      setEditFoodItemActive(true);
    } else if (pagePath.includes("/listitems/editfoodmenu/")) {
      setEditFoodMenuItemActive(true);
    } else {
      setListFoodActive(false);
      setListFoodMenuActive(false);
      setEditFoodItemActive(false);
      setEditFoodMenuItemActive(false);
    }
  }, [location]);

  const changeListFoodActive = useCallback((status) => {
    setListFoodActive(status);
  }, []);

  const changeListFoodMenuActive = useCallback((status) => {
    setListFoodMenuActive(status);
  }, []);

  const changeEditFoodItemActive = useCallback((status) => {
    setEditFoodItemActive(status);
  }, []);

  const changeEditFoodMenuItemActive = useCallback((status) => {
    setEditFoodMenuItemActive(status);
  }, []);

  const addFoodItems = useCallback((item) => {
    setListFoodData((prevData) => [...prevData, item]);
  }, []);

  const removeFoodItems = useCallback((item) => {
    setListFoodData((prevData) =>
      prevData.filter((value) => value._id !== item._id)
    );
  }, []);

  const removeAllFoodItems = useCallback(() => {
    setListFoodData([]);
  }, []);

  const changeFoodItems = useCallback((index, value) => {
    setListFoodData((prevData) => {
      const modifiedArray = [...prevData];
      modifiedArray[index] = value;
      return modifiedArray;
    });
  }, []);

  if (
    listFoodActive ||
    listFoodMenuActive ||
    editFoodItemActive ||
    editFoodMenuItemActive
  ) {
    return (
      <ListItemsContextProvider
        value={{
          listFoodActive,
          editFoodItemActive,
          changeListFoodActive,
          changeEditFoodItemActive,
          listFoodMenuActive,
          editFoodMenuItemActive,
          changeListFoodMenuActive,
          changeEditFoodMenuItemActive,
          listFoodData,
          addFoodItems,
          removeFoodItems,
          removeAllFoodItems,
          changeFoodItems,
        }}
      >
        <NestedLayout />
      </ListItemsContextProvider>
    );
  }

  return (
    <div
      id="list-items"
      className="w-full h-full flex items-center justify-center gap-24"
    >
      <NavLink
        to="listfood"
        className="w-fit pt-2 pb-2 pr-6 pl-6 rounded-md bg-orange-500 text-white text-xl border-2 font-bold border-orange-500 transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
      >
        Food Items
      </NavLink>
      <NavLink
        to="listfoodmenu"
        className="w-fit pt-2 pb-2 pr-6 pl-6 rounded-md bg-orange-500 text-white text-xl border-2 font-bold border-orange-500 transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
      >
        FoodMenu Items
      </NavLink>
    </div>
  );
}

export default ListItems;
