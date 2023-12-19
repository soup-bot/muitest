import React from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import bg2 from "./assets/crop.svg";
import CSS from "./app.css";

import { DarkModeProvider, useDarkMode } from "./components/DarkModeContext";

export const meta = () => {
  return [{ title: "Bulk SMS Portal" }];
};

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import Navbar from "./components/navbar";

export function links() {
  return [{ rel: "stylesheet", href: CSS }];
}

function App() {
  const location = useLocation();
  const auth = location.pathname === "/auth";
  const { isDarkMode } = useDarkMode();

  // Customize the MUI theme based on dark mode state
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      // Add more customizations as needed
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
          {!auth && <Navbar />}
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
