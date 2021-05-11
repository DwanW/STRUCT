import Link from "next/link";
import React, { useState } from "react";

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
            <button
              className="cursor-pointer text-2xl leading-none px-3 py-1 border-solid border-transparent rounded bg-transparent block sm:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
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
          <div className="flex flex-col sm:flex-row list-none sm:ml-auto">
            <button
              className="sm:hover:text-gray-800 text-gray-500  sm:py-2 flex items-center text-xs uppercase font-bold w-full outline-none focus:outline-none focus:ring"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StoryNavbar;
