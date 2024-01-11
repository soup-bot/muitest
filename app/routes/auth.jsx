import React, { useState, useEffect } from "react";
import LoginForm from "../components/loginform";
import SignupForm from "../components/signupform";
import logo from "../assets/logo.svg";
import { Link, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { validateCredentials } from "../data/validation.server";
import backdrop from "../assets/test.jpg";
import { useDarkMode } from "../components/DarkModeContext";
import { login, register } from "../data/authentication.server";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { commitSession, getSession } from "../sessions";

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

  return (
    <div
      className={`h-screen flex flex-col lg:flex-row ${
        isDarkMode ? "dark " : ""
      }`}
    >
      <div
        className={`overflow-auto no-scrollbar flex flex-col lg:w-3/4 w-full h-screen p-10 pt-20 ${
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

        <p className="mt-3 text-center text-sm text-gray-500 pb-10">
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
    </div>
  );
}

export const action = async ({ request }) => {
  console.log("AUTH ACTION");
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  const authType = formData.get("authType");
  const session = await getSession(request.headers.get("Cookie"));
  console.log("authType formdata: " + authType);

  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }

  let response;

  switch (authType) {
    case "login":
      console.log("login switch");
      const loginResponse = await login(credentials, session);
      if (loginResponse && loginResponse.status === 302) {
        session.flash("globalMessage", `Successfully logged in`);
        session.flash("messageType", `success`);
        var redirectPath = "/";
        // If it's a redirect, return the loginResponse
        console.log("success");
        response = loginResponse;
        return response;
        // If it's a successful login, return both loginResponse and additional JSON
      } else {
        session.flash("globalMessage", `Invalid Credentials`);
        session.flash("messageType", `error`);
        var redirectPath = "/auth";
        // If not a redirect and not a successful login, return an error JSON
      }
      break;

    case "signup":
      console.log("signup switch");
      return null;
      break;

    // Add more cases for other auth types if needed

    default:
      // Handle the case when authType is not recognized
      response = json({
        type: "error",
        message: "Invalid authType",
      });
      break;
  }

  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
