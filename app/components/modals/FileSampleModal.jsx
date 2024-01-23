// ModalContent.js

import React from "react";
// Replace 'your-modal-library' with the actual library you're using
import { IoClose } from "react-icons/io5";
import Modal from "@mui/material/Modal";
import { FaFileDownload } from "react-icons/fa";
import * as XLSX from "xlsx";
import sample from "../../assets/sample.png";
import placeholderimg from "../../assets/placeholders.png";

const FileSampleModal = ({ open, handleClose }) => {
  const handleDownload = () => {
    // Your data in the desired format
    const data = [
      // Skip the first row (it contains the "Number" header)
      { Number: "7XXXXXX" },
      { Number: "7XXXXXX" },
      { Number: "7XXXXXX" },
      { Number: "7XXXXXX" },
      // ... other rows
    ];

    const ws = XLSX.utils.json_to_sheet(data);

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Convert the workbook to an array buffer
    const arrayBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Convert the array buffer to a Blob
    const blob = new Blob([arrayBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Use file-saver to trigger download
    saveAs(blob, "sample.xlsx");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={`flex items-center align-middle justify-center`}
    >
      <div className="border-t-4 border-secondary bg-white dark:bg-slate-800 absolute flex flex-col p-6 shadow-md rounded-lg left-50 z-10 w-100 sm:w-1/2 lg:w-1/3 xl:w-1/4 animate-fade-down animate-once animate-duration-[240ms] animate-ease-in">
        <div className="w-100 flex align-top justify-between mb-5">
          <FaFileDownload
            onClick={handleDownload}
            color="0FA5B7"
            size={25}
            className="cursor-pointer hover:scale-110 transition"
          />
          <IoClose
            color="0FA5B7"
            className="cursor-pointer hover:scale-110 transition"
            size={30}
            onClick={handleClose}
          />
        </div>
        <div className="">
          {" "}
          <ul className="text-md flex flex-col align-middle justify-center items-center gap-4 px-4">
            <img
              src={sample}
              alt=""
              className="w-4/5 md:w-3/5 border-2  rounded-md"
            />

            <li>
              <p className="dark:text-slate-200">
                Upload an xlsx or csv file in the above format with your desired
                columns. Number is required.{" "}
              </p>
            </li>

            <img
              src={placeholderimg}
              alt=""
              className="w-4/5 md:w-3/5 border-2 rounded-md"
            />
            <li>
              <p className="dark:text-slate-200">
                The header values of your data sheet will be displayed, and can
                be added to your messages as placeholders to allow for
                customized messages.{" "}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default FileSampleModal;
