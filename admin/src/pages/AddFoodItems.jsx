import { useCallback, useEffect, useState } from "react";
import { upload } from "../assets/assets";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import "react-toastify/ReactToastify.css";

function AddFoodItems() {
  const [token, setToken] = useState("");
  const [imageURL, setImageURL] = useState(upload);
  const [menuList, setMenuList] = useState([]);
  const [menuListLoading, setMenuListLoading] = useState(true);

  const uploadImageHandler = (event) => {
    const imageFile = event.target.files[0];

    const temporaryURL = URL.createObjectURL(imageFile);
    setImageURL(temporaryURL);
  };

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

  const addMenuListItem = useCallback(
    (item) => {
      setMenuList((previousData) => [...previousData, item]);
    },
    []
  );

  const emptyMenuList = useCallback(() => {
    setMenuList([]);
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

      emptyMenuList();
      responseData.map((item) => addMenuListItem(item.name));
      // console.log("List data: ", menuList);

      setTimeout(() => {
        setMenuListLoading(false);
      }, 2000);

    } catch (error) {
      notifyError("Product Category was not fetched, Try Again");
    }
  }, [addMenuListItem, emptyMenuList]);

  const fetchToken = () => {
    setToken(localStorage.getItem("token"));
  };

  useEffect(() => {
    fetchToken();
    fetchData();
  }, [fetchData]);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", event.target.name.value);
      formData.append("description", event.target.description.value);
      formData.append("price", event.target.price.value);
      formData.append("image", event.target.image.files[0]);
      formData.append("category", event.target.category.value);

      const response = await axios.post(
        import.meta.env.VITE_FOOD_ADD_URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        notifySuccess(data.message);
        setImageURL(upload);
        event.target.name.value = "";
        event.target.description.value = "";
        event.target.price.value = "";
      } else {
        notifyError(data.message);
      }
    } catch (error) {
      notifyError("Data was not submitted, Try Again");
    }
  };

  if (menuListLoading) {
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
    <div id="add-food-items">
      <form
        className="flex flex-col gap-6"
        action="/"
        onSubmit={formSubmitHandler}
        encType="multipart/form-data"
      >
        <div id="product-image" className="w-fit h-fit">
          <h4>Upload Image</h4>
          <label htmlFor="image">
            <img className="w-28" src={imageURL} alt="Dummy Upload Image" />
          </label>
          <input
            type="file"
            accept="images/*"
            name="image"
            id="image"
            onChange={uploadImageHandler}
            hidden
            required
          />
        </div>
        <div id="product-name">
          <h4>Product Name</h4>
          <input
            className="outline-none border-4 rounded-md p-1 w-[50%]"
            type="text"
            name="name"
            id="name"
            placeholder="Type here"
            required
          />
        </div>
        <div id="product-description">
          <h4>Product Description</h4>
          <textarea
            className="outline-none border-4 rounded-md p-1 w-[50%]"
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="Write Content here"
            required
          ></textarea>
        </div>
        <div id="product-category-price" className="flex items-center gap-x-28">
          <div id="product-category">
            <h4>Product Category</h4>
            <select
              name="category"
              id="category"
              className="outline-none border-4 rounded-md p-1"
              required
            >
              {menuList.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div id="product-price">
            <h4>Product Price</h4>
            <input
              className="outline-none border-4 rounded-md p-1 w-[50%]"
              type="number"
              name="price"
              id="price"
              placeholder="$25"
              required
            />
          </div>
        </div>
        <button
          className="w-fit pt-2 pb-2 pr-6 pl-6 rounded-md bg-black text-white border-2 border-black transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
          type="submit"
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default AddFoodItems;
