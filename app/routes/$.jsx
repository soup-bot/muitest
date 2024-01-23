import { json } from "@remix-run/node";
import { useDarkMode } from "../components/DarkModeContext";
import { Link } from "react-router-dom";

export const loader = () => {
  return json(null, { status: 404 });
};

export default function NotFoundRoute() {
  return (
    <div
      className={`h-screen w-full flex justify-center xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in`}
    >
      <div className=" rounded-lg  md:shadow-lg xl:border-t-4 border-secondary  w-full px-10 mt-4 xl:w-2/3 bg-white dark:bg-slate-900">
        <div className="w-full h-full flex align-middle justify-center items-middle text-center">
          <div className="pb-20">
            <h1 className="pt-20 text-9xl font-medium  bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 inline-block text-transparent bg-clip-text">
              404
            </h1>
            <h1 className="pt-10 text-2xl font-medium dark:text-slate-200">
              Page Not Found
            </h1>
            <h1 className="  text-2xl my-10 dark:text-slate-200 ">
              We're sorry, but the page you are looking for could not be found.
            </h1>
            <Link
              to={"/dashboard"}
              className="bg-secondary py-2 px-4 text-lg rounded-md shadow text-slate-100 hover:bg-secondary/70 "
            >
              Click here to go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
