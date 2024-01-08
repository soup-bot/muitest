import { useDarkMode } from "../components/DarkModeContext";
import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { IoMdHome } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import { MdSms } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "@remix-run/react";

const stepOptions = [
  { value: 50, max: 1000 },
  { value: 500, max: 10000 },
  { value: 2500, max: 50000 },
  { value: 5000, max: 100000 },
];

const packageConfigurations = {
  Starter: { min: 100, max: 1000, step: 100, rate: 2 },
  Basic: { min: 1000, max: 10000, step: 1000, rate: 1.25 },
  Medium: { min: 10000, max: 50000, step: 5000, rate: 1 },
  Advanced: { min: 50000, max: 1000000, step: 10000, rate: 0.8 },
  Power: { min: 100000, max: 1000000, step: 100000, rate: 0.5 },
};

export default function Manage() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [localSms, setLocalSms] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState("Starter");

  useEffect(() => {
    // Set initial localSms based on the selected package configuration
    setLocalSms(packageConfigurations[selectedPackage].min);
  }, [selectedPackage]);

  const handleLocalSmsChange = (event, value) => {
    setLocalSms(value);
  };

  const handlePackageChange = (event) => {
    setSelectedPackage(event.target.value);
  };

  const calculateCreditCost = () => {
    const { rate } = packageConfigurations[selectedPackage];
    return (localSms * rate) / 5; // Adjust the formula based on your pricing model
  };

  return (
    <div
      className={`h-screen w-full flex justify-center xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in ${
        isDarkMode ? "dark " : ""
      }`}
    >
      <div className=" rounded-lg md:shadow-lg  xl:border-t-4  border-secondary w-full px-10 mt-4 xl:w-2/3 bg-white dark:bg-slate-900">
        <Link to={"/dashboard"}>
          <div className="font-medium text-2xl my-10 dark:text-slate-200 flex">
            <IoChevronBack className="mt-1 animate-pulse animate-infinite" />{" "}
            <div>Dashboard</div>
          </div>
        </Link>
        <div>
          {/* 
CREATE PLAN CARD */}

          <div className="md:border rounded-lg dark:md:border-slate-700">
            <div className="mb-9 md:mb-0 md:border-b dark:md:border-slate-700 md:px-10 py-4">
              <p className="mb-5  text-slate-800  font-medium opacity-70 dark:text-slate-200">
                Create my plan
              </p>
              <div className="flex align-middle w-full justify-between ">
                <div className="flex flex-col">
                  <div className="text-lg mb-5 dark:text-slate-200 flex align-middle justify-center">
                    <div className="flex align-middle justify-center  mr-2">
                      <MdSms size={25} />
                    </div>
                    Purchase points
                  </div>

                  <div className="p-1 px-2 rounded-lg shadow-md font-bold w-min flex  border-primary border-2 text-primary">
                    {localSms}
                    <div className="flex items-center align-middle ml-2">
                      <FaCoins size={15} />
                    </div>
                  </div>
                </div>
                <div className="self-end">
                  <Select
                    size="small"
                    value={selectedPackage}
                    onChange={handlePackageChange}
                  >
                    {Object.keys(packageConfigurations).map((packageKey) => (
                      <MenuItem key={packageKey} value={packageKey}>
                        {packageKey}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <Slider
                marks
                value={localSms}
                color="primary"
                onChange={handleLocalSmsChange}
                step={packageConfigurations[selectedPackage].step}
                sx={{ height: 12 }}
                min={packageConfigurations[selectedPackage].min}
                max={packageConfigurations[selectedPackage].max}
              />
            </div>

            <div className="flex justify-between align-bottom flex-col md:flex-row mt-10 md:mt-0 md:pb-5 md:px-8">
              <div className="text-md font-semibold border-2 rounded-lg p-2 px-4 self-end w-full md:w-max shadow-md text-green-500 flex border-green-500">
                Cost: {calculateCreditCost()} MVR
              </div>

              <button className="inline-flex items-center md:mt-16 mt-5 p-2 px-4 text-md font-semibold  text-center text-white bg-primary self-end rounded-lg hover:bg-hoverprim w-full md:w-max justify-center ">
                Confirm
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
