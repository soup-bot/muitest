import React, { useState, useEffect } from "react";
import LoginForm from "../components/loginform";
import SignupForm from "../components/signupform";
import logo from "../assets/logo.svg";
import { Link, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { validateCredentials } from "../data/validation.server";
import backdrop from "../assets/test.jpg";
import { useDarkMode } from "../components/DarkModeContext";
import { login } from "../data/authentication.server";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
});

export default function Auth() {
  const actionData = useActionData();
  const [open, setOpen] = React.useState(false);
  const [signupMode, setSignupMode] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { message } = useActionData() || {};
  const { type } = useActionData() || {};
  const toggleMode = () => {
    setSignupMode(!signupMode);
  };

  useEffect(() => {
    if (message) {
      setOpen(true); // Trigger the alert if there's a success message
      console.log(actionData);
    }
  }, [actionData]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div
      className={`h-screen flex flex-col lg:flex-row ${
        isDarkMode ? "dark " : ""
      }`}
    >
      <div
        className={`overflow-auto no-scrollbar flex flex-col lg:w-3/4 w-full h-screen p-10 ${
          signupMode ? "" : "justify-center"
        } `}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex align-middle items-center justify-around">
            <img className="h-11" src={logo} alt="" />

            <div className="h-7 w-0.5 bg-gray-500 opacity-25"></div>
            <h3 className=" text-2xl font-bold  text-secondary">Bulk SMS</h3>
          </div>
          <div className="text-2xl font-bold mt-8 text-slate-800 dark:text-slate-200">
            Reach your customers with a simple click.
          </div>
        </div>

        {signupMode ? <SignupForm></SignupForm> : <LoginForm></LoginForm>}

        <p className="mt-3 text-center text-sm text-gray-500 pb-20">
          {signupMode ? "Already have an account? " : "Don't have an account? "}

          <button
            type="submit"
            onClick={toggleMode}
            className="font-semibold leading-6 text-secondary hover:text-indigo-500 focus:outline-none focus-visible:outline-indigo-600"
          >
            {signupMode ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
      <div className="w-full h-screen bg-red-300 hidden lg:block">
        <img
          className="h-screen w-screen object-fill bg-black"
          src={backdrop}
          alt=""
        />
      </div>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity={type}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export const action = async ({ request }) => {
  console.log("AUTH ACTION");
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  const loginResponse = await login(credentials);
  if (loginResponse && loginResponse.status === 302) {
    // If it's a redirect, return the loginResponse
    return loginResponse;
  } else if (loginResponse && loginResponse.status === 200) {
    // If it's a successful login, return both loginResponse and additional JSON
    return [
      loginResponse,
      json({
        type: "success",
        message: "Login successful",
        // Add any additional data you want to include in the JSON response
      }),
    ];
  } else {
    // If not a redirect and not a successful login, return an error JSON
    return json({
      type: "error",
      message: "Invalid Credentials",
    });
  }
};
