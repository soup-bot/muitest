import { Form, NavLink, useLoaderData } from "@remix-run/react";
import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.svg";
import logosmall from "../assets/logosmall.svg";
import { MdMoveToInbox } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { RiContactsBook2Fill } from "react-icons/ri";
import { HiDocumentReport } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidMessageAdd } from "react-icons/bi";
import { FaCoins } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { Theme, useTheme } from "remix-themes";

export default function Navbar({ balance, serviceStatus, theme }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [dropdownVisible, setdropdownVisible] = useState(false);
  const [, setTheme] = useTheme();
  const toggleDarkMode = () => {
    setTheme((prev) => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  };

  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    setdropdownVisible(false);
  };
  const toggledropdownVisible = () => {
    setdropdownVisible(!dropdownVisible);
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
      <div className="w-full bg-gradient-to-r from-cyan-500 via-teal-400  to-primary h-1"></div>
      <nav className="bg-white border-gray-200 shadow-md md:shadow-none xl:pb-2 xl:pt-1 xl:mb-0 dark:bg-slate-950 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
          <NavLink to="/">
            <img className="h-12 hidden md:block" src={logo} alt="" />
            <img className="h-12 md:hidden" src={logosmall} alt="" />
          </NavLink>

          <div
            ref={dropdownRef}
            className="flex gap-4 items-center justify-items-center "
          >
            <div className="px-2 py-2 text-white rounded-lg font-medium  bg-gradient-to-tl from-primary to-hoverprim  align-center justify-center hidden lg:flex">
              <p className="drop-shadow-md mx-2">{balance}</p>
              <div className="flex align-middle justify-center items-center mr-1">
                <FaCoins />
              </div>
            </div>
            {serviceStatus === "active" && (
              <button
                onClick={toggleSidebar}
                data-collapse-toggle="navbar-default"
                type="button"
                className="hover:scale-110 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-primary rounded-lg lg:hidden   transition-all duration-300"
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
            )}

            <div className="relative">
              <div>
                <div>
                  <FaUserCircle
                    className="cursor-pointer hover:scale-110 transition-all "
                    size={32}
                    color={"#F05425"}
                    onClick={toggledropdownVisible}
                  />
                </div>
              </div>

              <div
                id="userDropdown"
                className={` ${
                  dropdownVisible ? "" : "hidden"
                } z-10 absolute right-1 bg-white  rounded-lg shadow w-44 dark:bg-slate-800 `}
              >
                <ul
                  className="pt-2 text-sm text-gray-700 "
                  aria-labelledby="avatarButton"
                >
                  <li>
                    <NavLink
                      to="/dashboard"
                      onClick={toggledropdownVisible}
                      className="block px-4 py-2 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-600"
                    >
                      Dashboard
                    </NavLink>
                  </li>

                  <li>
                    <a
                      href="https://www.dhiraagu.com.mv/business/products-solutions/voice-collaboration/bulk-sms-short-code-messaging-service"
                      target="_blank"
                      onClick={toggledropdownVisible}
                      className="block px-4 py-2 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-600"
                    >
                      Help
                    </a>
                  </li>
                  <li>
                    <button
                      className="block p-2 pl-3 pt-3 pb-3 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-600 w-full"
                      onClick={toggleDarkMode}
                    >
                      {theme === Theme.DARK ? (
                        <MdLightMode size={20} />
                      ) : (
                        <MdDarkMode size={20} />
                      )}
                    </button>
                  </li>
                  <li className="lg:hidden">
                    <div className="my-1 mb-0 px-2 py-3 text-white font-medium  bg-gradient-to-tl from-primary to-hoverprim  flex align-center justify-left">
                      <p className="drop-shadow-md mx-2">Balance: {balance} </p>
                      <div className="flex align-middle justify-center items-center mr-1">
                        <FaCoins />
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="">
                  {/* <NavLink
                    to="/auth"
                    onClick={signOut}
                    className="block px-4 pt-3 pb-3 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg dark:text-slate-300 dark:hover:bg-slate-600"
                  >
                    Sign out
                  </NavLink> */}

                  <Form method="post" action="logout">
                    <button className="w-full text-left block px-4 pt-3 pb-3 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg dark:text-slate-300 dark:hover:bg-slate-600">
                      Logout
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* SIDEBAR */}

      {serviceStatus === "active" && (
        <div>
          <div
            id="default-sidebar"
            className={`absolute lg:relative top-0 left-0 z-40 lg:z-0 w-64 lg:w-full h-screen lg:h-min transition-transform ${
              sidebarVisible ? "" : "-translate-x-full lg:translate-x-0"
            }`}
            aria-label="Sidebar"
          >
            <div className="h-full lg:h-30 px-0 py-4 overflow-y-auto bg-white  shadow-md lg:shadow-none lg:dark:bg-slate-950 dark:bg-slate-950">
              <ul className=" space-y-5 lg:space-y-0 lg:gap-3 font-medium lg:flex lg:flex-row lg:w-full lg:justify-center dark:text-white ">
                <div className="flex flex-col lg:flex-row space-y-6 py-10 lg:py-0 lg:space-y-0 lg:border lg:rounded-lg lg:shadow-md dark:bg-slate-950 lg:dark:bg-slate-700 dark:text-white  dark:border-none">
                  <li>
                    <NavLink
                      prefetch="intent"
                      to="/"
                      onClick={toggleSidebar}
                      className={({ isActive }) =>
                        isActive
                          ? "pl-8 py-3 lg:p-3 lg:pr-4 flex items-center p-2 text-white bg-secondary shadow-lg  shadow-secondary/30 lg:rounded-l-lg group transition dark:text-white"
                          : "pl-8 py-3 lg:p-3 lg:pr-4 flex items-center p-2 text-gray-600 lg:rounded-l-lg  hover:bg-slate-100  hover:scale-105 group  transition dark:text-white dark:hover:bg-slate-600"
                      }
                    >
                      <BiSolidMessageAdd size={26} />
                      <span className="flex-1 ms-3 whitespace-nowrap font-500">
                        New Message
                      </span>
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink
                      prefetch="intent"
                      to="/inbox/table"
                      onClick={toggleSidebar}
                      className={({ isActive }) =>
                        isActive
                          ? "pl-8 py-3 lg:p-3 lg:pr-4 flex items-center p-2 text-white bg-secondary shadow-lg  shadow-secondary/30 group transition dark:text-white"
                          : "pl-8 py-3 lg:p-3 lg:pr-4 flex items-center p-2 text-gray-600   hover:bg-slate-100  hover:scale-105  group transition dark:text-white dark:hover:bg-slate-600"
                      }
                    >
                      <MdMoveToInbox size={26} />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Inbox
                      </span>
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink
                      prefetch="intent"
                      to="/sentitems/table?page=1&pageSize=25&startDate=&endDate="
                      onClick={toggleSidebar}
                      className={({ isActive }) =>
                        isActive
                          ? "pl-8 py-3 lg:p-3 lg:pr-4 flex items-center p-2 text-white bg-secondary shadow-lg shadow-secondary/30 group transition dark:text-white"
                          : "pl-8 py-3 lg:p-3 lg:pr-4 flex items-center p-2 text-gray-600  hover:bg-slate-100  hover:scale-105  group transition dark:text-white dark:hover:bg-slate-600"
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
                      prefetch="intent"
                      to="/contacts"
                      onClick={toggleSidebar}
                      className={({ isActive }) =>
                        isActive
                          ? "pl-8 py-3 lg:p-3 lg:pr-4 flex items-center p-2 text-white bg-secondary shadow-lg shadow-secondary/30 group transition dark:text-white"
                          : "pl-8 py-3 lg:p-3 lg:pr-4 flex items-center p-2 text-gray-600   hover:bg-slate-100  hover:scale-105  group transition dark:text-white dark:hover:bg-slate-600"
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
                      prefetch="intent"
                      to="/reports"
                      onClick={toggleSidebar}
                      className={({ isActive }) =>
                        isActive
                          ? "pl-8 py-3 lg:p-3 lg:pr-4 flex items-center p-2 text-white bg-secondary shadow-lg shadow-secondary/30 lg:rounded-r-lg group transition dark:text-white"
                          : "pl-8 py-3 lg:p-3 lg:pr-4 flex items-center p-2 text-gray-600 lg:rounded-r-lg  hover:bg-slate-100  hover:scale-105  group transition dark:text-white dark:hover:bg-slate-600"
                      }
                    >
                      <HiDocumentReport size={26} />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Reports
                      </span>
                    </NavLink>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
