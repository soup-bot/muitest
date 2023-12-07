import { FaWallet } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef, forwardRef } from "react";
import dayjs from "dayjs";

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

  const today = dayjs().format("DD/MM/YYYY");
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div className="h-max w-full flex justify-center xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in">
      <div className=" h-max pb-20 min-h-full rounded-lg md:shadow-lg  xl:border-t-4  border-secondary w-full px-10 mt-4 xl:w-2/3">
        <h1 className="font-bold text-2xl my-10 px-3">Dashboard</h1>

        <div className="pt-2 flex flex-row flex-wrap w-full ">
          {/* BALANCE CARD */}
          <div className="w-full p-3">
            <div className="transition hover:scale-[1.01] bg-gradient-to-bl from-sky-400 to-blue-800 w-full p-6 bg-white border border-gray-200 rounded-lg shadow-xl  hover:bg-gray-100 ">
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
          <div className="w-full p-3 md:basis-1/2">
            <div className="transition hover:scale-[1.01]  w-full h-full p-6 bg-white border-b-4 shadow-xl  border-blue-700 rounded-lg  ">
              <p className="mb-3  text-gray-700  font-medium opacity-70">
                My current plan
              </p>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-800">
                BULK/CORP SMS 15K
              </h5>

              <ul className="my-4 list-disc mx-4">
                <li className="text-sm font-semibold">
                  SMS Allowance per month -110,000{" "}
                </li>
                <li className="text-sm font-semibold">
                  {" "}
                  Excess SMS Allowance per month -200,000
                </li>
                <li className="text-sm font-semibold">
                  Excess Allowance Charge (MVR) - 0.15
                </li>
              </ul>
              <button className="inline-flex items-center mt-16 px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-900">
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
          <div className="w-full p-3 md:basis-1/2 ">
            <div className="transition hover:scale-[1.01] w-full p-6 h-full bg-white border-b-4 border-hoverprim shadow-2xl rounded-lg">
              <p className="mb-3  text-gray-700  font-medium opacity-70">
                Your usage
              </p>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-hoverprim"></h5>

              <ul className="my-4">
                <li className="text-sm font-semibold">
                  Generate my usage report{" "}
                </li>
              </ul>
              <div className="flex flex-wrap gap-6 w-full">
                <DatePicker
                  label="Start Date"
                  defaultValue={today}
                  value={startDate}
                  format="DD-MM-YYYY"
                  size="small"
                  onChange={handleStartDateChange}
                />
                <DatePicker
                  label="End Date"
                  format="DD-MM-YYYY"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
                {/* <p>DIFFERENCE: {startDate && endDate && (endDate.diff(startDate))}</p> */}
              </div>
              <button
                className="mt-12 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary disabled:bg-gray-400 rounded-lg hover:bg-hoverprim"
                disabled={endDate.diff(startDate) < 0}
              >
                Generate report
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

export default Dashboard;
