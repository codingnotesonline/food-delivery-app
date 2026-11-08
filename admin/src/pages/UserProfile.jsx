import { useState } from "react";

function UserProfile() {
  const [usernameBtnText, changeUsernameBtnText] = useState("Edit");
  const [passwordBtnText, changePasswordBtnText] = useState("Edit");

  const [usernameEditPermission, changeUsernameEditPermission] =
    useState(false);
  const [passwordEditPermission, changePasswordEditPermission] =
    useState(false);

  const usernameEditHandler = () => {
    if (!usernameEditPermission) {
      changeUsernameBtnText("Change");
      changeUsernameEditPermission(true);
    }
    else {
      changeUsernameBtnText("Edit");
      changeUsernameEditPermission(false);
    }
  }

  const passwordEditHandler = () => {
    if (!passwordEditPermission) {
      changePasswordBtnText("Change");
      changePasswordEditPermission(true);
    }
    else {
      changePasswordBtnText("Edit");
      changePasswordEditPermission(false);
    }
  }

  return (
    <div
      id="user-profile"
      className="flex flex-col gap-14 items-center justify-center"
    >
      <div id="title">
        <h2 className="text-4xl font-bold">Admin Panel Details</h2>
      </div>
      <div id="main" className="flex flex-col gap-9">
        <div id="change-username">
          <div id="username-title">
            <b>Username</b>
          </div>
          <div className="flex gap-6">
            <input
              type="text"
              className="outline-none border-4 rounded-md p-1 w-[30rem]"
              name="username-input"
              id="username-input"
              readOnly={!usernameEditPermission}
            />
            <button
              type="button"
              className="w-fit pt-1 pb-1 pr-6 pl-6 rounded-md bg-orange-500 text-white border-2 font-bold border-orange-500 transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
              onClick={usernameEditHandler}
            >
              {usernameBtnText}
            </button>
          </div>
        </div>
        <div id="change-password">
          <div id="password-title">
            <b>Password</b>
          </div>
          <div className="flex gap-6">
            <input
              type="text"
              className="outline-none border-4 rounded-md p-1 w-[30rem]"
              name="password-input"
              id="password-input"
              readOnly={!passwordEditPermission}
            />
            <button
              type="button"
              className="w-fit pt-1 pb-1 pr-6 pl-6 rounded-md bg-orange-500 text-white border-2 font-bold border-orange-500 transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
              onClick={passwordEditHandler}
            >
              {passwordBtnText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
