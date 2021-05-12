import Link from "next/link";
import React, { useState } from "react";
import ProfileDropdown from "../Dropdowns/ProfileDropdown";

interface StoryNavbarProps {}

const StoryNavbar: React.FC<StoryNavbarProps> = ({}) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    console.log(searchValue);
  };
  return (
    <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-2">
      <div className="container px-4 mx-auto flex flex-wrap item-center justify-between">
        <div className="w-full relative flex justify-between items-center sm:w-auto sm:static sm:block sm:justify-start">
          <Link href="/">
            <a
              href="/"
              className="text-black text-sm font-bold leading-relaxed inline-flex mr-4 py-2 whitespace-nowrap uppercase"
            >
              STRUCT
            </a>
          </Link>
          <div className="flex">
            <button
              className="cursor-pointer text-2xl text-blue-500 leading-none px-3 py-1 border-solid border-transparent rounded bg-transparent block sm:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <div className="flex items-center sm:hidden">
              <ProfileDropdown />
            </div>
          </div>
          <div
            className={`${
              mobileSearchOpen ? "absolute" : "hidden"
            } w-full h-full border bg-white flex items-center sm:hidden`}
          >
            <button
              className="z-10 h-full leading-snug flex font-normal text-center absolute bg-transparent rounded-tr rounded-br text-base items-center justify-center w-12 border-l-2 border-gray-200 px-3 py-2 outline-none focus:outline-none"
              type="button"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <form onSubmit={handleSearchSubmit} className="w-full">
              <input
                type="text"
                placeholder="Search"
                className="border-0 px-4 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-12"
                value={searchValue}
                onChange={(e: any) => setSearchValue(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="sm:flex flex-grow items-center bg-white sm:bg-opacity-0 sm:shadow-none hidden">
          <div className="w-full ">
            {" "}
            <form className="max-w-3xl mx-auto" onSubmit={handleSearchSubmit}>
              <div className="relative flex w-full flex-wrap items-stretch">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-4 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pr-11"
                  value={searchValue}
                  onChange={(e: any) => setSearchValue(e.target.value)}
                />
                <button
                  className="z-10 right-0 h-full leading-snug font-normal text-center text-blue-500 absolute bg-transparent rounded-tr rounded-br text-base items-center justify-center w-12 border-l-2 border-gray-200 px-3 py-3 outline-none focus:outline-none focus:ring"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col sm:flex-row sm:ml-auto">
            <div className="flex items-center">
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StoryNavbar;
