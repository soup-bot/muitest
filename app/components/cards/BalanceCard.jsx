// BalanceCard.js

import React from "react";
import { FaCoins } from "react-icons/fa";

const BalanceCard = ({ balance }) => {
  return (
    <div className="w-full py-3 lg:p-3">
      <div className="transition bg-gradient-to-bl from-blue-200 to-secondary w-full p-6 bg-white rounded-lg shadow-xl hover:bg-gray-100">
        <div className="flex mb-4 align-middle text-center items-center">
          <h5 className="text-2xl font-medium tracking-tight text-white mr-3">
            {balance} coins
          </h5>
          <FaCoins color="white" size={23} />
        </div>
        <p className="font-medium opacity-70 text-gray-100">My wallet</p>
      </div>
    </div>
  );
};

export default BalanceCard;
