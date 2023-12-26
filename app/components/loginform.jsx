import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { MdLogin } from "react-icons/md";
import { useDarkMode } from "../components/DarkModeContext";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validationErrors = useActionData();
  const navigation = useNavigation();

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
            disabled={navigation.state === "submitting"}
            type="submit"
            className="flex align-middle justify-center items-center w-full rounded-md disabled:bg-gray-400 bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {navigation.state === "submitting" ? "Signing in  " : "Sign in"}
            {navigation.state === "submitting" ? (
              <div className="">
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
            ) : (
              ""
            )}
          </button>
        </div>
      </Form>
    </div>
  );
}
