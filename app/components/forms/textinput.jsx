import {
  Form,
  useNavigation,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { useState, useRef } from "react";
import xlsx from "xlsx";
import { IoSend } from "react-icons/io5";
import { useDarkMode } from "../DarkModeContext";
import FileSampleModal from "../../components/modals/FileSampleModal";
import { MdClear } from "react-icons/md";
import TextAreaComponent from "./TextAreaComponent";
import AutoCompleteInput from "./AutoCompleteInput";

export default function InputForm() {
  const [textDirection, setTextDirection] = useState("ltr");
  const { senderNames } = useLoaderData();

  const { contacts } = useLoaderData();

  const [text, setText] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [numMessages, setNumMessages] = useState(0);
  const [inputType, setInputType] = useState("numbers");
  const [selected, setSelected] = useState([]);
  const [headers, setHeaders] = useState(null);
  const [exampleData, setExampleData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [validNum, setValidNum] = useState(true);
  const [validFileSize, setValidFileSize] = useState(true);
  const [open, setOpen] = useState(false);
  const [validFile, setValidFile] = useState(true);
  const [uniqueNumbers, setUniqueNumbers] = useState([]);
  const navigation = useNavigation();
  const handleOpen = () => setOpen(true);
  let $form = useRef();
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (type) => {
    setInputType(type);
    setValidFile(true);
    setText("");
    setHeaders(null);
    setExampleData(null);
    setUploadedFile(null);
    setSelected([]);
    setNumMessages(0);
  };
  const handleFileChange = async (e) => {
    setValidFile(true);
    setHeaders(null);
    setExampleData(null);
    const file = e.target.files[0];
    setUploadedFile(file);

    if (!file) {
      return;
    }

    try {
      setValidFileSize(true);
      // if (e.target.files[0].size > 60000) {
      //   setValidFileSize(false);
      //   e.target.value = "";
      // }
      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = xlsx.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const headers = [];
      const exampleDataRow = []; // Array to store the second row data

      const range = xlsx.utils.decode_range(sheet["!ref"]);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const headerCellAddress = xlsx.utils.encode_cell({
          r: range.s.r,
          c: C,
        });

        const headerCellValue = sheet[headerCellAddress].v;
        headers.push(headerCellValue);

        // Store second row data
        if (range.s.r + 1 <= range.e.r) {
          const dataCellAddress = xlsx.utils.encode_cell({
            r: range.s.r + 1, // Second row
            c: C,
          });

          const dataCellValue = sheet[dataCellAddress].v;
          exampleDataRow.push(dataCellValue);
        }
      }

      console.log("CLIENT SIDE Headers:", headers);
      console.log("CLIENT SIDE Example Data:", exampleDataRow);
      setHeaders(headers);
      setExampleData(exampleDataRow); // Set the exampleData state
    } catch (error) {
      console.error("Error processing file:", error);
      setValidFile(false);
    }
  };
  const handleButtonClick = (value, event) => {
    event.preventDefault();
    setText((prevText) => `${prevText} @@${value} `);
  };

  const groupOptions = [];
  const contactOptions = [];

  Object.entries(contacts).forEach(([group, groupContacts]) => {
    // Check if the group has a name
    const groupName =
      groupContacts.length > 0 && groupContacts[0].group
        ? groupContacts[0].group.groupName
        : null;

    // Add the group to the groupOptions array only if it has a name
    if (groupName) {
      groupOptions.push({ label: groupName, value: group, isGroup: true });
    }

    // Add the group's contacts to the contactOptions array
    contactOptions.push(
      ...groupContacts.map((contact) => ({
        label: contact.name,
        value: contact.number,
      }))
    );
  });
  // Combine groupOptions and contactOptions in the options array
  const options = [...groupOptions, ...contactOptions];

  const handleSubmit = () => {
    setText("");
    setNumMessages(0);
  };
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="w-full flex flex-col items-center">
      {/* Popup */}

      <FileSampleModal open={open} handleClose={handleClose} />
      <div className="w-full xl:w-3/5 justify-center items-center mt-4 p-10 py-3 pb-4 rounded-lg xl:shadow-lg xl:border dark:border-slate-600 bg-white dark:bg-slate-900 ">
        <h1 className="font-medium text-slate-800 text-2xl my-10 dark:text-slate-200">
          Compose a message
        </h1>

        <Form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="mb-5 ">
            <p className="block text-l font-medium text-gray-900 dark:text-slate-300 ">
              Your Sender ID
            </p>
            <div className="flex mb-3 w-100 flex-col md:flex-row ">
              <div className="w-full  md:mr-8 flex flex-col lg:flex-row">
                <div className="w-full flex items-center">
                  <select
                    id="senderID"
                    name="senderID"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {/* Use senderNames array to dynamically generate options */}
                    {senderNames?.map((senderName) => (
                      <option key={senderName} value={senderName}>
                        {senderName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:ml-7 md:w-2/5 flex justify-left my-5 align-middle items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={inputType}
                      name="payloadType"
                      checked={inputType === "file"}
                      onChange={() =>
                        handleInputChange(
                          inputType === "numbers" ? "file" : "numbers"
                        )
                      }
                      className="sr-only peer"
                    />

                    <div className="w-11 h-6 bg-gray-200 dark:bg-slate-600 peer-focus:outline-none   rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-secondary"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-slate-300">
                      Upload a file
                    </span>
                    <button
                      type="button"
                      onClick={handleOpen}
                      className="font-bold text-primary border rounded-lg px-2 ml-3 "
                    >
                      ?
                    </button>
                  </label>
                </div>
              </div>
            </div>

            <div className="">
              {inputType === "numbers" && (
                <div className=" flex flex-col align-middle  justify-left mt-5  animate-fade animate-once animate-duration-300 animate-ease-linear">
                  <div className="flex flex-col md:flex-row ">
                    <div className=" md:w-full flex w-full ">
                      <input
                        type="hidden"
                        name="numbers"
                        value={uniqueNumbers}
                      />

                      <AutoCompleteInput
                        options={options}
                        selected={selected}
                        uniqueNumbers={uniqueNumbers}
                        setUniqueNumbers={setUniqueNumbers}
                        setSelected={setSelected}
                        contacts={contacts}
                      />
                      <div className="flex align-middle justify-center items-center px-2 opacity-50">
                        <button
                          type="button"
                          className="hover:bg-slate-200 rounded-full h-min w-min p-1 dark:text-white dark:hover:bg-slate-700"
                          onClick={() => {
                            setSelected([]);
                            setUniqueNumbers([]);
                          }}
                        >
                          <MdClear size={25} />
                        </button>
                      </div>
                    </div>
                  </div>
                  {!validNum && (
                    <div className="mt-3">
                      <span className="font-medium text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        Please enter a valid 7-digit number starting with 7 or 9
                        <span className="font-black ml-2">
                          (max 10 numbers)
                        </span>
                        .
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
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600"
                          aria-describedby="file_input_help"
                          type="file"
                          name="excelFile"
                          id="excelFile"
                          accept=".xlsx, .csv"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  )}
                  {validFileSize ? (
                    <p
                      className="mt-1 text-sm text-gray-500 dark:text-slate-300"
                      id="file_input_help"
                    >
                      .xlsx or .csv
                    </p>
                  ) : (
                    <p className="font-medium text-sm text-red-500 ">
                      Your file is too big!
                    </p>
                  )}
                  {validFile ? (
                    ""
                  ) : (
                    <p className="font-medium text-sm text-red-500 ">
                      Your file is invalid!
                    </p>
                  )}

                  {headers ? (
                    <>
                      {Object.values(headers).map((value, index) => (
                        <button
                          className="bg-secondary mt-3 text-white mr-1 border py-1 px-2 rounded-md shadow-sm hover:bg-hoversec text-sm hover:scale-105 transition"
                          key={index}
                          type="button"
                          onMouseDown={(e) => handleButtonClick(value, e)}
                        >
                          {value}
                        </button>
                      ))}

                      {/* Display Example Data */}
                      {exampleData.length > 0 && (
                        <div className="flex flex-wrap align-middle mt-3 space-x-2 gap-y-1">
                          <p className="text-sm text-gray-500 dark:text-slate-300">
                            {" "}
                            e.g. Will be replaced by
                          </p>

                          <>
                            {exampleData.map((value, index) => (
                              <div
                                key={index}
                                className="bg-gray-200 px-1 rounded-md shadow-sm text-sm text-gray-600 dark:text-slate-300"
                              >
                                {value}
                              </div>
                            ))}
                            <p className="text-sm text-gray-500 dark:text-slate-300">
                              {" "}
                              for your first message
                            </p>
                          </>
                        </div>
                      )}
                    </>
                  ) : (
                    // ELSE SHOW THAT NO DATA IS AVAILABLE
                    <div className="mt-3 text-sm  text-gray-500 dark:text-slate-300">
                      No Data Available
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <TextAreaComponent
              text={text}
              setText={setText}
              numMessages={numMessages}
              inputType={inputType}
              setNumMessages={setNumMessages}
            />

            <div className="flex w-full  justify-end mt-10  ">
              <button
                type="submit"
                name="payloadType"
                value={inputType}
                disabled={
                  !(
                    (text &&
                      text &&
                      selected.length >= 1 &&
                      selected.length <= 10) ||
                    (text && uploadedFile)
                  ) ||
                  numMessages > 10 ||
                  navigation.state === "submitting" ||
                  !validFile
                }
                className="flex align-middle w-full lg:w-min self-end justify-center justify-self-end items-center disabled:bg-gray-400 text-white bg-primary hover:bg-hoverprim  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
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
