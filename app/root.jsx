import { cssBundleHref } from "@remix-run/css-bundle";
import Navbar from "./components/navbar"
import CSS from "./app.css"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


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
  return [{ rel: "stylesheet", href: CSS }]
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
console.log("LOCATION = "+ location.pathname);
const auth = location.pathname === '/auth';


  // const {auth} = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      {!auth && <Navbar />}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Outlet />
        </LocalizationProvider>
        <ScrollRestoration/>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
