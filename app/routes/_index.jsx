import { json, redirect } from "@remix-run/node";
import InputForm from "../components/textinput";
import React, { useState } from "react";

import { useDarkMode } from "../components/DarkModeContext";
import {
  checkUserLoggedIn,
  getAccessTokenFromCookie,
} from "../data/authentication.server";
import { useActionData } from "@remix-run/react";
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

export async function loader({ request }) {
  const isLoggedIn = await checkUserLoggedIn(request);

  if (!isLoggedIn) {
    // User is not logged in, redirect to /auth
    return redirect("/auth");
  }

  // User is logged in, do nothing
  return null;
}

export const action = async ({ request }) => {
  const urlNumbers = "http://localhost:5294/api/BulkSms";
  const urlFile = "http://localhost:5294/api/BulkSms/uploadng";

  // Retrieve the access token from the cookie
  const accessToken = getAccessTokenFromCookie(request);
  const formData = await request.formData();

  const payloadType = formData.get("payloadType");
  console.log(payloadType);

  switch (payloadType) {
    case "numbers":
      // Handle numbers payload
      console.log("Processing numbers payload");

      const destinationString = formData.get("numbers");
      const destination = destinationString ? destinationString.split(",") : [];
      const content = formData.get("text");
      const sender = formData.get("sender");

      const numbersPayload = {
        destination: destination,
        content: content,
        sender: "Test",
      };
      const numbersBlob = new Blob([JSON.stringify(numbersPayload)], {
        type: "application/json",
      });

      fetch(urlNumbers, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: numbersBlob,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.statusText} `);
          }
          return response.text();
        })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      break;

    case "file":
      // Handle file payload
      console.log("Processing file payload");

      const excelFile = formData.get("excelFile");

      formData.append("File", excelFile);
      formData.append("Body.Sender", "Test");
      formData.append("Body.Content", "Hello @@Name");

      fetch(urlFile, {
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

      break;

    default:
      console.log("Unknown payload type");
      // Handle the case where payloadType is neither "numbers" nor "file"
      break;
  }

  return null;
};
