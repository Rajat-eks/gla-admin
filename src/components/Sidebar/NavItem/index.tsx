import React from "react";
import type { I_NAVMENU } from "..";
import { NavLink } from "react-router-dom";

interface NavItemInterface {
  // Define your interface properties here
  item: I_NAVMENU;
}

const NavItem: React.FC<NavItemInterface> = ({ item }) => {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `p-2 rounded cursor-pointer text-[15px] font-semibold flex items-center gap-2  text-gray-600
    hover:bg-[#ECF0F4] ${
      isActive ? "bg-green text-white hover:text-black" : "bg-white text-black"
    }`
      }
    >
      <span>{item.icon}</span>
      <h5>{item.item}</h5>
    </NavLink>
  );
};

export default NavItem;
