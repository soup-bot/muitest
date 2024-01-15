import { redirect } from "@remix-run/node";
import { getAccessTokenFromCookie } from "../data/authentication.server";
import { checkUserLoggedIn } from "../data/authentication.server";
import { commitSession, getSession } from "../sessions";
import dotenv from "dotenv";
export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  dotenv.config();
  const deleteGroupEP = process.env.REACT_APP_DELETE_GROUP_EP;
  const formData = await request.formData();
  console.log(formData);
  const groupId = formData.get("groupId");
  console.log("group ID" + groupId);
  const deleteGroupUrl = `${deleteGroupEP}/${groupId}`;
  console.log(deleteGroupUrl);
  const accessToken = getAccessTokenFromCookie(request);

  console.log("action called");
  if (request.method !== "DELETE") {
    throw json({ message: "Invalid request method" }, { status: 400 });
  }

  const response = await fetch(deleteGroupUrl, {
    method: "DELETE",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
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

  session.flash("globalMessage", `Group successfully deleted`);
  session.flash("messageType", `success`);
  return redirect("/contacts?page=1&pageSize=25", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
