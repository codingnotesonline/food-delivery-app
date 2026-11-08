import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useListItemsContext } from "../context/ListItemsContext";
import { InfinitySpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "axios";

function ListFoodItems() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const { listFoodData, addFoodItems, removeAllFoodItems, removeFoodItems } =
    useListItemsContext();
  const [listFoodMenuLoading, setListFoodMenuLoading] = useState(true);

  const notifySuccess = (text) => {
    toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
    });
  };

  const notifyError = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
    });
  };

  const removeFoodItemsCompletely = async (category) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_FOOD_CATEGORY_REMOVE_URL,
        {
          data: {
            category: category,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log(data);

      return data.success;
    } catch (error) {
      return false;
    }
  };

  const removeFoodMenuItem = async (id) => {
    try {
      const response = await axios.delete(
        import.meta.env.VITE_FOOD_MENU_REMOVE_URL,
        {
          data: {
            id: id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      return [data.success, data.message];
    } catch (error) {
      return [false, "FoodMenu Item was not deleted, Try Again"];
    }
  };

  const removeFoodMenuCompletely = async (item) => {
    const statusFoodItems = await removeFoodItemsCompletely(item.name);

    if (statusFoodItems) {
      const [statusFoodMenuItem, messageFoodMenuItem] =
        await removeFoodMenuItem(item._id);

      if (statusFoodMenuItem) {
        notifySuccess("FoodMenu and corresponding Food Items Deleted");
        removeFoodItems(item);
      } else {
        notifyError(messageFoodMenuItem);
      }
    } else {
      notifyError("Error");
    }
  };

  // useCallback is a hook that returns a memoized version of the callback function that only changes when one of its dependencies given in the dependency array in useCallback hook has changed. After that we can also give fetchData function as an argument in the dependency array of useEffect hook. This is particularly useful when you pass callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.

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

      removeAllFoodItems();
      responseData.map((value) => addFoodItems(value));

      setTimeout(() => {
        setListFoodMenuLoading(false);
      }, 2000);
    } catch (error) {
      notifyError("Data was not fetched, Try Again");
    }
  }, [setListFoodMenuLoading, addFoodItems, removeAllFoodItems]);

  const fetchToken = () => {
    setToken(localStorage.getItem("token"));
  };

  useEffect(() => {
    fetchToken();
    fetchData();
  }, [fetchData]);

  const showFoodMenuEditPage = (id) => {
    navigate(`/listitems/editfoodmenu/${id}`);
  };

  if (listFoodMenuLoading) {
    return (
      <div
        id="spinner-container"
        className="w-full h-full flex items-center justify-center"
      >
        <InfinitySpin color="black" width="200" height="200" />
      </div>
    );
  }

  // for fetching data always try to use map function
  return (
    <div id="food-table" className="min-w-[100%]">
      <div id="food-table-head" className="grid grid-cols-3">
        <b className="text-center text-lg">Name</b>
        <b className="text-center text-lg">Image</b>
        <b className="text-center text-lg">Remove</b>
      </div>
      <div id="food-table-body">
        {listFoodData.map((item, index) => {
          return (
            // providing key is a good approach
            <div key={index} className="grid grid-cols-3 my-6">
              <p
                className="text-center text-lg content-center cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"
                onClick={() => showFoodMenuEditPage(item._id)}
              >
                {item.name}
              </p>
              <div className="food-table-row-item-image">
                <img
                  className="max-w-[35%] m-auto rounded-lg"
                  src={item.image}
                  alt={`${item.name} Image`}
                />
              </div>
              <div className="food-table-row-item-remove text-center text-lg content-center">
                <i
                  className="fa-solid fa-xmark cursor-pointer p-3 hover:bg-gray-200 rounded-lg"
                  onClick={() => {
                    removeFoodMenuCompletely(item);
                  }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListFoodItems;
