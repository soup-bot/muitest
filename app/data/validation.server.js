export function validateCredentials(input) {
    let validationErrors = {};
  
    if (!isValidEmail(input.email)) {
      validationErrors.email = 'Invalid email address.';
    }
  
    if (!isValidPassword(input.password)) {
      validationErrors.password = 'Invalid password. Must be at least 7 characters long.';
    }
  
    if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
    }
  }
  
  function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return value && emailRegex.test(value);
  }
  
  function isValidPassword(value) {
    return value && value.trim().length >= 7;
  }
  