import { useLocation } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";

export const ResetVerify = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  return (
    <VerifyEmail
      title="Check your Email"
      text="Password reset link sent to your email. Click 'Reset Password' to regain access."
      email={email}
    />
  );
};
