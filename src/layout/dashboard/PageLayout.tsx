import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NavBar, SideBar } from "@/components";
import { getToken } from "@/helpers/authHelpers";

function PageLayout() {
  const [openNav, setOpenNav] = useState(false);
  const token = getToken();
  // redirect users to dashboard if they are logged in
  if (!token?.auth || !token?.workspace) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  return (
    <div className="relative w-full flex justify-start items-start">
      <div className="fixed top-0 z-50 w-full bg-white">
        <NavBar openNav={openNav} setOpenNav={setOpenNav} />
      </div>

      <div
        className={`fixed top-0 left-0 z-40 w-52 h-screen sm:pt-16 transition-transform -translate-x-full bg-white sm:translate-x-0 ${
          openNav ? "translate-x-0 z-50" : "-translate-x-full"
        }`}
      >
        <SideBar openNav={openNav} setOpenNav={setOpenNav} />
      </div>

      <div className="mt-12 py-6 w-full sm:ml-52">
        <div className="w-full p-4 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PageLayout;
