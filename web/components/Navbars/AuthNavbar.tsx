import React, { useState } from "react";
import Link from "next/link";

interface AuthNavbarProps {}

const AuthNavbar: React.FC<AuthNavbarProps> = () => {
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false);
  return (
    <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-4">
      <div className="container px-4 mx-auto flex flex-wrap item-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link href="/">
            <a
              href="/"
              className="text-black text-sm font-bold leading-relaxed inline-flex mr-4 py-2 whitespace-nowrap uppercase"
            >
              STRUCT
            </a>
          </Link>
          <button
            className="cursor-pointer text-2xl leading-none px-3 py-1 border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
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
            "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
            (mobileNavbarOpen ? " block rounded shadow-lg" : " hidden")
          }
          id="example-navbar-warning"
        >
          <ul className="flex flex-col lg:flex-row list-none mr-auto">
            <li className="flex items-center">
              <Link href="/">
                <a
                  className="lg:text-black lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{" "}
                  How To
                </a>
              </Link>
            </li>
          </ul>
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="flex items-center">{/* <PagesDropdown /> */}</li>
            <li className="flex items-center">
              <Link href="/">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href=""
                  target="_blank"
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
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <span className="lg:hidden inline-block ml-2">Feed Back</span>
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
