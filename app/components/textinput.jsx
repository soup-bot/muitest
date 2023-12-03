import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import xlsx from "xlsx";
import { IoSend } from "react-icons/io5";




export default function InputForm(){
  const [text, setText] = useState("");
  const [numMessages, setNumMessages] = useState(0);
  const [inputType, setInputType] = useState("numbers");
  const [selected, setSelected] = useState(["7637437"]);
  const [headers, setHeaders] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleInputChange = (type) => {
    setInputType(type);
    setText("");
    setHeaders(null);
    setUploadedFile(null);
    setSelected([]);
    setNumMessages(0);
  };
  const handleFileChange = async (e) => {
    setHeaders(null);
    const file = e.target.files[0];
    setUploadedFile(file);
    if (!file) {
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = xlsx.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const headers = [];
      const range = xlsx.utils.decode_range(sheet["!ref"]);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const headerCellAddress = xlsx.utils.encode_cell({
          r: range.s.r,
          c: C,
        });
        const headerCellValue = sheet[headerCellAddress].v;
        headers.push(headerCellValue);
      }

      console.log("CLIENT SIDE:", headers);
      setHeaders(headers);
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };

  const handleButtonClick = (value, event) => {
    event.preventDefault();
    setText((prevText) => `${prevText} @@${value} `);
    // calculateMessages(text)
    calculateMessages(text + " @@" + value);
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
  
//   return(
//     <div className="w-full flex flex-col items-center">
      
// <div className="w-full lg:w-3/5 justify-center items-center mt-10  p-12 pb-4 rounded-lg md:shadow-lg lg:border-y-4  border-secondary">

// <label htmlFor="toggleInput" className="block mb-5 text-l font-medium text-gray-900 dark:text-white">
//           Toggle Input Type
//         </label>
//         <label className="relative inline-flex items-center cursor-pointer"/>
//           <input
//             type="checkbox"
//             value=""
//             checked={inputType === "file"}
//             onChange={() => handleInputChange(inputType === "numbers" ? "file" : "numbers")}
//             className="sr-only peer"
//           />


//       <Form  method="post"
//           encType="multipart/form-data" >

            
// <label class="relative inline-flex items-center cursor-pointer">
//   <input type="checkbox" value="" class="sr-only peer"/>
//   <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//   <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
// </label>

// <div className="mb-10">
// {(inputType==='numbers') && 
// <div className="mt-8">
// <TagsInput
//         classNames={{tag:'font-medium',input:'p-1 font-medium focus:border-transparent focus:ring-0 active:ring-0'}}
//         value={selected}
//         onChange={setSelected}
//       />
//        <input type="hidden" name="numbers" value={selected} />
//       </div>
// }
// {(inputType==='file' ) && 

// <div className="mt-8">
// <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" type="file"
// name="excelFile"
// id="excelFile"
// accept=".xlsx, .xls, .csv"
// onChange={handleFileChange}/>
// <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">XLSX, XLS, or CSV.</p>

// {headers ? (
//                 <>
//                   <div className="mt-5 text-md font-medium"></div>
//                   {Object.values(headers).map((value, index) => (
//                     <button
//                       className="bg-secondary text-white m-1 py-0.5 px-2 rounded-md shadow-sm hover:bg-blue-400 text-sm"
//                       key={index}
//                       type="button"
//                       onMouseDown={(e) => handleButtonClick(value, e)}
//                     >
//                       {value}
//                     </button>
//                   ))}
//                 </>
//               ) : (
//                 // ELSE SHOW THAT NO DATA IS AVAILABLE
//                 <div className="mt-3 text-md font-medium">No data available</div>
//               )}
// </div>
// }
      

// </div>
//     <div>
// <label htmlFor="message" className="block mb-2 text-l font-medium text-gray-900 dark:text-white">Your message</label>

// <textarea  value={text} onChange={handleTextChange} name="text" id="message" rows="14" maxLength="1531" className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your message here..."></textarea>
// <div className="justify-between flex-wrap border-2 align-middle bg-slate-100  rounded-md">
// <div className="flex font-medium text-sm justify-between p-2"><p className="">{text.length} characters used</p>
//                 <p className={`${numMessages > 10 ? "errortxt" : ""}`}>
//                   {numMessages}/10 messages
//                 </p></div>
//                 </div>
                
//                 <div className="flex w-full align-middle justify-center mt-10">
//                 <button type="submit" className="flex align-middle justify-center items-center text-white bg-primary hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> <p className="mr-3">SEND</p><IoSend /> 
                
//                 </button>
//                 </div>
               

// </div>
// </Form>
// </div>
// </div>
//   )


return (
  <div className="w-full flex flex-col items-center">
    <div className="w-full lg:w-3/5 justify-center items-center mt-10  p-12 pb-4 rounded-lg md:shadow-lg lg:border-y-4  border-secondary">
      <h1 className="font-medium text-2xl">Compose a message</h1>

      <div className="mb-10">
        {inputType === 'numbers' && (
          <div className=" flex flex-col md:flex-row align-middle items-center justify-center mt-8">
          <div className="w-full md:w-4/5">

            <TagsInput
              classNames={{ tag: 'font-medium', input: 'p-1 font-medium focus:border-transparent focus:ring-0 active:ring-0' }}
              value={selected}
              onChange={setSelected}
              placeHolder='TO:'
            />
            <input type="hidden" name="numbers" value={selected} />

            </div>
            <div className="w-full md:ml-7 md:w-2/5 lg:1/5 flex justify-center my-5">

            <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          checked={inputType === "file"}
          onChange={() => handleInputChange(inputType === "numbers" ? "file" : "numbers")}
          className="sr-only peer"
        />

        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Upload a file</span>
      </label>
      </div>
      
          </div>
        )}
        {inputType === 'file' && (
          <div className="">
        {(inputType==='file' ) && 

<div className=" flex flex-col md:flex-row align-middle items-center justify-center mt-8">
<div className=" w-full md:w-4/5">
<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" type="file"
name="excelFile"
id="excelFile"
accept=".xlsx, .xls, .csv"
onChange={handleFileChange}/>

</div>

            <div className="w-full md:ml-7 md:w-2/5 flex justify-center my-5">

            <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          checked={inputType === "file"}
          onChange={() => handleInputChange(inputType === "numbers" ? "file" : "numbers")}
          className="sr-only peer"
        />

        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Upload a file</span>
      </label>
      </div>
</div>
}
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">XLSX, XLS, or CSV.</p>
{headers ? (
                <>
                  <div className="mt-5 text-md font-medium"></div>
                  {Object.values(headers).map((value, index) => (
                    <button
                      className="bg-secondary text-white m-1 py-0.5 px-2 rounded-md shadow-sm hover:bg-blue-400 text-sm"
                      key={index}
                      type="button"
                      onMouseDown={(e) => handleButtonClick(value, e)}
                    >
                      {value}
                    </button>
                  ))}
                </>
              ) : (
                // ELSE SHOW THAT NO DATA IS AVAILABLE
                <div className="mt-3 text-md font-medium">No data available</div>
              )}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block mb-2 text-l font-medium text-gray-900 dark:text-white">
          Your message
        </label>

        <textarea  value={text} onChange={handleTextChange} name="text" id="message" rows="14" maxLength="1531" className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your message here..."></textarea>
 <div className="justify-between flex-wrap border-2 align-middle bg-slate-100  rounded-md">
 <div className="flex font-medium text-sm justify-between p-2"><p className="">{text.length} characters used</p>
                 <p className={`${numMessages > 10 ? "errortxt" : ""}`}>
                   {numMessages}/10 messages
                 </p></div>
                 </div>
                
                 <div className="flex w-full align-middle justify-center mt-10">
                 <button type="submit" className="flex align-middle justify-center items-center text-white bg-primary hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> <p className="mr-3">SEND</p><IoSend /> 
                
                 </button>
                </div>
      </div>
    </div>
  </div>
);
}