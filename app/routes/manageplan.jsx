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

const calculateDefaultStep = (maxValue) => {
  const logMax = Math.log10(maxValue);
  return Math.ceil(logMax / 10);
};

export default function Manage() {
  const [localSms, setLocalSms] = useState(0);
  const [internationalSms, setInternationalSms] = useState(0);
  const [customCredit, setCustomCredit] = useState(0);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [localSmsStep, setLocalSmsStep] = useState(
    calculateDefaultStep(100000)
  );
  const [internationalSmsStep, setInternationalSmsStep] = useState(
    calculateDefaultStep(100000)
  );
  const [selectedLocalSmsStep, setSelectedLocalSmsStep] = useState(50);
  const [selectedInternationalSmsStep, setSelectedInternationalSmsStep] =
    useState(50);

  useEffect(() => {
    // Use useEffect to ensure the correct initial step count for the slider
    setLocalSmsStep(selectedLocalSmsStep);
    setInternationalSmsStep(selectedInternationalSmsStep);
  }, [selectedLocalSmsStep, selectedInternationalSmsStep]);

  const calculateCreditCost = () => {
    // Implement your logic to calculate credit cost based on localSms, internationalSms, and customCredit
    // You can adjust this based on your pricing model
    const totalCreditCost =
      (localSms * 1) / 5 + internationalSms * 1 + customCredit;
    return totalCreditCost;
  };

  const handleLocalSmsChange = (event, value) => {
    setLocalSms(value);
  };

  const handleInternationalSmsChange = (event, value) => {
    setInternationalSms(value);
  };

  const handleLocalSmsStepChange = (event) => {
    const selectedStep = parseInt(event.target.value, 10);
    setSelectedLocalSmsStep(selectedStep);
    setLocalSmsStep(selectedStep);
    adjustMaxValue("local", selectedStep);
  };

  const handleInternationalSmsStepChange = (event) => {
    const selectedStep = parseInt(event.target.value, 10);
    setSelectedInternationalSmsStep(selectedStep);
    setInternationalSmsStep(selectedStep);
    adjustMaxValue("international", selectedStep);
  };

  const adjustMaxValue = (type, selectedStep) => {
    const selectedOption = stepOptions.find(
      (option) => option.value === selectedStep
    );
    const max = selectedOption ? selectedOption.max : 1000;

    if (type === "local") {
      setLocalSms((prev) => (prev > max ? max : prev));
    } else if (type === "international") {
      setInternationalSms((prev) => (prev > max ? max : prev));
    }
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
                      <IoMdHome size={25} />
                    </div>
                    Local
                  </div>

                  <div className="p-1 px-2 rounded-lg shadow-md font-bold w-min flex  border-primary border-2 text-primary">
                    {localSms}
                    <MdSms size={20} className="ml-2 mt-1" />
                  </div>
                </div>
                <div className="self-end">
                  <Select
                    size="small"
                    defaultValue={50}
                    onChange={handleLocalSmsStepChange}
                  >
                    {stepOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        Step {option.value}
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
                step={localSmsStep}
                sx={{ height: 12 }}
                min={0}
                max={
                  stepOptions.find((option) => option.value === localSmsStep)
                    ?.max || 1000
                }
              />
            </div>

            <div className="md:border-b dark:md:border-slate-700 md:p-10 mb-20 md:mb-0 ">
              <div className="flex align-middle w-full justify-between">
                <div className="flex flex-col ">
                  <div className="text-lg mb-5 dark:text-slate-200 flex align-middle justify-center">
                    <div className="flex align-middle justify-center  mr-2">
                      <TbWorld size={25} />
                    </div>
                    International
                  </div>

                  <div>
                    <div className="border-2 p-1 px-2 rounded-lg shadow-md text-md  w-min flex font-bold  border-secondary text-secondary">
                      {internationalSms}
                      <MdSms size={20} className="ml-2 mt-1" />
                    </div>
                  </div>
                </div>
                <div className="self-end">
                  <Select
                    size="small"
                    defaultValue={50}
                    onChange={handleInternationalSmsStepChange}
                  >
                    {stepOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        Step {option.value}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <Slider
                color="secondary"
                marks
                value={internationalSms}
                onChange={handleInternationalSmsChange}
                step={internationalSmsStep}
                min={0}
                sx={{ height: 12 }}
                max={
                  stepOptions.find(
                    (option) => option.value === internationalSmsStep
                  )?.max || 1000
                }
              />
            </div>

            <div className="flex justify-between align-bottom flex-col md:flex-row mt-10 md:mt-0 md:pb-5 md:px-5">
              <div className="text-md  font-semibold border-2 rounded-lg p-2 px-4 self-end  w-full md:w-max shadow-md text-green-500  flex border-green-500 ">
                Cost: {calculateCreditCost()} <FaCoins className="mt-1 ml-2" />
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
