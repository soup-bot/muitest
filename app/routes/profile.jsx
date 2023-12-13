import { FaWallet } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef, forwardRef } from "react";
import dayjs from "dayjs";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";

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

  const today = dayjs().format("DD/MM/YYYY");
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div className="h-max w-full flex justify-center 2xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in">
      <div className=" h-max pb-20 min-h-full rounded-lg 2xl:shadow-lg  2xl:border-t-4  border-secondary w-full px-10 mt-4 2xl:w-2/3 ">
        <h1 className="font-bold text-2xl my-10 px-3">Dashboard</h1>

        <div className="pt-2 flex flex-row flex-wrap w-full ">
          {/* BALANCE CARD */}
          <div className="w-full py-3 lg:p-3">
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
          <div className="w-full p-0  py-3  lg:p-3 lg:basis-1/2">
            <div className="transition hover:scale-[1.01]  w-full h-full p-6 bg-white border-b-4 shadow-xl  border-primary rounded-lg  ">
              <p className="mb-3  text-gray-700  font-medium opacity-70">
                My current plan
              </p>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-800">
                BULK/CORP SMS 15K
              </h5>

              <ul className="my-4 list-disc mx-4">
                <li className="text-md ">SMS Allowance per month -110,000 </li>
                <li className="text-md">
                  {" "}
                  Excess SMS Allowance per month -200,000
                </li>
                <li className="text-md">
                  Excess Allowance Charge (MVR) - 0.15
                </li>
              </ul>
              <button className=" inline-flex items-center mt-16 px-3 py-2 text-sm font-medium text-center text-white bg-primary self-end rounded-lg hover:bg-hoverprim">
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
          <div className="w-full p-0  py-3  lg:p-3 lg:basis-1/2 ">
            <div className="transition hover:scale-[1.01] w-full p-6 h-full bg-white border-b-4 border-hoverprim shadow-2xl rounded-lg">
              <p className="mb-3  text-gray-700  font-medium opacity-70">
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
            <div className="transition hover:scale-[1.01] w-full p-6 h-full bg-white border shadow-2xl rounded-lg flex flex-col">
              <p className="mb-3  text-gray-700  font-medium opacity-70">
                Help & Support
              </p>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-hoverprim"></h5>
              <a
                href="https://www.dhiraagu.com.mv/personal/support/faqs/voice-collaboration/bulk-sms"
                target="_blank"
                className="font-black text-secondary"
              >
                FAQ
              </a>
              <div className="bg-slate-100 rounded-md px-5 mt-8 pt-2 justify-self-end w-full h-full flex flex-col justify-center ">
                <p className="text-sm font-black text-slate-800 mb-3">
                  Contact us
                </p>
                <div className="flex gap-2 p-2 align-middle">
                  <div className="flex align-middle justify-center items-center text-ellipsis ">
                    <MdEmail />
                  </div>
                  <p className="text-sm"> support@example.com </p>
                </div>
                <div className="flex gap-2 p-2 align-middle">
                  <div className="flex align-middle justify-center items-center">
                    <FaPhone />
                  </div>
                  <p className="text-sm"> XXX-XXX-XXXX </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-0  py-3  lg:p-3 lg:basis-2/3 ">
            <div className="transition hover:scale-[1.01] w-full p-2 h-full bg-white border shadow-2xl rounded-lg bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-green-300 via-blue-500 to-purple-600">
              <div className="text-md bg-white rounded-md p-3 divide-y">
                <p className="mb-3  font-medium opacity-70 text-gray-800">
                  Account Details
                </p>
                <div className="flex gap-2   p-2 align-middle">
                  <p className="font-bold self-center">Email:</p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">
                    user1@gmail.com
                  </p>
                </div>
                <div className="flex gap-2 p-2">
                  <p className="font-bold self-center">Account type:</p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">Prepaid</p>
                </div>
                <div className="flex gap-2  p-2">
                  <p className="font-bold self-center">Service level: </p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">
                    BULK/CORP SMS 15K
                  </p>
                </div>
                <div className="flex gap-2  p-2">
                  <p className="font-bold self-center">Account Status:</p>
                  <p className="bg-green-400 text-white px-2 py-1 rounded-md">
                    Active
                  </p>
                </div>
                <div className="flex gap-2  p-2">
                  <p className="font-bold self-center">Contact Number: </p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">XXXXXXX</p>
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
