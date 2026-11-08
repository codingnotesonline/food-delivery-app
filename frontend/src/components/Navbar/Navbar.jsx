// import { useState}  from 'react'
// import PropTypes from 'prop-types'
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { Search } from "../index";
import "./Navbar.css";

function Navbar() {
  // const [currentPage, setCurrentPage] = useState("home");
  const { changeLoginStatus, userLoggedin, changeUserLoggedin } =
    useAppContext();
  const [searchStatus, setSearchStatus] = useState("hidden");

  const navigate = useNavigate();

  const changeSearchStatus = () => {
    if (searchStatus == "") {
      setSearchStatus("hidden");
    } else {
      setSearchStatus("");
    }
  };

  return (
    <div id="whole-navbar">
      <div id="navbar">
        <div className="logo">
          <a href="/">
            <img src={assets.logo} alt="Navbar Main Logo" />
          </a>
        </div>
        <div className="links">
          <ul>
            {/* className={(currentPage === 'home')? 'active': ''} */}
            {/* onClick={()=>{ setCurrentPage("home"); }} */}

            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#explore-menu">Menu</a>
            </li>
            <li>
              <a href="#mobile-app">Mobile App</a>
            </li>
            <li>
              <a href="#footer">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className={userLoggedin == 1 ? "extra logged-in" : "extra"}>
          <a href="#explore-menu">
            <img
              src={assets.search_icon}
              alt="Navbar Search Icon"
              onClick={changeSearchStatus}
            />
          </a>
          <Link to="/cart" className="cart">
            <img src={assets.basket_icon} alt="Navbar Cart Icon" />
            {/* <div className="dot"></div> */}
          </Link>
          {userLoggedin == 0 ? (
            <button
              type="button"
              onClick={() => {
                changeLoginStatus(1);
              }}
            >
              Sign In
            </button>
          ) : (
            <img
              src={assets.profile_icon}
              alt="Navbar User Profile Icon"
              onClick={() => {
                localStorage.removeItem("token");
                changeUserLoggedin(0);
                navigate("/");
              }}
            />
          )}
        </div>
      </div>
      <Search
        searchStatus={searchStatus}
        changeSearchStatus={changeSearchStatus}
      />
    </div>
  );
}

// Navbar.propTypes = {
//     setLoginStatus: PropTypes.node,
//     userLoggedin: PropTypes.node
// }

export default Navbar;
