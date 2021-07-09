import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SideNavItemProps {
  iconUrl: string;
  url: string;
  itemName: string;
  iconOnly: boolean;
}

const SideNavItem: React.FC<SideNavItemProps> = ({
  iconUrl,
  itemName,
  url,
  iconOnly,
}) => {
  return (
    <Link href={url}>
      <a className="flex flex-row px-4 py-2 whitespace-nowrap hover:bg-gray-100 dark:hover:bg-blue-900">
        <Image
          src={iconUrl}
          width={30}
          height={30}
          className="shadow-xl align-middle border-none inline text-red-500"
        />
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
