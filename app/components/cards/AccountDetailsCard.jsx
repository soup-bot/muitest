// AccountDetailsCard.js

import React from "react";

const AccountDetailsCard = ({
  email,
  serviceNumber,
  displayName,
  serviceStatus,
  balance,
}) => {
  return (
    <div className="w-full p-0 py-3 lg:p-3 lg:basis-2/3">
      <div className="transition w-full p-1 h-full bg-white rounded-lg flex flex-col dark:bg-slate-800 border dark:border-slate-600">
        <div className="text-md bg-white rounded-md p-3 divide-y divide-slate-200 dark:divide-slate-600 dark:bg-slate-800">
          <p className="mb-3 font-medium opacity-70 text-gray-800 dark:text-slate-200">
            Account Details
          </p>
          <div className="flex gap-2 p-2 align-middle">
            <p className="font-bold self-center dark:text-slate-200">Email:</p>
            <p className="bg-slate-100 px-2 py-1 rounded-md dark:bg-slate-600 dark:text-slate-300">
              {email}
            </p>
          </div>
          <div className="flex gap-2 p-2">
            <p className="font-bold self-center dark:text-slate-200">
              Service Number:
            </p>
            <p className="bg-slate-100 px-2 py-1 rounded-md dark:bg-slate-600 dark:text-slate-300">
              {serviceNumber}
            </p>
          </div>
          <div className="flex gap-2 p-2">
            <p className="font-bold self-center dark:text-slate-200">
              Display Name:{" "}
            </p>
            <p className="bg-slate-100 px-2 py-1 rounded-md dark:bg-slate-600 dark:text-slate-300">
              {displayName}
            </p>
          </div>
          <div className="flex gap-2 p-2">
            <p className="font-bold self-center dark:text-slate-200">
              Account Status:
            </p>
            <p className="bg-green-400 text-white px-2 py-1 rounded-md ">
              {serviceStatus}
            </p>
          </div>
          <div className="flex gap-2 p-2">
            <p className="font-bold self-center dark:text-slate-200">
              Balance:{" "}
            </p>
            <p className="bg-slate-100 px-2 py-1 rounded-md dark:bg-slate-600 dark:text-slate-300">
              {balance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsCard;
