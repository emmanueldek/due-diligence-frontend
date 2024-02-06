import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "@/helpers/authHelpers";

const AuthenticatedRoutes = () => {
  const authToken = getToken();
  if (authToken) {
    return <Outlet />;
  }

  return (
    <>
      <Navigate to="/auth/login" replace={true} />
    </>
  );
};

export default AuthenticatedRoutes;
