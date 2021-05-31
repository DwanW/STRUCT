import React, { useState } from "react";
import Link from "next/link";

interface AuthNavbarProps {}

const AuthNavbar: React.FC<AuthNavbarProps> = () => {
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false);
  return (
    <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-2 backdrop-filter backdrop-blur-md backdrop-contrast-200">
      <div className="container px-4 mx-auto flex flex-wrap item-center justify-between">
        <div className="w-full relative flex justify-between sm:w-auto sm:static sm:block sm:justify-start">
          <Link href="/">
            <a
              href="/"
              className="text-black text-sm font-bold leading-relaxed inline-flex mr-4 py-2 whitespace-nowrap uppercase"
            >
              STRUCT
            </a>
          </Link>
          <button
            className="cursor-pointer text-2xl leading-none px-3 py-1 border-solid border-transparent rounded bg-transparent block sm:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setMobileNavbarOpen(!mobileNavbarOpen)}
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div
          className={
            "sm:flex flex-grow items-center bg-white sm:bg-opacity-0 sm:shadow-none" +
            (mobileNavbarOpen ? " block rounded shadow-lg" : " hidden")
          }
        >
          <ul className="flex flex-col sm:flex-row list-none mr-auto">
            <li className="flex items-center">
              <Link href="/">
                <a
                  className="sm:hover:text-gray-800 text-gray-500 px-3 py-4 sm:py-2 flex items-center text-xs uppercase font-bold w-full"
                  href="/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:text-blue-700 text-blue-500 text-lg leading-6 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  How To
                </a>
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col sm:flex-row list-none sm:ml-auto">
            <li className="flex items-center">
              <Link href="/">
                <a
                  className="sm:hover:text-gray-800 text-gray-500 px-3 py-4 sm:py-2 flex items-center text-xs uppercase font-bold w-full"
                  href=""
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 sm:text-blue-700 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <span className="sm:hover:text-gray-800 text-gray-500 inline-block ml-2">
                    Feedback
                  </span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
