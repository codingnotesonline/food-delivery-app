import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import "react-toastify/ReactToastify.css";

function EditFoodItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
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

  const addMenuListItem = useCallback((item) => {
    setMenuList((previousData) => [...previousData, item]);
  }, []);

  const emptyMenuList = useCallback(() => {
    setMenuList([]);
  }, []);

  const fetchDataItem = useCallback(async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_FOOD_ITEM_LIST_URL + `/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data.data;

      // because only an object is coming as response
      const data = responseData;
      setImageURL(data.image);
      setProductName(data.name);
      setProductDescription(data.description);
      setProductCategory(data.category);
      setProductPrice(data.price);
    } catch (error) {
      notifyError("Product Data was not fetched, Try Again");
    }
  }, [id]);

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
        fetchDataItem();
        setMenuListLoading(false);
      }, 2000);
    } catch (error) {
      notifyError("Product Category was not fetched, Try Again");
    }
  }, [addMenuListItem, emptyMenuList, fetchDataItem]);

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
      if (!event.target.updateImage.files[0]) {
        notifyError("Attach a file (if same then Reattach)");
        return;
      }
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", event.target.updateName.value);
      formData.append("description", event.target.updateDescription.value);
      formData.append("price", event.target.updatePrice.value);
      formData.append("image", event.target.updateImage.files[0]);
      formData.append("category", event.target.updateCategory.value);

      const response = await axios.put(
        import.meta.env.VITE_FOOD_UPDATE_URL,
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
        navigate("/listitems/listfood");
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
    <div id="update-food-item">
      <form
        className="flex flex-col gap-6"
        action="/"
        onSubmit={formSubmitHandler}
        encType="multipart/form-data"
      >
        <div id="update-product-image" className="w-fit h-fit">
          <h4>Upload Image</h4>
          <label htmlFor="update-image">
            <img
              className="w-28"
              src={imageURL}
              alt="Previous Uploaded Image"
            />
          </label>
          <input
            type="file"
            accept="images/*"
            name="updateImage"
            id="update-image"
            onChange={uploadImageHandler}
            hidden
          />
        </div>
        <div id="update-product-name">
          <h4>Product Name</h4>
          <input
            className="outline-none border-4 rounded-md p-1 w-[50%]"
            type="text"
            name="updateName"
            id="update-name"
            placeholder="Type here"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
        </div>
        <div id="update-product-description">
          <h4>Product Description</h4>
          <textarea
            className="outline-none border-4 rounded-md p-1 w-[50%]"
            name="updateDescription"
            id="update-description"
            cols="30"
            rows="10"
            placeholder="Write Content here"
            value={productDescription}
            onChange={(event) => setProductDescription(event.target.value)}
          ></textarea>
        </div>
        <div
          id="update-product-category-price"
          className="flex items-center gap-x-28"
        >
          <div id="product_category">
            <h4>Product Category</h4>
            <select
              name="updateCategory"
              id="update-category"
              className="outline-none border-4 rounded-md p-1"
              value={productCategory}
              onChange={(event) => setProductCategory(event.target.value)}
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
          <div id="update-product-price">
            <h4>Product Price</h4>
            <input
              className="outline-none border-4 rounded-md p-1 w-[50%]"
              type="number"
              name="updatePrice"
              id="update-price"
              placeholder="$25"
              value={productPrice}
              onChange={(event) => setProductPrice(event.target.value)}
            />
          </div>
        </div>
        <button
          className="w-fit pt-2 pb-2 pr-6 pl-6 rounded-md bg-black text-white border-2 border-black transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
          type="submit"
        >
          UPDATE
        </button>
      </form>
    </div>
  );
}

export default EditFoodItem;
