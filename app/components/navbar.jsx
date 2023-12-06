import { NavLink, useLoaderData } from "@remix-run/react";
import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.svg";
import logosmall from "../assets/logosmall.svg";
import { MdMoveToInbox } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { RiContactsBook2Fill } from "react-icons/ri";
import { HiDocumentReport } from "react-icons/hi";
import { PiSignOutBold } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { json } from "@remix-run/node";
import { BiSolidMessageAdd } from "react-icons/bi";

export default function Navbar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [dropdownVisible, setdropdownVisible] = useState(false);
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const toggledropdownVisible = () => {
    setdropdownVisible(!dropdownVisible);
  };
  const closeSidebar = () => {
    setSidebarVisible(false);
  };
  const closeDropDown = () => {
    setSidebarVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        // Click outside the sidebar, close it
        setSidebarVisible(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Click outside the sidebar, close it
        setdropdownVisible(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef, dropdownRef]);
  return (
    <div ref={sidebarRef}>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md sm:shadow-none xl:py-2 xl:mb-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to="/">
            <img className="h-12 hidden md:block" src={logo} alt="" />
            <img className="h-12 md:hidden" src={logosmall} alt="" />
          </NavLink>

          <div
            ref={dropdownRef}
            className="flex gap-4 items-center justify-items-center"
          >
            <button
              onClick={toggleSidebar}
              data-collapse-toggle="navbar-default"
              type="button"
              className="hover:scale-110 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-primary rounded-lg xl:hidden  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-all duration-300"
              aria-controls="navbar-default"
              aria-expanded={sidebarVisible ? "true" : "false"}
            >
              <span className="sr-only">Toggle menu</span>
              {sidebarVisible ? (
                <svg
                  className="w-15 h-15 transition-transform transform rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 transition-transform transform rotate-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              )}
            </button>

            <div className="relative">
              <div>
                <div>
                  <FaUserCircle
                    className="cursor-pointer hover:scale-110 transition-all"
                    size={27}
                    color={"#F05425"}
                    onClick={toggledropdownVisible}
                  />
                </div>
              </div>

              <div
                id="userDropdown"
                className={` ${
                  dropdownVisible ? "" : "hidden"
                } z-10 absolute right-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="avatarButton"
                >
                  <li>
                    <NavLink
                      to="/profile"
                      onClick={toggledropdownVisible}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/settings"
                      onClick={toggledropdownVisible}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </NavLink>{" "}
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={toggledropdownVisible}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Help
                    </a>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    href="#"
                    onClick={toggledropdownVisible}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* SIDEBAR */}

      {/* <div>
        <div
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            sidebarVisible ? "" : "-translate-x-full xl:translate-x-0"
          }`}
          aria-label="Sidebar"
        >
          <div className="h-full px-0 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 ">
            <ul className="space-y-5 font-medium">
              <li>
                <NavLink to="/">
                  <img
                    className="pl-8  mt-3 h-12 hidden xl:block"
                    src={logo}
                    alt=""
                  />
                </NavLink>
              </li>
              <li>
                <div className="my-8 w-full bg-slate-400 h-0.5 opacity-30 hidden xl:block"></div>
                <NavLink
                  to="/"
                  onClick={toggleSidebar}
                  className="pl-8 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary hover:text-white  dark:hover:bg-gray-700 group"
                >
                  <BiSolidMessageAdd size={26} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    New Message
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/inbox/table"
                  onClick={toggleSidebar}
                  className="pl-8  flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary hover:text-white dark:hover:bg-gray-700 group"
                >
                  <MdMoveToInbox size={26} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sentitems/table"
                  onClick={toggleSidebar}
                  className="pl-8 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary hover:text-white dark:hover:bg-gray-700 group"
                >
                  <IoMdSend size={26} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Sent items
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contacts"
                  onClick={toggleSidebar}
                  className="pl-8 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary hover:text-white dark:hover:bg-gray-700 group"
                >
                  <RiContactsBook2Fill size={26} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Contacts
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reports"
                  onClick={toggleSidebar}
                  className="pl-8 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary hover:text-white dark:hover:bg-gray-700 group"
                >
                  <HiDocumentReport size={26} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth"
                  className="pl-8 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary hover:text-white dark:hover:bg-gray-700 group"
                >
                  <PiSignOutBold size={26} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Sign Out
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div> */}

      <div>
        <div
          id="default-sidebar"
          className={`absolute lg:relative top-0 left-0 z-40 lg:z-0 w-64 lg:w-full h-screen lg:h-min transition-transform ${
            sidebarVisible ? "" : "-translate-x-full xl:translate-x-0"
          }`}
          aria-label="Sidebar"
        >
          <div className="h-full lg:h-30 px-0 py-4 overflow-y-auto bg-white dark:bg-gray-800 shadow-md lg:shadow-none">
            <ul className=" space-y-5 lg:space-y-0 lg:gap-3 font-medium lg:flex lg:flex-row lg:w-full lg:justify-center">
              <li>
                <NavLink
                  to="/"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    isActive
                      ? "pl-8 lg:p-3 lg:pr-4 flex items-center p-2 text-white bg-secondary rounded-lg group"
                      : "pl-8 lg:p-3 lg:pr-4 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary hover:text-white  group"
                  }
                >
                  <BiSolidMessageAdd size={26} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    New Message
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/inbox/table"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    isActive
                      ? "pl-8 lg:p-3 lg:pr-4 flex items-center p-2 text-white bg-secondary rounded-lg group"
                      : "pl-8 lg:p-3 lg:pr-4 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary hover:text-white  group"
                  }
                >
                  <MdMoveToInbox size={26} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sentitems/table"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    isActive
                      ? "pl-8 lg:p-3 lg:pr-4 flex items-center p-2 text-white bg-secondary rounded-lg group"
                      : "pl-8 lg:p-3 lg:pr-4 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary hover:text-white  group"
                  }
                >
                  <IoMdSend size={26} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Sent items
                  </span>
                </NavLink>
              </li>
              <li className="w-120">
                <NavLink
                  to="/contacts"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    isActive
                      ? "pl-8 lg:p-3 lg:pr-4 flex items-center p-2 text-white bg-secondary rounded-lg group"
                      : "pl-8 lg:p-3 lg:pr-4 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary hover:text-white  group"
                  }
                >
                  <RiContactsBook2Fill size={26} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Contacts
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reports"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    isActive
                      ? "pl-8 lg:p-3 lg:pr-4 flex items-center p-2 text-white bg-secondary rounded-lg group"
                      : "pl-8 lg:p-3 lg:pr-4 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary hover:text-white  group"
                  }
                >
                  <HiDocumentReport size={26} />
                  <span className="flex-1 ms-3 whitespace-nowrap">Reports</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth"
                  className="pl-8 lg:p-3 lg:pr-4 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary hover:text-white dark:hover:bg-gray-700 group"
                >
                  <PiSignOutBold size={26} />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Sign Out
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
