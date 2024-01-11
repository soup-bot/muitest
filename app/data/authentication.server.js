import { json, redirect } from "@remix-run/node";
import { serialize } from "cookie";
import { parse } from "cookie";
import dotenv from "dotenv";
dotenv.config();

const loginEndpoint = process.env.REACT_APP_LOGIN_EP;
const getLoggedInEndpoint = process.env.REACT_APP_GET_LOGGED_IN_EP;
const registerEndpoint = process.env.REACT_APP_REGISTER_EP;
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
    const response = await fetch(loginEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const authData = await response.json();
      const { accessToken, refreshToken, expiresIn } = authData;

      return createUserSession(accessToken, expiresIn, "/dashboard");
    } else {
      const errorData = [
        "Invalid credentials. Please check your email and password.",
      ];

      return {
        type: "error",
        message: "Registration failed",
        errorData, // Include error data in the response
      };
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
    return { isLoggedIn: false };
  }

  try {
    const response = await fetch(getLoggedInEndpoint, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      const user = await response.json();
      const {
        userId,
        balance,
        serviceNumber,
        displayName,
        email,
        serviceStatus,
      } = user;
      return {
        isLoggedIn: true,
        userId: userId,
        balance: balance,
        email: email,
        displayName: displayName,
        serviceNumber: serviceNumber,
        serviceStatus: serviceStatus,
      };
    } else {
      // User is not logged in or there was an error, redirect to /auth
      return { isLoggedIn: false };
    }
  } catch (error) {
    console.error("Error checking user login status:", error);
    // Assume user is not logged in on error, redirect to /auth
    return { isLoggedIn: false };
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

export async function register(credentials) {
  try {
    // Step 1: Make a POST request to register endpoint
    const registerResponse = await fetch(registerEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!registerResponse.ok) {
      const error = await registerResponse.json();
      const errorData = error.errors;
      console.log(errorData);
      // Handle registration failure

      return {
        type: "error",
        message: "Registration failed",
        errorData, // Include error data in the response
      };
    }

    console.log("register success");

    return {
      type: "success",
      message: "Registration and login successful",
    };
  } catch (error) {
    console.error("Error during registration:", error);

    return {
      type: "error",
      message: "Internal Server Error",
    };
  }
}
