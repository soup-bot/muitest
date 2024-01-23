import { useDarkMode } from "../components/DarkModeContext";
import { useState, useEffect, useRef } from "react";

import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { IoMdHome } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { MdSms } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { Form, Link } from "@remix-run/react";
import { Carousel } from "flowbite-react";
import { BiMoney } from "react-icons/bi";
import { RiMessage2Line } from "react-icons/ri";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Button from "@mui/material/Button";
import { checkUserLoggedIn } from "../data/authentication.server";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import packageConfigurations from "../data/packageConfigurations.json";
import dotenv from "dotenv";
import { getAccessTokenFromCookie } from "../data/authentication.server";

const customTheme = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl:
      "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none",
  },
  indicators: {
    active: {
      off: "bg-primary/20 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
      on: "bg-primary/60 dark:bg-gray-800",
    },
    base: "h-3 w-3 rounded-full md:hidden",
    wrapper: "absolute bottom-1 left-1/2 flex -translate-x-1/2 space-x-3",
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-full flex-shrink-0 transform cursor-default snap-center",
      on: "w-full flex-shrink-0 transform cursor-grab snap-center",
    },
  },
  control: {
    base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 group-hover:bg-primary/60  dark:bg-slate-300/20 dark:group-hover:bg-primary/60  sm:h-10 sm:w-10",
    icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};

export const loader = async ({ request }) => {
  dotenv.config();
  const accessToken = getAccessTokenFromCookie(request);
  const getBalanceEP = process.env.REACT_APP_GET_BALANCE_EP;

  const {
    isLoggedIn,
    userId,
    planId,
    balance,
    serviceNumber,
    displayName,
    email,
    serviceStatus,
  } = await checkUserLoggedIn(request);

  if (!isLoggedIn) {
    // User is not logged in, redirect to /auth
    return redirect("/auth");
  }
  // Include balance data in the returned object
  return {
    balance,
    serviceNumber,
    displayName,
    email,
    serviceStatus,
    planId,
  };
};

export default function Manage() {
  const { planId } = useLoaderData();

  const currentPackageRef = useRef(null);
  const [localSms, setLocalSms] = useState(0);
  const findPackageById = (id) => {
    return Object.keys(packageConfigurations).find(
      (key) => packageConfigurations[key].id == id
    );
  };

  const [selectedPackage, setSelectedPackage] = useState(() =>
    findPackageById(planId)
  );

  useEffect(() => {
    setSelectedPackage(findPackageById(planId));
  }, [planId]);
  useEffect(() => {
    // Set initial localSms based on the selected package configuration
    setLocalSms(packageConfigurations[selectedPackage].min);
  }, [selectedPackage]);

  const handleLocalSmsChange = (event, value) => {
    setLocalSms(value);
  };

  const handleChangePackage = (newPackage) => {
    setSelectedPackage(newPackage);
  };

  const calculateCreditCost = () => {
    const { rate } = packageConfigurations[selectedPackage];
    return localSms * rate; // Adjust the formula based on your pricing model
  };

  useEffect(() => {
    // Scroll to the current package card when selectedPackage changes
    if (currentPackageRef.current) {
      currentPackageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedPackage]);

  return (
    <div
      className={`h-max w-full flex justify-center animate-fade-up animate-once animate-duration-200 animate-ease-in `}
    >
      <div className=" h-screen pb-20 min-h-full  2xl:shadow-lg  2xl:border-t-4 mt-4 border-secondary w-full md:px-10 pt-4 xl:rounded-lg 2xl:w-2/3 bg-white z-10 dark:bg-slate-900">
        <Link
          to="/dashboard"
          className="

inline-block"
        >
          <div className="font-medium text-2xl my-10 dark:text-slate-200 flex  w-min hover:scale-105 transition">
            <IoChevronBack className="mt-1 ml-8 md:ml-0" /> <div>Dashboard</div>
          </div>
        </Link>
        <div className="flex flex-col 0 w-full lg:flex-row">
          <div className="flex align-middle justify-center items-center lg:w-1/2 lg:border-l lg:border-t lg:border-b rounded-l-lg dark:border-slate-600">
            <div className="h-96 md:w-2/3 lg:w-full w-full">
              <Carousel slide={false} theme={customTheme} indicators={false}>
                {
                  (selectedPackage,
                  Object.keys(packageConfigurations).map((packageKey) => (
                    <div
                      key={packageKey}
                      className=""
                      ref={
                        packageKey === selectedPackage
                          ? currentPackageRef
                          : null
                      }
                    >
                      <div className="w-full h-full flex items-center justify-center p-10   ">
                        <div
                          className={`bg-white px-6 pt-2 py-4 rounded-lg shadow-md  border-t-2 dark:bg-slate-950/30 dark:text-slate-300 ${
                            packageKey === selectedPackage
                              ? "border-green-500"
                              : "border-secondary"
                          }`}
                        >
                          {selectedPackage === packageKey ? (
                            <div className="text-sm font-semibold  text-green-500 mb-4 mt-4  justify-center flex w-full ">
                              <p> Current Plan</p>
                            </div>
                          ) : (
                            <div className="pt-7"></div>
                          )}

                          <h1
                            className={`font-bold text-xl mb-5 ${
                              packageKey === selectedPackage
                                ? "text-green-500"
                                : "text-secondary"
                            }`}
                          >
                            {packageKey}
                          </h1>
                          <ul>
                            <li className="flex align-middle items-center my-3">
                              <RiMessage2Line size={23} className="mr-3" />
                              Customize between{" "}
                              {packageConfigurations[packageKey].min} and{" "}
                              {packageConfigurations[packageKey].max} points
                            </li>
                            <li className="flex align-middle items-center my-3">
                              <BiMoney size={23} className="mr-3" />A rate of{" "}
                              {packageConfigurations[packageKey].rate} MVR per
                              point
                            </li>{" "}
                            <li className="flex align-middle items-center my-3 mb-10 text-slate-500">
                              <IoMdInformationCircleOutline
                                size={23}
                                className="mr-3"
                              />
                              <p className="text-sm">
                                {" "}
                                {packageConfigurations[packageKey].description}
                              </p>
                            </li>
                            {/* <div className="flex align-middle justify-center mt-4">
                            <Button variant="outlined" color="primary">
                              Change
                            </Button>
                          </div> */}
                            <div className="flex align-middle justify-center mt-4">
                              {!(selectedPackage === packageKey) && (
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={() =>
                                    handleChangePackage(packageKey)
                                  }
                                >
                                  Change
                                </Button>
                              )}
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )))
                }
              </Carousel>
            </div>
          </div>

          {/* 
CREATE PLAN CARD */}
          <Form
            method="patch"
            action="/purchasePoints"
            className="md:border rounded-r-lg dark:md:border-slate-700 px-8  lg:w-1/2 flex flex-col "
          >
            <div className="">
              <div className="mb-3 md:mb-0  dark:md:border-slate-700 md:px-10 py-4 h-2/3">
                <p className="mb-5   text-green-500  font-medium  dark:text-slate-200">
                  Purchase points
                </p>
                <div className="flex align-middle w-full justify-between pt-12">
                  <div className="flex flex-col">
                    <div className="text-md mb-2 dark:text-slate-200 flex align-middle justify-left ">
                      <div className="flex align-middle justify-center  mr-2">
                        <IoMdHome size={25} />
                      </div>
                      1 Local SMS = x points
                      {"  "}
                    </div>
                    <div className="text-md mb-5 dark:text-slate-200 flex align-middle justify-left w-full ">
                      <div className="flex align-middle justify-center  mr-2">
                        <TbWorld size={25} />
                      </div>
                      1 International SMS = x points
                      {"  "}
                    </div>

                    <div className="p-1 px-2 rounded-lg shadow-md font-bold w-min flex  border-primary/80 border-2 text-primary/80 dark:border-secondary dark:text-secondary">
                      {localSms}
                      <div className="flex items-center align-middle ml-2">
                        <FaCoins size={15} />
                      </div>
                    </div>
                  </div>
                  <div className="self-end">
                    {/* <Select
                    size="small"
                    value={selectedPackage}
                    onChange={handlePackageChange}
                  >
                    {Object.keys(packageConfigurations).map((packageKey) => (
                      <MenuItem key={packageKey} value={packageKey}>
                        {packageKey}
                      </MenuItem>
                    ))}
                  </Select> */}
                  </div>
                </div>
                <Slider
                  marks
                  name="points"
                  value={localSms}
                  color="primary"
                  onChange={handleLocalSmsChange}
                  step={packageConfigurations[selectedPackage].step}
                  sx={{ height: 12 }}
                  min={packageConfigurations[selectedPackage].min}
                  max={packageConfigurations[selectedPackage].max}
                />
              </div>
              <div className="flex justify-between align-bottom flex-col md:flex-row mt-10 md:mt-0 md:pb-5 md:px-8 h-1/3">
                <div className="text-md   p-2 px-4 self-end w-full md:w-max  border-b-2 flex text-slate-600 dark:text-slate-300 my-2">
                  <p className="mr-2 font-semibold "> Cost:</p>
                  <p> {calculateCreditCost()} MVR</p>
                </div>

                <Button
                  value={planId}
                  type="submit"
                  name="planId"
                  variant="contained"
                  className="inline-flex items-center md:mt-16 mt-5 p-2 px-4 text-md font-semibold  text-center text-white my-2 bg-primary self-end rounded-lg hover:bg-hoverprim w-full md:w-max justify-center"
                >
                  Purchase
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
