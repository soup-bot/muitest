import { json, redirect } from "@remix-run/node";
import InputForm from "../components/textinput";
import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDarkMode } from "../components/DarkModeContext";
import { fileInputHandler } from "../data/fileInput.server";
import { numberInputHandler } from "../data/numberInput.server";
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

  const [open, setOpen] = React.useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const actionData = useActionData();
  const { message } = useActionData() || {};
  const { type } = useActionData() || {};

  useEffect(() => {
    if (message) {
      setOpen(true); // Trigger the alert if there's a success message
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
      className={`animate-fade-up animate-once animate-duration-200 animate-ease-in ${
        isDarkMode ? "dark " : ""
      }`}
    >
      <InputForm />

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export const loader = async ({ request }) => {
  dotenv.config();
  // const getLoggedInEndpoint = process.env.REACT_APP_GET_SENDERS_EP;
  const { isLoggedIn, userId } = await checkUserLoggedIn(request);
  const accessToken = getAccessTokenFromCookie(request);
  if (!isLoggedIn) {
    // User is not logged in, redirect to /auth
    return redirect("/auth");
  }
  console.log(userId);
  // User is logged in, make a request to get senders using the userId
  const sendersUrl = `http://localhost:5294/api/Identity/getSenders/${userId}`;
  // const sendersUrl = `${getLoggedInEndpoint}/${userId}`;

  console.log(sendersUrl);
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
      return { senders: [] }; // Return an empty array for senders
    }

    const sendersData = await sendersResponse.json();
    const senderNames = sendersData.map((sender) => sender.senderName);
    return { senderNames };
  } catch (error) {
    console.error("Error fetching senders:", error);
    // Handle the error as needed
    return { senders: [] }; // Return an empty array for senders
  }
};

export const action = async ({ request }) => {
  // Retrieve the access token from the cookie

  const accessToken = getAccessTokenFromCookie(request);
  const formData = await request.formData();

  const payloadType = formData.get("payloadType");
  console.log(payloadType);

  try {
    switch (payloadType) {
      case "numbers":
        return numberInputHandler({ formData, accessToken });

      case "file":
        return fileInputHandler({ formData, accessToken });

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
