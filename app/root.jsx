import { cssBundleHref } from "@remix-run/css-bundle";
import Navbar from "./components/navbar";
import CSS from "./app.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import bg2 from "./assets/crop.svg";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { useLocation } from "react-router-dom";

export function links() {
  return [{ rel: "stylesheet", href: CSS }];
}
// export const loader = async ({ request, params }) => {
//   // Check if the current route parameters include 'auth'
//  const url = new URL(request.url);
//  const auth = url.pathname === '/auth';
//   return {
//   auth
//   };
// };

export default function App() {
  const location = useLocation();
  console.log("LOCATION = " + location.pathname);
  const auth = location.pathname === "/auth";

  // const {auth} = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="overflow-y-scroll  font-body ">
        {!auth && <Navbar />}
        {/* <img src={bg} alt="" className=" absolute left-0 max-w-full max-h-full" /> */}

        {!auth && (
          <img
            src={bg2}
            alt=""
            className=" left-12 bottom-0 scale-150 hidden xl:flex absolute opacity-80"
          />
        )}
        {!auth && (
          <img
            src={bg2}
            alt=""
            className=" right-0 bottom-0 scale-100 hidden xl:flex absolute rotate-180 opacity-80"
          />
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Outlet />
        </LocalizationProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
