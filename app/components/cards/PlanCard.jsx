// PlanCard.js

import React from "react";
import { Link } from "@remix-run/react";
import { BiMoney } from "react-icons/bi";
import { RiMessage2Line } from "react-icons/ri";
import { IoMdInformationCircleOutline } from "react-icons/io";

const PlanCard = ({ selectedPlanName, selectedPlan, balanceData }) => {
  const [plan, setPlan] = React.useState("1"); // You might want to replace this with dynamic logic based on your requirements

  return (
    <div
      className={`w-full p-0 py-3 lg:p-3  text-slate-800 ${
        balanceData.length > 0 ? "lg:basis-1/2" : ""
      }`}
    >
      <div className="transition w-full h-full p-6 bg-white  border dark:border-slate-600  rounded-lg dark:bg-slate-800">
        <p className="mb-3 text-slate-800 font-medium opacity-70 dark:text-slate-200">
          My current plan
        </p>
        <h5 className="mb-2 text-2xl font-medium tracking-tight text-slate-900 dark:text-slate-200">
          {selectedPlanName}
        </h5>

        <ul className="dark:text-slate-200">
          <li className="flex align-middle items-center my-3">
            <RiMessage2Line size={23} className="mr-3" />
            Customize between {selectedPlan[plan].min} and{" "}
            {selectedPlan[plan].max} points
          </li>
          <li className="flex align-middle items-center my-3">
            <BiMoney size={23} className="mr-3" />A rate of{" "}
            {selectedPlan[plan].rate} MVR per point
          </li>{" "}
          <li className="flex align-middle items-center my-3 mb-10 ">
            <IoMdInformationCircleOutline size={23} className="mr-3" />
            <p className="text-md"> {selectedPlan[plan].description}</p>
          </li>
        </ul>
        <Link to="/manageplan">
          <button className="inline-flex items-center mt-5 px-3 py-2 text-sm font-medium text-center text-white bg-primary self-end rounded-lg hover:bg-hoverprim">
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
  );
};

export default PlanCard;
