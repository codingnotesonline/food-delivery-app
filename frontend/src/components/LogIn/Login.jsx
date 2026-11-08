// import PropTypes from 'prop-types'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "./Login.css";

function Login() {
  const { loginStatus, changeLoginStatus, changeUserLoggedin } =
    useAppContext();
  const navigate = useNavigate();

  const notifySuccess = (text) => {
    toast.success(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
    });
  };

  const notifyError = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
    });
  };

  const submitData = async (event) => {
    event.preventDefault();
    let response;

    if (loginStatus == 0) {
      response = await axios.post(
        import.meta.env.VITE_AUTHENTICATION_SIGNUP_URL,
        {
          name: event.target.name.value,
          email: event.target.email.value,
          password: event.target.password.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      response = await axios.post(
        import.meta.env.VITE_AUTHENTICATION_LOGIN_URL,
        {
          email: event.target.email.value,
          password: event.target.password.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const data = response.data;
    if (data.success) {
      changeUserLoggedin(1);
      changeLoginStatus(-1);
      navigate("/");
      notifySuccess(data.message);
      localStorage.setItem("token", data.token);
    } else {
      changeLoginStatus(-1);
      navigate("/");
      notifyError(data.message);
    }

    submitData.submit();
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <div
        id="login"
        className={loginStatus == -1 ? "login-inactive" : "login-active"}
      >
        <form onSubmit={submitData}>
          <div className="upper-part">
            <div className="title">
              {loginStatus == 1 ? <h2>Log In</h2> : <h2>Sign Up</h2>}
            </div>
            <div className="remove">
              <img
                src={assets.cross_icon}
                alt="Log In Pop Up Remove Image"
                onClick={() => {
                  changeLoginStatus(-1);
                }}
              />
            </div>
          </div>
          <div className="inputs">
            {!(loginStatus == 1) ? (
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
                required
              />
            ) : (
              ""
            )}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="privacy-policy-terms">
            <input
              type="checkbox"
              name="privacy-policy"
              id="privacy-policy"
              required
            />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
          <div className="submit">
            <button type="submit">Create account</button>
          </div>
          <div className="already-have-account">
            {loginStatus == 1 ? (
              <p>
                Create a new account?
                <b
                  onClick={() => {
                    changeLoginStatus(0);
                  }}
                >
                  {" "}
                  Click here
                </b>
              </p>
            ) : (
              <p>
                Already have an account?
                <b
                  onClick={() => {
                    changeLoginStatus(1);
                  }}
                >
                  {" "}
                  Login here
                </b>
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

// Login.propTypes = {
//     loginStatus: PropTypes.node,
//     setLoginStatus: PropTypes.node,
//     setUserLoggedin: PropTypes.node
// }

export default Login;
