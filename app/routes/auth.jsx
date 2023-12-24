import React, { useState } from "react";
import LoginForm from "../components/loginform";
import SignupForm from "../components/signupform";
import logo from "../assets/logo.svg";
import { Link, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { validateCredentials } from "../data/validation.server";
import backdrop from "../assets/test.jpg";
import { useDarkMode } from "../components/DarkModeContext";
import { login } from "../data/authentication.server";

export default function Auth() {
  const [signupMode, setSignupMode] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

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
    return loginResponse;
  }

  // If not a redirect, return null or some other response
  return null;
};
