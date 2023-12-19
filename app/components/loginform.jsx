import { Form, Link, useActionData } from "@remix-run/react";
import { useState } from "react";
import { useDarkMode } from "../components/DarkModeContext";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validationErrors = useActionData();

  return (
    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm ">
      <Form className="space-y-6" method="POST" noValidate>
        <input type="hidden" name="formType" value="login" />

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-500 dark:text-slate-200"
          >
            Email address
          </label>
          <div className={`mt-2`}>
            <input
              maxLength={50}
              id="email"
              name="email"
              type="email"
              placeholder=" "
              required
              autoComplete="email"
              className={`mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-sm placeholder-slate-400
    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
    invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer`}
            />

            <span className="mt-2 font-medium hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              Please enter a valid email address
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-500 dark:text-slate-200"
            >
              Password
            </label>
          </div>
          <div className={`mt-2`}>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder=" "
              required
              className={`mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md  dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer `}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </Form>
    </div>
  );
}
