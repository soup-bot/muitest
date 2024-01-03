// numberInput.server.js
import dotenv from "dotenv";
dotenv.config();

const numberInputEndpoint = process.env.REACT_APP_NUMBER_INPUT_EP;

export const numberInputHandler = async ({ formData, accessToken }) => {
  const destinationString = formData.get("numbers");
  const destination = destinationString ? destinationString.split(",") : [];
  const content = formData.get("text");
  const sender = formData.get("senderID");
  console.log("SENDER ID: " + sender);
  const numbersPayload = {
    destination: destination,
    content: content,
    sender: sender,
  };

  const numbersBlob = new Blob([JSON.stringify(numbersPayload)], {
    type: "application/json",
  });

  const response = await fetch(numberInputEndpoint, {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: numbersBlob,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.statusText} `);
  }

  const data = await response.text();
  console.log("Success:", data);

  return {
    message: "Your message was submitted successfully",
  };
};
