import { redirect } from "@remix-run/node";
import { getAccessTokenFromCookie } from "../data/authentication.server";
import { checkUserLoggedIn } from "../data/authentication.server";
import { commitSession, getSession } from "../sessions";
import dotenv from "dotenv";

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.flash("globalMessage", `Account successfully activated!`);
  session.flash("messageType", `success`);
  dotenv.config();
  const updateUserEP = process.env.REACT_APP_UPDATE_USER_EP;
  console.log("updateEP: " + updateUserEP);
  const accessToken = getAccessTokenFromCookie(request);
  if (request.method !== "PATCH") {
    throw json({ message: "Invalid request method" }, { status: 400 });
  }
  const formData = await request.formData();
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const number = formData.get("number");
  const planID = formData.get("planID");

  console.log(firstName + lastName + number + planID);

  const displayName = `${firstName} ${lastName}`;

  const payload = {
    displayName: displayName,
    serviceNumber: number,
    serviceStatus: "active",
    accountNumber: "string", // You might want to replace this with the actual account number
    planId: planID,
  };

  const response = await fetch(updateUserEP, {
    method: "PATCH",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.statusText} `);
  }

  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
