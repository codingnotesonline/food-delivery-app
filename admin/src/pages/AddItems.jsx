import { NestedLayout } from "./index";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AddItemsContextProvider } from "../context/AddItemsContext";

function AddItems() {
  const location = useLocation();
  const [addFoodActive, setAddFoodActive] = useState(false);
  const [addFoodMenuActive, setAddFoodMenuActive] = useState(false);

  useEffect(() => {
    const pagePath = location.pathname;
    if (pagePath == "/additems/addfood") {
      setAddFoodActive(true);
    } else if (pagePath == "/additems/addfoodmenu") {
      setAddFoodMenuActive(true);
    } else {
      setAddFoodActive(false);
      setAddFoodMenuActive(false);
    }
  }, [location]);

  const changeAddFoodActive = (status) => {
    setAddFoodActive(status);
  };

  const changeAddFoodMenuActive = (status) => {
    setAddFoodMenuActive(status);
  };

  if (addFoodActive || addFoodMenuActive) {
    return (
      <AddItemsContextProvider value={{addFoodActive, changeAddFoodActive, addFoodMenuActive, changeAddFoodMenuActive}}>
        <NestedLayout />
      </AddItemsContextProvider>
    );
  }

  return (
    <div
      id="add-items"
      className="w-full h-full flex items-center justify-center gap-24"
    >
      <NavLink
        to="addfood"
        className="w-fit pt-2 pb-2 pr-6 pl-6 rounded-md bg-orange-500 text-white text-xl border-2 font-bold border-orange-500 transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
      >
        Food Items
      </NavLink>
      <NavLink
        to="addfoodmenu"
        className="w-fit pt-2 pb-2 pr-6 pl-6 rounded-md bg-orange-500 text-white text-xl border-2 font-bold border-orange-500 transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
      >
        FoodMenu Items
      </NavLink>
    </div>
  );
}

export default AddItems;
