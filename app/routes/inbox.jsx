import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef, forwardRef } from "react";
import dayjs from "dayjs";
import { Outlet } from "@remix-run/react";
import { FaSearch } from "react-icons/fa";
import { useDarkMode } from "../components/DarkModeContext";
import { checkUserLoggedIn } from "../data/authentication.server";
import { redirect } from "@remix-run/node";

export const meta = () => {
  return [{ title: "Inbox - Dhiraagu Bulk SMS" }];
};

const getFirstDayOfMonth = () => {
  return dayjs().startOf("month");
};

// Function to get the last day of the current month
const getLastDayOfMonth = () => {
  return dayjs().endOf("month");
};

export const loader = async ({ request }) => {
  const { isLoggedIn, userId, serviceStatus } = await checkUserLoggedIn(
    request
  );

  if (!isLoggedIn) {
    // User is not logged in, redirect to /auth
    return redirect("/auth");
  }
  if (!(serviceStatus === "active")) {
    // User is not logged in, redirect to /auth
    return redirect("/dashboard");
  }

  // User is logged in, you can use userId if needed
  return { userId };
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
    <div
      className={`h-screen w-full flex justify-center animate-fade-up animate-once animate-duration-200 animate-ease-in`}
    >
      <div className=" rounded-lg md:shadow-lg  xl:border dark:border-slate-600 w-full px-10 mt-4 xl:w-2/3 bg-white dark:bg-slate-900">
        <h1 className="font-medium text-slate-800 text-2xl my-10 dark:text-slate-200">
          Inbox
        </h1>
        <div className="flex flex-col lg:flex-row w-full">
          <div className="my-3 w-full lg:wd-1/2">
            <div className="flex-col sm:flex-row flex align-middle justify-center md:justify-start">
              <div className="flex  gap-4 p-3 rounded-md ">
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
                  className="flex justify-center align-middle w-full mt-8 mb-0 sm:mt-0  text-white bg-primary hover:bg-hoverprim font-medium rounded-lg text-md px-3 py-2 disabled:bg-gray-200"
                >
                  <div className="flex align-middle justify-center items-center mt-1 lg:mt-0">
                    <FaSearch />
                  </div>
                  <div className="mx-2 lg:hidden">Search</div>
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
