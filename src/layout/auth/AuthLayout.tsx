import { getToken } from "@/helpers/authHelpers";
import { Navigate, Outlet } from "react-router-dom";

function AuthLayout() {
  const token = getToken();
  // redirect users to dashboard if they are logged in
  if (token?.auth && token?.workspace) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className="w-[90%] max-w-[570px] mx-auto">
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
