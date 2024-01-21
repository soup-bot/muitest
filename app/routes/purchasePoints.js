import { redirect } from "@remix-run/node";
import { getAccessTokenFromCookie } from "../data/authentication.server";
import { checkUserLoggedIn } from "../data/authentication.server";
import { commitSession, getSession } from "../sessions";
import dotenv from "dotenv";
export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  dotenv.config();
  const choosePlanEP = process.env.REACT_APP_CHOOSE_PLAN_EP;
  const formData = await request.formData();
  console.log(formData);
  const planId = formData.get("planId");
  const points = formData.get("points");
  console.log(planId + " " + points);
  const accessToken = getAccessTokenFromCookie(request);
  console.log("action called");

  if (request.method !== "PATCH") {
    throw json({ message: "Invalid request method" }, { status: 400 });
  }

  const payload = {
    planId: planId,
    amount: points,
  };

  const response = await fetch(choosePlanEP, {
    method: "PATCH",
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
    return redirect("/manageplan", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const data = await response.text();

  session.flash("globalMessage", `Successfully purchased ${points} points`);
  session.flash("messageType", `success`);
  return redirect("/manageplan", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
  return null;
};
