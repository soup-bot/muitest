import React from "react";

import { useDarkMode } from "./DarkModeContext";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Carousel } from "flowbite-react";
import TextField from "@mui/material/TextField";
import { BiMoney } from "react-icons/bi";
import { RiMessage2Line } from "react-icons/ri";
import { IoMdInformationCircleOutline } from "react-icons/io";

const customTheme = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl:
      "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none",
  },
  indicators: {
    active: {
      off: "bg-primary/20 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
      on: "bg-primary/60 dark:bg-gray-800",
    },
    base: "h-3 w-3 rounded-full md:hidden",
    wrapper: "absolute bottom-1 left-1/2 flex -translate-x-1/2 space-x-3",
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-full flex-shrink-0 transform cursor-default snap-center",
      on: "w-full flex-shrink-0 transform cursor-grab snap-center",
    },
  },
  control: {
    base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 group-hover:bg-primary/60  dark:bg-slate-300/20 dark:group-hover:bg-primary/60  sm:h-10 sm:w-10",
    icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};

const packageConfigurations = {
  Starter: {
    id: 1,
    min: 100,
    max: 1000,
    step: 100,
    rate: 2 / 5,
    description: "Perfect for beginners",
  },
  Basic: {
    id: 2,
    min: 1000,
    max: 10000,
    step: 1000,
    rate: 1.25 / 5,
    description: "Great for small businesses",
  },
  Medium: {
    id: 3,
    min: 10000,
    max: 50000,
    step: 5000,
    rate: 1 / 5,
    description: "Suitable for growing businesses",
  },
  Advanced: {
    id: 4,
    min: 50000,
    max: 100000,
    step: 10000,
    rate: 0.8 / 5,
    description: "Ideal for advanced users",
  },
  Power: {
    id: 5,
    min: 100000,
    max: 1000000,
    step: 100000,
    rate: 0.5 / 5,
    description: "Unleash the power",
  },
};
export default function InactiveUserComponent() {
  const [plan, setPlan] = React.useState(
    packageConfigurations[Object.keys(packageConfigurations)[0]].id
  );
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const handleChange = (event) => {
    setPlan(event.target.value);
  };
  return (
    <div
      className={`h-max w-full flex justify-center animate-fade-up animate-once animate-duration-200 animate-ease-in ${
        isDarkMode ? "dark " : ""
      }`}
    >
      <div className="h-max pb-20 min-h-full 2xl:shadow-lg 2xl:border-t-4 mt-4 border-secondary w-full px-10 pt-4 xl:rounded-lg 2xl:w-2/3 bg-white z-10 dark:bg-slate-900">
        <h1 className="font-medium text-2xl my-10 px-3 dark:text-slate-200">
          Dashboard
        </h1>
        <div>
          <div className="flex align-middle  mb-10">
            <IoMdInformationCircleOutline
              size={23}
              className="self-center mr-1 mb-1 dark:text-slate-200"
            />
            <p className="dark:text-slate-200 ">
              Your registration is almost complete! To fully activate your
              account, please provide the following details:
            </p>
          </div>
          <Form method="patch" action="/updateUser">
            <div>
              <div className="flex w-full mb-5">
                <div className="mr-5 w-1/2 ">
                  <TextField
                    label="First name"
                    variant="outlined"
                    name="firstName"
                    fullWidth
                    required
                  />
                </div>
                <div className="w-1/2">
                  <TextField
                    label="Last name"
                    name="lastName"
                    variant="outlined"
                    required
                    fullWidth
                  />
                </div>
              </div>
              <div className="mb-5">
                <TextField
                  label="Number"
                  variant="outlined"
                  name="number"
                  required
                  fullWidth
                />
              </div>
              <div className="flex align-middle justify-center">
                <div className="h-96 md:w-2/3 lg:w-1/2 w-full ">
                  <Carousel
                    slideInterval={3000}
                    theme={customTheme}
                    indicators={false}
                    pauseOnHover
                  >
                    {Object.keys(packageConfigurations).map((packageKey) => (
                      <div key={packageKey} className="">
                        <div className="w-full h-full flex items-center justify-center p-10">
                          <div
                            className={`bg-white px-6 pt-2 py-4 rounded-lg shadow-md border-t-2 dark:bg-slate-950/30 dark:text-slate-300 border-secondary`}
                          >
                            <div className="pt-7"></div>

                            <h1
                              className={`font-bold text-xl mb-5 
                       
                             "text-secondary"
                        `}
                            >
                              {packageKey}
                            </h1>
                            <ul>
                              <li className="flex align-middle items-center my-3">
                                <RiMessage2Line size={23} className="mr-3" />
                                Customize between{" "}
                                {packageConfigurations[packageKey].min} and{" "}
                                {packageConfigurations[packageKey].max} points
                              </li>
                              <li className="flex align-middle items-center my-3">
                                <BiMoney size={23} className="mr-3" />A rate of{" "}
                                {packageConfigurations[packageKey].rate} MVR per
                                point
                              </li>
                              <li className="flex align-middle items-center my-3 mb-10 text-slate-500">
                                <IoMdInformationCircleOutline
                                  size={23}
                                  className="mr-3"
                                />
                                <p className="text-sm">
                                  {
                                    packageConfigurations[packageKey]
                                      .description
                                  }
                                </p>
                              </li>

                              <div className="flex align-middle justify-center mt-4"></div>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
              <label id="plan-select-label" className="dark:text-slate-200">
                Choose a Plan
              </label>
              <Select
                labelId="plan-select-label"
                id="plan-select"
                name="planID"
                value={plan}
                variant="outlined"
                onChange={handleChange}
                fullWidth
              >
                {Object.keys(packageConfigurations).map((packageKey) => (
                  <MenuItem
                    key={packageKey}
                    value={packageConfigurations[packageKey].id}
                  >
                    {packageKey}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className=" mt-10 flex justify-end">
              <button
                type="submit"
                className="text-white bg-primary hover:bg-hoverprim font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Activate Account
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
