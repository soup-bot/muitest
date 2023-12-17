import { json, redirect } from "@remix-run/node";
import { Form, useNavigation, useActionData } from "@remix-run/react";
import React, { useState, useEffect, useRef } from "react";
import { TagsInput } from "react-tag-input-component";
import xlsx from "xlsx";
import { IoSend } from "react-icons/io5";
import sample from "../assets/sample.png";
import placeholderimg from "../assets/placeholders.png";
import { IoClose } from "react-icons/io5";
import Modal from "@mui/material/Modal";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function InputForm() {
  const [text, setText] = useState("");
  const [numMessages, setNumMessages] = useState(0);
  const [inputType, setInputType] = useState("numbers");
  const [selected, setSelected] = useState([]);
  let actionData = useActionData();
  const [headers, setHeaders] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [validNum, setValidNum] = useState(true);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigation = useNavigation();
  const [disableInput, setDisableInput] = useState(selected.length >= 10);
  const handleOpen = () => setOpen(true);
  let $form = useRef();
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

  const handleSelectInputChange = (event) => {
    setInputType(event.target.value);
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

  const handleTagDelete = (index) => {
    setSelected((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected.splice(index, 1);
      return newSelected;
    });
  };

  const beforeAddValidate = (tag, existingTags) => {
    // Check if the length is less than 10 and the phone number is valid
    const isValidPhoneNumber = validatePhoneNumber(tag);

    isValidPhoneNumber ? setValidNum(true) : setValidNum(false);
    // Set the error message for Snackbar

    return isValidPhoneNumber;
  };
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="w-full flex flex-col items-center">
      {/* Popup */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center align-middle justify-center"
      >
        <div className=" border-t-4 border-secondary bg-white   absolute flex flex-col p-6 shadow-md rounded-lg left-50 z-10 w-100 sm:w-1/2 lg:w-1/3 xl:w-1/4 animate-fade-down animate-once animate-duration-[240ms] animate-ease-in ">
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

      <div className="w-full xl:w-3/5 justify-center items-center mt-4 p-10 py-3 pb-4 rounded-lg xl:shadow-lg xl:border-t-4  border-secondary bg-white dark:bg-slate-800 ">
        <h1 className="font-bold text-2xl my-10 dark:text-slate-200">
          Compose a message
        </h1>

        <Form method="post" encType="multipart/form-data">
          <div className="mb-5">
            <div className="flex w-100 flex-col md:flex-row ">
              <div className="basis-1/2 my-3 md:mr-8">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-l font-medium text-gray-900 dark:text-slate-300"
                >
                  Your Sender ID
                </label>
                <select
                  id="senderID"
                  name="senderID"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="SID1">SID1</option>
                  <option value="SID2">SID2</option>
                  <option value="SID3">SID3</option>
                  <option value="SID4">SID4</option>
                </select>
              </div>

              <div className="basis-1/2  my-3 transition-all">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-l font-medium text-gray-900 dark:text-slate-300"
                >
                  Input type
                </label>
                <div className="flex align-middle ">
                  <select
                    id="inputType"
                    value={inputType}
                    onChange={handleSelectInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="numbers">Numbers</option>
                    <option value="file">File</option>
                  </select>

                  {inputType === "file" && (
                    <div className="self-center">
                      <button
                        type="button"
                        onClick={handleOpen}
                        className="font-bold text-primary border rounded-full px-2 ml-3 shadow-md"
                      >
                        ?
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {inputType === "numbers" && (
              <div className=" flex flex-col align-middle  justify-left mt-5  animate-fade animate-once animate-duration-300 animate-ease-linear">
                <p className="mb-2 text-l font-medium text-gray-900 dark:text-slate-300">
                  Input numbers
                </p>
                <div className="flex flex-col md:flex-row ">
                  <div className="w-full md:w-full ">
                    {/* <TagsInput
                      classNames={{
                        tag: "font-medium bg-black",
                        input:
                          "p-1 font-medium focus:border-transparent focus:ring-0 active:ring-0",
                      }}
                      value={selected}
                      onChange={setSelected}
                      beforeAddValidate={beforeAddValidate}
                      onlyUnique={true}
                    />
*/}
                    <input type="hidden" name="numbers" value={selected} />

                    <Autocomplete
                      multiple
                      id="tags-filled"
                      options={[]}
                      defaultValue={[]}
                      freeSolo
                      value={selected}
                      onChange={(e, value) => {
                        const validNumbers = value.filter(beforeAddValidate);
                        setSelected(validNumbers);
                      }}
                      renderTags={(value, getTagProps) =>
                        value
                          .filter((option) => validatePhoneNumber(option))
                          .map((option, index) => (
                            <Chip
                              key={index}
                              variant="outlined"
                              label={option}
                              size="large"
                              onDelete={() => handleTagDelete(index)}
                              style={{
                                marginRight: "8px",
                                marginTop: "4px",
                                marginBottom: "4px",
                              }} // Adjust these values
                            />
                          ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Add a number by pressing enter"
                        />
                      )}
                    />
                  </div>

                  {/* <div className="w-full md:ml-7 md:w-2/5 lg:1/5 flex justify-left my-5">
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
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-slate-300">
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
                  </div> */}
                </div>
                {!validNum && (
                  <div className="mt-3">
                    <span className="font-medium text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                      Please enter a valid 7-digit number starting with 7 or 9
                      <span className="font-black ml-2">(max 10 numbers)</span>.
                    </span>
                  </div>
                )}
                {selected.length > 10 && (
                  <div className="mt-3">
                    <span className="font-medium text-sm text-red-500 ">
                      You can enter a maximum of 10 numbers.
                    </span>
                  </div>
                )}
              </div>
            )}
            {inputType === "file" && (
              <div className="">
                {inputType === "file" && (
                  <div className=" flex flex-col md:flex-row align-middle items-center justify-center mt-8 animate-fade animate-once animate-duration-300 animate-ease-linear">
                    <div className=" w-full md:w-full">
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"
                        aria-describedby="file_input_help"
                        type="file"
                        name="excelFile"
                        id="excelFile"
                        accept=".xlsx, .csv"
                        onChange={handleFileChange}
                      />
                    </div>

                    {/* <div className="w-full md:ml-7 md:w-2/5 flex justify-left my-5 align-middle items-center">
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
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-slate-300">
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
                    </div> */}
                  </div>
                )}
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-slate-300"
                  id="file_input_help"
                >
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
              className="block mb-2 text-l font-medium text-gray-900 dark:text-slate-300"
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
              className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-slate-700 dark:text-slate-200 dark:border-none"
              placeholder="Write your message here..."
            ></textarea>
            <div className="justify-between flex-wrap align-middle   rounded-md  dark:text-slate-200 mt-2">
              <div className="flex font-medium text-sm justify-between p-2 ">
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

            <div className="flex w-full align-middle justify-center md:justify-end mt-10">
              <button
                type="submit"
                disabled={
                  !(
                    (text &&
                      text &&
                      selected.length >= 1 &&
                      selected.length <= 10) ||
                    (text && uploadedFile)
                  ) ||
                  numMessages > 10 ||
                  navigation.state === "submitting"
                }
                className="flex align-middle justify-center items-center disabled:bg-gray-400 text-white bg-primary hover:bg-hoverprim  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                <p className="mr-3">
                  {navigation.state === "submitting" ? "Sending..." : "Send"}
                </p>
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
                  <IoSend />
                )}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
