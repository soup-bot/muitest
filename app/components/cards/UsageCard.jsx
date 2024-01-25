// UsageCard.js

import React from "react";
import { Carousel } from "flowbite-react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const UsageCard = ({ balanceData }) => {
  const customTheme = {
    root: {
      base: "relative h-full w-full carousel",
      leftControl:
        "absolute top-0 translate-y-1/2  left-0 flex h-full items-center justify-center px-4 focus:outline-none",
      rightControl:
        "absolute top-0  translate-y-1/2 right-0 flex h-full items-center justify-center px-4 focus:outline-none",
    },
    indicators: {
      active: {
        off: "bg-primary/20 hover:bg-primary/40 dark:bg-gray-300/50 dark:hover:bg-primary/40",
        on: "bg-primary/50 dark:bg-primary/50",
      },
      base: "h-3 w-3 rounded-full ",
      wrapper:
        "absolute bottom-1 left-1/2 flex -translate-x-1/2  translate-y-1  space-x-3",
    },
    item: {
      base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-2/3 ",
      wrapper: {
        off: "w-full flex-shrink-0 transform cursor-default snap-center ",
        on: "w-full flex-shrink-0 transform cursor-grab snap-center ",
      },
    },
    control: {
      base: "inline-flex h-8 w-8 items-center justify-center rounded-full  group-hover:bg-primary/20   dark:group-hover:bg-primary/60  sm:h-10 sm:w-10",
      icon: "h-5 w-5 text-primary/50 dark:text-gray-800 sm:h-6 sm:w-6 dark:text-slate-400",
    },
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
      snap: "snap-x",
    },
  };
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}% Remaining`}</Typography>
        </Box>
      </Box>
    );
  }
  return (
    <div className="w-full p-0 py-3 lg:p-3 lg:basis-1/2 text-slate-800">
      <div className="transition w-full p-6 h-full bg-white border-b-4 hover:border-b-primary border dark:border-slate-600 dark:hover:border-b-primary rounded-lg dark:bg-slate-800">
        <p className="mb-3 text-slate-800 font-medium opacity-70 dark:text-slate-200">
          My usage
        </p>
        <div className="h-60 md:w-2/3 lg:w-full w-full mb-2">
          <Carousel slide={false} theme={customTheme}>
            {balanceData.map((item, index) => (
              <div key={item.id} className="w-full p-0 py-3 lg:p-3">
                <div className="transition w-full h-full p-6 bg-white border-b-4 border dark:border-slate-600 rounded-lg dark:bg-slate-800">
                  {index === 0 ? (
                    <p className="mb-3 text-green-500 dark:text-green-300 font-medium opacity-70 ">
                      Currently using
                    </p>
                  ) : (
                    <p className="mb-3 text-slate-800 font-medium opacity-70 dark:text-slate-200">
                      {item.name} Balance
                    </p>
                  )}

                  <h5 className="mb-2 text-2xl font-medium tracking-tight text-slate-900 dark:text-slate-200">
                    {item.available} coins
                  </h5>

                  <LinearProgressWithLabel
                    value={Math.floor((item.available / item.grant) * 100)}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default UsageCard;
