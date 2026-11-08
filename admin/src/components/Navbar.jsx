import { logo, logout } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

function Navbar() {
  const { changeLoginStatus } = useAppContext();

  const logoutUser = () => {
    localStorage.removeItem("token");
    changeLoginStatus(0);
  };

  return (
    <div
      id="navbar"
      className="w-[100%] pr-8 pl-8 pt-4 pb-2 flex items-center justify-between border-b-4"
    >
      <div className="logo flex items-center flex-col cursor-pointer">
        <img className="w-[80%]" src={logo} alt="Admin Page Navbar Logo" />
        <p>Admin Panel</p>
      </div>
      <div className="logout cursor-pointer">
        <img src={logout} alt="Admin Page Navbar Exit" onClick={logoutUser} />
      </div>
    </div>
  );
}

export default Navbar;
