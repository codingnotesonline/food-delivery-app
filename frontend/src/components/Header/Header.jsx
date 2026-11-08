import "./Header.css";

function Header() {
  return (
    <div id="header">
      <div className="header-content">
        <div className="header-title">
          <h1>Order your</h1>
          <h1>favourite food here</h1>
        </div>
        <div className="header-description">
          <p>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
        </div>
        <div className="view-more">
          <button type="button">View More</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
