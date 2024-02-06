import React, { useEffect } from "react";
import { PrimaryBtn } from "@/components";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import { getWorkspaceInvite } from "@/services/workspaceService";
import { Toast } from "@/config/toast";
import useEmail from "@/store/useEmail";

const VerifyInvite: React.FC = () => {
  const { email, setEmail } = useEmail();
  const navigate = useNavigate();
  const { id } = useParams();
  const token = id || "";

  const { mutate, isLoading, isError } = useMutation(getWorkspaceInvite, {
    onError: (error) => {
      Toast.error(`${error}`);
    },
    onSuccess: (data) => {
      Toast.success("Account verified!, Redirecting to workspace");
      setEmail(data?.data?.email);
      navigate("/auth/workspace");
    },
  });

  console.log(email);

  useEffect(() => {
    mutate(token);
  }, [mutate, token]);
  return (
    <>
      {isLoading ? (
        <ClipLoader />
      ) : !isLoading && isError ? (
        <div className="flex flex-col space-y-4 justify-center items-center w-[100%] mx-auto">
          <AiOutlineIssuesClose className="text-red-500 text-[48px]" />

          <p className="text-[24px] font-[500]">Email confirmation failed. </p>

          <PrimaryBtn text="Retry" onClick={() => window.location.reload()} />
        </div>
      ) : (
        <div className="flex flex-col space-y-4 justify-center items-center w-[100%] mx-auto">
          <GiCheckMark className="text-green text-[48px]" />

          <p className="text-[24px] font-[500]">Email confirmation successful. </p>
          <Link to="/auth/login">
            <PrimaryBtn text=" Proceed to login" type="button" />{" "}
          </Link>
        </div>
      )}
    </>
  );
};

export default VerifyInvite;
