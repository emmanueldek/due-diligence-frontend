import React from "react";

const Profile: React.FC = () => {
  return (
    <div>
      <div>
        <p className="font-[700] text-2xl">Profile</p>
        <hr className="border-grey-100 mt-2" />
      </div>
      <div className="w-[70%] mt-10">
        <div className="space-y-2">
          <p className="font-[700]">About</p>
          <p className="font-[400]">
            A forward-thinking tech company specializing in cutting-edge solutions for a smarter, more connected world.
          </p>
        </div>
        <hr className="border-grey-100 my-4" />
        <div className="space-y-2">
          <p className="font-[700]">Address</p>
          <p className="font-[400]">122 Foregoing Lane, Bromyard, Lagos, Nigeria</p>
        </div>
        <hr className="border-grey-100 my-4" />
        <div className="space-y-2">
          <p className="font-[700]">Email</p>
          <p className="font-[400]">ciarian@noemdek.co</p>
        </div>
        <hr className="border-grey-100 my-4" />
        <div className="space-y-2">
          <p className="font-[700]">Website</p>
          <p className="font-[400]">www.noemdekinc.co</p>
        </div>
        <hr className="border-grey-100 my-4" />
        <div className="space-y-2">
          <p className="font-[700]">Linkedin Profile</p>
          <p className="font-[400]">www.linkedin.com/ciarianfarrell</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
