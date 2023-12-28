// fileInput.server.js
import dotenv from "dotenv";
dotenv.config();

const fileUploadEndpoint = process.env.REACT_APP_FILE_UPLOAD_EP;

export const fileInputHandler = async ({ formData, accessToken }) => {
  const excelFile = formData.get("excelFile");
  const text = formData.get("text");
  const senderID = formData.get("senderID");
  formData.append("File", excelFile);
  formData.append("Body.Sender", senderID);
  formData.append("Body.Content", text);

  const fileResponse = await fetch(fileUploadEndpoint, {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!fileResponse.ok) {
    throw new Error(`HTTP error! Status: ${fileResponse.statusText} `);
  }

  const fileData = await fileResponse.text();
  console.log("File Success:", fileData);

  return {
    type: "success",
    message: "Your message was submitted successfully",
  };
};
