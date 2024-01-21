// numberInput.server.js
import { redirect } from "@remix-run/node";
import dotenv from "dotenv";
dotenv.config();
import { commitSession, getSession } from "../sessions";
const numberInputEndpoint = process.env.REACT_APP_NUMBER_INPUT_EP;

export const numberInputHandler = async ({
  formData,
  accessToken,
  session,
}) => {
  const destinationString = formData.get("numbers");
  const destination = destinationString ? destinationString.split(",") : [];
  const content = formData.get("text");
  const sender = formData.get("senderID");
  console.log("destination " + destination);

  console.log("destination" + destination);
  // const numbersPayload = {
  //   destination: destination,
  //   content: content,
  //   sender: sender,
  // };

  // const numbersBlob = new Blob([JSON.stringify(numbersPayload)], {
  //   type: "application/json",
  // });

  // const response = await fetch(numberInputEndpoint, {
  //   method: "POST",
  //   headers: {
  //     accept: "*/*",
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   body: numbersBlob,
  // });

  // if (!response.ok) {
  //   const errMsg = await response.text();
  //   session.flash("globalMessage", errMsg);
  //   session.flash("messageType", `warning`);
  //   return redirect("/", {
  //     headers: {
  //       "Set-Cookie": await commitSession(session),
  //     },
  //   });
  // }

  // const data = await response.text();
  // console.log("Success:", data);
  // session.flash("globalMessage", "Message has been successfully sent");
  // session.flash("messageType", `success`);
  // return redirect("/", {
  //   headers: {
  //     "Set-Cookie": await commitSession(session),
  //   },
  // });
  return null;
};
