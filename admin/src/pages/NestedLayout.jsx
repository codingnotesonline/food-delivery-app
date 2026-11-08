import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddItemsContext } from "../context/AddItemsContext";
import { useListItemsContext } from "../context/ListItemsContext";

function NestedLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { changeAddFoodActive, changeAddFoodMenuActive } = useAddItemsContext();
  const { changeListFoodActive, changeListFoodMenuActive } =
    useListItemsContext();

  const moveBackwardEventHandler = () => {
    const pagePath = location.pathname;
    if (pagePath == "/additems/addfood") {
      changeAddFoodActive(false);
      navigate("/additems");
    } else if (pagePath == "/additems/addfoodmenu") {
      changeAddFoodMenuActive(false);
      navigate("/additems");
    } else if (pagePath == "/listitems/listfood") {
      changeListFoodActive(false);
      navigate("/listitems");
    } else if (pagePath == "/listitems/listfoodmenu") {
      changeListFoodMenuActive(false);
      navigate("/listitems");
    } else if (pagePath.includes("/listitems/editfood/")) {
      changeListFoodActive(false);
      navigate("/listitems/listfood");
    } else if (pagePath.includes("/listitems/editfoodmenu/")) {
      changeListFoodMenuActive(false);
      navigate("/listitems/listfoodmenu");
    } else {
      changeAddFoodActive(false);
      changeAddFoodMenuActive(false);
      changeListFoodActive(false);
      changeListFoodMenuActive(false);
      navigate("/");
    }
  };

  return (
    <div id="admin-panel-main">
      <div id="header-main" className="pt-3 pb-4">
        <i
          className="fa-solid fa-arrow-left text-xl cursor-pointer p-2 hover:bg-gray-300 rounded-lg"
          onClick={moveBackwardEventHandler}
        ></i>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default NestedLayout;
