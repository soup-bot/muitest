import { json } from "@remix-run/node";
import { logout } from "../data/authentication.server";

export function action({ request }) {
  if (request.method !== "POST") {
    throw json({ message: "Invalid request method" }, { status: 400 });
  }

  return logout(request); // Corrected function name
}
