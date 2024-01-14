import { json, redirect } from "@remix-run/node";
import InputForm from "../components/textinput";
import React, { useState, useEffect } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDarkMode } from "../components/DarkModeContext";
import { fileInputHandler } from "../data/fileInput.server";
import { numberInputHandler } from "../data/numberInput.server";

import { commitSession, getSession } from "../sessions";

import dotenv from "dotenv";

import {
  checkUserLoggedIn,
  getAccessTokenFromCookie,
} from "../data/authentication.server";
import { useActionData, useLoaderData } from "@remix-run/react";
export const meta = () => {
  return [{ title: "Compose Message - Dhiraagu Bulk SMS" }];
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
});

export default function Index() {
  const { userId } = useLoaderData();
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
export const loader = async ({ request }) => {
  dotenv.config();
  const getContactsEP = process.env.REACT_APP_GET_CONTACTS_EP;
  const getSenderEP = process.env.REACT_APP_GET_SENDERS_EP;

  const { isLoggedIn, userId, balance, serviceStatus } =
    await checkUserLoggedIn(request);
  const accessToken = getAccessTokenFromCookie(request);

  if (!isLoggedIn) {
    // User is not logged in, redirect to /auth
    return redirect("/auth");
  }
  if (!(serviceStatus === "active")) {
    // User is not logged in, redirect to /auth
    return redirect("/dashboard");
  }

  // Fetch senders
  const sendersUrl = `${getSenderEP}`;
  try {
    const sendersResponse = await fetch(sendersUrl, {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!sendersResponse.ok) {
      console.error("Error fetching senders:", sendersResponse.statusText);
      // Handle the error as needed
      return { senders: [], contacts: [] }; // Return empty arrays for senders and contacts
    }

    const sendersData = await sendersResponse.json();
    const senderNames = sendersData.map((sender) => sender.senderName);

    // Fetch contacts
    const contactsUrl = `${getContactsEP}`; // Adjust parameters as needed
    const contactsResponse = await fetch(contactsUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!contactsResponse.ok) {
      console.error("Error fetching contacts:", contactsResponse.statusText);
      // Handle the error as needed
      return { senders: senderNames, contacts: [] }; // Return senders and empty array for contacts
    }

    const { contacts, totalCount } = await contactsResponse.json();
    const contactNames = contacts.map((contact) => ({
      label: contact.name,
      value: contact.number,
    }));

    return {
      senderNames: senderNames,
      contactNames: contactNames,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error as needed
    return { senders: [], contacts: [] }; // Return empty arrays for senders and contacts
  }
};

export const action = async ({ request }) => {
  // Retrieve the access token from the cookie
  const session = await getSession(request.headers.get("Cookie"));

  const accessToken = getAccessTokenFromCookie(request);
  const formData = await request.formData();

  const payloadType = formData.get("payloadType");
  console.log(payloadType);

  try {
    switch (payloadType) {
      case "numbers":
        return numberInputHandler({ formData, accessToken, session });

      case "file":
        return fileInputHandler({ formData, accessToken, session });

      default:
        console.log("Unknown payload type");
        return json({
          type: "error",
          message: "Unknown payload type",
        });
    }
  } catch (error) {
    console.error("Error:", error);
    return json({
      type: "error",
      message: "An error occurred while submitting your message",
    });
  }
};
