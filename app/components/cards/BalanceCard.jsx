import React, { useState, useEffect } from "react";
import { FaCoins } from "react-icons/fa";

const BalanceCard = ({ balance, totalGrant }) => {
  const [percentage, setPercentage] = useState(0);
  const [colors, setColors] = useState("");
  useEffect(() => {
    // Animate the percentage on mount
    // setPercentage((balance / totalGrant) * 100);
    setPercentage(75);
  }, [balance, totalGrant]);

  console.log(percentage);
  const gradientStyle = {
    // width: `${percentage}%`, // Set the width based on the percentage
    width: "100%",
    transition: "width 1s ease-in-out", // Add transition for smooth animation
  };
  useEffect(() => {
    getGradientColors();
  }, [percentage]);

  console.log("percentage: " + percentage + "%");
  const getGradientColors = () => {
    let color;
    if (percentage > 75) {
      color = "from-green-400 to-green-500";
    } else if (percentage > 50) {
      color = "from-lime-600  to-yellow-300";
    } else if (percentage > 25) {
      color = "from-yellow-400 to-yellow-500";
    } else {
      color = "from-red-400 to-red-500";
    }

    setColors(color);
  };

  return (
    <div className="balance-card-container relative w-full mb-3 text-slate-800 rounded-xl ">
      <div
        className={`absolute area left-0 top-0 h-full rounded-lg p-3 lg:mx-3 w-100 z-10 bg-gradient-to-l from-secondary to-cyan-400 background-animate`}
        style={gradientStyle}
      >
        {" "}
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="z-1 h-full w-100 p-3 rounded-xl lg:mx-3 bg-slate-800 dark:bg-slate-800 border dark:border-slate-500">
        <div className="w-20 h-20"></div>
      </div>
      <div className="absolute top-4 left-10 z-20 w-full h-full">
        <div className="flex mb-4 align-middle text-center items-center">
          <h5 className="text-2xl font-medium tracking-tight text-white mr-3">
            {balance} total coins
          </h5>
          <FaCoins color="white" size={23} />
        </div>
        <p className="font-medium opacity-70 text-gray-100">My wallet</p>
      </div>
    </div>
  );
};

export default BalanceCard;
