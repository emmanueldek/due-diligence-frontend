import React, { SetStateAction, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebarItems } from "./data";
import { IoMdClose } from "react-icons/io";
import { RecordLogo } from "../svgs/RecordLogo";
import { GoChevronUp } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";

interface ISideBarProps {
  openNav: boolean;
  setOpenNav: React.Dispatch<SetStateAction<boolean>>;
}

function SideBar({ openNav, setOpenNav }: ISideBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOrganisationOpen, setIsOrganisationOpen] = useState(false);
  const [isExecutivesOpen, setIsExecutivesOpen] = useState(false);
  const [newIndex, setNewIndex] = useState<number | null>(null);

  const closeDropdown = (dropdownName: string) => {
    if (dropdownName === "Organisation") {
      setIsOrganisationOpen(false);
    } else if (dropdownName === "Executives") {
      setIsExecutivesOpen(false);
    } else if (dropdownName === "Settings" || dropdownName === "Dashboard") {
      setIsExecutivesOpen(false);
      setIsOrganisationOpen(false);
    }
    setNewIndex(null);
  };

  return (
    <aside className="w-full h-full bg-white shadow sm:shadow-none">
      <div className="w-full px-3">
        <div className="">
          <div className="sm:hidden flex justify-between items-center py-4 mb-4">
            <div className="ml-[-18px] scale-75">
              <RecordLogo />
            </div>

            <IoMdClose className="font-black text-xl" onClick={() => setOpenNav(!openNav)} />
          </div>

          <div>
            {sidebarItems.map((item, index) => {
              const { name, pathname, Icon, subItems } = item;

              return (
                <div key={index}>
                  {subItems ? ( // Check if the item has sub-items
                    <div>
                      <div
                        className={`flex justify-start items-center mb-2 p-2 cursor-pointer transition-all duration-150 ${
                          location.pathname === pathname
                            ? "border-l-2 border-grey-900 bg-grey-50 text-grey-900 font-bold"
                            : "font-light text-grey-400"
                        } hover:border-l-2 hover:border-grey-900 hover:bg-grey-50 hover:text-grey-900`}
                        onClick={() => {
                          if (name === "Organisation") {
                            navigate("/organisation");
                            setIsOrganisationOpen(!isOrganisationOpen);
                            setIsExecutivesOpen(false);
                          } else if (name === "Executives") {
                            navigate("/executives");
                            setIsExecutivesOpen(!isExecutivesOpen);
                            setIsOrganisationOpen(false);
                          } else if (name === "Settings" || name === "Dashboard") {
                            closeDropdown("Organisation");
                            closeDropdown("Executives");
                          }
                        }}
                      >
                        <Icon className="mr-1 stroke-1" />
                        <p className="text-sm">{name} </p>
                        <span className="ml-5 cursor-pointer ">
                          {(name === "Organisation" && isOrganisationOpen) ||
                          (name === "Executives" && isExecutivesOpen) ? (
                            <span>
                              <GoChevronUp />
                            </span>
                          ) : (
                            <span>
                              <GoChevronDown />
                            </span>
                          )}
                        </span>
                      </div>
                      <div
                        className={`${
                          name === "Organisation"
                            ? isOrganisationOpen
                              ? "block"
                              : "hidden"
                            : isExecutivesOpen
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        {subItems.map((subItem, subIndex) => {
                          const { Icon } = subItem;
                          return (
                            <Link key={subIndex} to={subItem.pathname}>
                              <div
                                onClick={() => setNewIndex(subIndex)}
                                className={`${
                                  newIndex === subIndex && "bg-grey-50 font-[600]"
                                } flex justify-start items-center mb-2 p-2 transition-all duration-150 hover:bg-grey-50 hover:text-grey-900`}
                              >
                                <Icon className="ml-6 stroke-1" />
                                <p className="text-sm pl-3">{subItem.name}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link to={{ pathname }}>
                      <div
                        className={`flex justify-start items-center mb-2 p-2 transition-all duration-150 ${
                          location.pathname === pathname
                            ? "border-l-2 border-grey-900 bg-grey-50 text-grey-900 font-bold"
                            : "font-light text-grey-400"
                        } hover:border-l-2 hover.border-grey-900 hover:bg-grey-50 hover.text-grey-900`}
                        onClick={() => closeDropdown(name)}
                      >
                        <Icon className="mr-1 stroke-1" />
                        <p className="text-sm">{name}</p>
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
