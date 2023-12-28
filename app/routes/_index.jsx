import { json, redirect } from "@remix-run/node";
import InputForm from "../components/textinput";
import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDarkMode } from "../components/DarkModeContext";
import { fileInputHandler } from "../data/fileInput.server";
import { numberInputHandler } from "../data/numberInput.server";

import {
  checkUserLoggedIn,
  getAccessTokenFromCookie,
} from "../data/authentication.server";
import { useActionData } from "@remix-run/react";
export const meta = () => {
  return [{ title: "Compose Message - Dhiraagu Bulk SMS" }];
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
});

export default function Index() {
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
  const isLoggedIn = await checkUserLoggedIn(request);

  if (!isLoggedIn) {
    // User is not logged in, redirect to /auth
    return redirect("/auth");
  }

  // User is logged in, do nothing
  return null;
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
