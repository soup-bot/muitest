import { FaWallet } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef, forwardRef } from "react";
import dayjs from "dayjs";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { useDarkMode } from "../components/DarkModeContext";

const palette = ["#F26940", "#0FA5B7"];

const getFirstDayOfMonth = () => {
  return dayjs().startOf("month");
};

// Function to get the last day of the current month
const getLastDayOfMonth = () => {
  return dayjs().endOf("month");
};

function Dashboard() {
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
      <div className=" h-max pb-20 min-h-full  2xl:shadow-lg  2xl:border-t-4 mt-4 border-secondary w-full px-10 pt-4 xl:rounded-lg 2xl:w-2/3 bg-white z-10 dark:bg-slate-900">
        <h1 className="font-bold text-2xl my-10 px-3 dark:text-slate-200">
          Dashboard
        </h1>

        <div className="pt-2 flex flex-row flex-wrap w-full ">
          {/* BALANCE CARD */}
          <div className="w-full py-3 lg:p-3">
            <div className="transition hover:scale-[1.01]  bg-gradient-to-bl from-blue-200 to-secondary w-full p-6 bg-white  rounded-lg shadow-xl  hover:bg-gray-100 ">
              <div className="flex mb-4 align-middle text-center items-center">
                <h5 className="text-2xl font-semibold tracking-tight text-white mr-3">
                  1500 Messages
                </h5>
                <RiMessage2Fill color="white" size={23} />
              </div>
              <p className="font-medium opacity-70 text-gray-100 ">
                My balance
              </p>
            </div>
          </div>
          {/* PACKAGE CARD */}
          <div className="w-full p-0  py-3  lg:p-3 lg:basis-1/2">
            <div className="transition hover:scale-[1.01]  w-full h-full p-6 bg-white border-b-4 shadow-xl hover:border-primary rounded-lg dark:bg-slate-800 ">
              <p className="mb-3  text-slate-800  font-medium opacity-70 dark:text-slate-200">
                My current plan
              </p>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-200">
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
            </div>
          </div>

          {/* USAGE CARD */}
          <div className="w-full p-0  py-3  lg:p-3 lg:basis-1/2">
            <div className="transition hover:scale-[1.01] w-full p-6 h-full bg-white border-b-4  hover:border-primary shadow-lg rounded-lg dark:bg-slate-800">
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
                        { id: 0, value: 145, label: "Used" },
                        { id: 1, value: 592, label: "Remaining" },
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
            <div className="transition hover:scale-[1.01] w-full p-6 h-full bg-white shadow-lg rounded-lg flex flex-col dark:bg-slate-800">
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

              <div className="bg-slate-100 rounded-md px-5 mt-8 pt-2 justify-self-end w-full h-full flex flex-col justify-center ">
                <p className="text-sm font-black text-slate-900 mb-3">
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
            <div className="transition hover:scale-[1.01] w-full p-1 h-full bg-white  shadow-lg rounded-lg   dark:bg-slate-800">
              <div className="text-md bg-white rounded-md p-3 divide-y dark:bg-slate-800">
                <p className="mb-3  font-medium opacity-70 text-gray-800 dark:text-slate-200">
                  Account Details
                </p>
                <div className="flex gap-2   p-2 align-middle">
                  <p className="font-bold self-center dark:text-slate-200">
                    Email:
                  </p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">
                    user1@gmail.com
                  </p>
                </div>
                <div className="flex gap-2 p-2">
                  <p className="font-bold self-center dark:text-slate-200">
                    Account type:
                  </p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">Prepaid</p>
                </div>
                <div className="flex gap-2  p-2">
                  <p className="font-bold self-center dark:text-slate-200">
                    Service level:{" "}
                  </p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">
                    BULK/CORP SMS 15K
                  </p>
                </div>
                <div className="flex gap-2  p-2">
                  <p className="font-bold self-center dark:text-slate-200">
                    Account Status:
                  </p>
                  <p className="bg-green-400 text-white px-2 py-1 rounded-md">
                    Active
                  </p>
                </div>
                <div className="flex gap-2  p-2">
                  <p className="font-bold self-center dark:text-slate-200">
                    Contact Number:{" "}
                  </p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">XXXXXXX</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-0  py-3  lg:p-3 ">
            <div className="transition hover:scale-[1.01] w-full p-6 h-full bg-white  shadow-lg rounded-lg flex flex-col dark:bg-slate-800">
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
