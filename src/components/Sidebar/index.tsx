import {
  LayoutDashboard,
  LogOutIcon,
  ParkingMeter,
  Scale3DIcon,
  Speaker,
} from "lucide-react";
import React, { type ReactNode } from "react";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";

interface SidebarInterface {
  // Define your interface properties here
}

export interface I_NAVMENU {
  item: string;
  children?: I_NAVMENU[];
  icon: ReactNode;
  path: string;
}

const navMenu: I_NAVMENU[] = [
  {
    item: "Dashboard",
    children: [], // array is valid now
    icon: <LayoutDashboard />,
    path: "/dashboard",
  },
  {
    item: "Event",
    children: [], // array is valid now
    icon: <Scale3DIcon />,
    path: "/event",
  },
  {
    item: "Speaker",
    children: [], // array is valid now
    icon: <Speaker />,
    path: "/speaker",
  },
  {
    item: "Partner",
    children: [], // array is valid now
    icon: <ParkingMeter />,
    path: "/partner",
  },
  // {
  //   item: "Sponsor",
  //   children: [], // array is valid now
  //   icon: <SoapDispenserDroplet />,
  //   path: "/sponsor",
  // },
  // {
  //   item: "Registeration",
  //   children: [], // array is valid now
  //   icon: <Ticket />,
  //   path: "/registeration",
  // },
  // {
  //   item: "Enquiry",
  //   children: [], // array is valid now
  //   icon: <FileQuestion />,
  //   path: "/enquiry",
  // },
  // {
  //   item: "Magzine",
  //   children: [], // array is valid now
  //   icon: <MessageCircle />,
  //   path: "/magzine",
  // },
];

const Sidebar: React.FC<SidebarInterface> = () => {
  return (
    <div className=' flex flex-col  justify-between h-[90%]'>
      <section>
        <ul className='space-y-2'>
          {navMenu?.map((item, index) => {
            return (
              <li>
                <NavItem item={item} key={index} />
              </li>
            );
          })}
        </ul>
      </section>
      <Link
        to={"/"}
        className='flex items-center p-2 text-[15px] gap-4 text-gray-600 font-semibold border-t-[1px]'
      >
        <LogOutIcon /> Logout
      </Link>
    </div>
  );
};

export default Sidebar;
