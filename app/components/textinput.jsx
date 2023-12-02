import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";




export default function InputForm(){
  const [text, setText] = useState("");
  const [numMessages, setNumMessages] = useState(0);
  const [inputType, setInputType] = useState("numbers");
  const [selected, setSelected] = useState(["7637437"]);

  const handleInputChange = (type) => {
    setInputType(type);
    setText("");
    // setHeaders(null);
    // setUploadedFile(null);
    // setSelected([]);
    setNumMessages(0);
  };

  const calculateMessages = (text) => {
    const gsm7Chars = new Set(
      " @£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    );
    const ucs2Chars = new Set(text);
  
    const isGsm7 = [...ucs2Chars].every((char) => gsm7Chars.has(char));
    const charCount = text.length;
  
    if (isGsm7) {
      // Calculate messages for GSM-7
      if (charCount <= 160) {
        setNumMessages(1);
      } else {
        setNumMessages(Math.ceil(charCount / (160 - 7)));
      }
    } else {
      if (charCount <= 70) {
        setNumMessages(1);
      } else {
        // Calculate messages for UCS-2
        setNumMessages(Math.ceil(charCount / (70 - 3)));
      }
    }
  };
  
  const handleTextChange = (e) => {
    setText(e.target.value);
    calculateMessages(e.target.value);
  };
  
  return(
    <div className="w-full flex flex-col items-center">


<div className="w-full lg:w-3/5 justify-center items-center mt-10  p-12 pb-4 rounded-lg shadow-md">

<label for="countries" class="block mb-5 text-l font-medium text-gray-900 dark:text-white">Select an input option</label>
<select 
onChange={(e) => handleInputChange(e.target.value)}
value={inputType}
id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

  <option value="numbers">Input up to 10 numbers</option>
  <option value="file">Upload a file</option>

</select>


      <Form  method="post"
          encType="multipart/form-data" >
<div className="mb-10">
{(inputType==='numbers') && 
<div className="mt-8">
<TagsInput
        classNames={{tag:'font-medium',input:'p-1 font-medium focus:border-transparent focus:ring-0 active:ring-0'}}
        value={selected}
        onChange={setSelected}
        name="numbers"
      />
      </div>
}
{(inputType==='file') && 

<div className="mt-8">
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">XLSX, XLS, or CSV.</p>
</div>
}
      

</div>
    <div>
<label htmlFor="message" className="block mb-2 text-l font-medium text-gray-900 dark:text-white">Your message</label>

<textarea  value={text} onChange={handleTextChange} name="text" id="message" rows="14" maxLength="1531" className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your message here..."></textarea>
<div className="justify-between flex-wrap border-2 align-middle bg-slate-100  rounded-md">
<div className="flex font-medium text-sm justify-between p-2"><p className="">{text.length} characters used</p>
                <p className={`${numMessages > 10 ? "errortxt" : ""}`}>
                  {numMessages}/10 messages
                </p></div>
                </div>
                
                <div className="flex w-full align-middle justify-center mt-10">
                <button type="button" className="text-white bg-primary hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit
                
                </button>
                </div>
               

</div>
</Form>
</div>
</div>
  )
}