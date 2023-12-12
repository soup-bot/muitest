import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import xlsx from "xlsx";
import { IoSend } from "react-icons/io5";
import sample from "../assets/sample.png";
import placeholderimg from "../assets/placeholders.png";
import { IoClose } from "react-icons/io5";
import Modal from "@mui/material/Modal";

export default function InputForm() {
  const [text, setText] = useState("");
  const [numMessages, setNumMessages] = useState(0);
  const [inputType, setInputType] = useState("numbers");
  const [selected, setSelected] = useState([]);
  const [headers, setHeaders] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [validNum, setValidNum] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  // Function to open the popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

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

  //PHONE NUMBER VALIDATION
  const validatePhoneNumber = (phoneNumber) => {
    // Check if the phone number has exactly 7 characters
    // and starts with either 7 or 9
    return /^[79]\d{6}$/.test(phoneNumber);
  };

  const beforeAddValidate = (tag, existingTags) => {
    // Check if the length is less than 10 and the phone number is valid
    const isValidPhoneNumber = selected.length < 10 && validatePhoneNumber(tag);

    isValidPhoneNumber ? setValidNum(true) : setValidNum(false);
    // Set the error message for Snackbar

    return isValidPhoneNumber;

    // } else {
    //   setSnackbarText(
    //     "Invalid phone number. Please enter a valid 7-digit number starting with 7 or 9."
    //   );
    //   setOpen(true);
    // }
  };
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="w-full flex flex-col items-center ">
      {/* Popup */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center align-middle justify-center"
      >
        <div className="border-t-4 border-secondary bg-white absolute flex flex-col p-6 shadow-md rounded-lg left-50 z-10 w-100 sm:w-1/2 lg:w-1/3 xl:1/4 animate-fade-down animate-once animate-duration-[240ms] animate-ease-in">
          <div className="w-100 flex align-top  justify-end mb-5 ">
            <IoClose
              className="cursor-pointer"
              size={30}
              onClick={handleClose}
            />
          </div>
          <div className="">
            <ul className="text-md flex flex-col align-middle justify-center items-center gap-4 px-4">
              <img
                src={sample}
                alt=""
                className="w-4/5 md:w-3/5 border-2  rounded-md"
              />

              <li>
                <p className="">
                  Upload an xlsx or csv file in the above format with your
                  desired columns. Number is required.{" "}
                </p>
              </li>

              <img
                src={placeholderimg}
                alt=""
                className="w-4/5 md:w-3/5 border-2 rounded-md"
              />
              <li>
                <p className="">
                  The header values of your data sheet will be displayed, and
                  can be added to your messages as placeholders to allow for
                  customized messages.{" "}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Modal>

      <div className="w-full lg:w-3/5 justify-center items-center mt-10  p-10 py-3 pb-4 rounded-lg lg:shadow-lg lg:border-t-4  border-secondary">
        <h1 className="font-bold text-2xl my-10 ">Compose a message</h1>

        <Form method="post" encType="multipart/form-data">
          <div className="mb-5">
            {inputType === "numbers" && (
              <div className=" flex flex-col align-middle  justify-left mt-8  animate-fade animate-once animate-duration-300 animate-ease-linear">
                <p className="mb-2 text-l font-medium text-gray-900 ">
                  Input numbers
                </p>
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-4/5">
                    <TagsInput
                      classNames={{
                        tag: "font-medium",
                        input:
                          "p-1 font-medium focus:border-transparent focus:ring-0 active:ring-0",
                      }}
                      value={selected}
                      onChange={setSelected}
                      beforeAddValidate={beforeAddValidate}
                      onlyUnique={true}
                    />

                    <input type="hidden" name="numbers" value={selected} />
                  </div>

                  <div className="w-full md:ml-7 md:w-2/5 lg:1/5 flex justify-left my-5">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        checked={inputType === "file"}
                        onChange={() =>
                          handleInputChange(
                            inputType === "numbers" ? "file" : "numbers"
                          )
                        }
                        className="sr-only peer"
                      />

                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium text-gray-900 ">
                        Upload a file
                      </span>
                      <button
                        type="button"
                        onClick={handleOpen}
                        className="font-bold text-primary border rounded-full px-2 ml-3 shadow-md"
                      >
                        ?
                      </button>
                    </label>
                  </div>
                </div>
                {!validNum && (
                  <div className="">
                    <span className="font-medium text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      Invalid phone number. Please enter a valid 7-digit number
                      starting with 7 or 9.
                    </span>
                  </div>
                )}
              </div>
            )}
            {inputType === "file" && (
              <div className="">
                {inputType === "file" && (
                  <div className=" flex flex-col md:flex-row align-middle items-center justify-center mt-8 animate-fade animate-once animate-duration-300 animate-ease-linear">
                    <div className=" w-full md:w-4/5">
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
                        aria-describedby="file_input_help"
                        type="file"
                        name="excelFile"
                        id="excelFile"
                        accept=".xlsx, .csv"
                        onChange={handleFileChange}
                      />
                    </div>

                    <div className="w-full md:ml-7 md:w-2/5 flex justify-left my-5 align-middle items-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          checked={inputType === "file"}
                          onChange={() =>
                            handleInputChange(
                              inputType === "numbers" ? "file" : "numbers"
                            )
                          }
                          className="sr-only peer"
                        />

                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 ">
                          Upload a file
                        </span>
                        <button
                          type="button"
                          onClick={openPopup}
                          className="font-bold text-primary border rounded-full px-2 ml-3 shadow-md"
                        >
                          ?
                        </button>
                      </label>
                    </div>
                  </div>
                )}
                <p className="mt-1 text-sm text-gray-500 " id="file_input_help">
                  .xlsx or .csv
                </p>
                {headers ? (
                  <>
                    <div className="mt-5 text-md font-medium"></div>
                    {Object.values(headers).map((value, index) => (
                      <button
                        className="bg-secondary text-white m-1 py-1 px-2 rounded-md shadow-sm hover:bg-hoversec text-sm hover:scale-105 transition"
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
                  <div className="mt-3 text-md font-medium"></div>
                )}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-l font-medium text-gray-900 "
            >
              Your message
            </label>

            <textarea
              value={text}
              onChange={handleTextChange}
              name="text"
              id="message"
              rows="14"
              maxLength="1531"
              className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 0"
              placeholder="Write your message here..."
            ></textarea>
            <div className="justify-between flex-wrap border-2 align-middle bg-slate-100  rounded-md">
              <div className="flex font-medium text-sm justify-between p-2">
                <p className="">{text.length} characters used</p>
                <p
                  className={`${
                    numMessages > 10 ? "text-red-600 font-black" : ""
                  }`}
                >
                  {numMessages}/10 messages
                </p>
              </div>
            </div>

            <div className="flex w-full align-middle justify-center mt-10">
              <button
                type="submit"
                disabled={
                  !((text && selected.length > 0) || (text && uploadedFile)) ||
                  numMessages > 10
                }
                className="flex align-middle justify-center items-center disabled:bg-gray-400 text-white bg-primary hover:bg-hoverprim  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                {" "}
                <p className="mr-3">SEND</p>
                <IoSend />
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
