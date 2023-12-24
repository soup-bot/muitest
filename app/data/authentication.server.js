import { redirect } from "@remix-run/node";
import { serialize } from "cookie";
import { parse } from "cookie";

// Function to get access token from cookies
export function getAccessTokenFromCookie(request) {
  const cookies = parse(request.headers.get("Cookie") || "");

  // Assuming the cookie name is ".AspNetCore.Identity.Application"
  const accessToken = cookies[".AspNetCore.Identity.Application"];

  return accessToken || null;
}

export async function createUserSession(accessToken, expiresIn, redirectPath) {
  console.log("createUserSession");

  const cookieOptions = {
    maxAge: expiresIn, // expiresIn should be in seconds
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax", // Adjust as needed
    path: "/", // Adjust as needed
  };

  const cookieString = serialize(
    ".AspNetCore.Identity.Application",
    accessToken,
    cookieOptions
  );

  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": cookieString,
    },
  });
}

export async function login(credentials) {
  try {
    const response = await fetch("http://localhost:5294/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const authData = await response.json();
      const { accessToken, refreshToken, expiresIn } = authData;

      return createUserSession(accessToken, expiresIn, "/");
    } else {
      return new Response("Invalid credentials", { status: 401 });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
