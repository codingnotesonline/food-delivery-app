import { Navbar, Sidebar } from "./index";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div id="admin-panel" className="flex flex-col h-screen">
      <div id="header">
        <Navbar />
      </div>
      <div id="main" className="grid grid-cols-[auto_1fr] flex-1">
        <Sidebar />
        <div id="main-container" className="pt-3 pr-12 pl-12 pb-6 max-h-[100vh] overflow-scroll">
          <Outlet />
        </div>
      </div>
    </div>  
  );
}

export default Layout;
