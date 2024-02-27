import { GoTable, GoOrganization, GoPeople, GoGear, GoDatabase } from "react-icons/go";
import { PiPencilLineFill } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";

export const sidebarItems = [
  {
    name: "Dashboard",
    pathname: "/",
    Icon: GoTable,
  },
  {
    name: "Organisation",
    Icon: GoOrganization,
    pathname: "/organisation",
    subItems: [
      {
        name: "Drafts",
        Icon: PiPencilLineFill,
        pathname: "/organisation/drafts",
      },
      {
        name: "Requests",
        Icon: GoDatabase,
        pathname: "/organisation/request",
      },
    ],
  },
  {
    name: "Executives",
    Icon: GoPeople,
    pathname: "/executives",
    subItems: [
      {
        name: "Drafts",
        Icon: PiPencilLineFill,
        pathname: "/executives/draft",
      },
      {
        name: "Request",
        Icon: GoDatabase,
        pathname: "/executives/request",
      },
    ],
  },
  {
    name: "Settings",
    pathname: "/settings",
    Icon: GoGear,
  },
  {
    name: "Users",
    pathname: "/users",
    Icon: FaRegUser,
  },
];
