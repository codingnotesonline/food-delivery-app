import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Navbar, Login, Footer } from "./components/index";
import { Home, Cart } from "./pages/index";
import { Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "./App.css";

function App() {
  const [foodList, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loginStatus, setLoginStatus] = useState(-1);
  const [userLoggedin, setUserLoggedin] = useState(0);
  const [searchContent, setSearchContent] = useState("");

  const addFoodInList = useCallback((item) => {
    setFoodList((prevList) => [...prevList, item]);
  }, []);

  const removeFoodFromList = useCallback((item) => {
    setFoodList((prevList) => prevList.filter((food) => food._id !== item._id));
  }, []);

  const removeAllFoodListItems = useCallback(() => {
    setFoodList([]);
  }, []);

  const addCartItems = (item, count) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [item.name]: prevItems[item.name] + count,
    }));
  };

  const removeCartItems = (item, count) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [item.name]: prevItems[item.name] - count,
    }));
  };

  const changeCartItems = (item, count) => {
    setCartItems((prevItems) => ({ ...prevItems, [item.name]: count }));
  };

  const changeLoginStatus = (status) => {
    setLoginStatus(status);
  };

  const changeUserLoggedin = (status) => {
    setUserLoggedin(status);
  };

  const changeSearchContent = (content) => {
    setSearchContent(content);
  };

  const notify = (text) => {
    toast(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
    });
  };

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!(token == null || token == undefined || token == "")) {
        const response = await axios.post(
          import.meta.env.VITE_AUTHENTICATION_VERIFY_URL,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        if (data.success) {
          setUserLoggedin(1);
          notify(data.message);
        }
      }
    })();
  }, []);

  return (
    <>
      {/* Context provide should be outside of Routes */}
      <AppContextProvider
        value={{
          foodList,
          cartItems,
          loginStatus,
          userLoggedin,
          addFoodInList,
          removeFoodFromList,
          removeAllFoodListItems,
          addCartItems,
          removeCartItems,
          searchContent,
          changeCartItems,
          changeLoginStatus,
          changeUserLoggedin,
          changeSearchContent,
        }}
      >
        {/* className={(loginStatus == 1) ? 'change-background' : ''} */}
        <div id="container">
          <Login />
          <div
            id="app"
            className={`${loginStatus == 1 || loginStatus == 0 ? "blur" : ""}`}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/cart"
                element={
                  <Cart
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    userLoggedin={userLoggedin}
                    setLoginStatus={setLoginStatus}
                  />
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </AppContextProvider>
    </>
  );
}

export default App;
