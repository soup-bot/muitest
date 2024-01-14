// fileInput.server.js
import dotenv from "dotenv";
import { commitSession, getSession } from "../sessions";
import { redirect } from "@remix-run/node";
dotenv.config();

const fileUploadEndpoint = process.env.REACT_APP_FILE_UPLOAD_EP;

export const fileInputHandler = async ({ formData, accessToken, session }) => {
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
    const errMsg = await fileResponse.text();
    session.flash("globalMessage", errMsg);
    session.flash("messageType", `warning`);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const fileData = await fileResponse.text();
  console.log("File Success:", fileData);
  session.flash("globalMessage", "Message has been successfully sent");
  session.flash("messageType", `success`);
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
