import { Form, Outlet } from "@remix-run/react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef, forwardRef } from "react";
import dayjs from "dayjs";
import { FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";

const getFirstDayOfMonth = () => {
  return dayjs().startOf("month");
};

// Function to get the last day of the current month
const getLastDayOfMonth = () => {
  return dayjs().endOf("month");
};

export default function Reports() {
  const [startDate, setStartDate] = useState(getFirstDayOfMonth());
  const [endDate, setEndDate] = useState(getLastDayOfMonth());

  const today = dayjs().format("DD/MM/YYYY");
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const search = () => {
    console.log("search button hit");
  };
  return (
    <div className="h-screen w-full flex justify-center xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in">
      <div className=" h-min min-h-full rounded-lg md:shadow-lg  xl:border-t-4  border-secondary w-full px-10 mt-4 xl:w-2/3">
        <h1 className="font-bold text-2xl my-10">Reports</h1>

        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Report type
        </label>
        <select
          id="reportType"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full md:w-2/3 lg:w-1/3 p-2.5 mb-4"
        >
          <option value="tr">Transaction report</option>
          <option value="uur">User usage report</option>
        </select>

        <div className="flex flex-col lg:flex-row w-full">
          <div className="my-3 w-full lg:wd-1/2">
            <div className="flex-col sm:flex-row flex align-middle justify-center md:justify-start">
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
              </div>
              <div className="flex align-middle justify-center items-center mb-8 sm:m-0 sm:ml-8">
                <button
                  type="button"
                  onClick={search}
                  disabled={endDate.diff(startDate) < 0}
                  className="flex justify-center align-middle w-full mt-8 mb-0 sm:mt-0  text-white bg-primary hover:bg-hoverprim font-medium rounded-lg text-md px-3 py-2 disabled:bg-gray-200"
                >
                  <div className="flex align-middle justify-center items-center mt-1 lg:mt-0">
                    <TbReportSearch />
                  </div>

                  <div className="mx-2 lg:hidden">Generate</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
