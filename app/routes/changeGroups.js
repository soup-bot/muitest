import { redirect } from "@remix-run/node";
import { getAccessTokenFromCookie } from "../data/authentication.server";
import { checkUserLoggedIn } from "../data/authentication.server";
import { commitSession, getSession } from "../sessions";
import dotenv from "dotenv";
export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  dotenv.config();
  const changeGroupsEP = process.env.REACT_APP_CHANGE_GROUPS_EP;
  const formData = await request.formData();
  const groupIds = formData.get("groupIds");
  const group = formData.get("group");

  const accessToken = getAccessTokenFromCookie(request);

  console.log("action called");
  if (request.method !== "POST") {
    throw json({ message: "Invalid request method" }, { status: 400 });
  }

  const payload = {
    contactIds: groupIds.split(",").map(Number), // Convert strings to numbers
    groupId: Number(group), // Convert string to number
  };

  const response = await fetch(changeGroupsEP, {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errMsg = await response.text();
    session.flash("globalMessage", errMsg);
    session.flash("messageType", `error`);
    return redirect("/contacts?page=1&pageSize=25", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const data = await response.text();

  session.flash("globalMessage", data);
  session.flash("messageType", `success`);
  return redirect("/contacts?page=1&pageSize=25", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
