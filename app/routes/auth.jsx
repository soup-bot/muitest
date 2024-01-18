import React, { useState, useEffect } from "react";
import LoginForm from "../components/forms/loginform";
import logo from "../assets/logo.svg";
import { Link, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import backdrop from "../assets/test.jpg";
import { useDarkMode } from "../components/DarkModeContext";
import { login, register } from "../data/authentication.server";

export default function Auth() {
  const errorData = useActionData();
  console.log("error data: " + errorData);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const renderErrorMessages = () => {
    if (errorData) {
      // Extract error messages from the errorData object
      const errorDatas = Object.values(errorData).flat();

      // Render error messages
      return (
        <div className=" w-full md:w-1/2 lg:w-full xl:w-1/2 rounded-lg border-red-400 border-2 ">
          <ul className=" p-2">
            {errorDatas.map((message, index) => (
              <li key={index} className="text-red-400 font-bold text-sm">
                {message}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return null;
  };
  return (
    <div
      className={`h-screen flex flex-col lg:flex-row ${
        isDarkMode ? "dark " : ""
      }`}
    >
      <div
        className={`overflow-auto no-scrollbar flex flex-col lg:w-3/4 w-full h-screen p-10 pt-20 justify-center`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex align-middle items-center justify-around">
            <img className="h-11" src={logo} alt="" />

            <div className="h-7 w-0.5 bg-gray-500 opacity-25"></div>
            <h3 className=" text-2xl font-bold  text-secondary">Bulk SMS</h3>
          </div>
          <div className="text-2xl font-bold mt-8 text-slate-800 dark:text-slate-200 ">
            Reach your customers with a simple click.
          </div>
        </div>
        <div className="w-full flex align-middle items-center justify-center my-2 mt-4">
          {renderErrorMessages()}
        </div>
        <LoginForm></LoginForm>
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
  console.log("authType formdata: " + authType);

  // for (const [key, value] of formData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }

  let response;

  switch (authType) {
    case "login":
      console.log("login switch");
      const loginResponse = await login(credentials);
      if (loginResponse && loginResponse.status === 302) {
        var redirectPath = "/";
        // If it's a redirect, return the loginResponse
        console.log("success");
        response = loginResponse;
        return response;
        // If it's a successful login, return both loginResponse and additional JSON
      } else {
        var redirectPath = "/auth";

        return loginResponse.errorData;
        // If not a redirect and not a successful login, return an error JSON
      }
      break;

    case "signup":
      console.log("signup switch");

      // Assuming you have access to `formData` (you need to get it from somewhere)
      const registrationResult = await register(credentials);
      console.log("type: " + registrationResult.type);
      // Check the result and handle accordingly
      if (registrationResult.type === "success") {
        // Registration was successful, now call login
        const loginResponse = await login(credentials);

        if (loginResponse && loginResponse.status === 302) {
          var redirectPath = "/";
          // If it's a redirect, return the loginResponse
          console.log("success");
          response = loginResponse;
          return response;
          // If it's a successful login, return both loginResponse and additional JSON
        } else {
          var redirectPath = "/auth";
          // If not a redirect and not a successful login, return an error JSON
        }
      } else {
        // Registration failed
        console.error("Registration failed:", registrationResult.message);
        // Handle the failure, show an error message, etc.
      }

      // Return the appropriate response, e.g., redirect or render a response
      return registrationResult.errorData;
    // Add more cases for other auth types if needed

    default:
      // Handle the case when authType is not recognized
      response = json({
        type: "error",
        message: "Invalid authType",
      });
      break;
  }

  return redirect(redirectPath);
};
