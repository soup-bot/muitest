import { json } from "@remix-run/node";
import { useDarkMode } from "../components/DarkModeContext";
import { Link } from "react-router-dom";

export const loader = () => {
  return json(null, { status: 404 });
};

export default function NotFoundRoute() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div
      className={`h-screen w-full flex justify-center xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in ${
        isDarkMode ? "dark " : ""
      }`}
    >
      <div className=" rounded-lg  md:shadow-lg xl:border-t-4 border-secondary  w-full px-10 mt-4 xl:w-2/3 bg-white dark:bg-slate-900">
        <div className="w-full h-full flex align-middle justify-center items-middle text-center">
          <div className="pb-20">
            <h1 className="  text-2xl my-10 dark:text-slate-200 pt-20 ">
              We're sorry, but the page you are looking for could not be found.
            </h1>
            <Link
              to={"/dashboard"}
              className="text-secondary hover:text-secondary/60"
            >
              Click here to return to your dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
