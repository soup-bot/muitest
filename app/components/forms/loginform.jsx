import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { MdLogin } from "react-icons/md";
import { useDarkMode } from "../DarkModeContext";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validationErrors = useActionData();
  const navigation = useNavigation();
  const [isSignIn, setSignIn] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState("");

  // Declare strengthChecks outside handlePassword
  const [strengthChecks, setStrengthChecks] = useState({
    length: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasDigit: false,
    hasSpecialChar: false,
  });

  const handlePassword = (passwordValue) => {
    const newStrengthChecks = {
      length: passwordValue.length >= 6,
      hasUpperCase: /[A-Z]+/.test(passwordValue),
      hasLowerCase: /[a-z]+/.test(passwordValue),
      hasDigit: /[0-9]+/.test(passwordValue),
      hasSpecialChar: /[^A-Za-z0-9]+/.test(passwordValue),
    };

    setStrengthChecks(newStrengthChecks);

    let verifiedList = Object.values(newStrengthChecks).filter(
      (value) => value
    );

    let strength =
      verifiedList.length === 5
        ? "Strong"
        : verifiedList.length >= 2
        ? "Medium"
        : "Weak";

    setPassword(passwordValue);
    setProgress(`${(verifiedList.length / 5) * 100}%`);
    setMessage(strength);
  };

  const getActiveColor = (type) => {
    if (type === "Strong") return "#4caf50";
    if (type === "Medium") return "#FEBD01";
    return "#FF0054";
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm ">
      <Form className="space-y-6" method="POST" noValidate>
        {/* Email field */}
        <TextField
          name="email"
          className="w-full"
          label="Email"
          autoComplete="off"
          variant="outlined"
        />

        {/* Password field */}
        <div>
          <TextField
            name="password"
            className="w-full focus:outline-none focus:border-none"
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <BsFillEyeFill size={20} />
                    ) : (
                      <BsFillEyeSlashFill size={20} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            onChange={({ target }) => {
              handlePassword(target.value);
            }}
            type={showPassword ? "text" : "password"}
          />
          {password.length !== 0 && !isSignIn ? (
            <div
              className="h-1"
              style={{
                width: progress,
                backgroundColor: getActiveColor(message),
              }}
            ></div>
          ) : (
            <div className="h-1"></div>
          )}
        </div>
        {!isSignIn && (
          <div className="flex flex-col mt-2 space-y-1 text-sm text-gray-500 animate-fade-up">
            <p>Password must have:</p>
            <ul className="list-disc pl-5 font-medium ">
              <li>
                <div
                  className={`text-${
                    strengthChecks.length ? "green-500 " : "gray-500 "
                  }`}
                >
                  At least 6 characters
                </div>
              </li>
              <li>
                {" "}
                <div
                  className={`text-${
                    strengthChecks.hasUpperCase ? "green-500" : "gray-500"
                  }`}
                >
                  At least one uppercase letter
                </div>
              </li>
              <li>
                <div
                  className={`text-${
                    strengthChecks.hasLowerCase ? "green-500" : "gray-500"
                  }`}
                >
                  At least one lowercase letter
                </div>
              </li>
              <li>
                {" "}
                <div
                  className={`text-${
                    strengthChecks.hasDigit ? "green-500" : "gray-500"
                  }`}
                >
                  At least one digit
                </div>
              </li>
              <li>
                {" "}
                <div
                  className={`text-${
                    strengthChecks.hasSpecialChar ? "green-500" : "gray-500"
                  }`}
                >
                  At least one special character
                </div>
              </li>
            </ul>
          </div>
        )}
        {/* Button for switching between sign-in and log-in */}

        {/* Submit button */}
        <div>
          <button
            disabled={navigation.state === "submitting"}
            type="submit"
            name="authType"
            value={isSignIn ? "login" : "signup"}
            className={` ${
              isSignIn
                ? " bg-secondary hover:bg-hoversec"
                : "bg-primary hover:bg-hoverprim animate-fade-down"
            } flex align-middle justify-center items-center w-full rounded-md disabled:bg-gray-400  px-2 py-2 text-sm font-semibold  text-white shadow-sm  hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition`}
          >
            {navigation.state === "submitting"
              ? `Signing ${isSignIn ? "in" : "up"}  `
              : `${isSignIn ? "Sign in" : "Create account"}`}
            {navigation.state === "submitting" && (
              <div className="ml-3 w-min">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            )}
          </button>
          <div>
            <p className="mt-3 text-center text-sm text-gray-500 pb-10">
              {!isSignIn
                ? "Already have an account? "
                : "Don't have an account? "}

              <button
                type="button"
                onClick={() => {
                  // Toggle between sign-in and log-in
                  setSignIn((prev) => !prev);
                }}
                className={`${
                  !isSignIn
                    ? " text-secondary hover:text-hoversec"
                    : "text-primary hover:text-hoverprim"
                } font-semibold leading-6 `}
              >
                {!isSignIn ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
      </Form>
    </div>
  );
}
