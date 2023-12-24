import { json, redirect } from "@remix-run/node";
import InputForm from "../components/textinput";
import React, { useState } from "react";

import { useDarkMode } from "../components/DarkModeContext";

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
  const bearerToken =
    "CfDJ8Dadnyzy_adFoFvppVQPN8Q-2sAKs1BKm25guJOnMkn0MkTEg_Cd4X_mJCMO1aawL9OGYE1ynYXcT4NT7DEK85nqnbVFt3Yw4axDU3zZAo2WaqdGqfyMFb0OrI7gavYEWi4-fetLcUgavJnsiLX6oep9mQZIt6dGPekTlK8lM-SmiG2lxPEbqHJp1eafdiFySRF5xFCDYzpGrSp6yK-PINLzlCIfaBBKtx0iAZkx0e31jDBUD6wJ4-O3OcdpCZYggVoCWuH_CxrrmHAWaYRrgG_FUp6VAJWcW93VDFIZhYkql8ao-bElLuAwofgoKZ11sMJ4HBgGXRE436E3Yy1cjcvE6RUtLxv5ELDC6BoowEYfH7PdrPOTF4zKkwRBOB5UIfns6xoMJYsmFOR4jlwN8uGslSdmy-eA39QbDc2Qr-QDfuyuGW40WV6N-8a_mq3xnTVKX4nV3hJ_rEcFGXsZQb4pWPraGNNNysCuqul3QtFt2_bqbtev4J8vmLfGGJMa4irpfScrw6CWblUq6TNR1gRZNvsJQjLtvKz3SgyYJzpTTaf5yWaaAU26pwv7nu-L9KWC30zlOFCKEbGH8HzyhDWQq3yz1xBYBjaGOp4QM1nVgIW4PDc-Cyn0Ys01-cRG6abbXzBivy_Ro0uaZBQqXGmAQ6Zds8RY0yh5hx8-_ij3hbHZ24oFES_2rdQD8218vA";

  const formData = await request.formData();
  const excelFile = formData.get("excelFile");

  formData.append("File", excelFile);
  formData.append("Body.Sender", "Test");
  formData.append("Body.Content", "Hello @@Name");

  // const payloadType = formData.get("payloadType");
  // console.log(payloadType);

  fetch(url, {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${bearerToken}`,
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
