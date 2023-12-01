import React, { useState } from 'react';
import { TagsInput } from "react-tag-input-component";

export default function Index() {
  const [selected, setSelected] = useState(["papaya"]);



  return (
    <div className='flex justify-center h-screen'>
    <div className='p-5 w-1/2 h-15'>
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="fruits"
        placeHolder="enter fruits"
      />
    </div>
    </div>
  );
}
