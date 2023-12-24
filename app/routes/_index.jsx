import { json, redirect } from "@remix-run/node";
import InputForm from "../components/textinput";
import React, { useState } from "react";

import { useDarkMode } from "../components/DarkModeContext";
import { getAccessTokenFromCookie } from "../data/authentication.server";
export const meta = () => {
  return [{ title: "Compose Message - Dhiraagu Bulk SMS" }];
};

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
  const url = "http://localhost:5294/api/BulkSms/uploadng";

  // Retrieve the access token from the cookie
  const accessToken = getAccessTokenFromCookie(request);
  const formData = await request.formData();
  const excelFile = formData.get("excelFile");

  formData.append("File", excelFile);
  formData.append("Body.Sender", "Test");
  formData.append("Body.Content", "Hello @@Name");

  fetch(url, {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.statusText} `);
      }
      return response.text(); // Return the promise for the next .then block
    })
    .then((data) => {
      // Check if the response indicates success
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return null;
};
