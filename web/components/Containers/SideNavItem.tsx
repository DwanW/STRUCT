import Link from "next/link";
import React from "react";

interface SideNavItemProps {
  svg: React.SVGProps<SVGSVGElement>;
  url: string;
  itemName: string;
  iconOnly: boolean;
}

const SideNavItem: React.FC<SideNavItemProps> = ({
  svg,
  itemName,
  url,
  iconOnly,
}) => {
  return (
    <Link href={url}>
      <a className="flex flex-row justify-center px-4 py-2 whitespace-nowrap hover:bg-gray-100 dark:hover:bg-blue-900">
        <span className="shadow-xl align-middle border-none inline">{svg}</span>
        <span
          className={`${
            iconOnly ? "opacity-0 w-0" : "opacity-100 w-40 ml-4"
          } transition-all`}
        >
          {itemName}
        </span>
      </a>
    </Link>
  );
};

export default SideNavItem;
