import Link from "next/link";
import React from "react";

interface SideNavItemProps {
  iconUrl: string;
  url: string;
  itemName: string;
}

const SideNavItem: React.FC<SideNavItemProps> = ({
  iconUrl,
  itemName,
  url,
}) => {
  return (
    <Link href={url}>
      <a className="block">
        <img
          alt="..."
          src={iconUrl}
          className="shadow-xl h-8 align-middle border-none inline bg-white"
        />
        <span>{itemName}</span>
      </a>
    </Link>
  );
};

export default SideNavItem;
