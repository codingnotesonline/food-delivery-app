import { assets } from "../../assets/assets";
import "./Footer.css";

function Footer() {
  return (
    <div id="footer">
      <div className="content">
        <div className="general-info">
          <a href="/">
            <img src={assets.logo} alt="Footer Main Image" />
          </a>
          <p>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <div className="general-info-links">
            <a href="#">
              <img
                src={assets.facebook_icon}
                alt="Footer Facebook Link Image"
              />
            </a>
            <a href="#">
              <img src={assets.twitter_icon} alt="Footer Twitter Link Image" />
            </a>
            <a href="#">
              <img
                src={assets.linkedin_icon}
                alt="Footer LinkedIn Link Image"
              />
            </a>
          </div>
        </div>
        <div className="company-info">
          <div className="company-info-title">
            <h2>COMPANY</h2>
          </div>
          <div className="company-info-links">
            <a href="/">Home</a>
            <a href="#">About</a>
            <a href="#">Delivery</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
        <div className="get-in-touch">
          <div className="get-in-touch-title">
            <h2>GET IN TOUCH</h2>
          </div>
          <div className="get-in-touch-details">
            <b>+1-212-4560-7890</b>
            <br />
            <b>contact@tomato.com</b>
          </div>
        </div>
      </div>
      <hr />
      <div className="copyright">
        <b>Copyright 2024 &copy; Tomato.com - All Right Reserved</b>
      </div>
    </div>
  );
}

export default Footer;
