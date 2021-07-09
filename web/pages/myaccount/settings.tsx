import { Switch } from "@headlessui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import SideNav from "../../components/Navbars/SideNav";
import {
  useDeleteAccountMutation,
  useLogoutMutation,
  useMeQuery,
} from "../../generated/graphql";
import useDarkMode from "../../utils/darkMode";

interface settingsProps {}

const Settings: NextPage<settingsProps> = ({}) => {
  const router = useRouter();
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const { data, loading } = useMeQuery({
    onCompleted: (data) => {
      if (!data.me?.id) {
        router.push("/auth/login");
      }
    },
  });

  const [logoutMutation] = useLogoutMutation();

  const [deleteAccountMutation] = useDeleteAccountMutation({
    onCompleted: (data) => {
      if (data.deleteAccount) {
        logoutMutation();
        router.push("/auth/login");
      }
    },
  });

  if (loading || !data?.me) {
    return <div>loading settings</div>;
  }
  return (
    <div className="flex flex-row">
      <SideNav />
      <main className="profile-page min-h-screen bg-blue-100 dark:bg-gray-800 flex-1 pt-8">
        <div className="px-2 sm:px-4 py-4">
          <div className="font-bold text-gray-800 dark:text-gray-200">
            Theme Selection
          </div>
          <hr className="border-bottom border-gray-800 dark:border-white" />
          <span className="mr-4 text-gray-700 dark:text-gray-300">Toggle Dark Theme</span>
          <Switch
            checked={isDarkMode as boolean}
            onChange={toggleDarkMode as () => void}
            className={`${
              isDarkMode ? "bg-blue-600" : "bg-gray-400"
            } mt-2 relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Toggle Dark Theme</span>
            <span
              className={`${
                isDarkMode ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out duration-200`}
            />
          </Switch>
        </div>
        <div className="px-2 sm:px-4 py-4">
          <div className="font-bold text-gray-800 dark:text-gray-200">
            Account Actions
          </div>
          <hr className="border-bottom border-gray-800 dark:border-white" />
          <button
            onClick={() => deleteAccountMutation()}
            className="bg-red-500 flex text-white font-bold uppercase text-sm px-4 py-3 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mt-4 mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Permanently Delete this account
          </button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
