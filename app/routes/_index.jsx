import { json, redirect } from "@remix-run/node";
import InputForm from "../components/textinput";
import React, { useState } from "react";

import { useDarkMode } from "../components/DarkModeContext";

export default function Index() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div
      className={`animate-fade-up animate-once animate-duration-200 animate-ease-in ${
        isDarkMode ? "dark " : ""
      }`}
    >
      <InputForm />
    </div>
  );
}

export const action = async ({ request }) => {
  console.log("ACTION");
  const formData = await request.formData();
  const numbers = formData.get("numbers");
  const text = formData.get("text");
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  const destinationAddress = numbers.split(",");

  // Create the payload for the API request
  const payload = {
    sourceAddress: "TEXT",
    destinationAddress,
    dlr: true,
    smsMessage: text,
    AuthorizationKey: "bWVzc2FnZW93bDpvV2xNRGhJUjY=",
  };

  // Make the API request
  const response = await fetch(
    "http://api02.dhiraagu.io:8080/v1/dcb/notif/sms",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  // Check the response status
  if (response.ok) {
    console.log("API request successful");
    const status = "success";
  } else {
    console.error("API request failed");
    const status = "fail";
  }

  // Redirect to the specified URL
  return redirect("/");
};
