import { cssBundleHref } from "@remix-run/css-bundle";
import Navbar from "./components/navbar"
import CSS from "./app.css"
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

// export const loader = async ({ params }) => {
//   // Check if the current route parameters include 'auth'
//   const isAuthRoute = params?.includes('auth');

//   return {
//     isAuthRoute,
//   };
// };

export function links() {
  return [{ rel: "stylesheet", href: CSS }]
}
export const loader = async ({ request, params }) => {
  // Check if the current route parameters include 'auth'
 const url = new URL(request.url);
 const auth = url.pathname === '/auth';
  return {
  auth
  };
};



export default function App() {
  const {auth} = useLoaderData();
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
        <Outlet/>
        <ScrollRestoration/>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
