import { assets } from "../../assets/assets";
import "./MobileApp.css";

function MobileApp() {
  return (
    <div id="mobile-app">
      <div className="mobile-app-title">
        <h1>For Better Experience Download</h1>
        <h1>Tomato App</h1>
      </div>
      <div className="mobile-app-links">
        <a href="#">
          <img src={assets.play_store} alt="Tomato App Play Store Image" />
        </a>
        <a href="#">
          <img src={assets.app_store} alt="Tomato App Apple Store Image" />
        </a>
      </div>
    </div>
  );
}

export default MobileApp;
