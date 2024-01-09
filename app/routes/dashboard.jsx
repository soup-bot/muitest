import { FaWallet } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef, forwardRef, useEffect } from "react";
import dayjs from "dayjs";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { useDarkMode } from "../components/DarkModeContext";
import { checkUserLoggedIn } from "../data/authentication.server";
import { redirect } from "@remix-run/node";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Link, useLoaderData } from "@remix-run/react";
import { FaCoins } from "react-icons/fa";

const stepOptions = [
  { value: 50, max: 1000 },
  { value: 500, max: 10000 },
  { value: 2500, max: 50000 },
  { value: 5000, max: 100000 },
];

export const meta = () => {
  return [{ title: "Dashboard - Dhiraagu Bulk SMS" }];
};

const calculateDefaultStep = (maxValue) => {
  const logMax = Math.log10(maxValue);
  return Math.ceil(logMax / 10);
};

const palette = ["#F26940", "#0FA5B7"];

const getFirstDayOfMonth = () => {
  return dayjs().startOf("month");
};

// Function to get the last day of the current month
const getLastDayOfMonth = () => {
  return dayjs().endOf("month");
};

export const loader = async ({ request }) => {
  const {
    isLoggedIn,
    userId,
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

  // User is logged in, you can use userId if needed
  return { balance, serviceNumber, displayName, email, serviceStatus };
};

function Dashboard() {
  const { balance, serviceNumber, displayName, email, serviceStatus } =
    useLoaderData();
  const [localSms, setLocalSms] = useState(0);
  const [internationalSms, setInternationalSms] = useState(0);
  const [customCredit, setCustomCredit] = useState(0);
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
  const [startDate, setStartDate] = useState(getFirstDayOfMonth());
  const [endDate, setEndDate] = useState(getLastDayOfMonth());
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const today = dayjs().format("DD/MM/YYYY");
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div
      className={`h-max w-full flex justify-center animate-fade-up animate-once animate-duration-200 animate-ease-in  ${
        isDarkMode ? "dark " : ""
      }`}
    >
      <div className=" h-max pb-20 min-h-full  2xl: shadow-lg  2xl:border-t-4 mt-4 border-secondary w-full px-10 pt-4 xl:rounded-lg 2xl:w-2/3 bg-white z-10 dark:bg-slate-900">
        <h1 className="font-medium text-2xl my-10 px-3 dark:text-slate-200">
          Dashboard
        </h1>

        <div className="pt-2 flex flex-row flex-wrap w-full ">
          {/* BALANCE CARD */}
          <div className="w-full py-3 lg:p-3">
            <div className="transition   bg-gradient-to-bl from-blue-200 to-secondary w-full p-6 bg-white  rounded-lg shadow-xl  hover:bg-gray-100 ">
              <div className="flex mb-4 align-middle text-center items-center">
                <h5 className="text-2xl font-medium  tracking-tight text-white mr-3">
                  {balance} coins
                </h5>
                <FaCoins color="white" size={23} />
              </div>
              <p className="font-medium opacity-70 text-gray-100 ">My wallet</p>
            </div>
          </div>
          {/* PACKAGE CARD */}
          <div className="w-full p-0  py-3  lg:p-3 lg:basis-1/2">
            <div className="transition   w-full h-full p-6 bg-white border-b-4  hover:border-b-primary border dark:border-slate-600 dark:hover:border-b-primary rounded-lg dark:bg-slate-800">
              <p className="mb-3  text-slate-800  font-medium opacity-70 dark:text-slate-200">
                My current plan
              </p>
              <h5 className="mb-2 text-2xl font-medium tracking-tight text-slate-900 dark:text-slate-200">
                BULK/CORP SMS 15K
              </h5>

              <ul className="my-4 list-disc mx-4">
                <li className="text-md dark:text-slate-200">
                  SMS Allowance per month -110,000{" "}
                </li>
                <li className="text-md dark:text-slate-200">
                  {" "}
                  Excess SMS Allowance per month -200,000
                </li>
                <li className="text-md dark:text-slate-200">
                  Excess Allowance Charge (MVR) - 0.15
                </li>
              </ul>
              <Link to="/manageplan">
                <button className=" inline-flex items-center mt-16 px-3 py-2 text-sm font-medium text-center text-white bg-primary self-end rounded-lg hover:bg-hoverprim ">
                  Manage plan
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
              </Link>
            </div>
          </div>

          {/* USAGE CARD */}
          <div className="w-full p-0  py-3  lg:p-3 lg:basis-1/2">
            <div className="transition  w-full p-6 h-full bg-white border-b-4  hover:border-b-primary border dark:border-slate-600 dark:hover:border-b-primary rounded-lg dark:bg-slate-800">
              <p className="mb-3  text-slate-800  font-medium opacity-70 dark:text-slate-200">
                My usage
              </p>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-hoverprim"></h5>

              <div className="flex flex-wrap gap-6 w-full">
                <PieChart
                  colors={palette}
                  series={[
                    {
                      arcLabel: (item) => `${item.value}`,
                      arcLabelMinAngle: 45,
                      data: [
                        { id: 0, value: 189, label: "Used" },
                        { id: 1, value: 522, label: "Remaining" },
                      ],
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 20,
                        additionalRadius: -5,
                      },

                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 2,
                      cornerRadius: 4,
                      startAngle: -180,
                      endAngle: 180,
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: "white",
                      fontWeight: "bold",
                    },
                  }}
                  width={400}
                  height={200}
                />
              </div>
            </div>
          </div>

          <div className="w-full p-0  py-3  lg:p-3 lg:basis-1/3 ">
            <div className="transition  w-full p-6 h-full bg-white   rounded-lg flex flex-col dark:bg-slate-800 border dark:border-slate-600">
              <p className="mb-3  text-slate-800  font-medium opacity-70 dark:text-slate-200">
                Help & Support
              </p>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-hoverprim"></h5>
              <div>
                {" "}
                <a
                  href="https://www.dhiraagu.com.mv/personal/support/faqs/voice-collaboration/bulk-sms"
                  target="_blank"
                  className="font-black text-secondary min-w-min"
                >
                  FAQ
                </a>
              </div>

              <div className="bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded-md px-5 mt-8 pt-2 justify-self-end w-full h-full flex flex-col justify-center border dark:border-slate-600">
                <p className="text-sm font-black text-slate-900 mb-3 dark:text-slate-200 ">
                  Contact us
                </p>
                <div className="flex gap-2 p-2 align-middle">
                  <div className="flex align-middle justify-center items-center text-ellipsis ">
                    <MdEmail color="#d9440e" />
                  </div>
                  <p className="text-sm"> support@example.com </p>
                </div>
                <div className="flex gap-2 p-2 align-middle">
                  <div className="flex align-middle justify-center items-center">
                    <FaPhone color="#d9440e" />
                  </div>
                  <p className="text-sm"> XXX-XXX-XXXX </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-0  py-3  lg:p-3 lg:basis-2/3 ">
            <div className="transition  w-full p-1 h-full bg-white    rounded-lg   dark:bg-slate-800 border dark:border-slate-600">
              <div className="text-md bg-white rounded-md p-3 divide-y dark:bg-slate-800">
                <p className="mb-3  font-medium opacity-70 text-gray-800 dark:text-slate-200">
                  Account Details
                </p>
                <div className="flex gap-2   p-2 align-middle">
                  <p className="font-bold self-center dark:text-slate-200">
                    Email:
                  </p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">{email}</p>
                </div>
                <div className="flex gap-2 p-2">
                  <p className="font-bold self-center dark:text-slate-200">
                    Service Number:
                  </p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">
                    {serviceNumber}
                  </p>
                </div>
                <div className="flex gap-2  p-2">
                  <p className="font-bold self-center dark:text-slate-200">
                    Display Name:{" "}
                  </p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">
                    {displayName}
                  </p>
                </div>
                <div className="flex gap-2  p-2">
                  <p className="font-bold self-center dark:text-slate-200">
                    Account Status:
                  </p>
                  <p className="bg-green-400 text-white px-2 py-1 rounded-md">
                    {serviceStatus}
                  </p>
                </div>
                <div className="flex gap-2  p-2">
                  <p className="font-bold self-center dark:text-slate-200">
                    Balance:{" "}
                  </p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">{balance}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-0  py-3  lg:p-3 ">
            <div className="transition  w-full p-6 h-full bg-white    rounded-lg flex flex-col dark:bg-slate-800 border dark:border-slate-600">
              <p className="mb-3  text-slate-800  font-medium opacity-70 dark:text-slate-200">
                Shortcode URL Forwarding
              </p>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-hoverprim"></h5>

              <div>
                <label
                  htmlFor="shortcode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select a shortcode
                </label>
                <select
                  id="shortcode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="US">1111</option>
                  <option value="CA">2222</option>
                  <option value="FR">4444</option>
                </select>
                <label
                  htmlFor="default-input"
                  className="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Set a URL
                </label>
                <div className="flex w-full flex-col md:flex-row">
                  <div className="w-full">
                    <input
                      type="text"
                      id="default-input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div className=" md:mx-4">
                    <button
                      type="button"
                      className="text-white bg-secondary hover:bg-hoversec font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  w-full mt-9 md:mt-0"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
