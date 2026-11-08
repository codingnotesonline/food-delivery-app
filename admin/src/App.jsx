import { useState, useEffect } from "react";
import { Layout } from "./components/index";
import {
  Login,
  AddItems,
  ListItems,
  Orders,
  UserProfile,
  AddFoodItems,
  AddFoodMenuItems,
  ListFoodItems,
  ListFoodMenuItems,
  EditFoodItem,
  EditFoodMenuItem
} from "./pages/index";
import { AppContextProvider } from "./context/AppContext";
import { toast } from "react-toastify";
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function App() {
  // useNavigate should only used inside Router
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(0);

  const fontAwesomeCDN = import.meta.env.VITE_FONT_AWESOME_CDN;

  if (fontAwesomeCDN) {
    const script = document.createElement("script");
    script.src = fontAwesomeCDN;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }

  const changeLoginStatus = (status) => {
    setLoginStatus(status);
  };

  const notifySuccess = (text) => {
    toast.success(text, {
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
          import.meta.env.VITE_ADMIN_VERIFY_URL,
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
          navigate("/");
          notifySuccess(data.message);
        } else {
          navigate("/login");
        }
      } else {
        // navigate("/login");
      }
    })();
  }, [navigate]);

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <>
  //       <Route path='/' element={<Layout />}>
  //         <Route path='' element={''} />
  //         <Route path='additems' element={<AddItems />} />
  //         <Route path='listitems' element={<ListItems />} />
  //         <Route path='orders' element={<Orders />} />
  //       </Route>
  //       <Route path='/login' element={<Login />}></Route>
  //     </>
  //   )
  // )

  return (
    <>
      {/* <RouterProvider router={router} future={{ v7_startTransition: true }} /> */}
      {/* Context provide should be outside of Routes */}
      <AppContextProvider value={{ loginStatus, changeLoginStatus }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="additems" element={<AddItems />}>
              <Route path="addfood" element={<AddFoodItems />} />
              <Route path="addfoodmenu" element={<AddFoodMenuItems />} />
            </Route>
            <Route path="listitems" element={<ListItems />}>
              <Route path="listfood" element={<ListFoodItems />} />
              <Route path="listfoodmenu" element={<ListFoodMenuItems />} />
              <Route path="editfood/:id" element={<EditFoodItem />} />
              <Route path="editfoodmenu/:id" element={<EditFoodMenuItem />} />
            </Route>
            <Route path="orders" element={<Orders />} />
            <Route path="userprofile" element={<UserProfile />} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </AppContextProvider>
    </>
  );
}

export default App;
