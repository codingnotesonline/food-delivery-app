// import PropTypes from 'prop-types'
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import "./Cart.css";

function Cart() {
  const { foodList, cartItems, changeCartItems, userLoggedin, changeLoginStatus } =
    useAppContext();

  let totalBill = 0;

  const fetchItem = (item, index) => {
    totalBill = totalBill + cartItems[item.name] * item.price;
    return (
      <>
        <div key={index} className="cart-item-row">
          <img
            className="cart-item-row-image"
            src={item.image}
            alt="Cart Food Item Image"
          />
          <b className="cart-item-row-name">{item.name}</b>
          <b className="cart-item-row-price">{item.price}</b>
          <p className="cart-item-row-quantity">{cartItems[item.name]}</p>
          <b className="cart-item-row-total">
            {cartItems[item.name] * item.price}
          </b>
          <img
            className="cart-item-row-remove"
            src={assets.cross_icon}
            alt="Cart Remove Food Item Image"
            onClick={() => {
              changeCartItems(item, 0);
            }}
          />
        </div>
        <hr />
      </>
    );
  };
  return (
    <div id="cart">
      {userLoggedin == 1 ? (
        <>
          <div className="cart-items-table">
            <div className="cart-items-head">
              <b>Items</b>
              <b>Title</b>
              <b>Price</b>
              <b>Quantity</b>
              <b>Total</b>
              <b>Remove</b>
            </div>
            <div className="cart-items-content">
              {foodList.map((item, index) => {
                return cartItems[item.name] > 0 ? fetchItem(item, index) : "";
              })}
            </div>
          </div>
          <div className="cart-items-details">
            <div className="cart-items-total">
              <div className="cart-items-total-title">
                <h2>Cart Totals</h2>
              </div>
              <div className="cart-items-total-description">
                <div className="subtotal">
                  <p>Subtotal</p>
                  <p>${totalBill}</p>
                </div>
                <hr />
                <div className="delivery-fee">
                  <p>Delivery Fee</p>
                  <p>$5</p>
                </div>
                <hr />
                <div className="total">
                  <b>Total</b>
                  <b>${totalBill + 5}</b>
                </div>
                <hr />
              </div>
              <div className="proceed-to-checkout">
                <button type="button">PROCEED TO CHECKOUT</button>
              </div>
            </div>
            <div className="promo-code">
              <div className="promo-code-text">
                <p>If you have a promo code, Enter it here</p>
              </div>
              <div className="promo-code-input">
                <input
                  type="text"
                  name="promo-code-get"
                  id="promo-code-get"
                  placeholder="Promo Code"
                />
                <button type="button">Submit</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="title">
            <h2>
              Sorry, you are not Logged in. Please Sign in for further
              processing.
            </h2>
          </div>
          <div className="login">
            <button
              type="button"
              onClick={() => {
                changeLoginStatus(1);
              }}
            >
              Sign In
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Cart.propTypes = {
//   cartItems: PropTypes.node,
//   setCartItems: PropTypes.node,
//   userLoggedin: PropTypes.node,
//   setLoginStatus: PropTypes.node
// }

export default Cart;
