import { redirect } from "@remix-run/node";
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
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  return redirect("/");
};
