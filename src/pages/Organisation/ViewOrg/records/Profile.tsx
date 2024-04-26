import React, { useState } from "react";

import { IProfileProps } from "@/interface/userCreation";
import { BACKEND_URL } from "@/utils/urls";
import acrobatLogo from "@/assets/images/acrobat2.png";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

interface IOrgDataProfile {
  data: IProfileProps;
}

const Profile: React.FC<IOrgDataProfile> = ({ data }) => {
  const userAuth = JSON.parse(sessionStorage.getItem("token") as string);
  const [loading, setLoading] = useState(false);

  const token = userAuth.auth;
  const downloadPdf = async (fileName: string | undefined) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_NOMDEK_ADMIN_URL}${BACKEND_URL.VERSION.v1}${
          BACKEND_URL.RETRIEVEPDF
        }?fileName=${fileName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setLoading(false);
      if (response.status === 404) {
        setLoading(false);
        toast.error("File not found");
        return;
      }
      const data = await response.blob();
      const hrefUrl = URL.createObjectURL(data);
      setLoading(false);

      window.open(hrefUrl, "_blank");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <p className="font-[700] text-2xl">Profile</p>
        <hr className="border-grey-100 mt-2" />
      </div>
      <div className="w-[70%] mt-10">
        <div className="space-y-2">
          <p className="font-[700]">About</p>
          <p className="font-[400]">{data?.organizationDescription}</p>
        </div>
        <hr className="border-grey-100 my-4" />
        <div className="space-y-2">
          <p className="font-[700]">Address</p>
          <p className="font-[400]">{data?.location}</p>
        </div>
        {/* <hr className="border-grey-100 my-4" />
          <div className="space-y-2">
            <p className="font-[700]">Email</p>
            <p className="font-[400]">ciarian@noemdek.co</p>
          </div> */}
        <hr className="border-grey-100 my-4" />
        <div className="space-y-2">
          <p className="font-[700]">Website</p>
          <p className="font-[400]">{data?.website}</p>
        </div>
        <hr className="border-grey-100 my-4" />
        <div className="space-y-2">
          <p className="font-[700]">CAC Registration Number</p>
          <p className="font-[400]">{data?.cacNumber}</p>
        </div>
        <hr className="border-grey-100 my-4" />

        <div className="mt-6 w-full">
          <div className="border-b border-grey-50 pb-3">
            <p className="font-bold text-grey-900 text-[1.1rem]">CAC Document</p>
          </div>

          {data?.cacDocument ? (
            <div
              className="mt-3 hover:bg-grey-50 w-[250px] flex flex-col items-center py-[25px] rounded-lg cursor-pointer transition-all duration-300 ease-linear hover:scale-95 hover:transform"
              onClick={() => downloadPdf(data?.cacDocument)}
            >
              <img src={acrobatLogo} alt="document_logo" className="w-[200px]" />
              <p className="text-grey-400 font-medium mt-3">{data?.cacDocument}</p>
            </div>
          ) : (
            <p className="text-grey-400 font-medium mt-3">No document</p>
          )}
        </div>
        {/* <hr className="border-grey-100 my-4" />
          <div className="space-y-2">
            <p className="font-[700]">Linkedin Profile</p>
            <p className="font-[400]">www.linkedin.com/ciarianfarrell</p>
          </div> */}
      </div>
      {loading && <Loader detail="Fetching Record..." />}
    </div>
  );
};

export default Profile;
