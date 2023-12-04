import { Form, useActionData } from '@remix-run/react';
import { Carousel } from 'flowbite-react';

export default function SignupForm(){
  const validationErrors = useActionData();

  return (
    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm flex flex-row">
        <Form className="space-y-6" method="POST" noValidate>
        {/* {validationErrors && (
            <ul className='my-7'>
              {Object.values(validationErrors).map((error) => (
                <li className="font-medium text-red-600 text-sm" key={error}>{error}</li>
              ))}
            </ul>
          )} */}

{/* {validationErrors && (
  <ul className='my-7'>
    {Object.keys(validationErrors)
      .filter(key => key === 'newEmail' || key === "firstName" || key === "lastName" || key === "newPassword") // Adjust the condition as needed
      .map((key) => (
        <li className="font-medium text-red-600 text-sm" key={key}>
          {validationErrors[key]}
        </li>
      ))}
  </ul>
)} */}

        <input type="hidden" name="formType" value="signup"/>
        <div className='flex'>
              <div className='mr-4'>
            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-500">
              First Name <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder=" "
                required
                pattern="[A-Za-z\s]+"
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
              />
              <span className="mt-2 font-medium hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Please enter a valid name
                  </span>
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-500">
              Last Name <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder=" "
                pattern="[A-Za-z\s]+"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
              />
              <span className="mt-2 font-medium hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Please enter a valid name
                  </span>
            </div>
          </div>

              </div>

              <>

              <div className='flex'>
              <div className="mr-4">
                <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-500">
                  Mobile Phone <span className="text-red-700">*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="mobile"
                    name="mobile"
                    type="number"
                    placeholder=" "
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                  />
                  <span className="mt-2 font-medium hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Please enter a valid phone number
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="businessPhone" className="block text-sm font-medium leading-6 text-gray-500">
                  Business Phone
                </label>
                <div className="mt-2">
                  <input
                    id="businessPhone"
                    name="businessPhone"
                    type="number"
                    placeholder=" "
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                  />
                   <span className="mt-2 font-medium hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Please enter a valid phone number
                  </span>
                </div>
              </div>
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-500">
                  Company Name
                </label>
                <div className="mt-2">
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    autoComplete="organization"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                     placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
           
              
            </>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500">
              Email address <span className="text-red-700">*</span>
            </label>
            <div className="mt-2">
            <input
  maxLength={50}
  id="email"
  name="email"
  type="email"
  placeholder=" "
  required
  autoComplete="email"
  className={`mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
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
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-500">
                Password <span className="text-red-700">*</span>
              </label>
            </div>
            <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              minLength="5"
              autoComplete="current-password"
              placeholder=" "
              pattern=".{5,}"
              required
              className={`mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer `}
            />
            <span className="mt-2 font-medium hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
    Your password must be more than 5 characters
  </span>
            </div>
          </div>
          <label htmlFor="plan" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Select your plan</label>
  <select name="plan" id="plan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

    <option>BULK/CORP SMS 3K</option>
    <option>BULK/CORP SMS 5K</option>
    <option>BULK/CORP SMS 10K</option>
    <option>BULK/CORP SMS 50K</option>
  </select>

        
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-400 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </Form>
        
      </div>
  )
}