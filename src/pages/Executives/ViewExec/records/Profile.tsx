import React from "react";
import { IProfileProps } from "@/interface/userCreation";

interface IDataProfile {
  data: IProfileProps;
}

const Profile: React.FC<IDataProfile> = ({ data }) => {
  return (
    <>
      <div>
        <div>
          <p className="font-[700] text-2xl">Profile</p>
          <hr className="border-grey-100 mt-2" />
        </div>
        <div className="w-[70%] mt-10">
          <div className="space-y-2">
            <p className="font-[700]">About</p>
            <p className="font-[400]">{data?.executiveDescription}</p>
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
          {/* <hr className="border-grey-100 my-4" />
          <div className="space-y-2">
            <p className="font-[700]">Linkedin Profile</p>
            <p className="font-[400]">www.linkedin.com/ciarianfarrell</p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Profile;
