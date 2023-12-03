import React, { useState } from 'react';
import LoginForm from '../components/loginform';
import SignupForm from '../components/signupform';
import logo from "../assets/logo.svg";
import { Link } from '@remix-run/react';
import { redirect } from '@remix-run/node';

export default function Auth() {
  const [signupMode, setSignupMode] = useState(false);

  const toggleMode = () => {
    setSignupMode(!signupMode);
  };
  

return(
  <div className='h-screen bg-gradient-to-r from-orange-600 to-orange-500 '>
  <div className={`pt-12 md:pt-20 flex flex-1 flex-col px-6 py-2 lg:px-8 bg-white transition-all  ${
        signupMode ? 'h-full' : 'h-4/5 md:h-3/5 rounded-b-[60px] shadow-2xl'
      }`}>
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      
      <div className='flex align-middle items-center justify-around'>
    <img className="h-11" src={logo} alt="" />
     
      <div className='h-7 w-0.5 bg-gray-500 opacity-25'></div>
      <h3 className=" text-2xl font-bold  text-secondary">Bulk SMS</h3>
    </div>
    </div>
    {signupMode ? <SignupForm></SignupForm>: <LoginForm></LoginForm>}

      <p className="mt-10 text-center text-sm text-gray-500 pb-20">
        {signupMode ? 'Already have an account? ' : "Don't have an account? "}


        <button
          type="submit"
          onClick={toggleMode}
          className="font-semibold leading-6 text-secondary hover:text-indigo-500 focus:outline-none focus-visible:outline-indigo-600"
        >
          {signupMode ? 'Sign in' : 'Sign up'}
        </button>
      </p>
</div>
</div>
)
}

export const action = async ({ request }) => {
  console.log("AUTH ACTION");
  const formData = await request.formData();
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  return redirect("/");
};
