import { FaWallet } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef, forwardRef, useEffect } from "react";
import dayjs from "dayjs";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { useDarkMode } from "../components/DarkModeContext";
import { checkUserLoggedIn } from "../data/authentication.server";
import { redirect } from "@remix-run/node";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { FaCoins } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InactiveUserComponent from "../components/InactiveUserComponent";
import packageConfigurations from "../data/packageConfigurations.json";
import { BiMoney } from "react-icons/bi";
import { RiMessage2Line } from "react-icons/ri";
import { IoMdInformationCircleOutline } from "react-icons/io";
import dotenv from "dotenv";
import { getAccessTokenFromCookie } from "../data/authentication.server";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Carousel } from "flowbite-react";

export const meta = () => {
  return [{ title: "Dashboard - Dhiraagu Bulk SMS" }];
};

const palette = ["#F26940", "#0FA5B7"];
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

export const loader = async ({ request }) => {
  dotenv.config();
  const accessToken = getAccessTokenFromCookie(request);
  const getBalanceEP = process.env.REACT_APP_GET_BALANCE_EP;

  const {
    isLoggedIn,
    userId,
    planId,
    balance,
    serviceNumber,
    displayName,
    email,
    serviceStatus,
  } = await checkUserLoggedIn(request);

  if (!isLoggedIn) {
    // User is not logged in, redirect to /auth
    return redirect("/auth");
  }
  try {
    // Make an additional API call to get balance information
    const balanceResponse = await fetch(getBalanceEP, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!balanceResponse.ok) {
      console.error(
        "Failed to fetch balance information:",
        balanceResponse.statusText
      );
    } else {
      const balanceData = await balanceResponse.json();

      // Include balance data in the returned object
      return {
        balance,
        serviceNumber,
        displayName,
        email,
        serviceStatus,
        planId,
        balanceData,
      };
    }
  } catch (error) {
    console.error(
      "An error occurred while fetching balance information:",
      error
    );
    // Handle the error appropriately
    // You might want to redirect or show an error message to the user
    return redirect("/error");
  }
};

function Dashboard() {
  const {
    balance,
    serviceNumber,
    displayName,
    email,
    serviceStatus,
    planId,
    balanceData,
  } = useLoaderData();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  console.log(planId);
  const [progress, setProgress] = useState(30);
  const selectedPlan = Object.entries(packageConfigurations).find(
    ([key, plan]) => plan.id === parseInt(planId)
  );
  const selectedPlanName = selectedPlan ? selectedPlan[0] : null;

  console.log(selectedPlanName);
  const today = dayjs().format("DD/MM/YYYY");

  const [plan, setPlan] = useState("1");

  if (serviceStatus !== "active") {
    return <InactiveUserComponent />;
  }
  return (
    <div
      className={`h-max w-full flex justify-center animate-fade-up animate-once animate-duration-200 animate-ease-in  ${
        isDarkMode ? "dark " : ""
      }`}
    >
      <div className=" h-max pb-20 min-h-full  2xl: shadow-lg  2xl:border-t-4 mt-4 border-secondary w-full px-10 pt-4 xl:rounded-lg 2xl:w-2/3 bg-white z-10 dark:bg-slate-900">
        <h1 className="font-medium text-2xl my-10 px-3 dark:text-slate-200">
          Dashboard
        </h1>
        {!(serviceStatus === "active") && <p>Inactive account</p>}

        <div className="pt-2 flex flex-row flex-wrap w-full ">
          {/* BALANCE CARD */}
          <div className="w-full py-3 lg:p-3">
            <div className="transition   bg-gradient-to-bl from-blue-200 to-secondary w-full p-6 bg-white  rounded-lg shadow-xl  hover:bg-gray-100 ">
              <div className="flex mb-4 align-middle text-center items-center">
                <h5 className="text-2xl font-medium  tracking-tight text-white mr-3">
                  {balance} coins
                </h5>
                <FaCoins color="white" size={23} />
              </div>
              <p className="font-medium opacity-70 text-gray-100 ">My wallet</p>
            </div>
          </div>
          {/* PACKAGE CARD */}
          <div className="w-full p-0  py-3  lg:p-3 lg:basis-1/2">
            <div className="transition   w-full h-full p-6 bg-white border-b-4  hover:border-b-primary border dark:border-slate-600 dark:hover:border-b-primary rounded-lg dark:bg-slate-800">
              <p className="mb-3  text-slate-800  font-medium opacity-70 dark:text-slate-200">
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
                <button className=" inline-flex items-center mt-16 px-3 py-2 text-sm font-medium text-center text-white bg-primary self-end rounded-lg hover:bg-hoverprim ">
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

          {/* USAGE CARD */}
          <div className="w-full p-0  py-3  lg:p-3 lg:basis-1/2  ">
            <div className=" transition  w-full p-6 h-full bg-white border-b-4  hover:border-b-primary border dark:border-slate-600 dark:hover:border-b-primary rounded-lg dark:bg-slate-800">
              <p className="mb-3  text-slate-800  font-medium opacity-70 dark:text-slate-200">
                My usage
              </p>
              <div className="h-56 md:w-2/3 lg:w-full w-full">
                {/* <PieChart
                  colors={palette}
                  series={[
                    {
                      arcLabel: (item) => `${item.value}`,
                      arcLabelMinAngle: 45,
                      data: [
                        { id: 0, value: 189, label: "Used" },
                        { id: 1, value: 522, label: "Remaining" },
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
                /> */}
                <Carousel slide={false} indicators={false} theme={customTheme}>
                  {balanceData.map((item) => (
                    <div key={item.id} className="w-full p-0 py-3 lg:p-3 ">
                      <div className="transition w-full h-full p-6 bg-white border-b-4  border dark:border-slate-600  rounded-lg dark:bg-slate-800">
                        <p className="mb-3 text-slate-800 font-medium opacity-70 dark:text-slate-200">
                          {item.name} Balance
                        </p>
                        <h5 className="mb-2 text-2xl font-medium tracking-tight text-slate-900 dark:text-slate-200">
                          {item.available} coins
                        </h5>

                        <Box sx={{ width: "100%" }}>
                          <LinearProgressWithLabel
                            value={Math.floor(
                              (item.available / item.grant) * 100
                            )}
                          />
                        </Box>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>

          <div className="w-full p-0  py-3  lg:p-3 lg:basis-1/3 ">
            <div className="transition  w-full p-6 h-full bg-white   rounded-lg flex flex-col dark:bg-slate-800 border dark:border-slate-600">
              <p className="mb-3  text-slate-800  font-medium opacity-70 dark:text-slate-200">
                Help & Support
              </p>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-hoverprim"></h5>
              <div>
                {" "}
                <a
                  href="https://www.dhiraagu.com.mv/personal/support/faqs/voice-collaboration/bulk-sms"
                  target="_blank"
                  className="font-black text-secondary min-w-min"
                >
                  FAQ
                </a>
              </div>

              <div className="bg-slate-100 dark:bg-slate-700 dark:text-slate-300 rounded-md px-5 mt-8 pt-2 justify-self-end w-full h-full flex flex-col justify-center border dark:border-slate-600">
                <p className="text-sm font-black text-slate-900 mb-3 dark:text-slate-200 ">
                  Contact us
                </p>
                <div className="flex gap-2 p-2 align-middle">
                  <div className="flex align-middle justify-center items-center text-ellipsis ">
                    <MdEmail color="#d9440e" />
                  </div>
                  <p className="text-sm"> support@example.com </p>
                </div>
                <div className="flex gap-2 p-2 align-middle">
                  <div className="flex align-middle justify-center items-center">
                    <FaPhone color="#d9440e" />
                  </div>
                  <p className="text-sm"> XXX-XXX-XXXX </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-0  py-3  lg:p-3 lg:basis-2/3 ">
            <div className="transition  w-full p-1 h-full bg-white    rounded-lg   dark:bg-slate-800 border dark:border-slate-600">
              <div className="text-md bg-white rounded-md p-3 divide-y divide-slate-200 dark:divide-slate-600 dark:bg-slate-800">
                <p className="mb-3  font-medium opacity-70 text-gray-800 dark:text-slate-200">
                  Account Details
                </p>
                <div className="flex gap-2   p-2 align-middle">
                  <p className="font-bold self-center dark:text-slate-200">
                    Email:
                  </p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">{email}</p>
                </div>
                <div className="flex gap-2 p-2">
                  <p className="font-bold self-center dark:text-slate-200">
                    Service Number:
                  </p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">
                    {serviceNumber}
                  </p>
                </div>
                <div className="flex gap-2  p-2">
                  <p className="font-bold self-center dark:text-slate-200">
                    Display Name:{" "}
                  </p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">
                    {displayName}
                  </p>
                </div>
                <div className="flex gap-2  p-2">
                  <p className="font-bold self-center dark:text-slate-200">
                    Account Status:
                  </p>
                  <p className="bg-green-400 text-white px-2 py-1 rounded-md">
                    {serviceStatus}
                  </p>
                </div>
                <div className="flex gap-2  p-2">
                  <p className="font-bold self-center dark:text-slate-200">
                    Balance:{" "}
                  </p>
                  <p className="bg-slate-100 px-2 py-1 rounded-md">{balance}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-0  py-3  lg:p-3 ">
            <div className="transition  w-full p-6 h-full bg-white    rounded-lg flex flex-col dark:bg-slate-800 border dark:border-slate-600">
              <p className="mb-3  text-slate-800  font-medium opacity-70 dark:text-slate-200">
                Shortcode URL Forwarding
              </p>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-hoverprim"></h5>

              <div>
                <label
                  htmlFor="shortcode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select a shortcode
                </label>
                <select
                  id="shortcode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="US">1111</option>
                  <option value="CA">2222</option>
                  <option value="FR">4444</option>
                </select>
                <label
                  htmlFor="default-input"
                  className="block mt-4 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Set a URL
                </label>
                <div className="flex w-full flex-col md:flex-row">
                  <div className="w-full">
                    <input
                      type="text"
                      id="default-input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div className=" md:mx-4">
                    <button
                      type="button"
                      className="text-white bg-secondary hover:bg-hoversec font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  w-full mt-9 md:mt-0"
                    >
                      Save
                    </button>
                  </div>
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
