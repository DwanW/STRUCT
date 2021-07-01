import Link from "next/link";
import React, { useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import Avatar from "../Containers/Avatar";
import { useLogoutMutation } from "../../generated/graphql";
import gql from "graphql-tag";
import { Switch } from "@headlessui/react";
import useDarkMode from "../../utils/darkMode";

interface ProfileDropdownProps {
  avatarUrl: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ avatarUrl }) => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [logout] = useLogoutMutation({
    update: (cache) => {
      cache.writeQuery({
        query: gql`
          query Me {
            me {
              id
              email
              avatar_url
              about
              createdAt
            }
          }
        `,
        data: {
          me: null,
        },
      });
    },
  });

  const btnDropdownRef = useRef<HTMLAnchorElement>(null);
  const popoverDropdownRef = useRef<HTMLDivElement>(null);

  const openDropdownPopover = () => {
    if (btnDropdownRef.current && popoverDropdownRef.current) {
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "top-end",
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
        <Avatar avatarUrl={avatarUrl} />
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
        <Link href="/myaccount/profile">
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-blue-100 text-gray-700"
            }
          >
            Profile
          </a>
        </Link>
        <Link href="/write">
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-blue-100 text-gray-700"
            }
          >
            Write A Story
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
        <button
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-blue-100 text-gray-700"
          }
          onClick={() => logout()}
        >
          Logout
        </button>
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
        <div className="flex justify-between py-2 px-4">
          <div className="text-xs">Lights off</div>
          <Switch
            checked={isDarkMode as boolean}
            onChange={toggleDarkMode as () => void}
            className={`${
              isDarkMode ? "bg-blue-600" : "bg-gray-400"
            } relative inline-flex items-center h-5 rounded-full w-9 cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Toggle Dark Theme</span>
            <span
              className={`${
                isDarkMode ? "translate-x-5" : "translate-x-1"
              } inline-block w-3 h-3 transform bg-white rounded-full transition ease-in-out duration-200`}
            />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;
