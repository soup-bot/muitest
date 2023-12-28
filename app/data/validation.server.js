export function validateCredentials(input) {
  let validationErrors = {};

  if (input.formType === "login") {
    // Validation for login form
    console.log("login if");
    if (!isValidEmail(input.email)) {
      validationErrors.email = "Invalid email address.";
    }

    if (!isValidPassword(input.password)) {
      validationErrors.password =
        "Invalid password. Must be at least 5 characters long.";
    }
  } else if (input.formType === "signup") {
    console.log("signup if");
    // Validation for signup form
    if (!isValidFirstName(input.firstName)) {
      validationErrors.firstName = "First name is required.";
    }

    if (!isValidLastName(input.lastName)) {
      validationErrors.lastName = "Last name is required.";
    }

    // Add validations for other signup fields

    if (!isValidEmail(input.email)) {
      validationErrors.newEmail = "Invalid email address.";
    }

    if (!isValidPassword(input.password)) {
      validationErrors.newPassword =
        "Invalid password. Must be at least 5 characters long.";
    }
  }

  if (Object.keys(validationErrors).length > 0) {
    console.log("lblbab");
    throw validationErrors;
  }
}

// isValidEmail function
export function isValidEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return value && emailRegex.test(value);
}

// isValidPassword function
export function isValidPassword(value) {
  return value && value.trim().length >= 5;
}

// isValidFirstName function
export function isValidFirstName(value) {
  return value && value.trim().length > 0;
}

// isValidLastName function
export function isValidLastName(value) {
  return value && value.trim().length > 0;
}

// isValidEmail, isValidPassword, isValidFirstName, isValidLastName functions remain the same
