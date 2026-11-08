import axios from "axios";
import { toast } from "react-toastify";
import { logo } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

function Login() {
  const { changeLoginStatus } = useAppContext();

  const notifyError = (text) => {
    toast.error(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
    });
  };

  const submitData = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      import.meta.env.VITE_ADMIN_LOGIN_URL,
      {
        username: event.target.username.value,
        password: event.target.password.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    if (data.success) {
      localStorage.setItem("token", data.token);
      changeLoginStatus(1);
    } else {
      notifyError(data.message);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        className="flex items-center justify-center flex-col gap-6 pt-12 pb-12 pr-16 pl-16 rounded-lg bg-gray-100"
        onSubmit={submitData}
      >
        <div id="upper-part" className="flex items-center flex-col gap-2">
          <div id="logo-img" className="logo flex items-center flex-col">
            <img className="w-[80%]" src={logo} alt="Admin Page Navbar Logo" />
            <p>Admin Panel</p>
          </div>
          <div id="title">
            <h2 className="text-3xl font-bold text-center">LOGIN</h2>
          </div>
        </div>
        <div id="inputs" className="flex items-center flex-col gap-4">
          <input
            className="border-4 pt-1 pb-1 pr-2 pl-2 rounded-md text-lg"
            type="text"
            name="username"
            id="username"
            placeholder="Your username"
            required
          />
          <input
            className="border-4 pt-1 pb-1 pr-2 pl-2 rounded-md text-lg"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <div id="authenticate">
          <button
            className="bg-orange-600 text-white pt-2 pb-2 pr-3 pl-3 border-2 border-orange-600 rounded-lg text-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
            type="submit"
          >
            Authenticate
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
