import React, { SetStateAction, useState, useEffect } from "react";
import { CgMenuLeft, CgProfile } from "react-icons/cg";
import { GoPerson } from "react-icons/go";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { RecordLogo } from "../svgs/RecordLogo";
import { removeAuthToken } from "@/helpers/authHelpers";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { currentUser } from "@/services/authServices";
// import { TUserResponseSchema } from "@/interface/userCreation";
import { BiLogOut } from "react-icons/bi";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import useUser from "@/store/useUser";

interface INavBarProps {
  openNav: boolean;
  setOpenNav: React.Dispatch<SetStateAction<boolean>>;
}

function NavBar({ openNav, setOpenNav }: INavBarProps) {
  const { user, setUser } = useUser();
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useOutsideClick(() => setOpenProfile(false));

  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthToken();
    setTimeout(() => {
      navigate(0);
    }, 1000);
  };

  const { data: userData } = useQuery(["currentUser"], currentUser);
  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      setUser({});
    }
  }, [setUser, userData]);

  return (
    <nav className="bg-white fixed w-full shadow sm:shadow-none">
      <div className="p-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <CgMenuLeft onClick={() => setOpenNav(!openNav)} className="text-2xl text-grey-900 sm:hidden mr-2" />
          <div className="ml-[-18px] sm:ml-[-1px] scale-75 cursor-pointer">
            <RecordLogo />
          </div>
        </div>

        <div className="flex justify-between items-center ml-0 sm:ml-20 sm:w-full sm:px-2 lg:px-2">
          <div
            className="flex items-center space-x-2 justify-end w-full cursor-pointer"
            onClick={() => setOpenProfile(!openProfile)}
          >
            <div className=" rounded-full text-white w-[30px] h-[30px] flex justify-center items-center bg-white overflow-hidden">
              {user?.avatar ? (
                <img src={user?.avatar} alt="user avatar" className=" w-full h-full object-cover " />
              ) : (
                <GoPerson size={20} />
              )}
            </div>
            <p className="">{user?.firstName}</p>
            <div className="text-500">{openProfile ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}</div>
          </div>
          {openProfile && (
            <div ref={profileRef}>
              <div className="bg-white shadow-md flex items-center justify-center rounded-md w-[150px] h-[80px] absolute right-[1rem] top-[3rem]">
                <div className="cursor-pointer">
                  <Link to="/profile" onClick={() => setOpenProfile(false)}>
                    <span className="flex items-center text-grey-500 border-b border-grey-100 p-2 cursor-pointer">
                      <CgProfile className="text-lg mr-2" />
                      <p className="text-sm">Edit profile</p>
                    </span>
                  </Link>
                  <p onClick={handleLogout} className="flex items-center text-red-500 p-2 cursor-pointer">
                    <BiLogOut className="text-lg mr-2" />
                    <p className="text-sm">Log out</p>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
