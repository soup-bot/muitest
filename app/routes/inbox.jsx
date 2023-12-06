import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef, forwardRef } from "react";
import dayjs from "dayjs";
import { Outlet } from "@remix-run/react";
import { FaSearch } from "react-icons/fa";

const getFirstDayOfMonth = () => {
  return dayjs().startOf("month");
};

// Function to get the last day of the current month
const getLastDayOfMonth = () => {
  return dayjs().endOf("month");
};

export default function Inbox() {
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
    <div className="h-screen w-full flex justify-center xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in">
      <div className=" h-min min-h-full rounded-lg md:shadow-lg  xl:border-t-4  border-secondary w-full px-10 mt-4 xl:w-2/3">
        <h1 className="font-medium text-2xl my-10">Inbox</h1>
        <div className="flex flex-col lg:flex-row w-full">
          {/* <Form className="w-full lg:w-full flex align-middle justify-center items-center mr-5">
    <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search.." required/>
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-secondary hover:bg-hoversec focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
        </Form> */}
          <div className="my-3 w-full lg:wd-1/2">
            <div className="flex-col sm:flex-row flex align-middle justify-center lg:justify-start">
              <div className="flex  gap-4">
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
              <div className="flex align-middle justify-center items-center mb-8 sm:m-0 sm:ml-8">
                <button
                  type="button"
                  disabled={endDate.diff(startDate) < 0}
                  className=" w-full mt-8 mb-0 sm:mt-0  text-white bg-primary hover:bg-hoverprim font-medium rounded-lg text-md px-4 py-0 sm:py-3 disabled:bg-gray-200"
                >
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-col flex align-middle mb-5 mt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
