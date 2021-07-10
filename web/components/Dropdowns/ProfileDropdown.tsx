import Link from "next/link";
import React, { Fragment } from "react";
import Avatar from "../Containers/Avatar";
import { useLogoutMutation } from "../../generated/graphql";
import gql from "graphql-tag";
import { Switch } from "@headlessui/react";
import useDarkMode from "../../utils/darkMode";
import { Menu, Transition } from "@headlessui/react";

interface ProfileDropdownProps {
  avatarUrl: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ avatarUrl }) => {
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

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <Menu.Button className="inline-flex justify-center w-full text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <Avatar avatarUrl={avatarUrl} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-blue-50 dark:bg-gray-700 text-gray-800 dark:text-white divide-y divide-gray-300 dark:divide-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              <Link href="/myaccount/profile">
                <a
                  href="#"
                  className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                >
                  Profile
                </a>
              </Link>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <Link href="/write">
                <a
                  href="#"
                  className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                >
                  Write A Story
                </a>
              </Link>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <Link href="/auth/register">
                <a
                  href="#"
                  className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                >
                  Switch Account
                </a>
              </Link>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <div className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-900 group flex rounded-md justify-between items-center w-full px-2 py-2 text-sm">
              <span>Lights off</span>
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
          <div className="px-1 py-1">
            <Menu.Item>
              <button
                className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                onClick={() => logout()}
              >
                Logout
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
