import Link from "next/link";
import React, { useRef, useState } from "react";
import { createPopper } from "@popperjs/core";

interface ProfileDropdownProps {}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({}) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);

  const btnDropdownRef = useRef<HTMLAnchorElement>(null);
  const popoverDropdownRef = useRef<HTMLDivElement>(null);

  const openDropdownPopover = () => {
    if (btnDropdownRef.current && popoverDropdownRef.current) {
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "bottom-end",
      });
    }
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="sm:hover:text-gray-800 text-gray-500 px-3 py-4 sm:py-2 flex items-center text-xs uppercase font-bold w-full"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Profile
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-blue-50 text-base z-50 py-2 list-none text-left rounded shadow-2xl min-w-max"
        }
      >
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap cursor-default text-black"
          }
        >
          Personalize
        </span>
        <Link href="/admin/dashboard">
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-blue-100 text-gray-700"
            }
          >
            Profile
          </a>
        </Link>
        <Link href="/admin/settings">
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-blue-100 text-gray-700"
            }
          >
            Settings
          </a>
        </Link>
        <div className="h-0 mx-4 my-2 border border-solid border-blue-700" />
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap cursor-default text-black"
          }
        >
          Options
        </span>
        <Link href="/auth/login">
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-blue-100 text-gray-700"
            }
          >
            Logout
          </a>
        </Link>
        <Link href="/auth/register">
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-blue-100 text-gray-700"
            }
          >
            Switch Account
          </a>
        </Link>
      </div>
    </>
  );
};

export default ProfileDropdown;
