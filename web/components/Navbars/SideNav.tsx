import Link from "next/link";
import React, { useState } from "react";
import SideNavItem from "../Containers/SideNavItem";

const SIDE_BAR_NAV = [
  {
    url: "/myaccount/profile",
    iconUrl: "/img/user-circle.svg",
    itemName: "Profile",
  },
  {
    url: "/myaccount/stories",
    iconUrl: "/img/book-filled.svg",
    itemName: "My Stories",
  },
  {
    url: "/myaccount/favorites",
    iconUrl: "/img/star.svg",
    itemName: "Favorites",
  },
  {
    url: "/myaccount/reviews",
    iconUrl: "/img/speaker.svg",
    itemName: "My Reviews",
  },
  {
    url: "/myaccount/settings",
    iconUrl: "/img/cog.svg",
    itemName: "Settings",
  },
];

interface SideNavProps {}

const SideNav: React.FC<SideNavProps> = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const renderNav = () => {
    return SIDE_BAR_NAV.map((item, idx) => (
      <SideNavItem
        key={idx}
        itemName={item.itemName}
        iconUrl={item.iconUrl}
        url={item.url}
        iconOnly={!isExpanded}
      />
    ));
  };
  return (
    <div
      className={`${isExpanded ? "w-60" : "w-16"} transition-all flex flex-col`}
    >
      <Link href="/">
        <a className="font-extralight text-center w-full pt-4">STRUCT</a>
      </Link>{" "}
      {renderNav()}
      <button
        className="p-4 shadow-inner rounded-full border focus:outline-none focus:border-blue-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 text-blue-400 ml-auto transform transition-all ${
            isExpanded ? "mr-2" : "rotate-180"
          } `}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default SideNav;
