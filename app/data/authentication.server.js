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

export async function checkUserLoggedIn(request) {
  const accessToken = getAccessTokenFromCookie(request);

  if (!accessToken) {
    // User is not logged in, redirect to /auth
    return false;
  }

  try {
    const response = await fetch(
      "http://localhost:5294/api/Identity/GetLoggedInUser",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      return true; // User is logged in, return user details
    } else {
      // User is not logged in or there was an error, redirect to /auth
      return false;
    }
  } catch (error) {
    console.error("Error checking user login status:", error);
    // Assume user is not logged in on error, redirect to /auth
    return false;
  }
}

export async function logout(request) {
  const accessToken = getAccessTokenFromCookie(request);

  if (accessToken) {
    // Clear the authentication cookie
    const cookieOptions = {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax", // Adjust as needed
      path: "/", // Adjust as needed
    };

    const emptyCookieString = serialize(
      ".AspNetCore.Identity.Application",
      "",
      cookieOptions
    );

    return redirect("/", {
      headers: {
        "Set-Cookie": emptyCookieString,
      },
    });
  }

  // If the user is not logged in, redirect to /
  return redirect("/");
}
