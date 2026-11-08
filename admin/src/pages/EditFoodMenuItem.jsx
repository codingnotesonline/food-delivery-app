import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { Bars } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/ReactToastify.css";

function EditFoodMenuItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [menuName, setMenuName] = useState("");
  const [foodMenuItemLoading, setFoodMenuItemLoading] = useState(true);

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

  const fetchDataItem = useCallback(async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_FOOD_MENU_ITEM_LIST_URL + `/${id}`,
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
      setMenuName(data.name);
    } catch (error) {
      notifyError("Product Data was not fetched, Try Again");
    }
  }, [id]);

  const fetchToken = () => {
    setToken(localStorage.getItem("token"));
  };

  useEffect(() => {
    fetchToken();
    setTimeout(() => {
      fetchDataItem();
      setFoodMenuItemLoading(false);
    }, 2000);
  }, [fetchDataItem]);

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
      formData.append("image", event.target.updateImage.files[0]);

      const response = await axios.put(
        import.meta.env.VITE_FOOD_MENU_UPDATE_URL,
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
        navigate("/listitems/listfoodmenu");
      } else {
        notifyError(data.message);
      }
    } catch (error) {
      notifyError("Data was not submitted, Try Again");
    }
  };

  if (foodMenuItemLoading) {
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
    <div id="update-food-menu-item">
      {/* enctype="multipart/form-data"; encoding-type is necessary to write when form includes binary data like files */}
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
        <div id="update-menu-name">
          <h4>Menu Name</h4>
          <input
            className="outline-none border-4 rounded-md p-1 w-[50%]"
            type="text"
            name="updateName"
            id="update-name"
            placeholder="Type here"
            value={menuName}
            onChange={(event) => setMenuName(event.target.value)}
          />
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

export default EditFoodMenuItem;
