import { redirect } from "@remix-run/node";
import { serialize } from "cookie";
import { parse } from "cookie";
import dotenv from "dotenv";
dotenv.config();

const loginEndpoint = process.env.REACT_APP_LOGIN_EP;
const getLoggedInEndpoint = process.env.REACT_APP_GET_LOGGED_IN_EP;

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

export async function register(formData) {
  try {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const displayname = `${firstName} ${lastName}`;
    const email = formData.get("email");
    const password = formData.get("password");
    const serviceNo = formData.get("mobile");
    const planID = formData.get("planID");
    const registerEP = process.env.REACT_APP_REGISTER_EP;
    // Additional validation if needed

    // Step 1: Make a POST request to register endpoint
    const registerResponse = await fetch(registerEP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!registerResponse.ok) {
      // Handle registration failure
      return json({
        type: "error",
        message: "Registration failed",
      });
    }

    // Assuming the registration endpoint returns some data
    const registrationData = await registerResponse.json();

    // Step 2: Make a PATCH request to update user endpoint
    const updateUserResponse = await fetch(
      process.env.REACT_APP_UPDATE_USER_ENDPOINT,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${registrationData.accessToken}`,
          // Include any other headers needed for the update user endpoint
        },
        body: JSON.stringify({
          displayname,
          serviceNo,
          planID,
          // Include any other fields needed for the update user endpoint
        }),
      }
    );

    if (!updateUserResponse.ok) {
      // Handle update user failure, you may need to rollback the registration
      // For simplicity, we are assuming a rollback here by returning an error
      return json({
        type: "error",
        message: "Update user failed. Registration rolled back.",
      });
    }

    // Perform additional actions after successful registration and update user if needed

    // For now, return a success message
    return json({
      type: "success",
      message: "Registration and update user successful",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return json({
      type: "error",
      message: "Internal Server Error",
    });
  }
}
