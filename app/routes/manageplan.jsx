import { useDarkMode } from "../components/DarkModeContext";
import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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
        <h1 className="font-bold text-2xl my-10 dark:text-slate-200">
          Build your plan
        </h1>

        <div>
          {/* 
CREATE PLAN CARD */}

          <div className="md:p-20">
            <div className="mb-4">
              <div className="flex align-middle w-full justify-between ">
                <div className="flex flex-col">
                  <p className="text-lg mb-5">Local</p>

                  <div className="border p-1 px-2 rounded-lg bg-secondary text-white font-bold w-min flex">
                    {localSms}
                    <p className="ml-2">SMS</p>
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
                color="success"
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

            <div className="mb-4">
              <div className="flex align-middle w-full justify-between">
                <div className="flex flex-col">
                  <p className="text-lg mb-5">International</p>

                  <div>
                    <div className="border p-1 px-2 rounded-lg bg-secondary text-white  w-min flex font-bold">
                      {internationalSms} <p className="ml-2">SMS</p>
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
                color="info"
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

            <div className="flex justify-between align-bottom flex-col md:flex-row">
              <p className="text-lg font-semibold border rounded-lg p-2 px-4 self-end w-full md:w-max">
                Cost: {calculateCreditCost()} credits
              </p>

              <button className="inline-flex items-center mt-16 px-3 py-2 text-sm font-medium text-center text-white bg-primary self-end rounded-lg hover:bg-hoverprim w-full md:w-max justify-center ">
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
