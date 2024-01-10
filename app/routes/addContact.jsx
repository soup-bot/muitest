import { redirect } from "@remix-run/node";
import { getAccessTokenFromCookie } from "../data/authentication.server";
import { checkUserLoggedIn } from "../data/authentication.server";
import { commitSession, getSession } from "../sessions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import dotenv from "dotenv";
export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.flash("globalMessage", `Contact successfully saved`);
  session.flash("messageType", `success`);

  dotenv.config();
  const addContactEP = process.env.REACT_APP_ADD_CONTACT_EP;
  const { userId } = await checkUserLoggedIn(request);
  const addContactURL = `${addContactEP}`;
  console.log("URL: " + addContactURL);
  console.log("User ID: " + userId);

  const accessToken = getAccessTokenFromCookie(request);
  console.log("Access token: " + accessToken);
  console.log("action called");
  if (request.method !== "POST") {
    throw json({ message: "Invalid request method" }, { status: 400 });
  }
  const formData = await request.formData();
  const name = formData.get("name");
  const number = formData.get("number");
  const group = formData.get("group");

  const payload = {
    contacts: [
      {
        name: name,
        number: number,
      },
    ],
    group: {
      groupName: group,
    },
  };

  const response = await fetch(addContactURL, {
    method: "POST",
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

  const data = await response.text();

  return redirect("/contacts", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
