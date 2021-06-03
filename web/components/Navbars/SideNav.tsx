import Link from "next/link";
import React, { useState } from "react";
import SideNavItem from "../Containers/SideNavItem";

const SIDE_BAR_NAV = [
  {
    url: "/myaccount/profile",
    iconUrl: "/img/book-open.svg",
    itemName: "Profile",
  },
  {
    url: "/myaccount/stories",
    iconUrl: "/img/book-open.svg",
    itemName: "My Stories",
  },
  {
    url: "/myaccount/favorites",
    iconUrl: "/img/book-open.svg",
    itemName: "Favorites",
  },
  {
    url: "/myaccount/reviews",
    iconUrl: "/img/book-open.svg",
    itemName: "My Reviews",
  },
  {
    url: "/myaccount/settings",
    iconUrl: "/img/book-open.svg",
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
      />
    ));
  };
  return (
    <div className={`${isExpanded ? "w-80" : "w-14"} transition-all`}>
      <Link href="/">STRUCT</Link>
      <div>
        {" "}
        <button onClick={() => setIsExpanded(!isExpanded)}>toggle</button>
      </div>

      {renderNav()}
    </div>
  );
};

export default SideNav;
