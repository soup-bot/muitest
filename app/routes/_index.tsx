import InputForm from '../components/textinput';
import React, { useState } from 'react';


export default function Index() {
  const [selected, setSelected] = useState(["papaya"]);



  return (
    <div className='flex justify-center h-screen'>
<InputForm/>
    </div>
  );
}
