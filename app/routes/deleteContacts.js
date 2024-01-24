import { redirect } from "@remix-run/node";
import { getAccessTokenFromCookie } from "../data/authentication.server";
import { checkUserLoggedIn } from "../data/authentication.server";
import { commitSession, getSession } from "../sessions";
import dotenv from "dotenv";
export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  dotenv.config();
  const deleteContactsEP = process.env.REACT_APP_DELETE_CONTACTS_EP;
  const formData = await request.formData();
  const contactIds = formData.get("contactIDs");
  console.log("deleting" + contactIds);
  const accessToken = getAccessTokenFromCookie(request);

  const payload = contactIds.split(",").map((id) => parseInt(id.trim(), 10));
  console.log(payload);
  console.log("action called");
  if (request.method !== "DELETE") {
    throw json({ message: "Invalid request method" }, { status: 400 });
  }

  const response = await fetch(deleteContactsEP, {
    method: "DELETE",
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

  session.flash("globalMessage", `Contacts successfully deleted`);
  session.flash("messageType", `success`);
  return redirect("/contacts?page=1&pageSize=25", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
