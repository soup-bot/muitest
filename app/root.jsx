import React from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import bg2 from "./assets/crop.svg";
import CSS from "./app.css";
import { checkUserLoggedIn } from "./data/authentication.server";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { getSession, commitSession } from "./sessions";
import { useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { DarkModeProvider, useDarkMode } from "./components/DarkModeContext";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
});
export const meta = () => {
  return [{ title: "Bulk SMS Portal" }];
};
function isDefinitelyAnError(error) {
  // Check if the object is an instance of the Error class or has an "error" property
  return (
    error instanceof Error ||
    (error && typeof error === "object" && error.hasOwnProperty("error"))
  );
}

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const message = session.get("globalMessage") || null;
  const messageType = session.get("messageType") || null;

  session.unset("globalMessage");
  session.unset("messageType");
  const { isLoggedIn, userId, balance, serviceStatus } =
    await checkUserLoggedIn(request);
  console.log("balance: " + balance);

  const data = { message, messageType, balance, serviceStatus };
  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import Navbar from "./components/navbar";
import { json } from "@remix-run/node";

export function links() {
  return [{ rel: "stylesheet", href: CSS }];
}

//app
function App() {
  const loaderData = useLoaderData();
  const { message, messageType, serviceStatus } = useLoaderData();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const { balance } = useLoaderData();
  const location = useLocation();
  const auth = location.pathname === "/auth";
  const { isDarkMode } = useDarkMode();
  React.useEffect(() => {
    if (message && message.length > 0) {
      setOpen(true); // Trigger the alert if there's a non-empty success message
    }
  }, [loaderData]);
  // Customize the MUI theme based on dark mode state
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      // Add more customizations as needed
      primary: {
        main: "#F26940",
      },
      secondary: {
        main: "#0FA5B7",
      },
    },
    typography: {
      fontFamily: "Rubik",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body
          className={`transition-[background-color] overflow-y-scroll  font-body ${
            isDarkMode ? "bg-slate-900 xl:bg-slate-950" : ""
          }`}
        >
          {!auth && <Navbar balance={balance} serviceStatus={serviceStatus} />}

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
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                variant="filled"
                onClose={handleClose}
                severity={messageType || "success"}
                sx={{ width: "100%" }}
              >
                {message}
              </Alert>
            </Snackbar>
          </LocalizationProvider>
          {/* <ScrollRestoration /> */}
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </ThemeProvider>
  );
}

export default function AppWithProviders() {
  return (
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={error.statusText}>
        <div
          className={`h-screen w-full flex justify-center xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in 
      `}
        >
          <div className=" rounded-lg    w-full px-10 mt-4 xl:w-2/3 bg-white dark:bg-slate-900">
            <div className="w-full h-full flex align-middle justify-center items-middle text-center">
              <div>
                <h1>{error.status}</h1>
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
      </Document>
    );
  }

  return (
    <Document title="Unknown Error ">
      <div
        className={`h-screen w-full flex justify-center xl:pl-20 animate-fade-up animate-once animate-duration-200 animate-ease-in 
      `}
      >
        <div className=" rounded-lg    w-full px-10 mt-4 xl:w-2/3 bg-white dark:bg-slate-900">
          <div className="w-full h-full flex align-middle justify-center items-middle text-center">
            <div className=" h-min mt-40 p-10 ">
              <h1 className="  text-3xl  dark:text-slate-200 pb-15">
                Oops, we ran into an error!
              </h1>
              <div className="h-20"></div>
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
    </Document>
  );
}

function Document(props) {
  return (
    <html>
      <head>
        {props.title ? <title>{props.title}</title> : null}

        <Links />
      </head>
      <body>
        <img
          src={bg2}
          alt=""
          className=" left-12 bottom-0 scale-150 hidden xl:flex absolute opacity-80"
        />
        <img
          src={bg2}
          alt=""
          className=" right-0 bottom-0 scale-100 hidden xl:flex absolute rotate-180 opacity-80"
        />
        {props.children}
        <Scripts />
      </body>
    </html>
  );
}
