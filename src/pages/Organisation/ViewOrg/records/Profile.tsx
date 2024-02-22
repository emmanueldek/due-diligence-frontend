import React from "react";

import { IProfileProps } from "@/interface/userCreation";
import { PrimaryBtn } from "@/components";

interface IOrgDataProfile {
  data: IProfileProps;
}

const Profile: React.FC<IOrgDataProfile> = ({ data }) => {
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
              <div className="w-full sm:w-[190px] md:w-[250px]">
                <div className="w-full h-[160px] bg-grey-50 rounded-md overflow-hidden group">
                  <a href={`https://${data?.cacDocument}`} target="_blank">
                    <div className="hidden h-full transition-all group-hover:flex justify-center items-center group-hover:bg-grey-200">
                      <PrimaryBtn text="open" />
                    </div>
                  </a>
                </div>

                {/* </a> */}

                <h4 className="font-bold leading-[20px] mt-3 mb-1 overflow-auto truncate">{}</h4>
                <p className="font-light text-grey-400 text-sm leading-[20px]"></p>
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
      </div>
    </>
  );
};

export default Profile;
