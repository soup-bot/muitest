import { useDarkMode } from "../components/DarkModeContext";
import { checkUserLoggedIn } from "../data/authentication.server";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import InactiveUserComponent from "../components/InactiveUserComponent";
import packageConfigurations from "../data/packageConfigurations.json";
import dotenv from "dotenv";
import { getAccessTokenFromCookie } from "../data/authentication.server";
import PlanCard from "../components/cards/PlanCard";
import UsageCard from "../components/cards/UsageCard";
import HelpCard from "../components/cards/HelpCard";
import AccountDetailsCard from "../components/cards/AccountDetailsCard";
import BalanceCard from "../components/cards/BalanceCard";
export const meta = () => {
  return [{ title: "Dashboard - Dhiraagu Bulk SMS" }];
};

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

  const totalGrant = balanceData.reduce((acc, entry) => acc + entry.grant, 0);

  // Now, totalGrant contains the sum of all grant values in balanceData
  console.log("Total Grant:", totalGrant);
  console.log(planId);
  const selectedPlan = Object.entries(packageConfigurations).find(
    ([key, plan]) => plan.id === parseInt(planId)
  );
  const selectedPlanName = selectedPlan ? selectedPlan[0] : null;

  console.log(selectedPlanName);

  if (serviceStatus !== "active") {
    return <InactiveUserComponent />;
  }
  return (
    <div
      className={`h-max w-full flex justify-center animate-fade-up animate-once animate-duration-200 animate-ease-in `}
    >
      <div className=" h-max pb-20 min-h-full  2xl: shadow-lg xl:border dark:border-slate-600 w-full px-10 pt-4 xl:rounded-lg 2xl:w-2/3 bg-white z-10 dark:bg-slate-900">
        <h1 className="font-medium  text-slate-800 text-2xl my-10 px-3 dark:text-slate-200">
          Dashboard
        </h1>
        {!(serviceStatus === "active") && <p>Inactive account</p>}

        <div className="pt-2 flex flex-row flex-wrap w-full ">
          {/* BALANCE CARD */}
          <BalanceCard balance={balance} totalGrant={totalGrant} />

          {/* PLAN CARD */}
          <PlanCard
            selectedPlanName={selectedPlanName}
            selectedPlan={selectedPlan}
            balanceData={balanceData}
          />

          {/* USAGE CARD */}
          {balanceData.length > 0 && <UsageCard balanceData={balanceData} />}

          <HelpCard></HelpCard>
          <AccountDetailsCard
            email={email}
            serviceNumber={serviceNumber}
            displayName={displayName}
            serviceStatus={serviceStatus}
            balance={balance}
          />

          {/* <div className="w-full p-0  py-3  lg:p-3 ">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
