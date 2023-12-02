import { redirect } from '@remix-run/node';
import InputForm from '../components/textinput';
import React, { useState } from 'react';


export default function Index() {
  const [selected, setSelected] = useState(["papaya"]);



  return (
    <div>
<InputForm/>
    </div>
  );
}


export const action = async ({ request }) => {
  console.log("ACTION");
  const formData = await request.formData();
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  return redirect("/");
};
