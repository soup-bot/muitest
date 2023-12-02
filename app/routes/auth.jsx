import React, { useState } from 'react';
import LoginForm from '../components/loginform';
import SignupForm from '../components/signupform';

export default function Auth() {
  const [signupMode, setSignupMode] = useState(false);

  const toggleMode = () => {
    setSignupMode(!signupMode);
  };
  
//   return(
//     <div className='h-screen bg-gradient-to-r from-blue-400 to-emerald-400'>
//     <div className={`flex flex-1 flex-col px-6 py-2 lg:px-8 bg-white transition-all ${
//           signupMode ? 'h-full' : 'h-4/5 md:h-3/5'
//         }`}>
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//           {signupMode ? 'Create your account' : 'Sign in to your account'}
//         </h2>
//         {/* <h3 className="mt-6 text-center text-2xl font-bold  text-secondary">Bulk SMS Portal</h3> */}
//       </div>
//       {signupMode ? <SignupForm></SignupForm>: <LoginForm></LoginForm>}

//         <p className="mt-10 text-center text-sm text-gray-500 pb-20">
//           {signupMode ? 'Already have an account? ' : "Don't have an account? "}
//           <button
//             type="button"
//             onClick={toggleMode}
//             className="font-semibold leading-6 text-secondary hover:text-indigo-500 focus:outline-none focus-visible:outline-indigo-600"
//           >
//             {signupMode ? 'Sign in' : 'Sign up'}
//           </button>
//         </p>
// </div>
// </div>
// )

return(
  <div className='h-screen bg-gradient-to-r from-blue-400 to-emerald-400'>
  <div className={`flex flex-1 flex-col px-6 py-2 lg:px-8 bg-white transition-all ${
        signupMode ? 'h-full' : 'h-4/5 md:h-3/5'
      }`}>
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {signupMode ? 'Create your account' : 'Sign in to your account'}
      </h2>
      {/* <h3 className="mt-6 text-center text-2xl font-bold  text-secondary">Bulk SMS Portal</h3> */}
    </div>
    {signupMode ? <SignupForm></SignupForm>: <LoginForm></LoginForm>}

      <p className="mt-10 text-center text-sm text-gray-500 pb-20">
        {signupMode ? 'Already have an account? ' : "Don't have an account? "}
        <button
          type="button"
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