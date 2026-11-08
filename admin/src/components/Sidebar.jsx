import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/global.css";

function Sidebar() {
  const location = useLocation();
  const [hoverEffect, setHoverEffect] = useState(-1);

  useEffect(() => {
    const pagePath = location.pathname;
    if (pagePath == "/additems" || pagePath == "/additems/addfood" || pagePath == "/additems/addfoodmenu") {
      setHoverEffect(0);
    } else if (pagePath == "/listitems" || pagePath == "/listitems/listfood" || pagePath == "/listitems/listfoodmenu") {
      setHoverEffect(1);
    } else if (pagePath == "/orders") {
      setHoverEffect(2);
    } else if (pagePath == "/userprofile") {
      setHoverEffect(3);
    } else {
      setHoverEffect(-1);
    }
  }, [location]);

  return (
    <div
      id="main-sidebar"
      className="pt-6 pl-10 flex flex-col gap-9 border-r-4 max-h-[100vh] overflow-scroll no-scrollbar"
    >
      <div
        id="add-items"
        className={`pt-2 pb-2 pl-2 border-2 border-r-0 rounded cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 ease-in-out ${
          hoverEffect == 0 ? "border-orange-500" : ""
        }`}
      >
        {/* isActive support is only available in the className */}
        <NavLink to="/additems">
          <b className="mr-28">Add Items</b>
        </NavLink>
      </div>
      <div
        id="list-items"
        className={`pt-2 pb-2 pl-2 border-2 border-r-0 rounded cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 ease-in-out ${
          hoverEffect == 1 ? "border-orange-500" : ""
        }`}
      >
        <NavLink to="/listitems">
          <b className="mr-28">List Items</b>
        </NavLink>
      </div>
      <div
        id="orders"
        className={`pt-2 pb-2 pl-2 border-2 border-r-0 rounded cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 ease-in-out ${
          hoverEffect == 2 ? "border-orange-500" : ""
        }`}
      >
        <NavLink to="/orders">
          <b className="mr-28">Orders</b>
        </NavLink>
      </div>
      <div
        id="account-settings"
        className={`pt-2 pb-2 pl-2 border-2 border-r-0 rounded cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 ease-in-out ${
          hoverEffect == 3 ? "border-orange-500" : ""
        }`}
      >
        <NavLink to="/userprofile">
          <b className="mr-28">Account</b>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
