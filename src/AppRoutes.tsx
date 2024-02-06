import { Dashboard, Executives, Organisation, Settings } from "./pages";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Login from "./pages/auth/Login";
import { ResetVerify } from "./pages/auth/MailVerification";
import ResetPassword from "./pages/auth/ResetPassword";
import UserProfile from "./pages/userProfile";
// import Workspace from "./pages/auth/Workspace";

export const appRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/organisation/*",
    element: <Organisation />,
  },
  {
    path: "/executives/*",
    element: <Executives />,
  },
  {
    path: "/settings/*",
    element: <Settings />,
  },
  {
    path: "/profile/*",
    element: <UserProfile />,
  },
];

export const authRoutes = [
  // {
  //   path: "workspace",
  //   element: <Workspace />,
  // },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "verify-reset",
    element: <ResetVerify />,
  },
  {
    path: "forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "reset-password/:id",
    element: <ResetPassword />,
  },
];
